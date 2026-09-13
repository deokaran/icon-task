"use client";

import { FormEvent, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const events = [
    "Business Quiz",
    "Case Study",
    "Marketing Challenge",
    "Finance Challenge",
    "Debate",
];

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        course: "",
        year: "",
        event: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/registrations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            setMessage("Registration successful!");

            setForm({
                name: "",
                email: "",
                phone: "",
                college: "",
                course: "",
                year: "",
                event: "",
            });
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
// ed1c24
    return (
        <main className="min-h-screen bg-[#b7202e] px-6 py-20  grid grid-cols-2">
           <div className="col-span-1">
             <DotLottieReact
      src="https://lottie.host/b552a67b-1498-443b-ad6d-7cc54300f0e4/XYuOLpXS3V.lottie"
      loop
      autoplay
    />
           </div>
            <div className="mx-auto max-w-2xl col-span-1">
                <div className="mb-10">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white">
                        ICON 26
                    </p>

                    <h1 className="text-5xl font-bold text-white">
                        Register
                    </h1>

                    <p className="mt-4 text-smoke text-white">
                        Register for your preferred ICON 26 event.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4 outline-none transition focus:border-white"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm text-neutral-300">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4 outline-none transition focus:border-white"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-neutral-300">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="9876543210"
                                className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4 outline-none transition focus:border-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                            College
                        </label>

                        <input
                            type="text"
                            name="college"
                            value={form.college}
                            onChange={handleChange}
                            required
                            placeholder="Enter your college"
                            className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4 outline-none transition focus:border-white"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm text-neutral-300">
                                Course
                            </label>

                            <input
                                type="text"
                                name="course"
                                value={form.course}
                                onChange={handleChange}
                                required
                                placeholder="BMS / BBA / MBA"
                                className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4 outline-none transition focus:border-white"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-neutral-300">
                                Year
                            </label>

                            <select
                                name="year"
                                value={form.year}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4 text-white outline-none transition focus:border-white"
                            >
                                <option value="">
                                    Select year
                                </option>
                                <option value="1st Year">
                                    1st Year
                                </option>
                                <option value="2nd Year">
                                    2nd Year
                                </option>
                                <option value="3rd Year">
                                    3rd Year
                                </option>
                                <option value="4th Year">
                                    4th Year
                                </option>
                                <option value="Postgraduate">
                                    Postgraduate
                                </option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-neutral-300">
                            Select Event
                        </label>

                        <select
                            name="event"
                            value={form.event}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-neutral-800 bg-white px-4 py-4  outline-none transition focus:border-white"
                        >
                            <option value="">
                                Choose an event
                            </option>

                            {events.map((event) => (
                                <option key={event} value={event}>
                                    {event}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-white px-6 py-4 font-bold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Registering..."
                            : "Register Now"}
                    </button>

                    {message && (
                        <p className="text-center text-sm text-neutral-300">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </main>
    );
}