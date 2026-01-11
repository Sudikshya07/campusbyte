import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-primary/10 text-primary border border-primary/20",
                secondary: "bg-secondary/10 text-secondary border border-secondary/20",
                accent: "bg-accent/10 text-accent border border-accent/20", // PPO badge
                urgency: "bg-urgency/10 text-urgency border border-urgency/20", // Deadline urgent
                premium: "bg-premium/50 text-premium-foreground border border-premium dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800", // IIT/NIT
                outline: "border border-border text-muted-foreground",
                muted: "bg-muted text-muted-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
