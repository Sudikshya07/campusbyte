"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import PostCard from "@/components/blog/PostCard";
import { posts } from "@/data/blog-posts";
import type { BlogPost } from "@/types";

export default function BlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        if (params.slug) {
            const foundPost = posts.find((p) => p.slug === params.slug);
            if (foundPost) {
                setPost(foundPost);
                // Find related posts (same category, excluding current)
                const related = posts
                    .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
                    .slice(0, 3);
                setRelatedPosts(related);
            }
        }
    }, [params.slug]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
                    <p className="text-muted-foreground mb-4">The article you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/blogs">
                        <Button>Back to Blog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background">
            {/* Header */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                            {post.category}
                        </Badge>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-border pb-8">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime || "5 min read"}</span>
                            </div>
                            <span>{post.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                                <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Bookmark className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead text-xl text-muted-foreground mb-8">
                        {post.excerpt}
                    </p>
                    
                    {/* Dynamic content based on category */}
                    {post.category === "Career Tools" && (
                        <>
                            <h2>The AI Revolution in Resume Building</h2>
                            <p>
                                The job market has fundamentally changed. With over 75% of resumes being screened by AI systems before reaching human eyes, 
                                traditional resume writing approaches are no longer sufficient. We tested over 20 AI-powered resume builders to identify 
                                the tools that actually help candidates land interviews.
                            </p>
                            <h3>Our Testing Methodology</h3>
                            <p>
                                We evaluated each tool based on five key criteria: &quot;ATS compatibility&quot;, content quality, design flexibility, 
                                pricing, and success rate. Our team submitted resumes created with each tool to 100+ job applications across 
                                different industries and experience levels.
                            </p>
                            <blockquote>
                                &quot;The right AI resume builder can increase your interview callback rate by up to 40%.&quot;
                            </blockquote>
                            <h3>Top 8 AI Resume Builders That Actually Work</h3>
                            <p>
                                After extensive testing, these tools consistently delivered results. Each offers unique strengths depending on 
                                your career stage and industry focus.
                            </p>
                        </>
                    )}

                    {post.category === "Interview Prep" && (
                        <>
                            <h2>The FAANG Interview Landscape in 2026</h2>
                            <p>
                                Landing a job at Facebook (Meta), Apple, Amazon, Netflix, or Google remains one of the most coveted achievements 
                                in tech. However, the interview process has evolved significantly, with new emphasis on system design, 
                                behavioral competencies, and real-world problem-solving.
                            </p>
                            <h3>What&apos;s Changed in 2026</h3>
                            <p>
                                The traditional algorithm-heavy interviews are giving way to more practical assessments. Companies now focus on 
                                your ability to build scalable systems, work in teams, and adapt to changing requirements.
                            </p>
                            <blockquote>
                                &quot;Success in FAANG interviews now requires a balance of technical depth and practical experience.&quot;
                            </blockquote>
                            <h3>The Complete Preparation Timeline</h3>
                            <p>
                                Based on data from 500+ successful candidates, here&apos;s the optimal preparation strategy for each company, 
                                including specific focus areas and timeline recommendations.
                            </p>
                        </>
                    )}

                    {post.category === "Skills" && (
                        <>
                            <h2>The Programming Language Salary Report 2026</h2>
                            <p>
                                Our analysis of 50,000+ job postings and salary data reveals which programming languages command the highest 
                                compensation and offer the best career prospects in the current market.
                            </p>
                            <h3>Methodology</h3>
                            <p>
                                We analyzed job postings from major tech companies, startups, and traditional enterprises across North America, 
                                Europe, and Asia. Salary data was normalized for experience level and geographic location.
                            </p>
                            <blockquote>
                                &quot;The highest-paying programming languages often align with emerging technologies and enterprise needs.&quot;
                            </blockquote>
                            <h3>The Top 8 Languages for 2026</h3>
                            <p>
                                These languages not only offer high salaries but also strong job security and growth potential. 
                                Each represents a different career path and specialization area.
                            </p>
                        </>
                    )}

                    {/* Default content for other categories */}
                    {!["Career Tools", "Interview Prep", "Skills"].includes(post.category) && (
                        <>
                            <h2>Industry Insights</h2>
                            <p>
                                The tech industry continues to evolve at a rapid pace, creating new opportunities and challenges for 
                                professionals at every career stage. Understanding these trends is crucial for making informed career decisions.
                            </p>
                            <h3>Key Takeaways</h3>
                            <p>
                                Our research and analysis provide actionable insights that can help you navigate your career path more effectively. 
                                Whether you&apos;re just starting out or looking to make a strategic move, these insights are designed to give you 
                                a competitive edge.
                            </p>
                            <blockquote>
                                &quot;Success in tech requires continuous learning and strategic career planning.&quot;
                            </blockquote>
                            <h3>Looking Ahead</h3>
                            <p>
                                The landscape will continue to change, but the fundamentals of building a strong career remain constant: 
                                continuous learning, networking, and delivering value in your role.
                            </p>
                        </>
                    )}
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16 pt-16 border-t border-border">
                        <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((related) => (
                                <PostCard key={related.id} post={related} />
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 pt-16 border-t border-border text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Career?</h3>
                    <p className="text-muted-foreground mb-6">
                        Join thousands of professionals who are already using CarrierX to land their dream jobs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/jobs">
                            <Button size="lg">Browse Jobs</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline" size="lg">Create Account</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}