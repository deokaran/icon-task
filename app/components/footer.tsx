"use client";

export default function Footer() {
    const scrollToSection = (target: string) => {
        if (target === "home" || target === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const element = document.getElementById(target);
        if (element) {
            const navOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <footer id="footer" className="bg-[#b7202e] text-white/70">
            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-3 pt-10">
                <div className="col-span-1">
                    <img
                        src="/KJSIMlogo.png"
                        alt="Somaiya Logo"
                        className="max-w-[240px] sm:max-w-[280px] brightness-0 cursor-pointer"
                        onClick={() => scrollToSection("home")}
                    />
                    <h3 className="font-bold mt-4 text-white">
                        Host Department
                    </h3>
                    <p className="mt-2 text-sm">
                        Department of Data Science and Technology<br />
                        K J Somaiya Institute of Management<br />
                        Somaiya Vidyavihar University
                    </p>
                </div>
                <div className="col-span-1">
                    <h3 className="font-bold text-white">
                        Quick Links
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm">
                        <li>
                            <button
                                type="button"
                                onClick={() => scrollToSection("home")}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => scrollToSection("events")}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Events
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => scrollToSection("about")}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => scrollToSection("register")}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Register
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => scrollToSection("location")}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Location
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={() => scrollToSection("brochure")}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Brochure
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h3 className="font-bold text-white">
                        Contact Us
                    </h3>
                    <p className="mt-2 text-sm">
                        Ajil George:{" "}
                        <a href="tel:+918828279724" className="hover:text-white transition-colors">
                            +91-8828279724
                        </a>
                    </p>
                    <p className="text-sm mt-1">
                        Abin Cheruvathoor:{" "}
                        <a href="tel:+918355868197" className="hover:text-white transition-colors">
                            +91-8355868197
                        </a>
                    </p>
                    <p className="text-sm mt-1">
                        Email:{" "}
                        <a href="mailto:icon.simsr@somaiya.edu" className="hover:text-white transition-colors">
                            icon.simsr@somaiya.edu
                        </a>
                    </p>
                </div>
            </div>

            <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-auto max-w-6xl px-4 lower-footer my-5 pt-5 border-t border-white/20">
                <p className="text-xs text-center">
                    © Copyright ICON. All Rights Reserved
                </p>
            </div>
        </footer>
    );
}