"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface TextRevealProps {
    text: string;
    className?: string; // Additional classes for font size, weight, etc.
    delay?: number;     // Start delay in seconds
    stagger?: number;   // Delay between each char
}

export default function TextReveal({
    text,
    className,
    delay = 0,
    stagger = 0.025
}: TextRevealProps) {

    // Split text into words first to handle spacing/wrapping gracefully
    // Then split words into characters
    const words = text.split(" ");

    return (
        <h1 className={clsx("flex flex-wrap overflow-hidden leading-tight", className)}>
            {words.map((word, wIndex) => (
                <span key={wIndex} className="flex overflow-hidden mr-[0.25em]">
                    {word.split("").map((char, cIndex) => (
                        <motion.span
                            key={cIndex}
                            initial={{ y: "110%" }} // Start just below visible line
                            animate={{ y: "0%" }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1], // Custom "OSMO" easing
                                delay: delay + (wIndex * 0.1) + (cIndex * stagger)
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </h1>
    );
}
