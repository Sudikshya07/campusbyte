"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ApplyButtonProps {
    jobId: string;
    isInternalApply: boolean;
    applyLink?: string;
    hasApplied?: boolean;
}

export function ApplyButton({ jobId, isInternalApply, applyLink, hasApplied = false }: ApplyButtonProps) {
    const [isApplying, setIsApplying] = useState(false);
    const [applied, setApplied] = useState(hasApplied);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleApply = async () => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        if (!isInternalApply && applyLink) {
            window.open(applyLink, "_blank");
            return;
        }

        setIsApplying(true);
        try {
            const response = await fetch(`/api/jobs/${jobId}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();

            if (data.success) {
                setApplied(true);
            } else {
                alert(data.error || "Failed to apply");
            }
        } catch (error) {
            console.error("Apply error:", error);
            alert("Failed to apply. Please try again.");
        } finally {
            setIsApplying(false);
        }
    };

    if (applied) {
        return (
            <Button disabled variant="outline">
                Applied ✓
            </Button>
        );
    }

    return (
        <Button onClick={handleApply} disabled={isApplying}>
            {isApplying ? (
                <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Applying...
                </>
            ) : (
                <>
                    Apply Now
                    {!isInternalApply && <ExternalLink size={16} className="ml-1" />}
                </>
            )}
        </Button>
    );
}