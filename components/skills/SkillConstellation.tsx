"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Skill {
    _id: string;
    name: string;
    icon?: any;
    category: string;
    proficiency: number;
    description?: string;
    position?: { x: number; y: number };
}

interface SkillConstellationProps {
    skills: Skill[];
    enableParticles?: boolean;
}

export default function SkillConstellation({ skills, enableParticles }: SkillConstellationProps) {
    const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Group skills by category for fallback layout if no custom positions
    const categories = ["frontend", "backend", "design", "tools"];

    // Mouse parallax effect (simple)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-bg-dark/50"
        >
            {/* Background Grid/Lines Effect could go here */}

            <div className="relative w-full h-full max-w-[1400px] mx-auto p-10">
                {skills.map((skill, index) => {
                    // Calculate Position usually based on data or random distribution
                    // For now, let's distribute them in a spiral or grid if no position data
                    const isEven = index % 2 === 0;
                    // Mock positioning logic if missing (simplified for MVP)
                    const randomX = Math.random() * 80 + 10;
                    const randomY = Math.random() * 80 + 10;

                    const left = skill.position?.x ?? randomX; // Default to random if undefined
                    const top = skill.position?.y ?? randomY;

                    return (
                        <motion.div
                            key={skill._id}
                            className="absolute"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                            }}
                            animate={{
                                x: mousePos.x * 20 * (index % 5 + 1), // Parallax layer
                                y: mousePos.y * 20 * (index % 5 + 1),
                            }}
                            transition={{ type: "tween", ease: "linear", duration: 0 }}
                        >
                            <SkillNode
                                skill={skill}
                                isHovered={hoveredSkill?._id === skill._id}
                                onMouseEnter={() => setHoveredSkill(skill)}
                                onMouseLeave={() => setHoveredSkill(null)}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Info Card Overlay when hovering */}
            <AnimatePresence>
                {hoveredSkill && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-bg-card border border-white/10 p-6 rounded-xl shadow-2xl backdrop-blur-md w-[300px] z-50"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            {hoveredSkill.icon && (<div className="w-10 h-10 relative">
                                <Image
                                    src={urlFor(hoveredSkill.icon).width(64).url()}
                                    alt={hoveredSkill.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>)}
                            <div>
                                <h3 className="text-xl font-oswald font-bold text-primary">{hoveredSkill.name}</h3>
                                <div className="text-xs text-text-muted uppercase tracking-wider">{hoveredSkill.category}</div>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {hoveredSkill.description || "Expertise in this technology."}
                        </p>
                        <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${hoveredSkill.proficiency}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SkillNode({ skill, isHovered, onMouseEnter, onMouseLeave }: any) {
    return (
        <motion.div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            initial={{ scale: 0 }}
            animate={{
                scale: isHovered ? 1.5 : 1,
                zIndex: isHovered ? 50 : 1,
                borderColor: isHovered ? "var(--color-primary)" : "rgba(255,255,255,0.1)"
            }}
            whileHover={{ scale: 1.2 }}
            className={clsx(
                "w-16 h-16 md:w-20 md:h-20 rounded-full glass-panel flex items-center justify-center cursor-pointer relative group transition-colors duration-300",
                "border border-white/10 bg-white/5 backdrop-blur-sm shadow-glow"
            )}
        >
            {skill.icon ? (
                <div className="w-8 h-8 md:w-10 md:h-10 relative opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image
                        src={urlFor(skill.icon).width(64).url()}
                        alt={skill.name}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <span className="text-xs font-bold">{skill.name.substring(0, 2)}</span>
            )}

            {/* Pulsing Ring */}
            <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
    );
}
