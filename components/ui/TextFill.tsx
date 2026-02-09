"use client";

import { useState } from "react";
import clsx from "clsx";

interface TextFillProps {
    text: string;
    className?: string;
    fillColor?: string; // The color that fills in (default: acid green)
    baseColor?: string; // The base/outline color (default: current text color)
    duration?: number; // Animation duration in ms
}

/**
 * TextFill Component
 * Creates a "liquid fill" effect where color rises from bottom to top
 * like water filling a glass.
 */
export default function TextFill({
    text,
    className = "",
    fillColor = "var(--color-osmo-acid)",
    baseColor = "currentColor",
    duration = 400
}: TextFillProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={clsx("relative inline-block overflow-hidden", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                WebkitTextStroke: `1px ${baseColor}`,
                color: 'transparent'
            }}
        >
            {/* Base Text (Outline only) */}
            <span className="relative z-10">{text}</span>

            {/* Fill Layer (Clips from bottom to top) */}
            <span
                className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
                style={{
                    clipPath: isHovered
                        ? 'inset(0% 0% 0% 0%)'
                        : 'inset(100% 0% 0% 0%)',
                    transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    WebkitTextStroke: 'unset',
                    color: fillColor
                }}
                aria-hidden="true"
            >
                {text}
            </span>
        </span>
    );
}
