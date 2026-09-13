"use client";

import React, { useEffect, useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function Broucher() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const response = await fetch("/api/brochure", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send brochure");
            }

            setStatus({
                type: "success",
                message: data.message || "Brochure sent to your email successfully!",
            });
            setEmail("");
            setTimeout(() => {
                 setStatus({ type: null, message: "" });
            }, 15000);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong";
            setStatus({
                type: "error",
                message: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <section id="brochure" className="flex items-center justify-center flex-col my-16 px-4">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Orbitron'] text-center mb-2 text-zinc-900 ">
                Brochure
            </h3>
            <p className="mb-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 text-center max-w-md">
                Want to know more about the events and schedule?
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative w-full">
                   
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="Enter your email address"
                        className="w-full rounded-xl border border-neutral-800 bg-white pl-6 pr-4 py-3.5 text-black outline-none transition focus:border-cyan-500 disabled:opacity-60 shadow-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-sm transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <span>Get Brochure</span>
                            <Send className="w-3.5 h-3.5" />
                        </>
                    )}
                </button>
            </form>

            {/* Status Messages */}
            {status.type && (
                <div
                    className={`mt-4 w-full max-w-md p-3.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium transition-all ${
                        status.type === "success"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
                    }`}
                >
                    {status.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                        <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{status.message}</span>
                </div>
            )}
        </section>
    );
}
