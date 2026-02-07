"use client";

import { Star } from "lucide-react";

const testimonials = [
    {
        text: "I got my dream job at a Series B startup in 2 weeks. The direct connection to founders is a game changer.",
        author: "Sarah J.",
        role: "Senior Product Designer",
        bg: "bg-blue-50 dark:bg-blue-900/10"
    },
    {
        text: "Zyrex is the only platform where I actually get responses. The salary transparency saved me so much time.",
        author: "Michael C.",
        role: "Full Stack Engineer",
        bg: "bg-rose-50 dark:bg-rose-900/10"
    },
    {
        text: "We hired our founding engineer through Zyrex. The quality of candidates is unmatched compared to LinkedIn.",
        author: "David K.",
        role: "CTO @ FinTech Co",
        bg: "bg-amber-50 dark:bg-amber-900/10"
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 container px-4 mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-16">From our users</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <div key={i} className={`p-8 rounded-3xl border border-transparent hover:border-border transition-all duration-300 ${t.bg}`}>
                        <div className="flex gap-1 text-yellow-500 mb-6">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-lg font-medium leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                        <div>
                            <div className="font-bold">{t.author}</div>
                            <div className="text-sm text-muted-foreground">{t.role}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
