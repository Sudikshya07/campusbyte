import { posts } from "../data/posts";
import PostCard from "../components/PostCard";
import { TrendingUp, Mail } from "lucide-react";

export default function Home() {
  const featuredPosts = posts.filter((p) => p.featured);
  const latestPosts = posts.slice(2); // Skip featured ones for now

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {featuredPosts.map((post) => (
          <PostCard key={post.id} post={post} variant="featured" />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">
              Latest News
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
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
              {posts.map((post) => (
                <PostCard key={`trending-${post.id}`} post={post} variant="compact" />
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <Mail className="w-8 h-8 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest tech news delivered straight to your inbox.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="w-full bg-primary text-primary-foreground font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
