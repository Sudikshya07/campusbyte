"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tags = [
    "Full Stack Developer", "San Francisco", "Remote", "React", "Seed Stage",
    "Series A", "Product Designer", "New York", "Equity", "CTO",
    "Engineering Manager", "AI/ML", "Data Science", "Internship", "Growth",
    "Marketing", "Blockchain", "SaaS", "Fintech", "Healthtech"
];

// Helper to generate random positions within a range, avoiding center
const getRandomPosition = (idx: number, total: number) => {
    // improved distribution logic could go here
    // for now, simple random scattering
    const angle = (idx / total) * 360;
    const radius = 30 + Math.random() * 40; // percentage from center
    const x = 50 + radius * Math.cos(angle * Math.PI / 180);
    const y = 50 + radius * Math.sin(angle * Math.PI / 180);
    return { x, y };
};

export const FloatingTags = () => {
    // using client-side only rendering for random positions to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-40 dark:opacity-20 translate-y-12">
            {tags.map((tag, i) => {
                const pos = getRandomPosition(i, tags.length);
                return (
                    <motion.div
                        key={tag}
                        initial={{ 
                            left: `${pos.x}%`, 
                            top: `${pos.y}%`, 
                            opacity: 0,
                            scale: 0.5
                        }}
                        animate={{ 
                            opacity: [0.4, 0.8, 0.4],
                            y: [0, -20, 0],
                            x: [0, 10, 0]
                        }}
                        transition={{ 
                            duration: 5 + Math.random() * 5, 
                            repeat: Infinity, 
                            repeatType: "reverse",
                            delay: Math.random() * 2
                        }}
                        className="absolute whitespace-nowrap px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full text-xs font-medium text-muted-foreground border border-black/5 dark:border-white/10 shadow-sm"
                    >
                        {tag}
                    </motion.div>
                )
            })}
        </div>
    );
};
