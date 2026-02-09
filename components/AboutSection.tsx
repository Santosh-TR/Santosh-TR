"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutSectionProps {
    data: {
        title?: string;
        bio?: string;
        profileImage?: any;
        stats?: { value: string; label: string }[];
    }
}

export default function AboutSection({ data }: AboutSectionProps) {
    if (!data) return null;

    return (
        <section className="relative w-full py-20 md:py-32 bg-bg-dark text-white overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* Left Column: Image (Sticky/parallax feel possible) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative aspect-[3/4] md:aspect-square w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 group"
                    >
                        {data.profileImage?.asset?.url ? (
                            <Image
                                src={data.profileImage.asset.url}
                                alt="Profile"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted font-mono">
                                [Profile Image]
                            </div>
                        )}

                        {/* Decorative Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Right Column: Bio & Content */}
                    <div className="flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-8xl font-oswald font-bold uppercase mb-8 leading-[0.9] text-primary"
                        >
                            {data.title || "About Me"}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-text-muted font-light leading-relaxed mb-12"
                        >
                            {data.bio || "No bio available yet."}
                        </motion.div>

                        {/* Stats Grid */}
                        {data.stats && data.stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                {data.stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                                    >
                                        <div className="text-4xl md:text-5xl font-oswald font-bold text-white mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-mono text-primary uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
