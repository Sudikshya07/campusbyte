import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.upsert({
        where: { email: "admin@carrierx.com" },
        update: {},
        create: {
            email: "admin@carrierx.com",
            password: adminPassword,
            name: "Admin User",
            role: "ADMIN",
            skills: JSON.stringify(["Management", "Recruitment"]),
        },
    });
    console.log("✅ Created admin user:", admin.email);

    // Create test user
    const userPassword = await bcrypt.hash("user123", 10);
    const user = await prisma.user.upsert({
        where: { email: "student@example.com" },
        update: {},
        create: {
            email: "student@example.com",
            password: userPassword,
            name: "Test Student",
            role: "USER",
            skills: JSON.stringify(["React", "Node.js", "TypeScript", "Python"]),
        },
    });
    console.log("✅ Created test user:", user.email);

    // Create premium companies (IIT/NIT partners)
    const premiumCompanies = [
        { name: "Google", website: "https://careers.google.com", isPremium: true },
        { name: "Microsoft", website: "https://careers.microsoft.com", isPremium: true },
        { name: "Amazon", website: "https://amazon.jobs", isPremium: true },
        { name: "Meta", website: "https://metacareers.com", isPremium: true },
    ];

    const createdCompanies = [];
    for (const company of premiumCompanies) {
        const created = await prisma.company.upsert({
            where: { id: company.name.toLowerCase() },
            update: {},
            create: {
                name: company.name,
                website: company.website,
                isPremium: company.isPremium,
                description: `${company.name} is a leading technology company.`,
            },
        });
        createdCompanies.push(created);
    }
    console.log("✅ Created", createdCompanies.length, "companies");

    // Create non-premium company
    const startup = await prisma.company.create({
        data: {
            name: "TechStartup XYZ",
            website: "https://startup.xyz",
            isPremium: false,
            description: "An innovative startup building the future of tech.",
        },
    });
    console.log("✅ Created startup company");

    // Create sample jobs
    const google = createdCompanies.find((c) => c.name === "Google");
    const microsoft = createdCompanies.find((c) => c.name === "Microsoft");

    const jobs = [
        {
            companyId: google!.id,
            title: "Software Engineer Intern",
            type: "INTERNSHIP" as const,
            location: "Bangalore, India",
            stipend: 80000,
            duration: "6 months",
            techStack: JSON.stringify(["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"]),
            prepGuide: `## How to Crack This Role

### Technical Preparation
- Focus on **Arrays, Strings, Trees, Graphs**
- Practice LeetCode Medium problems (Blind 75)
- Study system design basics

### Behavioral Questions
- Prepare STAR format answers
- Research Google's culture

### Timeline
- Week 1-2: DSA fundamentals
- Week 3-4: Practice problems
- Week 5: System design
- Week 6: Mock interviews`,
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            isPPO: true,
            isInternalApply: true,
        },
        {
            companyId: microsoft!.id,
            title: "Backend Developer",
            type: "FULL_TIME" as const,
            location: "Hyderabad, India",
            stipend: 150000,
            duration: "Full-time",
            techStack: JSON.stringify(["C#", ".NET", "Azure", "SQL Server", "Kubernetes"]),
            prepGuide: `## Preparation Guide

### Technical Focus
- Strong OOP concepts
- System design for scale
- Cloud architecture (Azure preferred)

### Interview Process
1. Online Assessment
2. Technical Phone Screen
3. Virtual Onsite (4 rounds)`,
            deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
            isPPO: false,
            isInternalApply: false,
            applyLink: "https://careers.microsoft.com",
        },
        {
            companyId: startup.id,
            title: "Full Stack Developer",
            type: "INTERNSHIP" as const,
            location: "Remote",
            stipend: 40000,
            duration: "3 months",
            techStack: JSON.stringify(["Next.js", "Tailwind CSS", "PostgreSQL"]),
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            isPPO: false,
            isInternalApply: true,
        },
    ];

    for (const job of jobs) {
        await prisma.job.create({ data: job });
    }
    console.log("✅ Created", jobs.length, "jobs");

    // Create sample hackathon
    await prisma.event.create({
        data: {
            companyId: google!.id,
            title: "Google Code Jam 2024",
            type: "HACKATHON",
            description: "The ultimate coding competition for programmers around the world.",
            rounds: JSON.stringify([
                {
                    id: "r1",
                    name: "Qualification",
                    description: "Online coding round - 27 hours",
                    startDate: new Date("2024-04-01").toISOString(),
                    endDate: new Date("2024-04-02").toISOString(),
                    mode: "ONLINE",
                    isActive: true,
                },
                {
                    id: "r2",
                    name: "Round 1",
                    description: "Top 1500 qualifiers advance",
                    startDate: new Date("2024-04-15").toISOString(),
                    endDate: new Date("2024-04-15").toISOString(),
                    mode: "ONLINE",
                },
                {
                    id: "r3",
                    name: "Finals",
                    description: "Top 25 compete live",
                    startDate: new Date("2024-05-01").toISOString(),
                    endDate: new Date("2024-05-01").toISOString(),
                    mode: "OFFLINE",
                },
            ]),
            teamSizeMin: 1,
            teamSizeMax: 1,
            prizePool: "$15,000",
            deadline: new Date("2024-03-25"),
        },
    });
    console.log("✅ Created sample hackathon");

    // Create sample blogs from our blog posts data
    const blogPosts = [
        {
            title: "I Tested 20+ AI Tools for Resume Building, These Are the 8 Best That Actually Work in 2026",
            slug: "best-ai-resume-builders-2026",
            content: `# The AI Revolution in Resume Building

The job market has fundamentally changed. With over 75% of resumes being screened by AI systems before reaching human eyes, traditional resume writing approaches are no longer sufficient.

## Our Testing Methodology

We evaluated each tool based on five key criteria: ATS compatibility, content quality, design flexibility, pricing, and success rate.

## Top 8 AI Resume Builders That Actually Work

After extensive testing, these tools consistently delivered results. Each offers unique strengths depending on your career stage and industry focus.`,
            excerpt: "With AI revolutionizing job applications, finding the right tools to craft your resume is crucial. We tested the top AI resume builders to find the ones that actually get you interviews.",
            tags: JSON.stringify(["career", "ai", "resume", "tools"]),
            authorId: admin.id,
            publishedAt: new Date("2026-01-06"),
        },
        {
            title: "FAANG Interview Process: Complete Guide for 2026",
            slug: "faang-interview-guide-2026",
            content: `# The FAANG Interview Landscape in 2026

Landing a job at Facebook (Meta), Apple, Amazon, Netflix, or Google remains one of the most coveted achievements in tech.

## What's Changed in 2026

The traditional algorithm-heavy interviews are giving way to more practical assessments. Companies now focus on your ability to build scalable systems, work in teams, and adapt to changing requirements.

## The Complete Preparation Timeline

Based on data from 500+ successful candidates, here's the optimal preparation strategy for each company.`,
            excerpt: "Everything you need to know about landing a job at Facebook, Apple, Amazon, Netflix, and Google. From application to offer letter.",
            tags: JSON.stringify(["interview", "faang", "preparation", "career"]),
            authorId: admin.id,
            publishedAt: new Date("2026-01-05"),
        },
        {
            title: "Best Programming Languages to Learn for High-Paying Jobs in 2026",
            slug: "best-programming-languages-2026",
            content: `# The Programming Language Salary Report 2026

Our analysis of 50,000+ job postings and salary data reveals which programming languages command the highest compensation.

## Methodology

We analyzed job postings from major tech companies, startups, and traditional enterprises across North America, Europe, and Asia.

## The Top 8 Languages for 2026

These languages not only offer high salaries but also strong job security and growth potential.`,
            excerpt: "The tech landscape is evolving rapidly. These programming languages offer the highest salary potential and job security in 2026.",
            tags: JSON.stringify(["programming", "skills", "salary", "career"]),
            authorId: admin.id,
            publishedAt: new Date("2026-01-04"),
        }
    ];

    for (const blogPost of blogPosts) {
        await prisma.blog.create({ data: blogPost });
    }
    console.log("✅ Created", blogPosts.length, "blog posts");

    console.log("🎉 Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
