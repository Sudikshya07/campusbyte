import Link from "next/link";
import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    product: [
        { href: "/jobs", label: "Jobs" },
        { href: "/jobs?type=internship", label: "Internships" },
        { href: "/hackathons", label: "Hackathons" },
        { href: "/companies", label: "Companies" },
    ],
    resources: [
        { href: "/blogs", label: "Blog" },
        { href: "/blogs?tag=interview", label: "Interview Prep" },
        { href: "/blogs?tag=resume", label: "Resume Tips" },
        { href: "/blogs?tag=dsa", label: "DSA Guide" },
    ],
    company: [
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
    ],
};

const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                            <div className="bg-primary text-white p-1.5 rounded-lg">
                                <Rocket size={20} />
                            </div>
                            <span>CampusByte</span>
                        </Link>
                        <p className="text-sm text-slate-400 mb-4">
                            Your one-stop destination for jobs, internships, hackathons, and career resources.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} CampusByte. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-500">
                        Made with ❤️ for students and developers
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
