"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Dimmed Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-800 z-40",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <header
                className={clsx(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-[800ms]",
                    isOpen ? "w-[95%] ease-[cubic-bezier(0.4,0,0.2,1)]" : "w-[95%] md:w-[40%] delay-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                )}
            >
                <div className="flex flex-col bg-osmo-carbon text-osmo-paper rounded-[4px] border border-white/10 overflow-hidden relative">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between px-4 py-3 relative z-20 bg-osmo-carbon h-[60px]">
                        {/* Left: Menu Trigger */}
                        <div className="flex items-center justify-start z-10 relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 uppercase text-sm font-medium px-4 h-[60px] -ml-3 rounded-[4px] transition-all duration-300 hover:bg-white/10 active:bg-osmo-paper active:text-osmo-carbon active:scale-90 group"
                            >
                                <div className="relative w-5 h-5 group-active:scale-0 transition-transform duration-200">
                                    <Menu className={clsx("w-5 h-5 absolute inset-0 transition-all duration-500", isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0")} />
                                    <X className={clsx("w-5 h-5 absolute inset-0 transition-all duration-500", isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")} />
                                </div>
                                <span className="hidden md:inline-block pt-1 leading-none">{isOpen ? "Close" : "Menu"}</span>
                            </button>
                        </div>

                        {/* Center: Logo (Absolute to prevent jitter) */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
                            <Link href="/" className="font-oswald text-[40px] tracking-tighter uppercase font-bold text-center pointer-events-auto leading-none pt-1">
                                {data.logoText || "OSMO"}
                            </Link>
                        </div>

                        {/* Right: CTA Buttons */}
                        <div className="flex items-center justify-end gap-1 z-10 relative">
                            <Link
                                href={data.ctaLink || "#"}
                                className="flex items-center justify-center w-[120px] h-[40px] text-sm uppercase bg-osmo-acid text-osmo-carbon rounded-[4px] font-bold hover:bg-[#c2e630] transition-colors leading-none pb-[1px]"
                            >
                                Hit Me Up
                            </Link>
                        </div>
                    </div>

                    {/* Mega Menu Content */}
                    <div
                        className={clsx(
                            "grid grid-rows-[0fr] transition-all duration-800",
                            isOpen ? "grid-rows-[1fr] delay-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]" : "delay-0 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        )}
                    >
                        <div className="overflow-hidden relative"> {/* Added relative for the line positioning */}

                            {/* THE LASER LINE: Animated Separator */}
                            <div
                                className={clsx(
                                    "absolute top-0 left-0 w-full h-[1px] origin-center transition-all duration-1000",
                                    isOpen ? "scale-x-100 bg-white/10 delay-100" : "scale-x-0 bg-white delay-0"
                                )}
                            />

                            <div
                                className={clsx(
                                    "p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 min-h-[400px] transition-all will-change-transform origin-top",
                                    isOpen ? "opacity-100 translate-y-0 scale-y-100 duration-800 delay-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]" : "opacity-100 translate-y-[15%] scale-y-[1.05] duration-800 delay-0 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                )}>

                                {/* Column 1: Navigation Links (Span 3) */}
                                <nav className="flex flex-col gap-2 md:col-span-3">
                                    <p className="text-sm text-white/40 uppercase mb-4 tracking-wider">Navigation</p>
                                    {data.navLinks?.map((nav, i) => (
                                        <Link
                                            key={i}
                                            href={`/${nav.link}`}
                                            onClick={() => setIsOpen(false)}
                                            className="text-5xl md:text-[40px] font-oswald uppercase leading-none relative group w-fit"
                                        >
                                            <span className="relative z-10 group-hover:text-osmo-acid transition-colors duration-300">
                                                {nav.label}
                                            </span>
                                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-osmo-acid transform origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                                        </Link>
                                    ))}
                                </nav>

                                {/* Column 2: Resources (Span 3) */}
                                <div className="flex flex-col gap-4 md:col-span-3">
                                    <p className="text-sm text-white/40 uppercase mb-4 tracking-wider">Resources</p>
                                    {["Showcase", "Component Library", "Interactions", "Templates"].map((item, i) => (
                                        <Link key={i} href="#" className="text-xl uppercase leading-none relative group w-fit">
                                            <span className="relative z-10 group-hover:text-osmo-acid transition-colors duration-300">{item}</span>
                                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-osmo-acid transform origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                                        </Link>
                                    ))}
                                </div>

                                {/* Column 3: Socials (Span 2) */}
                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <p className="text-sm text-white/40 uppercase mb-4 tracking-wider">Socials</p>
                                    {["Twitter / X", "Instagram", "LinkedIn", "YouTube"].map((item, i) => (
                                        <a key={i} href="#" className="text-xl uppercase leading-none relative group w-fit">
                                            <span className="relative z-10 group-hover:text-osmo-acid transition-colors duration-300">{item}</span>
                                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-osmo-acid transform origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:origin-left group-hover:scale-x-100" />
                                        </a>
                                    ))}
                                </div>

                                {/* Column 4: Images (Span 4) */}
                                <div className="flex flex-col gap-4 md:col-span-4 justify-end">
                                    <div className="aspect-video bg-white/5 rounded-sm border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/20 uppercase tracking-widest group-hover:text-osmo-acid transition-colors">
                                            Image Placeholder
                                        </div>
                                    </div>
                                    <div className="aspect-video bg-white/5 rounded-sm border border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/20 uppercase tracking-widest group-hover:text-osmo-acid transition-colors">
                                            Image Placeholder
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
