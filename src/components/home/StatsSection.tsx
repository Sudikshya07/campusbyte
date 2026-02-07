"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Matches Made", value: "8M+" },
    { label: "Tech Jobs", value: "150K+" },
    { label: "Startup Ready Candidates", value: "10M+" },
];

export const StatsSection = () => {
    return (
        <section className="bg-foreground text-background py-24 border-y border-white/10">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-2"
                        >
                            <span className="text-5xl md:text-7xl font-bold tracking-tighter text-background/90">{stat.value}</span>
                            <span className="text-lg text-background/60 font-medium uppercase tracking-widest">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
