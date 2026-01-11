import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { Clock, User } from "lucide-react";

export function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        return notFound();
    }

    // Find related posts (same category, excluding current)
    const relatedPosts = posts
        .filter((p) => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
                >
                    ← Back to Home
                </Link>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm font-medium text-primary">{post.category}</span>

                <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>

            <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                    {post.excerpt}
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h2>The State of Tech in 2026</h2>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <blockquote>
                    &quot;Technology is best when it brings people together.&quot;
                </blockquote>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <h3>Looking Ahead</h3>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="mt-16 pt-16 border-t border-border">
                    <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map((related) => (
                            <Link key={related.id} href={`/p/${related.slug}`} className="group block">
                                <div className="relative aspect-video mb-3 rounded-lg overflow-hidden">
                                    <Image
                                        src={related.imageUrl}
                                        alt={related.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h4 className="font-bold leading-snug group-hover:text-primary transition-colors">
                                    {related.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
