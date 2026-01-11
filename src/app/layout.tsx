import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
    title: {
        default: "CarrierX - Career Development Portal",
        template: "%s | CarrierX",
    },
    description: "Find jobs, internships, hackathons, and preparation guides. Your one-stop career development platform.",
    keywords: ["jobs", "internships", "hackathons", "career", "placement", "interview prep"],
    authors: [{ name: "CarrierX" }],
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://carrierx.com",
        siteName: "CarrierX",
        title: "CarrierX - Career Development Portal",
        description: "Find jobs, internships, hackathons, and preparation guides.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "CarrierX",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CarrierX - Career Development Portal",
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
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(
                "min-h-screen flex flex-col bg-background font-sans antialiased",
                inter.variable,
                playfair.variable
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Noise />
                    <Cursor />
                    <Navbar />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
