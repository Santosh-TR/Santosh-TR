"use client";

import { useEffect } from "react";

export function UseMousePosition() {
    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            // Update CSS variables on the root element
            // This allows CSS (like radial-gradients) to react instantly without React re-renders
            document.documentElement.style.setProperty("--mouse-x", `${ev.clientX}px`);
            document.documentElement.style.setProperty("--mouse-y", `${ev.clientY}px`);

            // Percentage based values (0 to 1) for parallax calculations
            const xPercent = ev.clientX / window.innerWidth;
            const yPercent = ev.clientY / window.innerHeight;

            document.documentElement.style.setProperty("--mouse-x-pct", `${xPercent}`);
            document.documentElement.style.setProperty("--mouse-y-pct", `${yPercent}`);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return null; // This component renders nothing, just attaches the listener
}
