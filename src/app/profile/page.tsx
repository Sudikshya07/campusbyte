"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Briefcase, Calendar, Settings, LogOut } from "lucide-react";
import { Button, Input, Card, CardContent, Badge } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

interface Application {
    id: string;
    job: {
        id: string;
        title: string;
        company: {
            name: string;
            logoUrl?: string;
        };
        type: string;
        location: string;
    };
    status: string;
    submittedAt: string;
}

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loadingApplications, setLoadingApplications] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        skills: [] as string[],
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (user) {
            setFormData({
                name: user.name || "",
                skills: [], // We'll load this from the API
            });
            loadApplications();
        }
    }, [user, loading, router]);

    const loadApplications = async () => {
        try {
            const response = await fetch("/api/applications");
            if (response.ok) {
                const data = await response.json();
                setApplications(data.applications || []);
            }
        } catch (error) {
            console.error("Failed to load applications:", error);
        } finally {
            setLoadingApplications(false);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsEditing(false);
                // Refresh user data
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACCEPTED": return "bg-green-100 text-green-800";
            case "REJECTED": return "bg-red-100 text-red-800";
            case "SHORTLISTED": return "bg-blue-100 text-blue-800";
            case "REVIEWED": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
                            <p className="text-muted-foreground">Manage your account and track applications</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={logout}
                            className="flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Logout
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Info */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                            <User size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
                                            <p className="text-muted-foreground flex items-center gap-1">
                                                <Mail size={14} />
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <Input
                                                label="Full Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            />
                                            <div className="flex gap-2">
                                                <Button onClick={handleSave} size="sm">
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsEditing(false)}
                                                    size="sm"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditing(true)}
                                            className="w-full flex items-center gap-2"
                                        >
                                            <Settings size={16} />
                                            Edit Profile
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Applications */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Briefcase size={20} className="text-primary" />
                                        <h3 className="text-xl font-semibold">My Applications</h3>
                                    </div>

                                    {loadingApplications ? (
                                        <div className="space-y-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                                            ))}
                                        </div>
                                    ) : applications.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Briefcase size={48} className="text-muted-foreground mx-auto mb-4" />
                                            <h4 className="text-lg font-medium mb-2">No Applications Yet</h4>
                                            <p className="text-muted-foreground mb-4">
                                                Start applying to jobs to track your progress here.
                                            </p>
                                            <Button onClick={() => router.push("/jobs")}>
                                                Browse Jobs
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {applications.map((application) => (
                                                <div
                                                    key={application.id}
                                                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-foreground">
                                                                {application.job.title}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {application.job.company.name} • {application.job.location}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Badge variant="outline">
                                                                    {application.job.type}
                                                                </Badge>
                                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                    <Calendar size={12} />
                                                                    Applied {new Date(application.submittedAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Badge className={getStatusColor(application.status)}>
                                                            {application.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}