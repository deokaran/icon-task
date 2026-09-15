"use client";
import gsap from "gsap"
import { useEffect } from "react"

export default function Cursor() {

    const cursorSize=30;

    useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;

        gsap.to("#cursor", {
            x: clientX-cursorSize/2,
            y: clientY-cursorSize/2
        });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
    };
}, []);




    return <>
        <div id="cursor" className="bg-[radial-gradient(circle,white_30%,black_100%)] fixed top-0 left-0 z-110 rounded-full pointer-events-none mix-blend-difference hidden md:block"  style={{
                width: cursorSize,
                height: cursorSize
            }}
        ></div>
    </>
}