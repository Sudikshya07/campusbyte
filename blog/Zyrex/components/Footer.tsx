import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-muted/40">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                Zyrex
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Tech that matters. The latest news, reviews, and how-tos from the world of technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/news" className="hover:text-primary">News</Link></li>
                            <li><Link href="/reviews" className="hover:text-primary">Reviews</Link></li>
                            <li><Link href="/how-to" className="hover:text-primary">How To</Link></li>
                            <li><Link href="/lists" className="hover:text-primary">Lists</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border border-border">
                                <Twitter className="w-4 h-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border border-border">
                                <Instagram className="w-4 h-4" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="p-2 bg-background rounded-full hover:text-primary transition-colors border border-border">
                                <Github className="w-4 h-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Zyrex Media. All rights reserved.</p>
                    <p>Designed with next.js and tailwindcss</p>
                </div>
            </div>
        </footer>
    );
}
