"use client";

import { motion } from "framer-motion";

interface BookCoverProps {
    onClick: () => void;
}

export default function BookCover({ onClick }: BookCoverProps) {
    return (
        <motion.div
            onClick={onClick}
            className="book-cover group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                scale: 1.02,
            }}
        >
            {/* Main Book Container */}
            <div className="relative w-full h-full flex flex-col items-center justify-start p-8 md:p-12 lg:p-16 overflow-hidden rounded-xl">
                {/* Gradient Background - Matching Ribbit.dk */}
                <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background: 'linear-gradient(to bottom, #E8D5F5 0%, #D4B3F0 50%, #C49EE8 100%)',
                    }}
                />

                {/* Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-white/20" />

                {/* Shine Overlay */}
                <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    {/* Small Label */}
                    <motion.span
                        className="text-xs md:text-sm font-mono uppercase tracking-wider mb-4 md:mb-6"
                        style={{ color: '#5A3280' }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Santosh TR&apos;s Creative
                    </motion.span>

                    {/* Large Title */}
                    <motion.h1
                        className="font-oswald font-bold uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-8 md:mb-12"
                        style={{ color: '#2D1A47' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Projects
                    </motion.h1>

                    {/* Decorative Element - Footprint-inspired dots */}
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-8 md:mb-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="2" fill="#4A1B75" className="animate-pulse" style={{ animationDelay: "0ms" }} />
                            <circle cx="6" cy="12" r="1.5" fill="#4A1B75" opacity="0.6" className="animate-pulse" style={{ animationDelay: "200ms" }} />
                            <circle cx="18" cy="12" r="1.5" fill="#4A1B75" opacity="0.6" className="animate-pulse" style={{ animationDelay: "400ms" }} />
                        </svg>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        className="flex items-center gap-2 text-sm md:text-base font-medium group-hover:scale-105 transition-transform"
                        style={{ color: '#5A3280' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <span>Click to explore</span>
                        <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                    </motion.div>
                </div>

                {/* Bottom Hint (Mobile Only) */}
                <div className="absolute bottom-4 left-0 right-0 text-center md:hidden">
                    <span className="text-xs" style={{ color: '#5A3280', opacity: 0.6 }}>Tap to open</span>
                </div>
            </div>
        </motion.div>
    );
}
