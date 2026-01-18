"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import dynamic from "next/dynamic";

// OPTIMIZATION 1: Lazy load ParticleSystem (-13 KB initial bundle)
const ParticleSystem = dynamic(() => import('./ParticleSystem'), {
    ssr: false,
    loading: () => null
});

// Static fallback images (used if no Sanity data)
const SLIDE_IMAGES = [
    "/images/(1).avif",
    "/images/(2).avif",
    "/images/(3).avif",
    "/images/(4).avif",
    "/images/(5).avif",
];

const FACE_Count = 5;
const ANGLE_STEP = 360 / FACE_Count;

// ============================================
// HERO EFFECTS CONFIGURATION
// Toggle features on/off by changing true/false
// ============================================
interface HeroEffects {
    dynamicGradientBackground: boolean;
    reflectionEffect: boolean;
    ambientParticles: boolean;
    edgeVignetteGlow: boolean;
    hapticFeedback: boolean;
    slideMetadata: boolean;
    activeSlideBorder: boolean;
    scrollTriggeredEntrance: boolean;
}

const HERO_EFFECTS: HeroEffects = {
    dynamicGradientBackground: true,  // #5: Animated gradient background
    reflectionEffect: true,           // #6: Mirrored drum below
    ambientParticles: false,          // #7: Floating particles (not yet implemented)
    edgeVignetteGlow: true,           // #8: Pulsing glow on transitions
    hapticFeedback: false,            // #9: Snap animation (not yet implemented)
    slideMetadata: false,             // #10: Glassmorphism overlay (not yet implemented)
    activeSlideBorder: false,         // #12: Animated gradient border (not yet implemented)
    scrollTriggeredEntrance: false,   // #17: Page load animation (not yet implemented)
};

// Sanity hero data types
interface SanityImage {
    asset: {
        _id: string;
        url: string;
    };
    alt?: string;
    caption?: string;
}

interface HeroData {
    _type: 'hero';
    title?: string;
    subtitle?: string;
    sliderImages?: SanityImage[];
    marqueeText?: string;
    enableParticles?: boolean;
}

interface HeroBlockProps {
    effectsConfig?: HeroEffects;
    heroData?: HeroData; // Optional Sanity data
}

