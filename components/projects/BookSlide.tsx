"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface BookSlideProps {
    project: any;
    index: number;
    hideTitle?: boolean; // New prop to control title visibility
}

export default function BookSlide({ project, index, hideTitle = false }: BookSlideProps) {
    const [isOpen, setIsOpen] = useState(false);

    // We use a simple boolean state to trigger the "open" animation
    // The animation values will drive the 3D flip

    // Animation variants for the book container (centering/scaling)
    const containerVariants = {
        closed: {
            scale: 1,
            x: 0,
            zIndex: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
        },
        open: {
            scale: 1.1, // Slight scale up, not too huge to avoid overflow in carousel
            zIndex: 50, // Bring to front
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    // Animation variants for the cover rotation (0 to -180 degrees)
    const coverVariants = {
        closed: {
            rotateY: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
        },
        open: {
            rotateY: -180,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    // Animation variants for the book translation (shifting right to center the content)
    // When cover opens (-180), the book needs to shift right to keep the visual center
    const bookTranslateVariants = {
        closed: {
            x: "0%",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
        },
        open: {
            x: "100%", // Shift right by FULL width to mimic BookContainer logic
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Get image URL
    const imageUrl = project.mainImage
        ? urlFor(project.mainImage).width(600).height(800).url()
        : null;

    return (
        <div className="relative flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px] perspective-[2000px] group">
            {/* Title below book - only visible when closed AND hideTitle is false */}
            {!hideTitle && (
                <motion.div
                    className="absolute -bottom-12 left-0 right-0 text-center"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                >
                    <h3 className="text-gray-900 font-bold text-lg truncate">{project.title}</h3>
                    <p className="text-gray-500 text-sm">{project.year || "2024"}</p>
                </motion.div>
            )}

            <motion.div
                className="relative w-full aspect-[3/4] cursor-pointer"
                variants={containerVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                onClick={handleToggle}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* X Translation wrapper - slides book right as it opens */}
                <motion.div
                    className="w-full h-full"
                    variants={bookTranslateVariants}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* RIGHT PAGE (Base) */}
                    <div
                        className="absolute inset-0 bg-[#f5f5f0] rounded-r-xl shadow-lg border-l border-gray-200"
                        style={{ transform: "translateZ(-1px)" }}
                    >
                        {/* Content for the right page (Project Info) */}
                        <div className="p-6 flex flex-col h-full overflow-hidden text-left">
                            <h4 className="font-bold text-xl mb-2 text-gray-900">{project.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-6 mb-4">{project.tagline}</p>

                            {/* Demo/Repo Links */}
                            <div className="flex gap-3 mt-2">
                                {project.demoLink && (
                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                                        className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors">
                                        Live Demo
                                    </a>
                                )}
                                {project.repoLink && (
                                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
                                        className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors">
                                        Code
                                    </a>
                                )}
                            </div>

                            <div className="mt-auto">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                                    Click to close
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* COVER (The flipping part) */}
                    <motion.div
                        className="absolute inset-0"
                        variants={coverVariants}
                        style={{
                            transformStyle: "preserve-3d",
                            transformOrigin: "left center"
                        }}
                    >
                        {/* FRONT OF COVER (Image) */}
                        <div
                            className="absolute inset-0 bg-[#fff] rounded-r-xl overflow-hidden shadow-xl"
                            style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                            }}
                        >
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    No Cover
                                </div>
                            )}

                            {/* Inner spin/binding shadow overlay */}
                            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                        </div>

                        {/* BACK OF COVER (Left Page Content) */}
                        <div
                            className="absolute inset-0 bg-[#f5f5f0] rounded-l-xl overflow-hidden border-r border-gray-200"
                            style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                            }}
                        >
                            <div className="p-6 flex flex-col h-full justify-center items-center text-center">
                                {/* Tech Stack or Summary */}
                                <h5 className="font-bold text-gray-900 mb-4">Tech Stack</h5>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {project.techStack?.map((tech: any) => (
                                        <span key={tech._id} className="text-xs border border-gray-300 px-2 py-1 rounded bg-white">
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
