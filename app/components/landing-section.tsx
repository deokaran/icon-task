"use client";
import gsap from "gsap";
import Cursor from "./cursor";

export default function Landing() {
    return (<>
        <Cursor />
        <div className="w-full h-[90vh] flex items-center justify-center ">
           
            <h1 className="font-['Orbitron'] font-black tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500/80 drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]" id="icon-title"
            onMouseEnter={() => { gsap.to("#cursor", { scale: 5, duration: 0.3 }) }}
            onMouseLeave={()=>{gsap.to("#cursor",{scale:1,duration:0.3})}}
            >
                ICON 26
            </h1>
        </div>

        
    </>
    );
}