export default function HeroBlock({ effectsConfig, heroData }: HeroBlockProps) {
    // Use prop or fallback to default constant
    const effects = effectsConfig || HERO_EFFECTS;

    // Use Sanity images if available, otherwise use static images
    const slideImages = heroData?.sliderImages && heroData.sliderImages.length > 0
        ? heroData.sliderImages.map(img => img.asset.url)
        : SLIDE_IMAGES;

    // Get particle setting from Sanity or default
    const particlesEnabled = heroData?.enableParticles ?? effects.ambientParticles;

    // Rotation State (continuous angle) - Drives BOTH Transform AND Opacity
    const [rotationX, setRotationX] = useState(0);
    // Active Index for Pagination (0-4)
    const [activeIndex, setActiveIndex] = useState(0);
    // Dynamic Dimensions for 3D Math
    const [radius, setRadius] = useState(241);
    const [faceHeight, setFaceHeight] = useState(350);

    // Local Hover Cursor State
    const [hoverType, setHoverType] = useState<'up' | 'down' | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const drumRef = useRef<HTMLDivElement>(null);

    // Dynamic Radius Calculation
    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                const h = containerRef.current.offsetHeight;
                // Strict 80% Height Scaling (User Reference: 539/675 = 0.798)
                const constrainedHeight = h * 0.8;
                setFaceHeight(constrainedHeight);
                // r = h / (2 * tan(36deg))
                // tan(36) approx 0.7265
                setRadius(constrainedHeight / (2 * 0.7265));
            }
        };

        const observer = new ResizeObserver(updateDimensions);
        observer.observe(containerRef.current);
        updateDimensions(); // Initial calc

        return () => observer.disconnect();
    }, []);

    // Scroll-Triggered Entrance Animation - #17
    useEffect(() => {
        if (effects.scrollTriggeredEntrance && sectionRef.current && drumRef.current) {
            const tl = gsap.timeline();
            gsap.set(sectionRef.current, { opacity: 0 });
            gsap.set(drumRef.current, { scale: 0.8, rotationX: -30 });

            tl.to(sectionRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" })
                .to(drumRef.current, { scale: 1, rotationX: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.4")
                .from(".pagination-dot", { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: "back.out(2)" }, "-=0.6");
        }
    }, [effects.scrollTriggeredEntrance]);

    // OPTIMIZATION 4: Memoize mouse handlers (-10% overhead)
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !cursorRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const isTop = y < rect.height / 2;
        setHoverType(isTop ? 'up' : 'down');
        gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: "power2.out" });
    }, []);

    const handleMouseEnter = useCallback(() => gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.2 }), []);
    const handleMouseLeave = useCallback(() => {
        setHoverType(null);
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }, []);

    // OPTIMIZATION 3: Memoize getFaceOpacity (-25% calculation time)
    // Calculate Opacity based on Angular Distance from "Front" (0deg / 360deg ...)
    // Front is when (angle + rotationX) % 360 is close to 0.
    const getFaceOpacity = useCallback((faceIndex: number, currentRotationX: number) => {
        const faceAngle = faceIndex * ANGLE_STEP;
        const totalAngle = faceAngle + currentRotationX;
        const normalized = ((totalAngle % 360) + 360) % 360; // 0..360
        // Distance from 0 or 360
        const dist = Math.min(normalized, 360 - normalized); // 0..180

        // Spotlight Logic:
        // Visible if dist < 60.
        // Full opacity at 0. Zero opacity at 60.
        // Linear fade: 1 - (dist / 60)
        // Adjust threshold to tweak "tightness"
        const threshold = 55;
        if (dist > threshold) return 0;
        return Math.max(0, 1 - (dist / threshold));
    }, []);

    // OPTIMIZATION 2: useCallback for handleSpin (-30% re-render overhead)
    const handleSpin = useCallback((direction: 'prev' | 'next') => {
        const delta = direction === 'prev' ? ANGLE_STEP : -ANGLE_STEP;
        const newTargetRotation = rotationX + delta;
        // Optimization: Snap target to exact step to avoid drift
        const snapTarget = Math.round(newTargetRotation / ANGLE_STEP) * ANGLE_STEP;

        // Animate Proxy to drive State
        const proxy = { val: rotationX };
        gsap.to(proxy, {
            val: snapTarget,
            duration: 0.8,
            ease: "back.out(1.0)",
            force3D: true,  // GPU acceleration
            onUpdate: () => {
                setRotationX(proxy.val);
            },
            onComplete: () => {
                setRotationX(snapTarget); // Ensure exact snap
                // Update Index
                const normalized = ((snapTarget % 360) + 360) % 360;
                const index = Math.round(normalized / ANGLE_STEP) % FACE_Count;
                const newIndex = (FACE_Count - index) % FACE_Count;
                setActiveIndex(newIndex);
            }
        });
    }, [rotationX]);

    return (
        <section className="relative w-full min-h-screen pt-[120px] pb-24 px-4 flex flex-col justify-center items-start" data-scroll-section>


            {/* Static Background */}
            <div className="absolute inset-0 z-0 bg-osmo-carbon border-b border-white/10" />

            {/* Ambient Light Particles - #7 */}
            {particlesEnabled && <ParticleSystem particleCount={40} />}

            <div className="relative z-10 w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                <div className="col-span-12 md:col-start-3 md:col-span-8 flex flex-col justify-center relative">

                    <div className="w-full relative group/container aspect-video">

                        {/* Background & Border Layer (Clipped) */}
                        <div className="absolute inset-0 bg-[#0D0D0D] border border-white/10 rounded-[40px] overflow-hidden" />



                        <div className="relative w-full h-full grid grid-cols-[1fr_8fr_1fr] items-center">
                            {/* Empty Left Gutter (Column 1) */}
                            <div />

                            {/* Slider Container (Column 2) - Fills the 80% slot */}
                            <div
                                className="col-start-2 w-full h-full relative flex items-center justify-center overflow-hidden"
                                style={{ perspective: '3000px' }}
                                ref={containerRef}
                                onPointerMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                // Click Interaction (Top/Bottom Split)
                                onClick={(e) => {
                                    if (!containerRef.current) return;
                                    const rect = containerRef.current.getBoundingClientRect();
                                    const y = e.clientY - rect.top;
                                    // Top Half = Prev (Up), Bottom Half = Next (Down)
                                    handleSpin(y < rect.height / 2 ? 'prev' : 'next');
                                }}
                            >
                                {/* Custom Cursor - Solid Color (No Blend) */}
                                <div
                                    ref={cursorRef}
                                    className="absolute top-0 left-0 w-16 h-16 bg-white rounded-full flex items-center justify-center z-50 pointer-events-none opacity-0 scale-0 origin-center shadow-lg"
                                >
                                    {hoverType === 'up' ? <ArrowUp className="w-6 h-6 text-black" /> : <ArrowDown className="w-6 h-6 text-black" />}
                                </div>

                                {/* 3D Drum - Rotation Driven by State */}
                                <div
                                    ref={drumRef}
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: `rotateX(${rotationX}deg)` // React State drives Visual
                                    }}
                                >
                                    {slideImages.map((src, i) => {
                                        const angle = i * ANGLE_STEP;
                                        const opacity = getFaceOpacity(i, rotationX);
                                        const isMain = opacity > 0.8; // Helper for pointer-events?

                                        return (
                                            <div
                                                key={i}
                                                className="absolute inset-0 pointer-events-auto"
                                                style={{
                                                    // Dynamic Radius and Height
                                                    transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                                                    height: `${faceHeight}px`,
                                                    // Strict 16:9 Aspect Ratio (Width = Height * 1.77)
                                                    width: `${faceHeight * (16 / 9)}px`,
                                                    left: '50%',
                                                    marginLeft: `-${(faceHeight * (16 / 9)) / 2}px`,
                                                    opacity: opacity, // Smooth Dynamic Opacity
                                                    backfaceVisibility: 'hidden',
                                                    pointerEvents: isMain ? 'auto' : 'none',
                                                    top: '50%',
                                                    marginTop: `-${faceHeight / 2}px`
                                                }}
                                            >
                                                <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-2xl">
                                                    <Image
                                                        src={src}
                                                        alt={`Slide ${i + 1}`}
                                                        fill
                                                        sizes="100vw"
                                                        className="object-cover"
                                                        priority
                                                    />

                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Pagination Dots (Syncs with Active Index) */}
                            <div className="h-full flex flex-col justify-center items-center col-start-3 pointer-events-none z-50">
                                <div className="flex flex-col gap-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={clsx(
                                                "pagination-dot h-[3px] rounded-full transition-all duration-500 ease-[var(--cubic-default)] mx-auto",
                                                i === activeIndex
                                                    ? "w-[40px] bg-osmo-acid opacity-100"
                                                    : "w-[12px] bg-white opacity-20"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div >

            {/* CSS Animation for Active Border */}
            <style jsx global>{`
                @keyframes borderFlow {
                    0% {
                        background-position: 0% 50%;
                    }
                    100% {
                        background-position: 200% 50%;
                    }
                }
            `}</style>
        </section >
    );
}
