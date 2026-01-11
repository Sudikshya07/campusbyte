// Types for the Career Development Portal

// User roles
export type UserRole = "USER" | "ADMIN" | "COMPANY";

// Job types
export type JobType = "INTERNSHIP" | "FULL_TIME" | "PART_TIME" | "CONTRACT";

// Event types
export type EventType = "HACKATHON" | "WORKSHOP" | "WEBINAR" | "COMPETITION";

// Application status
export type ApplicationStatus = "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "ACCEPTED";

// Blog post type
export interface BlogPost {
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

// User
export interface User {
    id: string;
    email: string;
    name?: string;
    role: UserRole;
    resumeUrl?: string;
    skills: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Company
export interface Company {
    id: string;
    name: string;
    logoUrl?: string;
    website?: string;
    description?: string;
    isPremium: boolean; // IIT/NIT premium flag
    createdAt: Date;
}

// Job
export interface Job {
    id: string;
    companyId: string;
    company?: Company;
    title: string;
    type: JobType;
    location: string;
    stipend: number;
    duration?: string;
    techStack: string[];
    prepGuide?: string; // Rich text/markdown
    deadline: Date;
    applyLink?: string;
    isInternalApply: boolean;
    isPPO: boolean;
    createdAt: Date;
}

// Event (Hackathon, etc.)
export interface Event {
    id: string;
    companyId: string;
    company?: Company;
    title: string;
    type: EventType;
    description?: string;
    rounds: EventRound[];
    teamSizeMin: number;
    teamSizeMax: number;
    prizePool?: string;
    deadline: Date;
    createdAt: Date;
}

export interface EventRound {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    mode: "ONLINE" | "OFFLINE" | "HYBRID";
    isActive?: boolean;
}

// Blog
export interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: string;
    tags: string[];
    authorId: string;
    publishedAt?: Date;
    createdAt: Date;
}

// Application
export interface Application {
    id: string;
    userId: string;
    jobId: string;
    user?: User;
    job?: Job;
    status: ApplicationStatus;
    answers?: Record<string, unknown>;
    submittedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Filter types
export interface JobFilters {
    type?: JobType[];
    skills?: string[];
    location?: string;
    isPremium?: boolean;
    isPPO?: boolean;
    minStipend?: number;
    maxStipend?: number;
}

// Form types for wizard
export interface CreateJobFormData {
    // Step 1: Entity
    companyId: string;
    isNewCompany: boolean;
    newCompany?: {
        name: string;
        logoUrl?: string;
        website?: string;
        isPremium: boolean;
    };

    // Step 2: Role
    title: string;
    location: string;
    stipend: number;
    duration: string;
    type: JobType;

    // Step 3: Requirements
    techStack: string[];
    experience: "FRESHER" | "0-1" | "1-3" | "3+";

    // Step 4: Prep Guide
    prepGuide: string;
    attachments?: string[];

    // Step 5: Application
    isInternalApply: boolean;
    applyLink?: string;
    isPPO: boolean;
    deadline: Date;
}