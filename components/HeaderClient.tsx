"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Magnetic from "./ui/Magnetic";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderClientProps {
    data: {
        logoText: string;
        navLinks?: {
            label: string;
            link: string;
        }[];
        ctaLabel?: string;
        ctaLink?: string;
    };
}

export default function HeaderClient({ data }: HeaderClientProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Hide header on Sanity Studio routes
    if (pathname?.startsWith("/studio")) {
        return null;
    }

    // Scroll Detection
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Trigger animation when scrolled past 50% of the viewport height
                    // Calculate threshold dynamically to handle resizing or orientation changes if needed, 
                    // but using current window.innerHeight inside rAF is safer for performance than outside logic 
                    // if we want to be exact. Ideally we cache it.
                    setIsScrolled(window.scrollY > window.innerHeight * 0.5);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Optional: Add resize listener to update logic if we were caching height, 
        // but accessing innerHeight inside rAF frame is generally acceptable.

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper for consistency - Menu Animation (Heavy & Soothing): 1.1s duration + Smoother Expo Ease
    const MENU_TIMING = "duration-[1100ms] ease-[cubic-bezier(0.19,1,0.22,1)]";

    // Quick Fade for items disappearing - SAME BOUNCE but faster
    const FADE_OUT_TIMING = "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]";

    // Animation Variants for Staggered Links
    const containerVars = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
    };

    const linkVars = {
        initial: { y: "30%", opacity: 0, transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
        open: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0, 0.55, 0.45, 1] } }
    };

    return (
        <>
            {/* Dimmed Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-40",
                    MENU_TIMING, // Consistent timing
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <header
                className={clsx(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all",
                    // Width Logic: 
                    // Open: 95% (Standard timing)
                    // Scrolled: 
                    //    Mobile: STAYS 95% (User request: "Do not hide hit me up")
                    //    Desktop: 215px (Tight Wrap implementation)
                    // Default: 95% mobile (max 430px), 40% desktop
                    isOpen
                        ? `w-[95%] max-w-[430px] md:max-w-none ${MENU_TIMING}`
                        : isScrolled
                            ? `w-[95%] max-w-[430px] xl:w-[215px] xl:max-w-none ${MENU_TIMING}`
                            : `w-[95%] max-w-[430px] xl:w-[40%] xl:max-w-none ${MENU_TIMING}`
                )}
            >
                <div
                    className="flex flex-col rounded-[4px] border-[2px] border-white/15 overflow-hidden relative transition-colors duration-300"
                    style={{ backgroundColor: 'var(--color-header-bg)', color: 'var(--color-header-text)' }}
                >
                    {/* Top Bar */}
                    <div className={clsx(
                        "flex items-center justify-between py-3 relative z-20 h-[60px] transition-[padding]",
                        isScrolled && !isOpen ? "px-2 xl:px-1" : "px-2 max-[400px]:px-1 xl:px-4" // more padding on mobile/tablet (until XL)
                    )}
                    >

                        {/* Left: Menu Trigger */}
                        <div
                            className={clsx(
                                "flex items-center justify-start z-10 relative transition-all",
                                // Visibility Logic:
                                // Mobile: ALWAYS visible (opacity-100)
                                // Desktop: Fades out on scroll
                                isScrolled && !isOpen
                                    ? "xl:opacity-0 xl:-translate-x-10 xl:pointer-events-none opacity-100 translate-x-0"
                                    : "opacity-100 translate-x-0",

                                // Timing Logic (Desktop only really)
                                isScrolled && !isOpen
                                    ? "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-0"
                                    : "duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-100"
                            )}
                        >
                            <Magnetic>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 uppercase text-sm font-medium px-3 xl:px-4 h-[60px] -ml-1 sm:-ml-2 xl:-ml-3 whitespace-nowrap rounded-[4px] transition-all duration-300 hover:bg-white/10 active:bg-bg-primary active:text-text-primary active:scale-90 group"
                                >
                                    <div className="relative w-5 h-5 group-active:scale-0 transition-transform duration-200">
                                        <Menu className={clsx("w-5 h-5 absolute inset-0 transition-all duration-500", isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0")} />
                                        <X className={clsx("w-5 h-5 absolute inset-0 transition-all duration-500", isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")} />
                                    </div>
                                    <span className={clsx("inline-block pt-1 leading-none text-[10px] sm:text-sm")}>{isOpen ? "Close" : "Menu"}</span>
                                </button>
                            </Magnetic>
                        </div>

                        {/* Center: Logo */}
                        {/* 
                            Interaction Logic:
                            - Absolute position ensures it stays centered during width transitions.
                            - If Scrolled & Closed: Pointer events ON (Click to open menu).
                            - If Open/Top: Pointer events OFF (wrapper handles it) or standard behavior.
                         */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                            <Link
                                href={isOpen ? "/" : "#"}
                                onClick={(e) => {
                                    if (isScrolled && !isOpen) {
                                        // Desktop: prevent default if clicking shrunk logo to open menu
                                        // Mobile: It's just a link usually, but if we want consistent menu behavior?
                                        // Actually on mobile the MENU button is always there. So shrinking logic shouldn't apply.
                                        // We'll let it behave normally on mobile (link to home).
                                        if (window.innerWidth >= 768) {
                                            e.preventDefault();
                                            setIsOpen(true);
                                        }
                                    }
                                    if (isOpen) setIsOpen(false);
                                }}
                                className={clsx(
                                    "font-oswald tracking-tighter uppercase font-bold text-center leading-none pt-1 transition-colors duration-300 whitespace-nowrap",
                                    // SCALING: Smaller on mobile/tablet to prevent overlap until XL
                                    "text-[16px] max-[400px]:text-[16px] sm:text-[20px] xl:text-[40px]",
                                    "pointer-events-auto cursor-pointer",
                                    isScrolled && !isOpen ? "hover:text-primary" : ""
                                )}
                            >
                                {data.logoText || "OSMO"}
                            </Link>
                        </div>

                        {/* Right: CTA Buttons */}
                        <div
                            className={clsx(
                                "flex items-center justify-end gap-1 z-10 relative transition-all",
                                // Visibility Logic: Mobile ALWAYS visible
                                isScrolled && !isOpen
                                    ? "xl:opacity-0 xl:translate-x-10 xl:pointer-events-none opacity-100 translate-x-0"
                                    : "opacity-100 translate-x-0",

                                isScrolled && !isOpen
                                    ? "duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] delay-0"
                                    : "duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] delay-100"
                            )}
                        >
                            <Magnetic>
                                <Link
                                    href={data.ctaLink || "#"}
                                    className={clsx(
                                        "flex items-center justify-center h-[40px] text-sm uppercase rounded-[4px] font-bold transition-colors leading-none pb-[1px]",
                                        // SCALING: Smaller width on mobile/tablet
                                        "w-[70px] max-[400px]:w-[70px] max-[400px]:text-[9px] sm:w-[90px] xl:w-[120px] text-[10px] xl:text-sm"
                                    )}
                                    style={{
                                        backgroundColor: 'var(--color-header-button-bg)',
                                        color: 'var(--color-header-button-text)'
                                    }}
                                >
                                    Hit Me Up
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Mega Menu Content */}
                    <motion.div
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        variants={{
                            open: { height: "75vh", opacity: 1 },
                            closed: { height: 0, opacity: 0 }
                        }}
                        transition={
                            isScrolled && isOpen
                                ? { duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] } // Scrolled: Start early (15%) because Ease is fast
                                : { duration: 1.1, ease: [0.19, 1, 0.22, 1] } // Top: Sync full duration
                        }
                        className="overflow-hidden"
                    >
                        <div className="w-full h-full relative flex flex-col pt-2 border-t border-white/10">

                            {/* Quadrant Grid Container */}
                            <div className="flex-1 relative grid grid-cols-1 md:grid-cols-2 group/grid">

                                {/* Crosshair Lines (Desktop Only) - Animated Drawing */}
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    animate={isOpen ? { scaleY: 1 } : { scaleY: 0 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} // Premium "Expo" ease
                                    className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block origin-top"
                                />
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={isOpen ? { scaleX: 1 } : { scaleX: 0 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                    className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 hidden md:block origin-left"
                                />

                                {/* Reusable Quadrant Item Styles */}
                                {[{ label: "SANTOSH TR", href: "/", id: "01" },
                                { label: "ABOUT", href: "#about", id: "02" },
                                { label: "PROJECTS", href: "/projects", id: "03" },
                                { label: "CONTACT", href: "#contact", id: "04" }
                                ].map((item, i) => {
                                    // Dual Side Slide Logic:
                                    // Even index (Left Col) -> Slide from Left (-50px)
                                    // Odd index (Right Col) -> Slide from Right (+50px)
                                    const xOffset = i % 2 === 0 ? -50 : 50;

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: xOffset }}
                                            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: xOffset }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.22, 1, 0.36, 1], // Soft Premium Ease
                                                delay: isOpen ? 0.2 + (i * 0.1) : 0 // Wait for container (0.2s) + Stagger
                                            }}
                                            className="relative flex items-center justify-center p-8 border-b border-white/10 md:border-none group/item hover:bg-white/5 transition-colors duration-500 overflow-hidden"
                                        >
                                            {/* Ghost Text (Background) */}

                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="relative z-10 text-4xl md:text-7xl font-oswald font-bold uppercase text-osmo-paper transition-all duration-500 group-hover/grid:opacity-30 group-hover/item:!opacity-100 overflow-hidden block"
                                            >
                                                {/* Rolling Text Effect */}
                                                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/item:-translate-y-full">
                                                    {item.label}
                                                </span>
                                                <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/item:translate-y-0 text-primary">
                                                    {item.label}
                                                </span>
                                            </Link>

                                            {/* Corner Number (Re-added subtlety if needed, or keeping removed as per previous request? User said remove 1 2 3 4. I will stay removed.) */}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Footer: Socials */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                                className="h-[80px] flex items-center justify-center px-8 border-t border-white/10 mt-auto z-10 relative shrink-0 bg-bg-dark"
                            >

                                <div className="flex items-center gap-8 md:gap-12">
                                    {[
                                        { name: "Twitter / X", url: "#" },
                                        { name: "Instagram", url: "#" },
                                        { name: "LinkedIn", url: "#" }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.url}
                                            className="group flex items-center gap-2 text-xs md:text-sm font-medium uppercase text-white/60 hover:text-primary transition-colors"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                                            {social.name}
                                        </a>
                                    ))}
                                </div>


                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </header >
        </>
    );
}
