"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
    Code2,
    Sparkles,
    Gamepad2,
    X,
    Calendar,
    Trophy,
    Ticket,
    Users,
    ArrowRight,
    MapPin,
} from "lucide-react";

interface EventCard {
    title: string;
    subtitle?: string;
    image: string;
    date: string;
    registration?: string;
    prize?: string;
    teamSize?: string;
    venue?: string;
}

interface EventCategory {
    id: string;
    name: string;
    tagline: string;
    icon: typeof Code2;
    coverImage: string;
    accentColor: string;
    borderAccent: string;
    glowColor: string;
    badgeBg: string;
    cards: EventCard[];
}

const eventCategories: EventCategory[] = [
    {
        id: "technical",
        name: "Technical Events",
        tagline: "Hackathon & Problem Solving",
        icon: Code2,
        coverImage: "/events/Icon_Hackathon.jpeg",
        accentColor: "from-cyan-500/20 to-blue-500/20",
        borderAccent: "border-cyan-500/40 hover:border-cyan-400",
        glowColor: "group-hover:shadow-[0_10px_35px_rgba(6,182,212,0.25)]",
        badgeBg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30",
        cards: [
            {
                title: "CodeIcon",
                subtitle: "Hackathon",
                image: "/events/Icon_Hackathon.jpeg",
                date: "13 Feb 2026",
                registration: "₹500",
                prize: "₹15K / ₹5K / ₹2.5K",
                teamSize: "2 - 4",
                venue: "K J Somaiya Institute of Management",
            },
        ],
    },
    {
        id: "non-technical",
        name: "Non-Technical Events",
        tagline: "Treasure Hunt & Tech Fair",
        icon: Sparkles,
        coverImage: "/events/Icon_TreasureHunt.jpeg",
        accentColor: "from-purple-500/20 to-pink-500/20",
        borderAccent: "border-purple-500/40 hover:border-purple-400",
        glowColor: "group-hover:shadow-[0_10px_35px_rgba(168,85,247,0.25)]",
        badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30",
        cards: [
            {
                title: "Treasure Hunt",
                image: "/events/Icon_TreasureHunt.jpeg",
                date: "14 Feb 2026",
                registration: "₹250",
                prize: "₹2,000",
                teamSize: "3",
                venue: "K J Somaiya Campus",
            },
            {
                title: "Tech Fair",
                image: "/events/icon_techfair.png",
                date: "13 Feb 2026",
                venue: "Amphitheatre, KJSIM",
            },
        ],
    },
    {
        id: "gaming",
        name: "Gaming Events",
        tagline: "Sports, Esports & Chess",
        icon: Gamepad2,
        coverImage: "/events/football.jpeg",
        accentColor: "from-emerald-500/20 to-teal-500/20",
        borderAccent: "border-emerald-500/40 hover:border-emerald-400",
        glowColor: "group-hover:shadow-[0_10px_35px_rgba(16,185,129,0.25)]",
        badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
        cards: [
            {
                title: "Pickleball",
                image: "/events/pickleball.jpeg",
                date: "14 Feb 2026",
                registration: "₹200",
                prize: "₹2,000",
                venue: "Pickleball Court",
            },
            {
                title: "FIFA",
                image: "/events/fifa.jpeg",
                date: "14 Feb 2026",
                registration: "₹120",
                prize: "₹2,000",
                venue: "K J Somaiya Campus",
            },
            {
                title: "Football",
                image: "/events/football.jpeg",
                date: "13 Feb 2026",
                registration: "₹500",
                prize: "₹5,000",
                teamSize: "8",
                venue: "Football Ground",
            },
            {
                title: "Chess",
                image: "/events/Icon_chess.jpeg",
                date: "14 Feb 2026",
                registration: "₹100",
                prize: "₹1,000",
                venue: "K J Somaiya Campus",
            },
        ],
    },
];

