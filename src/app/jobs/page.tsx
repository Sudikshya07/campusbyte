"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button, Badge, Input } from "@/components/ui";
import { JobCard } from "@/components/shared";
import { cn } from "@/lib/utils";
import type { Job, Company, JobType } from "@/types";

// Mock data for demonstration
const mockJobs: (Job & { company: Company })[] = [
    {
        id: "1",
        companyId: "c1",
        title: "Software Engineer Intern",
        type: "INTERNSHIP",
        location: "Bangalore, India",
        stipend: 80000,
        duration: "6 months",
        techStack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
        isInternalApply: true,
        isPPO: true,
        createdAt: new Date(),
        company: {
            id: "c1",
            name: "Google",
            isPremium: true,
            createdAt: new Date(),
        },
    },
    {
        id: "2",
        companyId: "c2",
        title: "Frontend Developer",
        type: "FULL_TIME",
        location: "Remote",
        stipend: 120000,
        duration: "Full-time",
        techStack: ["Vue.js", "Tailwind CSS", "GraphQL"],
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        isInternalApply: false,
        isPPO: false,
        createdAt: new Date(),
        company: {
            id: "c2",
            name: "Startup XYZ",
            isPremium: false,
            createdAt: new Date(),
        },
    },
    {
        id: "3",
        companyId: "c3",
        title: "Backend Engineer",
        type: "INTERNSHIP",
        location: "Mumbai, India",
        stipend: 60000,
        duration: "3 months",
        techStack: ["Python", "Django", "AWS", "Docker", "Kubernetes"],
        deadline: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours (urgent!)
        isInternalApply: true,
        isPPO: false,
        createdAt: new Date(),
        company: {
            id: "c3",
            name: "Microsoft",
            isPremium: true,
            createdAt: new Date(),
        },
    },
];

const jobTypes: { value: JobType; label: string }[] = [
    { value: "INTERNSHIP", label: "Internship" },
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
];

const skills = ["React", "Node.js", "Python", "Java", "TypeScript", "AWS", "Docker", "Kubernetes", "Go", "Rust"];

export default function JobsPage() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [isPremiumOnly, setIsPremiumOnly] = useState(false);
    const [isPPOOnly, setIsPPOOnly] = useState(false);

    const toggleType = (type: JobType) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedSkills([]);
        setIsPremiumOnly(false);
        setIsPPOOnly(false);
    };

    const hasActiveFilters = selectedTypes.length > 0 || selectedSkills.length > 0 || isPremiumOnly || isPPOOnly;

    // Filter jobs based on selections
    const filteredJobs = mockJobs.filter((job) => {
        if (selectedTypes.length > 0 && !selectedTypes.includes(job.type)) return false;
        if (selectedSkills.length > 0 && !selectedSkills.some((s) => job.techStack.includes(s))) return false;
        if (isPremiumOnly && !job.company.isPremium) return false;
        if (isPPOOnly && !job.isPPO) return false;
        return true;
    });

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Job Type */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Job Type</h3>
                <div className="space-y-2">
                    {jobTypes.map((type) => (
                        <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type.value)}
                                onChange={() => toggleType(type.value)}
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-muted-foreground">{type.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Premium */}
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isPremiumOnly}
                        onChange={() => setIsPremiumOnly(!isPremiumOnly)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">Premium Institutes (IIT/NIT)</span>
                    <Badge variant="premium" className="text-xs">🏛️</Badge>
                </label>
            </div>

            {/* PPO */}
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isPPOOnly}
                        onChange={() => setIsPPOOnly(!isPPOOnly)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">With PPO</span>
                    <Badge variant="accent" className="text-xs">✨</Badge>
                </label>
            </div>

            {/* Skills */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
                                selectedSkills.includes(skill)
                                    ? "bg-primary text-white border-primary"
                                    : "bg-card text-muted-foreground border-border hover:border-input"
                            )}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                    <X size={14} className="mr-1" /> Clear All Filters
                </Button>
            )}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Find Your Next Opportunity
                </h1>
                <p className="text-muted-foreground">
                    {filteredJobs.length} opportunities available
                </p>
            </div>

            <div className="flex gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-semibold text-foreground">Filters</h2>
                            {hasActiveFilters && (
                                <Badge variant="default">{selectedTypes.length + selectedSkills.length + (isPremiumOnly ? 1 : 0) + (isPPOOnly ? 1 : 0)}</Badge>
                            )}
                        </div>
                        <FilterContent />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Active Filters Pills */}
                    {hasActiveFilters && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-sm text-muted-foreground">Active:</span>
                            {selectedTypes.map((type) => (
                                <Badge key={type} variant="outline" className="cursor-pointer" onClick={() => toggleType(type)}>
                                    {jobTypes.find((t) => t.value === type)?.label}
                                    <X size={12} className="ml-1" />
                                </Badge>
                            ))}
                            {selectedSkills.map((skill) => (
                                <Badge key={skill} variant="outline" className="cursor-pointer" onClick={() => toggleSkill(skill)}>
                                    {skill}
                                    <X size={12} className="ml-1" />
                                </Badge>
                            ))}
                            {isPremiumOnly && (
                                <Badge variant="premium" className="cursor-pointer" onClick={() => setIsPremiumOnly(false)}>
                                    Premium <X size={12} className="ml-1" />
                                </Badge>
                            )}
                            {isPPOOnly && (
                                <Badge variant="accent" className="cursor-pointer" onClick={() => setIsPPOOnly(false)}>
                                    PPO <X size={12} className="ml-1" />
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Job Cards */}
                    <div className="space-y-4">
                        {filteredJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground mb-4">No jobs match your filters</p>
                            <Button variant="outline" onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Filter Button */}
            <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg z-40 touch-target"
                aria-label="Open filters"
            >
                <SlidersHorizontal size={24} />
            </button>

            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                        onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="fixed bottom-0 left-0 right-0 bg-background z-50 rounded-t-2xl shadow-xl max-h-[80vh] overflow-auto lg:hidden animate-slide-in">
                        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
                            <h2 className="font-semibold text-foreground">Filters</h2>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 text-muted-foreground hover:bg-muted rounded-md"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4">
                            <FilterContent />
                        </div>
                        <div className="sticky bottom-0 bg-background border-t border-border p-4">
                            <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                                Show {filteredJobs.length} Results
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
