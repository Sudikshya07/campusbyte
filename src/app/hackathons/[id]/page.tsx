"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, Trophy, Flag, MapPin, Zap, Timer, CheckCircle2 } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { notFound } from "next/navigation";

export default function HackathonDetailPage({ params }: { params: { id: string } }) {
    // Mock Data
    const hackathon = {
        id: params.id,
        title: "Google Code Jam 2024",
        tagline: "The world's most challenging coding competition.",
        description: "Google Code Jam is back! Join thousands of developers from around the globe to solve algorithmic puzzles, win massive cash prizes, and earn the title of Code Jam Champion. This year, the stakes are higher with a new distributed systems round.",
        company: {
            name: "Google",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
        },
        prizePool: "$25,000",
        participants: "12,450",
        deadline: "Nov 30, 2024",
        mode: "Hybrid",
        location: "Online & Mountain View",
        rounds: [
            {
                name: "Qualification Round",
                date: "Nov 15, 2024",
                status: "completed",
                type: "Online"
            },
            {
                name: "Round 1: Algorithms",
                date: "Dec 01, 2024",
                status: "upcoming",
                type: "Online"
            },
            {
                name: "Round 2: Distributed Systems",
                date: "Dec 15, 2024",
                status: "locked",
                type: "Online"
            },
            {
                name: "World Finals",
                date: "Jan 10, 2025",
                status: "locked",
                type: "On-site (USA)"
            }
        ],
        prizes: [
            { rank: "1st Place", reward: "$15,000 + Google Pixel Fold" },
            { rank: "2nd Place", reward: "$7,000 + Pixel Tablet" },
            { rank: "3rd Place", reward: "$3,000" },
            { rank: "Top 25", reward: "Trip to World Finals" }
        ]
    };

    if (!hackathon) return notFound();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Hero */}
            <div className="bg-secondary-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-900/90 to-transparent" />

                <div className="container mx-auto px-4 py-8 relative z-10">
                    <Link href="/hackathons" className="inline-block mb-8">
                        <Button variant="ghost" className="text-secondary-200 hover:text-white hover:bg-white/10">
                            <ArrowLeft className="mr-2" /> Back to Hackathons
                        </Button>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-24 h-24 bg-white rounded-2xl p-4 flex items-center justify-center flex-shrink-0">
                            <Image src={hackathon.company.logo} alt={hackathon.company.name} width={64} height={64} className="object-contain" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-secondary-500/20 text-secondary-200 border-secondary-500/30 backdrop-blur">
                                    <Zap size={14} className="mr-1" /> Premium Event
                                </Badge>
                                <span className="text-secondary-300 text-sm font-medium">By {hackathon.company.name}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{hackathon.title}</h1>
                            <p className="text-xl text-secondary-200 max-w-2xl">{hackathon.tagline}</p>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <Button size="xl" variant="secondary" className="w-full shadow-lg shadow-secondary/20 font-bold">
                                Register Now
                            </Button>
                            <span className="text-center text-sm text-secondary-300">Registration closes {hackathon.deadline}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-card border border-border p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                        <Trophy className="text-yellow-500 w-8 h-8 mb-2" />
                        <div className="text-2xl font-bold text-foreground">{hackathon.prizePool}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Prize Pool</div>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                        <Users className="text-blue-500 w-8 h-8 mb-2" />
                        <div className="text-2xl font-bold text-foreground">{hackathon.participants}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Registered</div>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                        <MapPin className="text-rose-500 w-8 h-8 mb-2" />
                        <div className="text-2xl font-bold text-foreground">{hackathon.mode}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{hackathon.location}</div>
                    </div>
                    <div className="bg-card border border-border p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                        <Timer className="text-indigo-500 w-8 h-8 mb-2" />
                        <div className="text-2xl font-bold text-foreground">Active</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Status</div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-3 gap-12">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Flag className="text-primary" /> Overview
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">{hackathon.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="text-primary" /> Rounds & Timeline
                        </h2>
                        <div className="relative border-l-2 border-border ml-3 space-y-8">
                            {hackathon.rounds.map((round, idx) => (
                                <div key={idx} className="relative pl-8">
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${round.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                                            round.status === 'upcoming' ? 'bg-primary border-primary animate-pulse' :
                                                'bg-background border-muted-foreground'
                                        }`} />
                                    <div className="bg-card border border-border p-4 rounded-xl">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-foreground">{round.name}</h3>
                                            <Badge variant={round.status === 'completed' ? 'accent' : round.status === 'upcoming' ? 'default' : 'secondary'} className="capitalize">
                                                {round.status}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{round.date}</span>
                                            <span>{round.type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-amber-700 dark:text-amber-500">
                            <Trophy size={20} /> Prizes & Rewards
                        </h3>
                        <ul className="space-y-4">
                            {hackathon.prizes.map((prize, idx) => (
                                <li key={idx} className="flex items-center justify-between pb-4 border-b border-amber-200/30 last:border-0 last:pb-0">
                                    <span className="font-medium text-amber-900 dark:text-amber-100">{prize.rank}</span>
                                    <span className="font-bold text-amber-600 dark:text-amber-400">{prize.reward}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-bold mb-4">Rules & Requirements</h3>
                        <ul className="space-y-3">
                            {["Must be 18+ years old", "Teams of 1-4 members", "Original code only"].map((rule, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