export default function EventsSection() {
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState<EventCategory | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const openModal = (category: EventCategory) => {
        setActiveCategory(category);
        requestAnimationFrame(() => {
            setIsAnimating(true);
        });
    };

    const closeModal = useCallback(() => {
        setIsAnimating(false);
        setTimeout(() => {
            setActiveCategory(null);
        }, 220);
    }, []);

    // Prevent background page scrolling when modal is open
    useEffect(() => {
        if (!activeCategory) return;

        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalBodyPaddingRight = document.body.style.paddingRight;

        // Prevent layout shift by compensating for scrollbar width
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.body.style.paddingRight = originalBodyPaddingRight;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeCategory, closeModal]);

    return (
        <section id="events" className="w-full px-4 sm:px-6 lg:px-8 pb-12 pt-0">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold font-['Orbitron'] tracking-tight text-zinc-900 ">
                    ICON Events
                </h2>
    
            </div>

            {/* 3 Main Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {eventCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                        <div
                            key={category.id}
                            onClick={() => openModal(category)}
                            className={`group relative flex flex-col rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${category.glowColor}`}
                        >
                            {/* Card Header Info */}
                            <div className="p-5 pb-3 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white group-hover:text-cyan-500 transition-colors">
                                        <IconComponent className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold font-['Orbitron'] text-zinc-900 dark:text-white tracking-wide">
                                        {category.name}
                                    </h3>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${category.badgeBg}`}
                                >
                                    {category.cards.length}{" "}
                                    {category.cards.length === 1 ? "Event" : "Events"}
                                </span>
                            </div>

                            {/* Full Poster Image (Fully Visible, 4:5 Aspect Ratio) */}
                            <div className="px-5 py-2 flex-1">
                                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center shadow-inner">
                                    <img
                                        src={category.coverImage}
                                        alt={category.name}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                </div>
                            </div>

                            {/* Card Footer / Action */}
                            <div className="p-5 pt-3 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 mt-2 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                    {category.tagline}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                                    <span>View Events</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Micro-Transition Modal Dialog */}
            {mounted && activeCategory && createPortal(
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 overscroll-contain transition-all duration-300 ease-out ${
                        isAnimating
                            ? "bg-black/85 backdrop-blur-md opacity-100"
                            : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
                    }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                    onWheel={(e) => e.stopPropagation()}
                >
                    <div
                        className={`relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-950 border border-zinc-800 text-white shadow-2xl transition-all duration-300 ease-out ${
                            isAnimating
                                ? "scale-100 translate-y-0 opacity-100"
                                : "scale-95 translate-y-4 opacity-0"
                        }`}
                        role="dialog"
                        aria-modal="true"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sticky Modal Header */}
                        <div className="p-5 sm:p-6 border-b border-zinc-800/90 flex items-center justify-between shrink-0 bg-zinc-950/90 backdrop-blur-md rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
                                    {React.createElement(activeCategory.icon, {
                                        className: "w-6 h-6",
                                    })}
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold font-['Orbitron'] tracking-wide text-white">
                                        {activeCategory.name}
                                    </h3>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        {activeCategory.cards.length}{" "}
                                        {activeCategory.cards.length === 1
                                            ? "Competition"
                                            : "Competitions"}{" "}
                                        available
                                    </p>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close modal"
                                className="p-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Modal Body */}
                        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 overscroll-contain flex-1">
                            <div
                                className={`grid gap-6 ${
                                    activeCategory.cards.length === 1
                                        ? "grid-cols-1 max-w-sm mx-auto"
                                        : activeCategory.cards.length === 2
                                        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                }`}
                            >
                                {activeCategory.cards.map((card) => (
                                    <div
                                        key={card.title}
                                        className="flex flex-col rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/70 hover:border-zinc-700 transition-all duration-200 p-3.5"
                                    >
                                        {/* Fully Visible Poster Image (Aspect 4:5) */}
                                        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full h-full object-contain"
                                            />
                                            {card.subtitle && (
                                                <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                                                    {card.subtitle}
                                                </span>
                                            )}
                                        </div>

                                        {/* Minimal Content */}
                                        <div className="mt-3 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-base sm:text-lg font-bold font-['Orbitron'] text-white">
                                                    {card.title}
                                                </h4>

                                                {/* Minimal Badges */}
                                                <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-zinc-300">
                                                    {card.date && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60">
                                                            <Calendar className="w-3 h-3 text-zinc-400" />
                                                            {card.date}
                                                        </span>
                                                    )}

                                                    {card.registration && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60">
                                                            <Ticket className="w-3 h-3 text-cyan-400" />
                                                            Fee: {card.registration}
                                                        </span>
                                                    )}

                                                    {card.prize && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60">
                                                            <Trophy className="w-3 h-3 text-amber-400" />
                                                            Prize: {card.prize}
                                                        </span>
                                                    )}

                                                    {card.teamSize && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60">
                                                            <Users className="w-3 h-3 text-purple-400" />
                                                            Team: {card.teamSize}
                                                        </span>
                                                    )}

                                                    {card.venue && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700/60">
                                                            <MapPin className="w-3 h-3 text-zinc-400" />
                                                            {card.venue}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Minimal Register Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    closeModal();
                                                    const eventName =
                                                        card.title === "CodeIcon"
                                                            ? "CodeIcon (Hackathon)"
                                                            : card.title;
                                                    window.dispatchEvent(
                                                        new CustomEvent("select-event", {
                                                            detail: eventName,
                                                        })
                                                    );
                                                    setTimeout(() => {
                                                        const el = document.getElementById("register");
                                                        if (el) {
                                                            const navOffset = 80;
                                                            const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
                                                            window.scrollTo({ top: pos, behavior: "smooth" });
                                                        }
                                                    }, 250);
                                                }}
                                                className="mt-4 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-200 cursor-pointer"
                                            >
                                                Register
                                                <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}