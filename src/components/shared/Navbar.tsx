"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Rocket, Search, ChevronRight, LogOut, User, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { slideInRight, fadeIn } from "@/lib/animations";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
    { href: "/jobs?type=internship", label: "Internships" },
    { href: "/jobs", label: "Jobs" },
    { href: "/hackathons", label: "Hackathons" },
    { href: "/companies", label: "Companies" },
    { href: "/blogs", label: "Resources" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, loading, logout, isAuthenticated, isAdmin } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
                    <motion.div
                        className="bg-primary text-primary-foreground p-1.5 rounded-lg"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Rocket size={20} />
                    </motion.div>
                    <span className="text-foreground group-hover:text-primary transition-colors">CampusByte</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </motion.button>

                    <ThemeToggle />

                    <div className="h-6 w-px bg-border mx-2" />

                    {loading ? (
                        <div className="w-20 h-8 bg-muted animate-pulse rounded" />
                    ) : isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            {isAdmin && (
                                <Link href="/admin/jobs/create">
                                    <Button size="sm">
                                        Post Job
                                    </Button>
                                </Link>
                            )}
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2"
                                >
                                    <User size={16} />
                                    {user?.name || user?.email}
                                </Button>
                                {showUserMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
                                        <div className="p-2">
                                            <div className="px-2 py-1 text-sm text-muted-foreground">
                                                {user?.email}
                                            </div>
                                            <div className="border-t border-border my-1" />
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full flex items-center gap-2 px-2 py-1 text-sm hover:bg-muted rounded text-left"
                                            >
                                                <LogOut size={14} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-muted-foreground hover:bg-muted rounded-md touch-target"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu Sheet */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={fadeIn}
                            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />
                        {/* Sheet */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={slideInRight}
                            className="fixed top-0 right-0 h-full w-[280px] bg-background z-50 shadow-2xl md:hidden flex flex-col border-l border-border"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <span className="font-semibold text-foreground flex items-center gap-2">
                                    <Rocket size={18} className="text-primary" /> Menu
                                </span>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-muted-foreground hover:bg-muted rounded-md touch-target"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                            <nav className="p-4 flex flex-col gap-2 overflow-y-auto flex-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="flex items-center justify-between px-4 py-3 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                            <ChevronRight size={16} className="text-muted-foreground/50" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                            <div className="p-4 border-t border-border bg-muted/30">
                                <div className="flex flex-col gap-3">
                                    {loading ? (
                                        <div className="w-full h-10 bg-muted animate-pulse rounded" />
                                    ) : isAuthenticated ? (
                                        <>
                                            <div className="text-sm text-muted-foreground px-2">
                                                {user?.name || user?.email}
                                            </div>
                                            {isAdmin && (
                                                <Link href="/admin/jobs/create" onClick={() => setIsOpen(false)}>
                                                    <Button className="w-full justify-center">
                                                        Post Job
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button
                                                variant="outline"
                                                className="w-full justify-center"
                                                onClick={() => {
                                                    logout();
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                <Button variant="outline" className="w-full justify-center">
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link href="/register" onClick={() => setIsOpen(false)}>
                                                <Button className="w-full justify-center">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Search Bar (Desktop) */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hidden md:block absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex items-center gap-4 max-w-2xl mx-auto bg-muted/50 border border-input rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-ring focus-within:border-primary transition-all">
                                <Search size={22} className="text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, companies, hackathons..."
                                    className="flex-1 text-base bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
                                    autoFocus
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="px-2 py-1 text-xs font-medium text-muted-foreground bg-background border border-border rounded hover:text-foreground"
                                >
                                    ESC
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
