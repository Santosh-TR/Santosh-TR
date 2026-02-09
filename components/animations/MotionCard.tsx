"use client";

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    variant?: 'fade' | 'slide' | 'scale' | 'bounce';
}

const cardVariants: Record<string, Variants> = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slide: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    bounce: {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
            }
        },
    },
};

/**
 * Animated Card with Framer Motion
 * 
 * Features:
 * - Entrance animations
 * - Hover scale
 * - Click feedback
 * - Scroll-triggered
 * 
 * Usage:
 * <MotionCard variant="slide" delay={0.2}>
 *   <YourContent />
 * </MotionCard>
 */
export default function MotionCard({
    children,
    className = '',
    delay = 0,
    variant = 'slide',
}: MotionCardProps) {

    return (
        <motion.div
            className={className}
            variants={cardVariants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.5,
                delay,
                ease: "easeOut"
            }}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 }
            }}
            whileTap={{
                scale: 0.98
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Stagger Container - Animates children one by one
 */
export function MotionStagger({
    children,
    className = '',
    staggerDelay = 0.1
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}
