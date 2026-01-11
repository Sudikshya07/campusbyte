"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, Trophy, Building2, Users, Sparkles, ChevronRight, Zap } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, heroTextStagger } from "@/lib/animations";

// Bento Grid Items
const BentoItem = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        className={`relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-white/40 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
        {children}
    </motion.div>
);

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section - Asymmetric Layout */}
            <section className="relative py-20 px-4 mt-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[200px]">

                        {/* Main Heading Block - 8 cols */}
                        <BentoItem className="md:col-span-8 md:row-span-2 p-10 flex flex-col justify-center bg-gradient-to-br from-card to-primary-50/30 dark:to-primary-900/10">
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                                <Badge variant="default" className="mb-6 w-fit bg-primary/10 text-primary border-primary/20">
                                    <Sparkles size={14} className="mr-2" /> Top 1% Talent Pool
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-[0.9]">
                                    Craft Your <br />
                                    <span className="text-primary italic font-serif">Legacy.</span>
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
                                    A curated ecosystem for ambitious developers. Launch your career with premium roles, high-octane hackathons, and elite mentorship.
                                </p>
                                <div className="flex gap-4">
                                    <Link href="/jobs">
                                        <Button size="xl" className="rounded-full px-8 shadow-xl hover:shadow-primary/20">
                                            Explore Roles <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/hackathons">
                                        <Button size="xl" variant="outline" className="rounded-full px-8 bg-card/50 hover:bg-card">
                                            Compete
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </BentoItem>

                        {/* Stat Block 1 - 4 cols */}
                        <BentoItem delay={0.2} className="md:col-span-4 bg-card dark:bg-slate-900 border border-border text-foreground dark:text-white p-8 flex flex-col justify-between group">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-white/10 rounded-2xl w-fit group-hover:bg-primary transition-colors">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <span className="text-4xl font-bold font-serif italic">2.5k+</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium mb-1">Active Roles</h3>
                                <p className="text-muted-foreground text-sm">From YC startups to MAANG</p>
                            </div>
                        </BentoItem>

                        {/* Stat Block 2 - 4 cols */}
                        <BentoItem delay={0.3} className="md:col-span-4 bg-secondary text-white p-8 flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-white/10 rounded-2xl w-fit group-hover:bg-white group-hover:text-secondary transition-colors">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <span className="text-4xl font-bold font-serif italic">₹20L</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-medium mb-1">Prize Pools</h3>
                                <p className="text-white/80 text-sm">Competitions live now</p>
                            </div>
                        </BentoItem>

                        {/* Ticker / Carousel - 12 cols */}
                        <BentoItem delay={0.4} className="md:col-span-12 md:row-span-1 bg-card flex items-center overflow-hidden">
                            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_li]:max-w-none animate-infinite-scroll">
                                    {["Google", "Microsoft", "Amazon", "Netflix", "Uber", "Airbnb", "Stripe", "Coinbase"].map((company) => (
                                        <li key={company} className="text-2xl font-bold text-muted-foreground font-serif italic uppercase tracking-widest">{company}</li>
                                    ))}
                                    {["Google", "Microsoft", "Amazon", "Netflix", "Uber", "Airbnb", "Stripe", "Coinbase"].map((company) => (
                                        <li key={`${company}-duplicate`} className="text-2xl font-bold text-muted-foreground font-serif italic uppercase tracking-widest">{company}</li>
                                    ))}
                                </ul>
                            </div>
                        </BentoItem>
                    </div>
                </div>
            </section>

            {/* Preparation Zone - Editorial Layout */}
            <section className="py-32 px-4 bg-muted/30 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-200/50 rounded-full blur-3xl" />
                            <h2 className="text-6xl font-bold tracking-tighter mb-8 relative z-10">
                                Don't just apply. <br />
                                <span className="font-serif italic text-rose-500">Dominate.</span>
                            </h2>
                            <p className="text-xl text-muted-foreground leading-loose mb-8">
                                Our proprietary <strong>Preparation Zone</strong> gives you the unfair advantage. Access leaked interview questions, system design templates, and mock rounds curated by insiders.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="border-l-2 border-rose-500 pl-6">
                                    <span className="block text-4xl font-bold mb-2">85%</span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-widest">Interview conversion rate</span>
                                </div>
                                <div className="border-l-2 border-border pl-6">
                                    <span className="block text-4xl font-bold mb-2">10k+</span>
                                    <span className="text-sm text-muted-foreground uppercase tracking-widest">Mock interviews conducted</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Abstract Composition */}
                            <div className="aspect-[4/5] bg-card dark:bg-slate-900 rounded-[2rem] p-8 text-foreground dark:text-white relative overflow-hidden shadow-2xl border border-border">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <Badge className="bg-rose-500 text-white border-none mb-4">Exclusive Content</Badge>
                                        <h3 className="text-3xl font-serif italic mb-2">System Design: Scaling to 1M Users</h3>
                                        <p className="text-muted-foreground">Chapter 4 • 25 min read</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-3/4 bg-rose-500" />
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
                                            <span>Progress</span>
                                            <span>75%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -left-10 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs"
                            >
                                <p className="text-foreground font-medium mb-2">"The preparation guides were a game changer. Cracked Google L4!"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full" />
                                    <span className="text-xs text-muted-foreground font-bold">Priya S., SDE-II</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}
