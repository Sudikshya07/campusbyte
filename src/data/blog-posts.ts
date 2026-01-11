// Blog posts data for CarrierX
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
    readTime?: string;
}

export const posts: Post[] = [
    {
        id: "1",
        title: "I Tested 20+ AI Tools for Resume Building, These Are the 8 Best That Actually Work in 2026",
        excerpt: "With AI revolutionizing job applications, finding the right tools to craft your resume is crucial. We tested the top AI resume builders to find the ones that actually get you interviews.",
        category: "Career Tools",
        author: "Sarah Chen",
        date: "Jan 06, 2026",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1000",
        slug: "best-ai-resume-builders-2026",
        featured: true,
        readTime: "12 min"
    },
    {
        id: "2",
        title: "FAANG Interview Process: Complete Guide for 2026",
        excerpt: "Everything you need to know about landing a job at Facebook, Apple, Amazon, Netflix, and Google. From application to offer letter.",
        category: "Interview Prep",
        author: "Alex Kumar",
        date: "Jan 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=1000",
        slug: "faang-interview-guide-2026",
        featured: true,
        readTime: "18 min"
    },
    {
        id: "3",
        title: "Elon Musk's Latest Hiring Strategy at Tesla and SpaceX",
        excerpt: "Tesla and SpaceX have revolutionized their hiring process. Here's what candidates need to know about the new interview formats and requirements.",
        category: "Company News",
        author: "Tech Insider",
        date: "Jan 05, 2026",
        imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3619?auto=format&fit=crop&q=80&w=1000",
        slug: "tesla-spacex-hiring-strategy-2026",
        readTime: "8 min"
    },
    {
        id: "4",
        title: "Best Programming Languages to Learn for High-Paying Jobs in 2026",
        excerpt: "The tech landscape is evolving rapidly. These programming languages offer the highest salary potential and job security in 2026.",
        category: "Skills",
        author: "Dev Career Guide",
        date: "Jan 04, 2026",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        slug: "best-programming-languages-2026",
        readTime: "10 min"
    },
    {
        id: "5",
        title: "How to Negotiate Your Salary: A Complete Guide for Tech Professionals",
        excerpt: "Salary negotiation can increase your earnings by 20-30%. Here's a step-by-step guide to negotiating like a pro in the tech industry.",
        category: "Career Growth",
        author: "Salary Expert",
        date: "Jan 03, 2026",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000",
        slug: "salary-negotiation-guide-tech",
        readTime: "15 min"
    },
    {
        id: "6",
        title: "Remote Work vs Office: What Tech Companies Are Choosing in 2026",
        excerpt: "The remote work debate continues. Here's what major tech companies are deciding and how it affects your career prospects.",
        category: "Work Culture",
        author: "Future of Work",
        date: "Jan 02, 2026",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
        slug: "remote-work-vs-office-2026",
        readTime: "7 min"
    },
    {
        id: "7",
        title: "System Design Interview: Complete Preparation Roadmap",
        excerpt: "Master system design interviews with this comprehensive roadmap. From basics to advanced concepts, everything you need to know.",
        category: "Interview Prep",
        author: "System Design Pro",
        date: "Jan 01, 2026",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
        slug: "system-design-interview-roadmap",
        readTime: "20 min"
    },
    {
        id: "8",
        title: "Top 10 Startups to Watch in 2026: Career Opportunities",
        excerpt: "These startups are poised for explosive growth in 2026. Get in early and accelerate your career with these emerging companies.",
        category: "Startups",
        author: "Startup Scout",
        date: "Dec 30, 2025",
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000",
        slug: "top-startups-2026-careers",
        readTime: "12 min"
    }
];