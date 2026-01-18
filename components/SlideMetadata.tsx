"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

interface SlideMetadataProps {
    title: string;
    description?: string;
    isActive: boolean;
}

export default function SlideMetadata({ title, description, isActive }: SlideMetadataProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isActive) {
            // Show metadata when slide becomes active
            setIsVisible(true);

            // Auto-hide after 3 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [isActive]);

    return (
        <div
            className="absolute bottom-6 left-6 z-30 pointer-events-none transition-all duration-500"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
        >
            <div className="bg-[#0D0D0D]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 min-w-[200px] max-w-[300px]">
                <h3 className="text-lg font-bold text-osmo-acid mb-1">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-white/60">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
