import { Variants } from "framer-motion";

// Standard Fade Up
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Fade In (No movement)
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Stagger Container
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

// Stagger Container (Faster)
export const staggerFast: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

// Card Hover Effect
export const cardHover: Variants = {
    rest: { y: 0, scale: 1 },
    hover: {
        y: -5,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 }
    }
};

// Button Tap Effect
export const buttonTap = {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 10 }
};

// Slide In From Right (for Drawers)
export const slideInRight: Variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

// Hero Text Stagger
export const heroTextStagger: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    }),
};
