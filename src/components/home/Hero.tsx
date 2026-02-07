"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import { FloatingTags } from "./FloatingTags";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background">
            <FloatingTags />

            <div className="container relative z-10 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center mb-6">
                        <span className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mr-4 shadow-lg shadow-primary/20">Z:</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Find what&apos;s next
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
                        Where elite startups and top-tier job seekers connect.
                        <br className="hidden md:block" /> Transparent salaries. Direct access. No recruiters.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
                        <Link href="/freelancers" className="w-full sm:w-auto">
                            <Button size="xl" className="w-full sm:w-auto text-lg px-8 rounded-full h-14 bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-xl">
                                Find your next hire
                            </Button>
                        </Link>
                        <Link href="/jobs" className="w-full sm:w-auto">
                            <Button size="xl" variant="outline" className="w-full sm:w-auto text-lg px-8 rounded-full h-14 border-2 hover:bg-accent transition-all hover:scale-105 active:scale-95 bg-background/50 backdrop-blur-sm">
                                Find your next job
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-8 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">100,000+</span> jobs &nbsp;•&nbsp; <span className="font-semibold text-foreground">25,000+</span> startups
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};
