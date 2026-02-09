'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { UseMousePosition } from '@/hooks/useMousePosition';

// --- TYPES ---
interface FloatingImage {
    asset: {
        url: string;
        metadata?: { lqip: string };
    };
    alt?: string;
}

interface StackingItem {
    heading?: string;
    subheading?: string;
    image?: { asset: { url: string } };
    videoUrl?: string;
    overlayColor?: string;
    overlayOpacity?: number;
}

interface ScrollGalleryProps {
    data: {
        centerText?: string;
        mainMedia?: {
            type: 'image' | 'video';
            image?: { asset: { url: string } };
            videoUrl?: string;
        };
        floatingImages?: FloatingImage[];
        galleryItems?: StackingItem[];
        overlayColor?: string;
    }
}

// --- SUB-COMPONENT: FLOAT CARD (FROM ScrollRevealImage) ---
function FloatCard({ img, index, progress, isMobile }: { img: any, index: number, progress: MotionValue<number>, isMobile: boolean }) {
    // Note: Progress passed here is the "Intro Phase" progress (0 -> 1 during the first half of scroll)

    const duration = 0.25;
    const stagger = duration * 0.25;
    const start = 0.15 + (index * stagger);
    const end = start + duration;

    // Check ParallaxGallery for similar physics but "Flying Out"
    // Here we want them to enter -> hold -> exit?
    // User wants "Design that Captivates" logic.
    // That logic was: steep diagonal path.

    // Recalculating standard "Steep Diagonal" path from original component:
    const isRight = index % 2 !== 0;

    // Y interpolation
    const y = useTransform(progress, [start, end], ["110vh", "-110vh"]);

    // X interpolation
    const xStart = isRight ? (isMobile ? "5vw" : "15vw") : (isMobile ? "-5vw" : "-15vw");
    // Adjusted xEnd to ensure 2.5% margin from edge (47.5vw boundary)
    const xEnd = isRight ? (isMobile ? "10vw" : "36.25vw") : (isMobile ? "-10vw" : "-36.25vw");
    const turnPoint = start + (duration * 0.4);

    const x = useTransform(progress, [start, turnPoint, end], [xStart, xEnd, xEnd]);
    const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);

    // Depth pushback
    const pushStart = start + stagger + 0.05;
    const scale = useTransform(progress, [pushStart, pushStart + 0.2], [1, 0.9]);
    const filter = useTransform(progress, [pushStart, pushStart + 0.2], ["brightness(1)", "brightness(0.6)"]);

    return (
        <motion.div
            style={{ x, y, opacity, scale, filter, zIndex: 30 + index }}
            className={clsx(
                "absolute left-1/2 top-0 aspect-[2/3]",
                // Reduced width by 10% (25 -> 22.5) on desktop to create gap
                isMobile ? "-ml-[35vw] w-[70vw]" : "-ml-[11.25vw] w-[22.5vw]"
            )}
        >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-bg-card">
                <Image
                    src={img.asset?.url}
                    alt="Gallery"
                    fill
                    className="object-cover"
                    placeholder={img.asset?.metadata?.lqip ? "blur" : "empty"}
                    blurDataURL={img.asset?.metadata?.lqip}
                />
            </div>
        </motion.div>
    )
}

