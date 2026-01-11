export interface Post {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    imageUrl: string;
    slug: string;
    featured?: boolean;
}

export const posts: Post[] = [
    {
        id: "1",
        title: "I Tested 20+ AI Tools, These Are the 8 Best AI Detectors That Actually Work in 2026",
        excerpt: "With AI-generated content flooding the web, distinguishing between human and machine-written text is harder than ever. We put the top AI detectors to the test.",
        category: "AI",
        author: "Satym",
        date: "Jan 06, 2026",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
        slug: "best-ai-detectors-2026",
        featured: true,
    },
    {
        id: "2",
        title: "Fallout Season 2 Cast: All New and Recurring Characters",
        excerpt: "The wasteland is calling again. Here's everything we know about the cast of Fallout Season 2, including new faces and returning favorites.",
        category: "Entertainment",
        author: "Zyrex Team",
        date: "Jan 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
        slug: "fallout-season-2-cast",
        featured: true,
    },
    {
        id: "3",
        title: "Elon Musk Finally Breaks Silence on Grok AI Image Generation",
        excerpt: "X's Grok AI has been generating controversial images. Elon Musk has finally stepped in to address the situation and upcoming guardrails.",
        category: "News",
        author: "Tech Desk",
        date: "Jan 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000",
        slug: "elon-musk-grok-ai-images",
    },
    {
        id: "4",
        title: "Best Gaming Laptops Under $1500 (2026 Edition)",
        excerpt: "You don't need to break the bank for high-end gaming. These laptops offer the best performance-to-price ratio in 2026.",
        category: "Hardware",
        author: "Review Team",
        date: "Jan 04, 2026",
        imageUrl: "https://images.unsplash.com/photo-1603481546502-39d9331f9cea?auto=format&fit=crop&q=80&w=1000",
        slug: "best-gaming-laptops-2026",
    },
    {
        id: "5",
        title: "How to Install Android 16 Developer Preview on Your Pixel",
        excerpt: "Google has surprise-dropped the first developer preview of Android 16. Here is a step-by-step guide on how to get it running on your Pixel device.",
        category: "How To",
        author: "Android Guy",
        date: "Jan 03, 2026",
        imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=1000",
        slug: "install-android-16-developer-preview",
    },
    {
        id: "6",
        title: "Jujutsu Kaisen Season 3: Everything We Know So Far",
        excerpt: "The Culling Game arc is coming. Here is the release window, plot details, and trailer breakdown for JJK Season 3.",
        category: "Anime",
        author: "Otaku Corner",
        date: "Jan 02, 2026",
        imageUrl: "https://images.unsplash.com/photo-1628155930542-46a502e61695?auto=format&fit=crop&q=80&w=1000",
        slug: "jujutsu-kaisen-season-3",
    },
];
