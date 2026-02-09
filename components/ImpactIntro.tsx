"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Oswald } from "next/font/google";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

export default function ImpactIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textSantoshRef = useRef<HTMLHeadingElement>(null);
    const textIsARef = useRef<HTMLSpanElement>(null);
    const textDesignerRef = useRef<HTMLHeadingElement>(null);
    const textWhoRef = useRef<HTMLDivElement>(null);
    const textExperiRef = useRef<HTMLDivElement>(null);
    const smokeCanvasRef = useRef<HTMLCanvasElement>(null);

    const innerWhoRef = useRef<HTMLSpanElement>(null);
    const innerCraftsRef = useRef<HTMLSpanElement>(null);
    const innerExperiRef = useRef<HTMLSpanElement>(null);
    const innerEnceRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Measure strict heights
            // We expect leading-none or leading-[0.8] to keep box tight to text
            const hSantosh = textSantoshRef.current?.offsetHeight || 0;
            const hIsA = textIsARef.current?.offsetHeight || 0;
            const hDesigner = textDesignerRef.current?.offsetHeight || 0;
            const hWho = textWhoRef.current?.offsetHeight || 0;
            const hExperi = textExperiRef.current?.offsetHeight || 0;

            const gap = 15; // 15px pixel gap (visual ~10px due to overshoot)

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=700%", // Extended from 400% to 700% (~2-3 extra scrolls)
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            // STAGE 0: Initial State (Static - No Flicker)
            gsap.set([textIsARef.current, textDesignerRef.current, textWhoRef.current, textExperiRef.current], { opacity: 0 });
            gsap.set(textSantoshRef.current, { opacity: 1, y: 0 });

            // STAGE 1: SANTOSH Moves UP -> IS A Enters
            const stack1_Santosh = -(hSantosh / 2 + hIsA / 2 + gap);
            tl.to(textSantoshRef.current, { y: stack1_Santosh, duration: 1 }, "stage1")
                .fromTo(textIsARef.current, { y: "20vh", opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "stage1");

            // STAGE 2: Stack Moves UP -> DESIGNER Enters
            const stack2_IsA = -(hIsA / 2 + hDesigner / 2 + gap);

            // Absolute stack: Santosh Top = IsA Top - (hIsA/2 + gap + hSantosh/2)
            // stack2_IsA is the new position of IsA relative to Center (0).
            const stack2_Santosh_Correct = stack2_IsA - (hIsA / 2 + gap + hSantosh / 2);

            tl.to(textSantoshRef.current, { y: stack2_Santosh_Correct, duration: 1 }, "stage2")
                .to(textIsARef.current, { y: stack2_IsA, duration: 1 }, "stage2")
                .fromTo(textDesignerRef.current, { x: "-100vw", opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "stage2");

            // STAGE 3: WHO CRAFTS Enters
            const stack3_Designer = -(hDesigner / 2 + hWho / 2 + gap);
            const stack3_IsA = stack3_Designer - (hDesigner / 2 + gap + hIsA / 2);
            const stack3_Santosh = stack3_IsA - (hIsA / 2 + gap + hSantosh / 2);

            tl.to(textSantoshRef.current, { y: stack3_Santosh, duration: 1 }, "stage3")
                .to(textIsARef.current, { y: stack3_IsA, duration: 1 }, "stage3")
                .to(textDesignerRef.current, { y: stack3_Designer, duration: 1 }, "stage3")
                .set(textWhoRef.current, { opacity: 1 }, "stage3")
                .fromTo(innerWhoRef.current, { x: "-100vw" }, { x: "0%", duration: 1 }, "stage3")
                .fromTo(innerCraftsRef.current, { x: "100vw" }, { x: "0%", duration: 1 }, "stage3");

            tl.to(containerRef.current, { x: [-5, 5, 0] as any, duration: 0.1 }, "stage3+=0.5");

            // STAGE 4: EXPERIENCES Enters
            const stack4_Who = -(hWho / 2 + hExperi / 2 + gap);
            const stack4_Designer = stack4_Who - (hWho / 2 + gap + hDesigner / 2);
            const stack4_IsA = stack4_Designer - (hDesigner / 2 + gap + hIsA / 2);
            const stack4_Santosh = stack4_IsA - (hIsA / 2 + gap + hSantosh / 2);

            tl.to(textSantoshRef.current, { y: stack4_Santosh, duration: 1 }, "stage4")
                .to(textIsARef.current, { y: stack4_IsA, duration: 1 }, "stage4")
                .to(textDesignerRef.current, { y: stack4_Designer, duration: 1 }, "stage4")
                .to(textWhoRef.current, { y: stack4_Who, duration: 1 }, "stage4")
                .set(textExperiRef.current, { opacity: 1 }, "stage4")
                .fromTo(innerExperiRef.current, { x: "-100vw" }, { x: "0%", duration: 1 }, "stage4")
                .fromTo(innerEnceRef.current, { x: "100vw" }, { x: "0%", duration: 1 }, "stage4")
                .call(() => triggerSmoke(smokeCanvasRef.current))
                // STAGE 5: HOLD (Pause for ~2-3 "Scrolls" duration)
                .to({}, { duration: 3 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const triggerSmoke = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let particles: any[] = [];
        const createPart = (x: number, y: number) => ({
            x, y,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            alpha: 1,
            size: Math.random() * 30 + 10
        });
        // Center the smoke: height / 2
        for (let i = 0; i < 80; i++) particles.push(createPart(canvas.width / 2, canvas.height / 2));

        const tick = () => {
            if (!particles.length) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                p.alpha -= 0.02; p.size *= 0.95;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                if (p.alpha <= 0) particles.splice(i, 1);
            });
            requestAnimationFrame(tick);
        };
        tick();
    };

    return (
        <section ref={containerRef} className={clsx("relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden z-20", oswald.className)}>
            <canvas ref={smokeCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" width={1920} height={1080} />

            {/* 1. SANTOSH TR */}
            <h1 ref={textSantoshRef} className="absolute text-8xl md:text-[10rem] font-bold text-white leading-[0.85] uppercase tracking-tighter text-center z-20">
                Santosh TR
            </h1>

            {/* 2. IS A */}
            <span ref={textIsARef} className="absolute text-4xl md:text-6xl text-primary font-bold leading-none z-20">
                IS A
            </span>

            {/* 3. DESIGNER */}
            <h2 ref={textDesignerRef} className="absolute text-9xl md:text-[14rem] font-bold text-primary leading-[0.8] uppercase tracking-tighter z-20">
                DESIGNER
            </h2>

            {/* 4. WHO CRAFTS */}
            <div ref={textWhoRef} className="absolute flex items-center gap-[0.25em] z-20 opacity-0 leading-[0.85]">
                <span ref={innerWhoRef} className="text-5xl md:text-7xl text-white font-medium">WHO</span>
                <span ref={innerCraftsRef} className="text-5xl md:text-7xl text-white font-medium">CRAFTS</span>
            </div>

            {/* 5. EXPERIENCES */}
            <div ref={textExperiRef} className="absolute flex items-center justify-center z-20 opacity-0 leading-[0.8]">
                <span ref={innerExperiRef} className="text-7xl md:text-[11rem] font-bold text-gray-500 tracking-tighter">EXPERI</span>
                <span ref={innerEnceRef} className="text-7xl md:text-[11rem] font-bold text-gray-500 tracking-tighter">ENCE</span>
            </div>
        </section>
    );
}