// --- SUB-COMPONENT: STACK CARD (FROM ParallaxGallery) ---
const StackCard = ({ item, index, progress, total }: { item: StackingItem, index: number, progress: MotionValue<number>, total: number }) => {
    // Progress 0 -> 1 is the "Stacking Phase"

    const rangeStart = index * (1 / total);
    const rangeEnd = rangeStart + (1 / total);

    // Spring physics removed for direct 1:1 scroll feel
    const smoothProgress = progress;

    // Slide Up
    const y = useTransform(smoothProgress, [rangeStart, rangeEnd], ['100vh', '0vh']);

    // Zoom Out (1.25 -> 1)
    const imageScale = useTransform(smoothProgress, [rangeStart, rangeEnd * 0.9], [1.25, 1]);

    // --- 3D PARALLAX TILT ---
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const mouseX = useSpring(tiltX, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(tiltY, { stiffness: 150, damping: 20 });

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;

        // Calculate percentage from center (-0.5 to 0.5)
        const xPct = (mouseXPos / width) - 0.5;
        const yPct = (mouseYPos / height) - 0.5;

        // Update motion values (Max tilt: 15deg)
        tiltX.set(xPct * 15);
        tiltY.set(yPct * 15);
    }

    function handleMouseLeave() {
        tiltX.set(0);
        tiltY.set(0);
    }

    const rotateX = useTransform(mouseY, (val) => -val); // Invert Y for natural tilt
    const rotateY = useTransform(mouseX, (val) => val);

    return (
        <motion.div
            style={{
                y: y, // Vertical scroll position (from parent)
                zIndex: 100 + index,
                perspective: 1000 // Enable 3D space
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto" // Enable events
        >
            <motion.div
                className="relative w-full h-full overflow-hidden flex items-center justify-center transition-transform duration-200 ease-out"
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d"
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {item.videoUrl ? (
                    <video src={item.videoUrl} autoPlay loop muted playsInline className="object-cover w-full h-full" />
                ) : (
                    <motion.div style={{ scale: imageScale }} className="relative w-full h-full pointer-events-none">
                        <Image src={item.image?.asset?.url || ''} alt="Stack" fill className="object-cover" priority />
                    </motion.div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundColor: item.overlayColor || '#000', opacity: item.overlayOpacity ?? 0.3 }} />
                {/* Text (Lifted off surface) */}
                <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
                    style={{ transform: "translateZ(50px)" }} // Pop text out
                >
                    {item.heading && (
                        <h2 className="text-4xl md:text-8xl font-oswald font-bold text-white uppercase tracking-tighter drop-shadow-lg">
                            {item.heading}
                        </h2>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}


export default function ScrollGallery({ data }: ScrollGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    // --- 1. CONFIGURATION ---
    // Intro Height: 1200vh (from original ScrollReveal)
    // Stack Height: (Items * 250vh) (from optimized Parallax)
    // Stack Height: (Items * 100vh) (Reduced to 100vh)
    const introHeightPoints = isMobile ? 800 : 1200;
    const stackItemsCount = data.galleryItems?.length || 0;
    const stackHeightPoints = stackItemsCount * 100;

    const totalHeight = `${introHeightPoints + stackHeightPoints}vh`;

    // --- 2. SCROLL PROGRESS ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // --- 3. SEQUENCE MAPPING ---
    // We need to split the 0-1 timeline.
    // Intro Phase: 0 -> X
    // Stack Phase: X -> 1

    const splitRatio = introHeightPoints / (introHeightPoints + stackHeightPoints);

    // Phase 1: Intro (0 -> 1 for the first part)
    const introProgress = useTransform(scrollYProgress, [0, splitRatio], [0, 1]);

    // Phase 2: Stacking (0 -> 1 for the second part)
    // We start slightly before splitRatio ends? No, keep it clean.
    // Actually, user said: "combine... same flow".
    // Seamless: The first stack card should start sliding up BEFORE the intro ends, but AFTER the last card exits.
    // Last card exits at ~0.78.
    // Starting at 0.71 per user request: "LEAST START TIME... SO THEY WONT OVERLAP".
    const stackStart = splitRatio * 0.57;
    const stackProgress = useTransform(scrollYProgress, [stackStart, 1], [0, 1]);

    // --- INTRO SHARED LOGIC ---
    // Main Block & Text (Copied from ScrollRevealImage)
    // Reduce initial gap: Start from 20vh instead of 100vh to avoid "blank space".
    const introEntryY = useTransform(introProgress, [0, 0.1], ["20vh", "0vh"]);
    // Background Zoom: Start LATER (0.15) to sync with cards entering
    const blockScale = useTransform(introProgress, [0.15, 0.6], [1, 0.5]);
    const blockOpacity = useTransform(introProgress, [0.8, 0.95], [1, 0]);

    // Text Scale: Finish scaling earlier so it "stops" visibly
    // Sync with blockScale for perfect timing
    const textScale = useTransform(introProgress, [0.15, 0.6], [0.4, 0.85]);
    const textOpacity = useTransform(introProgress, [0, 0.15], [0, 1]);

    if (!data) return null;

    return (
        <section
            ref={containerRef}
            style={{
                height: totalHeight,
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%), black`
            }}
            className="relative w-full"
        >
            <UseMousePosition />
            <div className="sticky top-0 h-screen w-full overflow-hidden perspective-1000">

                {/* --- INTRO LAYER (Z 1-50) --- */}

                {/* 1. Background Media Block */}
                <motion.div
                    style={{ y: introEntryY, scale: blockScale, opacity: blockOpacity }}
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                >
                    <div className="relative w-screen h-screen">
                        {data.mainMedia?.type === 'video' ? (
                            <video src={data.mainMedia.videoUrl} autoPlay loop muted className="w-full h-full object-cover" />
                        ) : (
                            <div className="relative w-full h-full">
                                <Image src={data.mainMedia?.image?.asset?.url || ''} alt="Bg" fill className="object-cover" />
                                <div className={clsx("absolute inset-0 opacity-40", data.overlayColor === 'white' ? 'bg-white' : 'bg-black')} />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* 2. Center Text */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 text-center">
                    <motion.div style={{ y: introEntryY }} className="w-full">
                        <motion.h2
                            style={{ scale: textScale, opacity: textOpacity }}
                            className="text-5xl md:text-8xl lg:text-9xl font-oswald font-bold uppercase text-white mix-blend-overlay"
                        >
                            {data.centerText || "DESIGN THAT CAPTIVATES"}
                        </motion.h2>
                    </motion.div>
                </div>

                {/* 3. Floating Cards (6) */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                    {data.floatingImages?.map((img, i) => (
                        <FloatCard key={i} img={img} index={i} progress={introProgress} isMobile={isMobile} />
                    ))}
                </div>


                {/* --- STACKING LAYER (Z 100+) --- */}
                <div className="absolute inset-0 z-[100] w-full h-full">
                    {data?.galleryItems?.map((item, i) => (
                        <StackCard
                            key={i}
                            item={item}
                            index={i}
                            progress={stackProgress}
                            total={stackItemsCount}
                        />
                    ))}
                </div>

            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed bottom-0 left-0 h-1 bg-white/50 z-[200] origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </section>
    );
}
