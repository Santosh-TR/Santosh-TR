"use client";

import { useEffect, useRef, useState } from "react";

interface TextScrambleProps {
    text: string;
    className?: string;
    scrambleOnHover?: boolean;
    scrambleOnMount?: boolean;
    duration?: number; // Total animation duration in ms
    characters?: string; // Character set to scramble through
}

/**
 * TextScramble Component
 * Creates a smooth "decryption" effect where random characters
 * resolve into the target text letter by letter.
 */
export default function TextScramble({
    text,
    className = "",
    scrambleOnHover = true,
    scrambleOnMount = false,
    duration = 800,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const scramble = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        startTimeRef.current = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Calculate how many characters should be "resolved" (from left to right)
            const resolvedCount = Math.floor(progress * text.length);

            // Build the display string
            let result = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i] === " ") {
                    // Preserve spaces
                    result += " ";
                } else if (i < resolvedCount) {
                    // Already resolved
                    result += text[i];
                } else {
                    // Still scrambling - use a random character
                    // Add some "settling" behavior near the resolve point
                    const distanceFromResolve = i - resolvedCount;
                    const chanceToResolve = 1 - (distanceFromResolve / (text.length - resolvedCount + 1));

                    if (Math.random() < chanceToResolve * 0.3) {
                        result += text[i]; // Occasionally flash the correct char
                    } else {
                        result += characters[Math.floor(Math.random() * characters.length)];
                    }
                }
            }

            setDisplayText(result);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(text); // Final state
                setIsAnimating(false);
            }
        };

        frameRef.current = requestAnimationFrame(animate);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    // Scramble on mount if enabled
    useEffect(() => {
        if (scrambleOnMount) {
            // Small delay to ensure component is visible
            const timeout = setTimeout(scramble, 100);
            return () => clearTimeout(timeout);
        }
    }, [scrambleOnMount]);

    // Update display text if prop changes
    useEffect(() => {
        if (!isAnimating) {
            setDisplayText(text);
        }
    }, [text, isAnimating]);

    return (
        <span
            className={className}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
            style={{
                fontVariantNumeric: 'tabular-nums', // Prevent width jitter
                display: 'inline-block'
            }}
        >
            {displayText}
        </span>
    );
}
