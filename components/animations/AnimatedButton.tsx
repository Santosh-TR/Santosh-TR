"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
    disabled?: boolean;
}

/**
 * Animated Button with Micro-Interactions
 * 
 * Features:
 * - Hover scale & glow
 * - Click feedback
 * - Disabled state
 * - Ripple effect
 */
export default function AnimatedButton({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
}: AnimatedButtonProps) {

    const baseStyles = 'px-6 py-3 rounded-lg font-oswald text-lg transition-colors relative overflow-hidden';

    const variantStyles = {
        primary: 'bg-osmo-acid text-osmo-carbon',
        secondary: 'bg-transparent border-2 border-osmo-acid text-osmo-acid',
        ghost: 'bg-transparent text-osmo-paper hover:text-osmo-acid',
    };

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(209, 248, 64, 0.5)',
            }}
            whileTap={{
                scale: 0.95,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
            }}
        >
            {/* Ripple effect background */}
            <motion.span
                className="absolute inset-0 bg-osmo-acid opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
            />

            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

/**
 * Animated Link with Underline
 */
export function AnimatedLink({
    href,
    children,
    className = ''
}: {
    href: string;
    children: ReactNode;
    className?: string;
}) {

    return (
        <motion.a
            href={href}
            className={`relative inline-block ${className}`}
            whileHover="hover"
            initial="initial"
        >
            <span className="relative z-10">{children}</span>

            {/* Animated underline */}
            <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-osmo-acid"
                variants={{
                    initial: { width: '0%' },
                    hover: { width: '100%' },
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.a>
    );
}

/**
 * Magnetic Button Effect
 */
export function MagneticButton({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) {

    return (
        <motion.button
            className={className}
            whileHover={{
                scale: 1.1,
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
            {children}
        </motion.button>
    );
}
