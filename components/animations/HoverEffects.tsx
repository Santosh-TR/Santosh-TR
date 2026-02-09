"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Hover Card with 3D Tilt Effect
 */
export default function HoverCard({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) {

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
        const rotY = ((x - centerX) / centerX) * 10;

        setRotateX(rotX);
        setRotateY(rotY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            className={`perspective-1000 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: "preserve-3d",
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(209, 248, 64, 0.3)",
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Glow on Hover Effect
 */
export function GlowCard({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) {

    return (
        <motion.div
            className={`relative ${className}`}
            whileHover={{
                boxShadow: "0 0 40px rgba(209, 248, 64, 0.6)",
            }}
            transition={{ duration: 0.3 }}
        >
            {children}

            {/* Animated glow border */}
            <motion.div
                className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, #D1F840, transparent, #D1F840)",
                    filter: "blur(10px)",
                }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

/**
 * Pulse Effect
 */
export function PulseEffect({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) {

    return (
        <motion.div
            className={className}
            animate={{
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Shake on Hover
 */
export function ShakeOnHover({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) {

    return (
        <motion.div
            className={className}
            whileHover={{
                rotate: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.5 },
            }}
        >
            {children}
        </motion.div>
    );
}
