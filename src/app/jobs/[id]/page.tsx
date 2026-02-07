"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    MapPin, Clock, Calendar, Building2, DollarSign, ExternalLink,
    Lightbulb, BookOpen, Code, Users, ChevronLeft, Share2, Bookmark
} from "lucide-react";
import { Button, Badge, Card, CardContent } from "@/components/ui";
import { ApplyButton } from "@/components/jobs/ApplyButton";
import { formatCurrency, formatDate, timeUntil } from "@/lib/utils";

interface Job {
    id: string;
    title: string;
    type: string;
    location: string;
    stipend: number;
    duration?: string;
    techStack: string[];
    prepGuide?: string;
    deadline: string;
    applyLink?: string;
    isInternalApply: boolean;
    isPPO: boolean;
    hasApplied: boolean;
    company: {
        id: string;
        name: string;
        logoUrl?: string;
        isPremium: boolean;
        website?: string;
        description?: string;
    };
}

export default function JobDetailPage() {
    const params = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (params.id) {
            fetchJob(params.id as string);
        }
    }, [params.id]);

    const fetchJob = async (id: string) => {
        try {
            const response = await fetch(`/api/jobs/${id}`);
            const data = await response.json();

            if (data.success) {
                setJob(data.job);
            } else {
                setError(data.error || "Job not found");
            }
        } catch (err) {
            setError("Failed to load job");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Link href="/jobs">
                        <Button>Back to Jobs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const deadline = timeUntil(new Date(job.deadline));

    return (
        <div className="min-h-screen">
            {/* Sticky Header */}
            <div className="sticky top-16 z-30 bg-background border-b border-border shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                            <ChevronLeft size={20} />
                        </Link>
                        <div className="hidden sm:block">
                            <h1 className="font-semibold text-foreground line-clamp-1">{job.title}</h1>
                            <p className="text-sm text-muted-foreground">{job.company.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" aria-label="Share">
                            <Share2 size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Save">
                            <Bookmark size={18} />
                        </Button>
                        <ApplyButton
                            jobId={job.id}
                            isInternalApply={job.isInternalApply}
                            applyLink={job.applyLink}
                            hasApplied={job.hasApplied}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                                {job.company.logoUrl ? (
                                    <Image
                                        src={job.company.logoUrl}
                                        alt={job.company.name}
                                        width={80}
                                        height={80}
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <Building2 className="w-10 h-10 text-muted-foreground" />
                                )}
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    {job.isPPO && (
                                        <Badge variant="accent">✨ With PPO</Badge>
                                    )}
                                    {job.company.isPremium && (
                                        <Badge variant="premium">🏛️ IIT/NIT Exclusive</Badge>
                                    )}
                                    {deadline.isUrgent && (
                                        <Badge variant="urgency">🔥 Closing Soon</Badge>
                                    )}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                                    {job.title}
                                </h1>
                                <Link
                                    href={`/companies/${job.company.id}`}
                                    className="text-lg font-medium text-primary hover:underline mb-3 inline-block"
                                >
                                    {job.company.name}
                                </Link>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <DollarSign size={16} />
                                        {formatCurrency(job.stipend)}/month
                                    </span>
                                    {job.duration && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {job.duration}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        Apply by {formatDate(new Date(job.deadline))}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                <Code size={16} />
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {job.techStack.map((tech) => (
                                    <Badge key={tech} variant="outline">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Preparation Guide */}
                            {job.prepGuide && (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Lightbulb className="w-5 h-5 text-primary" />
                                            <h2 className="text-xl font-semibold">Preparation Guide</h2>
                                        </div>
                                        <div className="prose prose-sm max-w-none">
                                            <div className="whitespace-pre-wrap text-muted-foreground">
                                                {job.prepGuide}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Company Description */}
                            {job.company.description && (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Building2 className="w-5 h-5 text-primary" />
                                            <h2 className="text-xl font-semibold">About {job.company.name}</h2>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {job.company.description}
                                        </p>
                                        {job.company.website && (
                                            <a
                                                href={job.company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-primary hover:underline mt-3"
                                            >
                                                Visit Website <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Apply */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Quick Apply</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Type:</span>
                                            <Badge variant="outline">{job.type}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Stipend:</span>
                                            <span className="font-medium">{formatCurrency(job.stipend)}/month</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Deadline:</span>
                                            <span className="font-medium">
                                                {deadline.days > 0 
                                                    ? `${deadline.days}d ${deadline.hours}h left`
                                                    : deadline.hours > 0 
                                                        ? `${deadline.hours}h left`
                                                        : "Expired"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <ApplyButton
                                            jobId={job.id}
                                            isInternalApply={job.isInternalApply}
                                            applyLink={job.applyLink}
                                            hasApplied={job.hasApplied}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Similar Jobs */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Similar Opportunities</h3>
                                    <div className="space-y-3">
                                        <div className="text-sm text-muted-foreground">
                                            More opportunities from {job.company.name} and similar companies coming soon...
                                        </div>
                                        <Link href="/jobs">
                                            <Button variant="outline" size="sm" className="w-full">
                                                Browse All Jobs
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}