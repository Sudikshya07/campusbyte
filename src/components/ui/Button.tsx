"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-target",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary-700",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-700",
                accent: "bg-accent text-accent-foreground hover:bg-accent-700",
                outline: "border border-input bg-background hover:bg-muted hover:text-foreground",
                ghost: "hover:bg-muted hover:text-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                urgency: "bg-urgency text-urgency-foreground hover:bg-urgency-600",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                xl: "h-12 rounded-lg px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "style">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        // We use motion.button for all buttons to get the tap/hover effects for free
        return (
            <motion.button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                whileTap={{ scale: 0.97 }}
                whileHover={variant !== "ghost" && variant !== "link" ? { scale: 1.02 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                {...(props as HTMLMotionProps<"button">)}
            >
                {props.children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
