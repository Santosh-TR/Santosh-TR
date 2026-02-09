"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * Scroll-Triggered Reveal Animation
 * 
 * Reveals content as user scrolls into view
 */
export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: ScrollRevealProps) {

    const directionOffsets = {
        up: { x: 0, y: 50 },
        down: { x: 0, y: -50 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 },
    };

    const offset = directionOffsets[direction];

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1] // Custom easing
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Parallax Scroll Effect
 */
export function ParallaxScroll({
    children,
    speed = 0.5,
    className = ''
}: {
    children: ReactNode;
    speed?: number;
    className?: string;
}) {

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 1000]);

    return (
        <motion.div style={{ y }} className={className}>
            {children}
        </motion.div>
    );
}

/**
 * Stagger Children Animation
 */
export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className = ''
}: {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}) {

    const container = {
        hidden: { opacity: 0 },
        show: {
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
            whileInView="show"
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}

/**
 * Individual Stagger Item
 */
export function StaggerItem({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) {

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
}

/**
 * Scale on Scroll
 */
export function ScaleOnScroll({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) {

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <motion.div style={{ scale }} className={className}>
            {children}
        </motion.div>
    );
}
