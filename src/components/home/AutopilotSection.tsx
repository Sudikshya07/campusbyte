"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

export const AutopilotSection = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 p-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container px-4 mx-auto max-w-5xl relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                    <Sparkles size={14} />
                    <span>New Feature</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                    Meet Autopilot. <br />
                    <span className="text-primary">Your AI Career Agent.</span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Let AI handle the busy work. Autopilot applies to jobs, schedules interviews, and negotiates offers while you sleep.
                </p>

                <div className="p-8 bg-background border border-border shadow-2xl rounded-3xl max-w-3xl mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-4 mb-6 border-b border-border pb-6">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Sparkles size={20} className="text-primary" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold">Autopilot Activity</div>
                            <div className="text-xs text-muted-foreground">Updated just now</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            "Applied to Senior Frontend Engineer at Stripe",
                            "Scheduled interview with Airbnb for Tuesday",
                            "Found 5 new matches based on your GitHub profile"
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-medium">{activity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
