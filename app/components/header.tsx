"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#landing" },
        { name: "About", href: "#about" },
        { name: "Events", href: "#participate" },
        { name: "Codeicon 6.0", href: "#footer" },
        { name: "Sponsors", href: "#footer" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? " py-3 backdrop-blur-sm"
                        : "bg-transparent  border-b border-white/5 py-5"
                    }`}
            >
                <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center md:justify-center justify-end">
                    <img
                        src="/KJSIMlogo.png"
                        alt=""
                        className="max-w-[250px] absolute left-25"
                    />

                    <nav className={`hidden md:flex items-center gap-1 rounded-full px-4 py-1.5  border border-white/10 backdrop-blur-md${isScrolled
                            ? " bg-[#030712]/80  "
                            : " "
                        }`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="px-4 py-1.5 text-sm font-medium text-zinc-300 hover:text-cyan-300 rounded-full hover:bg-white/5 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-3/5 transition-all duration-300" />
                        </a>
                    ))}
                </nav>

                <button
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open navigation menu"
                    className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header >

            <div
                className={`fixed inset-0 z-[60] md:hidden overflow-hidden transition-opacity duration-300 ${mobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            >
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />

                <aside
                    className={`absolute right-0 top-0 h-full w-[80%] max-w-[350px] bg-black/10 border-l border-white/10 backdrop-blur-2xl p-6 transition-transform duration-300 ease-out
                        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <img
                        src="/KJSIMlogo.png"
                        alt=""
                        className="max-w-[250px] absolute left-0"
                    />
                    <div className="flex justify-end mb-12">
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-4 rounded-xl text-lg font-medium text-zinc-300 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </aside>
            </div>
        </>
    );
}