"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const navLinks = [
        { name: "Home", target: "home" },
        { name: "Events", target: "events" },
        { name: "About", target: "about" },
        { name: "Register", target: "register" },
        { name: "Location", target: "location" },
        { name: "Brochure", target: "brochure" },
    ];

    const scrollToSection = (target: string) => {
        setMobileMenuOpen(false);

        if (target === "home" || target === "top") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            return;
        }

        const element = document.getElementById(target);
        if (element) {
            const navOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Determine active section based on scroll position
            const sections = ["brochure", "location", "register", "about", "events"];
            const scrollPos = window.scrollY + 120;

            let current = "home";
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element && element.offsetTop <= scrollPos) {
                    current = sectionId;
                    break;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "py-3 backdrop-blur-sm"
                        : "bg-transparent border-b border-white/5 py-5"
                }`}
            >
                <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center md:justify-center justify-end">
                    <button
                        type="button"
                        onClick={() => scrollToSection("home")}
                        aria-label="Scroll to home"
                        className="cursor-pointer absolute left-4 sm:left-6 md:left-12 lg:left-20 xl:left-25 focus:outline-none"
                    >
                        <img
                            src="/KJSIMlogo.png"
                            alt="Somaiya Logo"
                            className="max-w-[160px] sm:max-w-[200px] md:max-w-[240px]"
                        />
                    </button>

                    <nav
                        className={`hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 border border-white/10 backdrop-blur-md ${
                            isScrolled ? "bg-[#030712]/80" : "bg-white/[0.03]"
                        }`}
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                type="button"
                                onClick={() => scrollToSection(link.target)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-full hover:bg-white/5 transition-colors relative group cursor-pointer ${
                                    activeSection === link.target
                                        ? "text-cyan-300 font-semibold"
                                        : "text-zinc-300 hover:text-cyan-300"
                                }`}
                            >
                                {link.name}
                                <span
                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                                        activeSection === link.target
                                            ? "w-3/5"
                                            : "w-0 group-hover:w-3/5"
                                    }`}
                                />
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open navigation menu"
                        className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-[60] md:hidden overflow-hidden transition-opacity duration-300 ${
                    mobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />

                <aside
                    className={`absolute right-0 top-0 h-full w-[80%] max-w-[350px] bg-black/80 border-l border-white/10 backdrop-blur-2xl p-6 transition-transform duration-300 ease-out ${
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <button
                            type="button"
                            onClick={() => scrollToSection("home")}
                            className="cursor-pointer"
                        >
                            <img
                                src="/KJSIMlogo.png"
                                alt="Somaiya Logo"
                                className="max-w-[160px]"
                            />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-1.5">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                type="button"
                                onClick={() => scrollToSection(link.target)}
                                className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                                    activeSection === link.target
                                        ? "text-cyan-300 bg-white/10 font-semibold"
                                        : "text-zinc-300 hover:text-cyan-300 hover:bg-white/5"
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>
                </aside>
            </div>
        </>
    );
}