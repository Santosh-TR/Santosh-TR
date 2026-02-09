"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
    project: any;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Initial Stagger Animation
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as any, // Custom Ease
                delay: index * 0.1
            }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="group relative w-full aspect-[4/5] md:aspect-[3/4] bg-bg-card/5 border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-colors duration-500"
        >
            {/* Image Layer */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full relative"
                >
                    {project.mainImage?.asset?.url ? (
                        <Image
                            src={project.mainImage.asset.url}
                            alt={project.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center font-mono text-xs">NO IMAGE</div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </motion.div>
            </div>

            {/* Content Layer */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end h-full">

                {/* Top: Year */}
                <div className="absolute top-6 right-6 text-xs font-mono text-text-muted border border-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                    {project.year || "2024"}
                </div>

                {/* Bottom: Info */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl font-oswald font-bold uppercase text-white mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-text-muted line-clamp-2 mb-4 group-hover:text-white transition-colors delay-75">
                        {project.tagline}
                    </p>

                    {/* Tech Stack Chips - Reveal on Hover */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        whileHover={{ opacity: 1, height: "auto" }}
                        className="flex flex-wrap gap-2 overflow-hidden"
                    >
                        {project.techStack?.map((tech: any) => (
                            <span key={tech._id} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/10 rounded text-primary">
                                {tech.name}
                            </span>
                        ))}
                    </motion.div>

                    {/* Action Buttons - Animated In */}
                    <div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {project.demoLink && (
                            <Link href={project.demoLink} target="_blank" className="flex items-center gap-2 text-xs font-bold uppercase hover:text-primary">
                                Live Demo <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        )}
                        {project.repoLink && (
                            <Link href={project.repoLink} target="_blank" className="flex items-center gap-2 text-xs font-bold uppercase hover:text-primary">
                                Code <Github className="w-3 h-3" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 rounded-lg pointer-events-none" />
        </motion.div>
    );
}
