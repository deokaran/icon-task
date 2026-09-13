"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
    id: number;
    x: number;
    y: number;
    tx: number;
    ty: number;
    size: number;
};

export default function Participate() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const targetX = useRef(0);
    const targetY = useRef(0);

    const currentX = useRef(0);
    const currentY = useRef(0);

    const frame = useRef<number | null>(null);

    const [showCursor, setShowCursor] = useState(false);
    const [destroying, setDestroying] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const move = (event: MouseEvent) => {
            targetX.current = event.clientX;
            targetY.current = event.clientY;

            // Since the follower is pointer-events-none, this always
            // reflects real hover state on the section beneath it.
            const rect = sectionRef.current?.getBoundingClientRect();
            if (rect) {
                const inside =
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom;
                setShowCursor(inside);
            }
        };

        window.addEventListener("mousemove", move);

        const animate = () => {
            currentX.current +=
                (targetX.current - currentX.current) * 0.15;

            currentY.current +=
                (targetY.current - currentY.current) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${currentX.current}px`;
                cursorRef.current.style.top = `${currentY.current}px`;
            }

            frame.current = requestAnimationFrame(animate);
        };

        frame.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", move);

            if (frame.current !== null) {
                cancelAnimationFrame(frame.current);
            }
        };
    }, []);

    const createDust = () => {
        const newParticles: Particle[] = [];

        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 100;

            newParticles.push({
                id: Date.now() + i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                tx: Math.cos(angle) * distance,
                ty: Math.sin(angle) * distance,
                size: 1 + Math.random() * 4,
            });
        }

        setParticles(newParticles);
    };

    const handleCancelEnter = () => {
        setDestroying(true);
        createDust();
    };

    const handleCancelLeave = () => {
        setDestroying(false);

        setTimeout(() => {
            setParticles([]);
        }, 700);
    };

    const handleOrderClick = () => {
        alert("Order button clicked!");
    };

    const handleNoClick = (event: React.MouseEvent) => {
        // Stop this click from also counting as a "Participate" click
        // on the section behind it.
        event.stopPropagation();
    };

    return (
        <main className="relative min-h-[600px] overflow-hidden bg-black text-white ">
            <section
                ref={sectionRef}
                onClick={() => showCursor && handleOrderClick()}
                className="flex min-h-[600px] items-center justify-center"
            >
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold">
                        Are you Ready to
                        <br />
                        Participate In
                        <br />
                        ICON 26
                    </h1>

                    <div className="relative mt-12 h-[60px] w-[200px]">


                        <div className="pointer-events-none absolute -inset-10">
                            {particles.map((particle) => (
                                <span
                                    key={particle.id}
                                    className="dust"
                                    style={{
                                        left: `${particle.x}%`,
                                        top: `${particle.y}%`,
                                        width: `${particle.size}px`,
                                        height: `${particle.size}px`,
                                        transform: "translate(0, 0)",
                                        animation:
                                            "dust 700ms ease-out forwards",
                                        ["--tx" as string]: `${particle.tx}px`,
                                        ["--ty" as string]: `${particle.ty}px`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div
                ref={cursorRef}
                className={`
                    pointer-events-none
                    fixed
                    z-50
                    h-0
                    w-0
                    transition-opacity
                    duration-300
                    ${showCursor ? "opacity-100" : "opacity-0"}
                `}
            >
                <div
                    className={`
                        pointer-events-none
                        absolute
                        left-0
                        top-0
                        flex
                        h-[110px]
                        w-[110px]
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-sm
                        font-bold
                        text-black
                        shadow-2xl
                        transition-transform
                        duration-500
                        ease-out
                        ${destroying
                            ? "scale-125 bg-orange-500 text-white"
                            : "scale-100"
                        }
                    `}
                >
                    Participate
                </div>
            </div>
        </main>
    );
}