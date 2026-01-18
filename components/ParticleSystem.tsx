"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    color: string;
}

interface ParticleSystemProps {
    particleCount?: number;
}

export default function ParticleSystem({ particleCount = 40 }: ParticleSystemProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.7 ? "186, 230, 55" : "255, 255, 255" // osmo-acid or white
                });
            }
        };
        initParticles();

        // Track mouse position
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Mouse repulsion
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = 150;

                if (distance < repelRadius) {
                    const force = (repelRadius - distance) / repelRadius;
                    particle.vx -= (dx / distance) * force * 0.3;
                    particle.vy -= (dy / distance) * force * 0.3;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Apply drag
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
                ctx.fill();

                // Draw subtle glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.radius * 3
                );
                gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(${particle.color}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(
                    particle.x - particle.radius * 3,
                    particle.y - particle.radius * 3,
                    particle.radius * 6,
                    particle.radius * 6
                );
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [particleCount]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-5"
            style={{
                mixBlendMode: "screen",
                opacity: 0.6
            }}
        />
    );
}
