"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import clsx from "clsx";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface ScrollRevealImageProps {
    data: {
        centerText?: string;
        mainMedia?: {
            type: 'image' | 'video';
            image?: { asset: { url: string }; alt?: string };
            videoUrl?: string;
        };
        gallery?: {
            asset: { url: string; metadata?: { lqip: string } };
            alt?: string;
        }[];
        overlayColor?: 'black' | 'white';
    };
}

export default function ScrollRevealImage({ data }: ScrollRevealImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    // SCROLL PHYSICS (Steep Diagonal + Sync)
    // 450vh Height
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- GLOBAL SYNC LOGIC ---
    // Cards run from approx 0.15 to 0.15 + (Sequence Duration).
    // Let's calculate the sequence range to sync the block/text.
    const duration = 0.25;
    const stagger = duration * 0.3;
    const totalCards = 6;

    // Delayed Start: 0.20 (Ensures block fills viewport first)
    const seqStart = 0.20;
    const seqEnd = seqStart + duration + ((totalCards - 1) * stagger);

    // --- MAIN BLOCK ENTRY ---
    // Immediate Slide Up (0 -> 15%): Slightly slower entry to feel "heavy".
    const entryY = useTransform(scrollYProgress, [0, 0.15], ["100vh", "0vh"]);

    // Global Lock: Scales and Fades in exact sync with valid card sequence
    const blockScale = useTransform(scrollYProgress, [seqStart, seqEnd], [1, 0.5]);
    const blockOpacity = useTransform(scrollYProgress, [seqEnd - 0.1, seqEnd], [1, 0]);

    // Text Scale: 0.4 -> 0.85 (Synced with Cards)
    const textScale = useTransform(scrollYProgress, [seqStart, seqEnd], [0.4, 0.85]);

    // Text Opacity: Synced with BLOCK ENTRY (Immediate)
    // 0 -> 0.15 (Same as entryY)
    const textOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    if (!data?.gallery || data.gallery.length === 0) {
        return null;
    }

    return (
        <div ref={containerRef} className={clsx("relative bg-bg-dark", isMobile ? "h-[800vh]" : "h-[1200vh]")}>
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-1000">

                {/* LAYER 1: CENTER BLOCK */}
                <motion.div
                    style={{ y: entryY, scale: blockScale, opacity: blockOpacity }}
                    className="absolute inset-0 z-10 w-full h-full flex items-center justify-center pointer-events-none"
                >
                    <div className="relative w-[100vw] h-[100vh]">
                        {data.mainMedia?.type === 'video' && data.mainMedia.videoUrl ? (
                            <video
                                src={data.mainMedia.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="relative w-full h-full">
                                {data.mainMedia?.image?.asset?.url && (
                                    <Image
                                        src={data.mainMedia.image.asset.url}
                                        alt="Main Background"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                )}
                                <div className={clsx(
                                    "absolute inset-0 opacity-40",
                                    data.overlayColor === 'white' ? 'bg-white' : 'bg-black'
                                )} />
                            </div>
                        )}
                    </div>
                </motion.div>


                {/* LAYER 2: TEXT */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 text-center">
                    <motion.div style={{ y: entryY }} className="w-full">
                        <motion.h2
                            style={{ scale: textScale, opacity: textOpacity }}
                            className={clsx(
                                "text-5xl md:text-8xl lg:text-9xl font-oswald font-bold uppercase leading-tight text-white drop-shadow-2xl mix-blend-overlay",
                            )}
                        >
                            {data.centerText || "DESIGN THAT CAPTIVATES"}
                        </motion.h2>
                    </motion.div>
                </div>


                {/* LAYER 3: CARDS */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    {data.gallery.map((img, index) => (
                        <SteepCard
                            key={index}
                            img={img}
                            index={index}
                            progress={scrollYProgress}
                            totalCards={data.gallery?.length || 6}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

// --- STEEP DIAGONAL CARD PHYSICS ---
function SteepCard({ img, index, progress, totalCards, isMobile }: { img: any, index: number, progress: MotionValue<number>, totalCards: number, isMobile: boolean }) {

    // OVERLAP LOGIC
    const duration = 0.25;
    const stagger = duration * 0.3; // 30% stagger

    const start = 0.15 + (index * stagger);
    const end = start + duration;

    const isRight = index % 2 !== 0;
    const sideMultiplier = isRight ? 1 : -1;

    // PATH UPDATE: "Steep Diagonal"
    // Phase 1: 0% -> 40% of flight. Move X(Start -> End) AND Y(Start -> 25vh).
    // Phase 2: 40% -> 100% of flight. Move X(End -> End) AND Y(25vh -> Exit).
    // This creates the "hockey stick" or "steep diagonal" path.

    // Y Calculations
    // Start: 110vh
    // Target: 25vh
    // Exit: -110vh
    // Turning Point (TP) = approx 40% of duration. 
    // Normalized check: (110 - 25) / (110 - -110) = 85 / 220 = 0.386 ~ 0.4.

    const turnPoint = start + (duration * 0.4);

    // X Configuration
    // Desktop: 15vw -> 37.5vw (Wide spread)
    // Mobile: 5vw -> 10vw (Narrow zigzag)
    const xStartDesktop = isRight ? `calc(15vw - 0px)` : `calc(-15vw + 0px)`;
    const xEndDesktop = isRight ? `calc(37.5vw - 15px)` : `calc(-37.5vw + 15px)`;

    const xStartMobile = isRight ? `calc(5vw)` : `calc(-5vw)`;
    const xEndMobile = isRight ? `calc(10vw)` : `calc(-10vw)`;

    const xStart = isMobile ? xStartMobile : xStartDesktop;
    const xEnd = isMobile ? xEndMobile : xEndDesktop;

    // X Interpolation: Reaches Edge at Turn Point (0.4), then stays straight.
    const x = useTransform(progress, [start, turnPoint, end], [xStart, xEnd, xEnd]);

    // Y Interpolation (Continuous Up)
    const y = useTransform(progress, [start, end], ["110vh", "-110vh"]);

    // Fade In
    const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);

    // Push Back Effect (Depth)
    const pushStart = start + stagger + 0.05;
    const scale = useTransform(progress, [pushStart, pushStart + 0.2], [1, 0.9]);
    const filter = useTransform(progress, [pushStart, pushStart + 0.2], ["brightness(1)", "brightness(0.6)"]);

    return (
        <motion.div
            style={{ x, y, opacity, scale, filter, zIndex: 50 + index, display: 'block' }}
            className={clsx(
                "absolute left-1/2 top-0 aspect-[2/3]",
                isMobile ? "-ml-[35vw] w-[70vw]" : "-ml-[12.5vw] w-[25vw]"
            )}
        >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-bg-card">
                {img.asset?.url ? (
                    <Image
                        src={img.asset.url}
                        alt="Gallery Item"
                        fill
                        className="object-cover"
                        placeholder={img.asset?.metadata?.lqip ? "blur" : "empty"}
                        blurDataURL={img.asset?.metadata?.lqip}
                        sizes="25vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-xs text-white/50">No Image</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
