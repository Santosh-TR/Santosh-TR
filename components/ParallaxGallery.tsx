'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
    heading?: string;
    subheading?: string;
    image?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
    videoUrl?: string;
    overlayColor?: string;
    overlayOpacity?: number;
}

interface ParallaxGalleryProps {
    data: {
        title?: string;
        items?: GalleryItem[];
    };
}

const Card = ({ item, index, progress, total, targetScale }: { item: GalleryItem, index: number, progress: MotionValue<number>, total: number, targetScale: number }) => {

    // Logic for Vertical Stacking:
    // We split 0->1 scroll progress into chunks for each card.
    // Each card slides from '100vh' (bottom) to '0vh' (top) during its active chunk.

    const rangeStart = index * (1 / total);
    const rangeEnd = rangeStart + (1 / total);

    // Physics: "Heavy Momentum"
    // Use a spring to smooth out the scroll progress
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothProgress = useSpring(progress, springConfig);

    // Y position: slide up
    const y = useTransform(
        smoothProgress,
        [rangeStart, rangeEnd],
        ['100vh', '0vh']
    );

    // Scale: Zoom Out Effect (1.25 -> 1)
    // As the card slides UP (enters), the image shrinks to fit.
    // Finishes when 90% of the movement is done.
    const imageScale = useTransform(
        smoothProgress,
        [rangeStart, rangeEnd * 0.9], // Finish zoom slightly earlier (90%)
        [1.25, 1]
    );

    // The first card (index 0) is the base.
    // Logic: 
    // If index 0, it should be fully visible (y=0) BUT might want to scale as we scroll?
    // Actually, if it mimics the others, index 0 should just START fully zoomed out (1) if it's the base of the stack?
    // User requested "all images should have the zoom out effect".
    // If index 0 is static, maybe it scales *as the next one comes in*? (Pushback)
    // OR it scales from 1.25 -> 1 *during the first scroll chunk*? 
    // Let's assume the latter for "seamless flow".

    const finalY = index === 0 ? '0vh' : y;
    const finalScale = imageScale; // Apply strictly to ALL images based on their chunk

    return (
        <motion.div
            style={{
                y: finalY,
                zIndex: index
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center"
        >
            <div className="relative w-full h-full overflow-hidden">
                {/* Media */}
                {item.videoUrl ? (
                    <video
                        src={item.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full"
                    />
                ) : item.image?.asset?.url ? (
                    <motion.div style={{ scale: finalScale }} className="relative w-full h-full">
                        <Image
                            src={item.image.asset.url}
                            alt={item.image.alt || 'Gallery Image'}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </motion.div>
                ) : (
                    <div className="w-full h-full bg-osmo-carbon flex items-center justify-center text-white/20">
                        No Media
                    </div>
                )}

                {/* Overlay */}
                <div
                    className="absolute inset-0 z-10 transition-opacity duration-500"
                    style={{
                        backgroundColor: item.overlayColor || '#000000',
                        opacity: item.overlayOpacity ?? 0.3
                    }}
                />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                    {item.heading && (
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-oswald font-bold text-white mb-4 uppercase tracking-tighter shadow-black/50 drop-shadow-lg">
                            {item.heading}
                        </h2>
                    )}
                    {item.subheading && (
                        <p className="text-sm md:text-lg font-mono text-white/80 max-w-2xl shadow-black/50 drop-shadow-md">
                            {item.subheading}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default function ParallaxGallery({ data }: ParallaxGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { items } = data;

    // Calculate height based on number of items to control scroll speed/duration
    // 250vh per item gives a VERY slow, heavy scroll for each card.
    const itemsCount = items?.length || 0;
    const sectionHeight = `${itemsCount * 250}vh`;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Fix: Always render the ref so useScroll doesn't crash with "ref defined but not hydrated"
    if (!items || items.length === 0) {
        return <div ref={containerRef} className="hidden" />;
    }

    return (
        <section
            ref={containerRef}
            style={{ height: sectionHeight }}
            className="relative w-full bg-black"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {items.map((item, i) => (
                    <Card
                        key={i}
                        item={item}
                        index={i}
                        progress={scrollYProgress}
                        total={itemsCount}
                        targetScale={1}
                    />
                ))}
            </div>

            {/* Minimal Progress Indicator */}
            <motion.div
                className="fixed bottom-0 left-0 h-1 bg-white/50 z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </section>
    );
}
