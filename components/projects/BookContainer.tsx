"use client";

import { motion, useScroll, useTransform, useSpring, transform } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import BookSlide from "./BookSlide";
// import ProjectCard from "./ProjectCard"; // Unused now
import { urlFor } from "@/sanity/lib/image";
import { useRef, useState, useEffect } from "react";

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    tagline?: string;
    mainImage?: any;
    techStack?: any[];
    demoLink?: string;
    repoLink?: string;
    year?: string;
}

interface PageData {
    title?: string;
    heroImage?: any;
    leftHeading?: string;
    leftSubheading?: string;
    leftDescription?: any;
    rightHeading?: string;
    rightSubheading?: string;
}


interface BookContainerProps {
    projects: Project[];
    pageData?: PageData;
    children?: React.ReactNode;
}

export default function BookContainer({ projects, pageData, children }: BookContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showProjects, setShowProjects] = useState(false);

    // Fallback values
    const leftSubheading = pageData?.leftSubheading || "from";
    const leftHeading = pageData?.leftHeading || "Idea";
    const rightSubheading = pageData?.rightSubheading || "to";
    const rightHeading = pageData?.rightHeading || "Done.";

    // Get hero image URL from Sanity or use placeholder
    const heroImageUrl = pageData?.heroImage
        ? urlFor(pageData.heroImage).width(800).height(1200).url()
        : "/book-cover.jpg";

    // Scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // OPTIMIZED SPRING:
    // Buttery smooth = soft spring, gentle deceleration
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 3,
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    // ANIMATION PHASES (0 to 1 based on 300vh height)
    // Phase 1: Book Opens (0% to 15%)
    // Phase 2: Carousel Slides Up (15% to 40%)

    // 1. Cover Rotation
    const coverRotation = useTransform(smoothProgress, [0, 0.15], [0, -180]);

    // 2. Book Translation
    const bookTranslateX = useTransform(smoothProgress, [0, 0.15], ["0%", "100%"]);

    // 3. Book Scale
    const bookScale = useTransform(smoothProgress, [0, 0.15], [1, 2]);

    // 4. Carousel Slide Up (Linked to Scroll)
    // Starts appearing as book finishes opening
    // Previous range: [0.08, 0.2] (Diff 0.12)
    // New range: [0.08, 0.16] (Diff 0.08 -> ~33% faster)
    const carouselY = useTransform(smoothProgress, [0.08, 0.16], ["100%", "0%"]);
    const carouselOpacity = useTransform(smoothProgress, [0.08, 0.14], [0, 1]); // Fade in quickly at start

    // Handle click to instantly open book
    const handleBookClick = () => {
        window.scrollTo({
            top: window.innerHeight * 0.5, // Scroll enough to open
            behavior: "smooth",
        });
    };

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Scroll Container - Increased to 300vh for better control */}
            <div className="h-[300vh]">
                {/* Fixed Hero Section */}
                <div
                    className="fixed inset-0 min-h-screen overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #FF4400 0%, #FF6B35 100%)' }}
                >
                    {/* Background with text */}
                    <div className="absolute inset-0 flex items-start justify-start px-4 md:px-8 lg:px-16 py-42 z-0">
                        {/* Left Column - "from Idea" */}
                        <motion.div
                            className="text-white space-y-8 flex flex-col justify-start max-w-sm"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        >
                            <div>
                                <p className="text-base md:text-lg font-light mb-3 uppercase tracking-wide">{leftSubheading}</p>
                                <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8">
                                    {leftHeading}
                                </h2>
                            </div>
                            {pageData?.leftDescription ? (
                                <div className="text-sm md:text-base text-white/90 leading-relaxed space-y-12 prose prose-invert prose-sm">
                                    <PortableText value={pageData.leftDescription} />
                                </div>
                            ) : (
                                <div className="text-sm md:text-base text-white/90 leading-relaxed space-y-4">
                                    <p>
                                        At Ribbit, we believe that your insights and needs are essential for creating a great product and a smooth process. That's why we involve you in every step of the journey.
                                    </p>
                                    <p>
                                        We handle the entire process from concept to final result, including everything from research, concepts, art direction, copywriting, design, storyboarding, animation, music, and sound effects.
                                    </p>
                                </div>
                            )}
                        </motion.div>

                        {/* Bottom Right - "to Done." */}
                        <motion.div
                            className="absolute bottom-20 right-6 md:right-12 lg:right-22 text-white"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-base md:text-lg font-light mb-3 uppercase tracking-wide">{rightSubheading}</p>
                            <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9]">
                                {rightHeading}
                            </h2>
                        </motion.div>
                    </div>

                    {/* Book at bottom center - using absolute positioning so x translation works */}
                    <div className="absolute inset-x-0 bottom-0 z-10" style={{ perspective: "2000px" }}>
                        {/* X Translation wrapper - slides book right as it opens */}
                        <motion.div
                            className="absolute left-1/2 bottom-0"
                            initial={{ opacity: 0, y: 300 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                x: bookTranslateX,
                                willChange: "transform",
                                // marginLeft removed - we use a wrapper to center
                            }}
                        >
                            {/* Centering Wrapper - independently handles the centering logic */}
                            <div className="-translate-x-1/2">
                                {/* Scale + 3D wrapper */}
                                <motion.div
                                    className="relative cursor-pointer"
                                    onClick={handleBookClick}
                                    style={{
                                        transformStyle: "preserve-3d",
                                        scale: bookScale,
                                        transformOrigin: "center center",
                                    }}
                                >
                                    {/* 
                                    Book structure (like folded A4 paper):
                                    - CLOSED: Only cover visible (cover = left page folded over right page)
                                    - OPEN: Cover swings left, revealing right page + back of cover becomes left page
                                */}
                                    <div
                                        className="relative w-[288px] md:w-[360px] lg:w-[432px] xl:w-[504px] aspect-[3/4]"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* RIGHT PAGE (hidden under cover when closed) */}
                                        <div
                                            className="absolute inset-0 bg-[#f5f5f0] rounded-3xl"
                                            style={{
                                                transform: "translateZ(-1px)",
                                            }}
                                        />


                                        {/* COVER - 3D card flip */}
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{
                                                transformStyle: "preserve-3d",
                                                transformOrigin: "left center",
                                                rotateY: coverRotation,
                                            }}
                                        >
                                            {/* FRONT of cover (shows when 0-90deg) */}
                                            <div
                                                className="absolute inset-0 rounded-3xl overflow-hidden"
                                                style={{
                                                    backfaceVisibility: "hidden",
                                                    WebkitBackfaceVisibility: "hidden",
                                                    transform: "translateZ(1px)",
                                                    willChange: "transform",
                                                }}
                                            >
                                                {heroImageUrl ? (
                                                    <Image
                                                        src={heroImageUrl}
                                                        alt="Creative Process Book"
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-300 to-purple-400">
                                                        <p className="text-purple-900 text-sm text-center px-8">
                                                            Add hero image in Sanity CMS
                                                        </p>
                                                    </div>
                                                )}

                                            </div>

                                            {/* BACK of cover = LEFT PAGE (shows when 90-180deg) */}
                                            <div
                                                className="absolute inset-0 rounded-3xl bg-[#f5f5f0]"
                                                style={{
                                                    backfaceVisibility: "hidden",
                                                    WebkitBackfaceVisibility: "hidden",
                                                    transform: "rotateY(180deg) translateZ(0px)",
                                                    willChange: "transform",
                                                }}
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Project Carousel Slide Up Helper - LINKED TO SCROLL */}
                    <motion.div
                        className="absolute inset-0 z-20 bg-white overflow-y-auto"
                        style={{
                            y: carouselY,
                            opacity: carouselOpacity,
                            pointerEvents: "auto" // Always interactable since we want scroll to work
                        }}
                    >
                        {/* Render passed children (ProjectCarousel) here */}
                        {children}
                    </motion.div>

                </div>
            </div>
            {/* Spacer removed since content is now handled inside */}
        </div >
    );
}
