"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";

export const FeatureSplit = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 relative">
                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border -translate-x-1/2" />

                    {/* Job Seekers */}
                    <div className="flex flex-col gap-8 md:pr-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">For Job Seekers</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Stop scrolling through boring job boards. Get direct access to founders and salary details upfront.
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "No cover letters required",
                                "See salary & equity upfront",
                                "Direct connection to founders",
                                "One profile, thousands of applications"
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-lg">
                                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link href="/jobs">
                                <Button size="lg" className="text-lg px-8 rounded-full">
                                    Find a job <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Recruiters - slight visual distinction */}
                    <div className="flex flex-col gap-8 md:pl-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">For Recruiters</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Build your dream team. Access a curated pool of active, responsive talent ready to build.
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "8M+ responsive candidates",
                                "Free to post jobs",
                                "ATS integration included",
                                "AI-powered candidate matching"
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-lg">
                                    <CheckCircle2 className="w-6 h-6 text-foreground flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link href="/dashboard/post-job">
                                <Button size="lg" variant="outline" className="text-lg px-8 rounded-full border-2">
                                    Post a job <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
