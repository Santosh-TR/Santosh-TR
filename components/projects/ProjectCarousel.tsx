"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProjectCarouselProps {
    projects: any[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 340; // Approx card width + gap
            if (direction === "left") {
                current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    return (
        <div className="relative w-full flex items-center justify-center">
            {/* Navigation Buttons - Absolute Sides */}
            <div className="absolute left-0 z-10 hidden md:block">
                <button
                    onClick={() => scroll("left")}
                    className="p-4 rounded-full bg-[#FF4400] text-white hover:bg-[#E03C00] transition-colors shadow-none"
                    aria-label="Scroll left"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute right-0 z-10 hidden md:block">
                <button
                    onClick={() => scroll("right")}
                    className="p-4 rounded-full bg-[#FF4400] text-white hover:bg-[#E03C00] transition-colors shadow-none"
                    aria-label="Scroll right"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollContainerRef}
                className="flex flex-col md:flex-row gap-8 md:overflow-x-auto pb-4 snap-y md:snap-x snap-mandatory scrollbar-hide items-center md:items-center px-12"
            >
                {projects.map((project, index) => {
                    const imageUrl = project.mainImage
                        ? urlFor(project.mainImage).width(600).height(800).url()
                        : null;

                    return (
                        <div key={project._id} className="snap-center flex flex-col items-center flex-shrink-0 transition-opacity duration-300">
                            {/* Flat Card Image - No Book Effect */}
                            <div className="mb-6 shadow-none flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px] aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Metadata below card */}
                            <div className="w-[240px] md:w-[280px] lg:w-[320px] text-center">
                                <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                                <p className="text-sm text-gray-500 font-mono mb-2">{project.tagline}</p>
                                <p className="text-xs text-[#FF4400] font-bold">{project.year || "2024"}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                    {project.techStack?.slice(0, 3).map((tech: any) => (
                                        <span key={tech._id} className="text-[10px] uppercase tracking-wider border border-black/10 px-2 py-1 rounded text-gray-500">
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
