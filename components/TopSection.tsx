"use client";

import React from "react";
import clsx from "clsx";

export default function TopSection() {
    return (
        <section className="w-full h-screen flex items-center justify-center bg-black relative z-30">
            <div className="container mx-auto px-4 h-full border border-white/10 rounded-3xl flex items-center justify-center">
                <span className="text-white/20 font-mono">Section 1 Container</span>
            </div>
        </section>
    );
}
