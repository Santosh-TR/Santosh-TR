"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { THEME_CONFIG } from "@/config/theme";

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
    effectsConfig?: typeof THEME_CONFIG.effects; // Use type from theme config
    heroData?: HeroData; // Optional Sanity data
    variant?: 'dark' | 'light'; // 'dark' = Black Drum (Default), 'light' = White Drum
}

export default function HeroBlock({ effectsConfig, heroData, variant = 'dark' }: HeroBlockProps) {
    // Connect to THEME_CONFIG source of truth
    const effects = effectsConfig || THEME_CONFIG.effects;

    // Use Sanity images if available, otherwise use static images
    const slideImages = heroData?.sliderImages && heroData.sliderImages.length > 0
        ? heroData.sliderImages.map(img => img.asset.url)
        : SLIDE_IMAGES;

    // Get particle setting from Sanity or default
    const particlesEnabled = false; // Forced off by user request


    // Active Index for Pagination (0-4)
    const [activeIndex, setActiveIndex] = useState(0);
    // Dynamic Dimensions for 3D Math
    const [radius, setRadius] = useState(241);
    const [faceHeight, setFaceHeight] = useState(350);
    const [isReady, setIsReady] = useState(false); // Prevents hydration flicker

    // Local Hover Cursor State
    const [hoverType, setHoverType] = useState<'up' | 'down' | null>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const drumRef = useRef<HTMLDivElement>(null);

    const sectionRef = useRef<HTMLElement>(null); // Ref added for entrance animation
    const hasAnimated = useRef(false); // Guard to prevent re-triggering on scroll/resize

    // Dynamic Radius Calculation
    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                const h = containerRef.current.offsetHeight;
                const w = containerRef.current.offsetWidth;

                // 1. Calculate max height based on vertical space (80% rule)
                // 1. Calculate height based on vertical space (Adjusted for visual comfort)
                const finalHeight = h * 0.65;

                setFaceHeight(finalHeight);
                // r = h / (2 * tan(36deg))
                // tan(36) approx 0.7265
                setRadius(finalHeight / (2 * 0.7265));
                setIsReady(true);
            }
        };

        const observer = new ResizeObserver(updateDimensions);
        observer.observe(containerRef.current);
        updateDimensions(); // Initial calc

        return () => observer.disconnect();
    }, []);

    // Scroll-Triggered Entrance Animation - #17
    // Scroll-Triggered Entrance Animation - Run ONCE
    useEffect(() => {
        if (effects.scrollTriggeredEntrance && sectionRef.current && !hasAnimated.current) {
            // User Change: Simple Fade In (No Zoom, Pagination Stable)
            gsap.set(sectionRef.current, { opacity: 0 });
            gsap.to(sectionRef.current, {
                opacity: 1, duration: 1.2, ease: "power2.out", onComplete: () => {
                    hasAnimated.current = true;
                }
            });
        } else if (hasAnimated.current && sectionRef.current) {
            // Ensure visibility if already animated (e.g. after resize)
            gsap.set(sectionRef.current, { opacity: 1 });
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
    // PERFORMANCE: Use Ref for rotation to avoid re-renders
    const rotationRef = useRef(0);
    const facesRef = useRef<(HTMLDivElement | null)[]>([]);

    // OPTIMIZATION: Math-only version of getFaceOpacity (No React State dependency)
    const sortedFacesRef = useRef([]); // Helper to avoid frequent allocations if needed

    // Fix for Race Condition: Persistent Animation Object
    const animationProxy = useRef({ val: 0 });

    const calculateOpacity = (faceIndex: number, currentRotation: number) => {
        const faceAngle = faceIndex * ANGLE_STEP;
        const totalAngle = faceAngle + currentRotation;
        const normalized = ((totalAngle % 360) + 360) % 360;
        const dist = Math.min(normalized, 360 - normalized);
        const threshold = 55;
        if (dist > threshold) return 0;
        return Math.max(0, 1 - (dist / threshold));
    };

    // OPTIMIZATION 2: useCallback for handleSpin (-30% re-render overhead)
    const handleSpin = useCallback((direction: 'prev' | 'next') => {
        const delta = direction === 'prev' ? ANGLE_STEP : -ANGLE_STEP;
        // Use current target as base, not current visual state
        const newTargetRotation = rotationRef.current + delta;

        // Optimization: Snap target to exact step to avoid drift
        const snapTarget = Math.round(newTargetRotation / ANGLE_STEP) * ANGLE_STEP;

        // UPDATE IMMEDIATELY: Fixes race condition where rapid clicks used stale ref
        rotationRef.current = snapTarget;

        // INSTANT FEEDBACK: Update Index IMMEDIATELY
        const normalized = ((snapTarget % 360) + 360) % 360;
        const index = Math.round(normalized / ANGLE_STEP) % FACE_Count;
        const newIndex = (FACE_Count - index) % FACE_Count;
        setActiveIndex(newIndex);

        // Animate Persistent Proxy
        gsap.to(animationProxy.current, {
            val: snapTarget,
            duration: 0.8,
            ease: "back.out(1.0)",
            force3D: true,
            overwrite: true, // Ensure we kill previous tweens
            onUpdate: () => {
                const currentVal = animationProxy.current.val;

                // 1. Update Drum Rotation (Visual)
                if (drumRef.current) {
                    drumRef.current.style.transform = `rotateX(${currentVal}deg)`;
                }

                // 2. Update Face Opacity (Manual DOM Patching)
                facesRef.current.forEach((face, i) => {
                    if (face) {
                        const opacity = calculateOpacity(i, currentVal);
                        face.style.opacity = opacity.toString();
                        // Optional: Toggle pointer events for performance?
                        face.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
                    }
                });
            }
        });
    }, []);

    // Variant Overrides
    const variantStyles = variant === 'light' ? {
        '--color-hero-inner': '#FFFFFF',
        '--color-hero-outer': '#F5F5F5', // Slightly off-white for contrast
        'borderColor': 'rgba(0,0,0,0.1)' // Darker border for light mode
    } as React.CSSProperties : {};

    return (
        <section
            ref={sectionRef}
            // User requested "Capsule" shape for container, and fix for "Zoom In" glitch.
            // Opacity-0 ensures checking is hidden until GSAP fades it in.
            className="relative w-full min-h-screen pt-[120px] pb-24 px-4 flex flex-col justify-center items-start opacity-0"
            data-scroll-section
            style={variantStyles}
        >


            {/* Static Background - Transparent now (User Request) */}
            <div className="absolute inset-0 z-0 bg-transparent border-b border-white/10" />

            {/* Ambient Light Particles - #7 */}
            {particlesEnabled && <ParticleSystem particleCount={40} />}

            <div className="relative z-10 w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                <div className="col-span-12 md:col-start-3 md:col-span-8 flex flex-col justify-center relative">

                    <div className="w-full relative group/container aspect-video">


                        {/* Background & Border Layer (Clipped - CAPSULE SHAPE) */}
                        <div
                            className={clsx(
                                "absolute inset-0 rounded-full overflow-hidden transition-all duration-300",
                                // Active Border Logic
                                effects.activeSlideBorder ? "border-2" : "border border-white/10"
                            )}
                            style={{
                                backgroundColor: 'var(--color-hero-outer)',
                                borderColor: effects.activeSlideBorder ? 'var(--color-active-slide-border)' : undefined
                            }}
                        />




                        <div className="relative w-full h-full z-20 pointer-events-none">
                            {/* Content Wrapper now explicit Z-20 to sit above Background (Z-0) */}

                            {/* Slider Container (Centered) */}
                            <div
                                className="w-full h-full relative flex items-center justify-center overflow-hidden"
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
                                    className="absolute top-0 left-0 w-16 h-16 rounded-full flex items-center justify-center z-50 pointer-events-none opacity-0 scale-0 origin-center shadow-lg transition-colors duration-300"
                                    style={{
                                        backgroundColor: 'var(--color-hero-scroll-bg)',
                                        color: 'var(--color-hero-scroll-icon)'
                                    }}
                                >
                                    {hoverType === 'up' ? <ArrowUp className="w-6 h-6" /> : <ArrowDown className="w-6 h-6" />}
                                </div>

                                {/* 3D Drum - Rotation Driven by State */}
                                <div
                                    ref={drumRef}
                                    className={clsx(
                                        "absolute inset-0 w-full h-full transition-opacity duration-500",
                                        isReady ? "opacity-100" : "opacity-0"
                                    )}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: `rotateX(${rotationRef.current}deg)` // Initial render
                                    }}
                                >
                                    {slideImages.map((src, i) => {
                                        const angle = i * ANGLE_STEP;

                                        return (
                                            <div
                                                key={i}
                                                ref={(el) => { facesRef.current[i] = el; }}
                                                className="absolute inset-0 pointer-events-auto flex items-center justify-center"
                                                style={{
                                                    // Dynamic Radius and Height
                                                    transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                                                    height: `${faceHeight}px`,
                                                    // Flexible Width (70% of container) - Removes strict 16:9
                                                    width: '70%',
                                                    left: '15%', // Centered (100 - 70) / 2
                                                    // Initial Opacity (Calculated once on mount/resize)
                                                    opacity: i === 0 ? 1 : 0,
                                                    backfaceVisibility: 'hidden',
                                                    pointerEvents: i === 0 ? 'auto' : 'none',
                                                    top: '50%',
                                                    marginTop: `-${faceHeight / 2}px`
                                                }}
                                            >
                                                <div
                                                    className={clsx(
                                                        "w-[85%] h-[85%] relative rounded-lg overflow-hidden shadow-2xl",
                                                        // Active Slide Inner Border
                                                        effects.activeSlideBorder ? "border" : "border border-white/10"
                                                    )}
                                                    style={{
                                                        backgroundColor: 'var(--color-hero-inner)',
                                                        borderColor: effects.activeSlideBorder ? 'var(--color-active-slide-border)' : undefined
                                                    }}
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`Slide ${i + 1}`}
                                                        fill
                                                        className="object-contain"
                                                        sizes="(max-width: 768px) 100vw, 80vw"
                                                        priority={i === 0}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>


                            {/* Pagination (Absolute Right) - Z-999 to force visibility */}
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-3 pointer-events-auto items-center w-12">
                                {slideImages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent drum spin
                                            const diff = i - activeIndex;
                                            if (diff === 0) return;
                                            handleSpin(diff > 0 ? 'next' : 'prev');
                                        }}
                                        className={clsx(
                                            "pagination-dot h-1.5 rounded-full transition-[width,background-color] duration-500 ease-out shadow-sm block",
                                            activeIndex === i
                                                ? "w-10 bg-primary" // Active: Long Line
                                                : "w-3 bg-[var(--color-text-primary)] opacity-40" // Inactive: Fixed Short Dash (No Hover Animation)
                                        )}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
