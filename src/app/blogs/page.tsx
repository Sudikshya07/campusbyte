"use client";

import { useState } from "react";
import { TrendingUp, Mail, BookOpen } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import PostCard from "@/components/blog/PostCard";
import { posts } from "@/data/blog-posts";

const categories = ["All", "Interview Prep", "Career Tools", "Skills", "Company News", "Career Growth", "Work Culture", "Startups"];

export default function BlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const featuredPosts = posts.filter((p) => p.featured);
    const latestPosts = posts.filter((p) => !p.featured);
    const filteredPosts = selectedCategory === "All" 
        ? posts 
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="py-20 px-4 bg-muted/20 border-b border-border">
                <div className="container mx-auto max-w-6xl text-center">
                    <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                        <BookOpen size={14} className="mr-2" /> CampusByte Resources
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Accelerate Your <span className="text-primary italic font-serif">Career.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Expert guides, industry insights, and preparation roadmaps to fast-track your tech career.
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat
                                        ? "bg-foreground text-background"
                                        : "bg-card border border-border text-muted-foreground hover:border-foreground/50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Featured Posts */}
                {selectedCategory === "All" && featuredPosts.length > 0 && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {featuredPosts.map((post) => (
                            <PostCard key={post.id} post={post} variant="featured" />
                        ))}
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">
                                {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {(selectedCategory === "All" ? latestPosts : filteredPosts).map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Trending Section */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Trending Now
                            </h3>
                            <div className="space-y-6">
                                {posts.slice(0, 5).map((post) => (
                                    <PostCard key={`trending-${post.id}`} post={post} variant="compact" />
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                            <Mail className="w-8 h-8 mx-auto text-primary mb-4" />
                            <h3 className="text-lg font-bold mb-2">Subscribe to CampusByte</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get the latest career insights and job opportunities delivered to your inbox.
                            </p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <Button className="w-full">
                                Subscribe
                            </Button>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <a href="/jobs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → Browse Jobs
                                </a>
                                <a href="/hackathons" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → Upcoming Hackathons
                                </a>
                                <a href="/companies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → Company Directory
                                </a>
                                <a href="/profile" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → My Applications
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}