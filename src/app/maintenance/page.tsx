import React from "react";
import { Settings } from "lucide-react";

export const metadata = {
    title: "Under Maintenance",
    description: "We'll be back shortly.",
};

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 selection:bg-white/30 selection:text-white">
            <div className="relative flex flex-col items-center justify-center z-10">
                {/* Background glow for the gear */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />

                <div className="relative flex items-center justify-center mb-8">
                    <Settings
                        className="w-24 h-24 text-indigo-500/80 animate-[spin_4s_linear_infinite]"
                        strokeWidth={1.5}
                    />
                    <div className="absolute bg-black w-10 h-10 rounded-full" />
                    <Settings
                        className="absolute w-12 h-12 text-indigo-400/80 animate-[spin_3s_linear_infinite_reverse]"
                        strokeWidth={1.5}
                    />
                </div>

                <div className="space-y-4 text-center max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                        System Upgrade
                    </h1>
                    <p className="text-base md:text-lg text-zinc-400 tracking-wide font-medium">
                        We are undergoing scheduled maintenance.<br />We will be right back.
                    </p>
                </div>
            </div>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
    );
}
