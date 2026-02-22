import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk, Outfit, Syne } from "next/font/google";
import "@/styles/globals.css";
import { Navbar, Footer } from "@/components/shared";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Noise } from "@/components/ui/Noise";
import { Cursor } from "@/components/ui/Cursor";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

// Geometric, techy sans-serif - great for headings
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
    display: "swap",
});

// Modern rounded sans - friendly and clean
const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

// Bold display font - perfect for hero text
const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "CampusByte - Career Development Portal",
        template: "%s | CampusByte",
    },
    description: "Find jobs, internships, hackathons, and preparation guides. Your one-stop career development platform.",
    keywords: ["jobs", "internships", "hackathons", "career", "placement", "interview prep"],
    authors: [{ name: "CampusByte" }],
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://campusbyte.com",
        siteName: "CampusByte",
        title: "CampusByte - Career Development Portal",
        description: "Find jobs, internships, hackathons, and preparation guides.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "CampusByte",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CampusByte - Career Development Portal",
        description: "Find jobs, internships, hackathons, and preparation guides.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(
                "min-h-screen flex flex-col bg-background font-sans antialiased",
                inter.variable,
                playfair.variable,
                spaceGrotesk.variable,
                outfit.variable,
                syne.variable
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Noise />
                    <Cursor />
                    {!isMaintenanceMode && <Navbar />}
                    <main className="flex-1">
                        {children}
                    </main>
                    {!isMaintenanceMode && <Footer />}
                </ThemeProvider>
            </body>
        </html>
    );
}
