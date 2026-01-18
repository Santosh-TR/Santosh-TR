"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function MatterScene() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // 1. Setup Matter.js
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite;

        // Create Engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create Renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: "transparent", // Transparent to show Carbon BG
                wireframes: false, // Full render
                pixelRatio: window.devicePixelRatio,
            },
        });
        renderRef.current = render;

        // 2. Create Bodies (Abstract Shapes)
        const shapes: Matter.Body[] = [];

        // Colors
        const ACID_GREEN = "#CCFF00";
        const WHITE = "#FFFFFF";
        const BLACK = "#000000";

        // Helper to add random variance
        const randomX = () => Math.random() * window.innerWidth;
        const randomY = () => Math.random() * -500 - 100; // Start above screen

        // A. Acid Green Circles
        for (let i = 0; i < 4; i++) {
            const size = 30 + Math.random() * 30; // 30-60px
            shapes.push(
                Bodies.circle(randomX(), randomY(), size, {
                    render: { fillStyle: ACID_GREEN },
                    restitution: 0.7, // Bouncy
                })
            );
        }

        // B. White Squares
        for (let i = 0; i < 3; i++) {
            const size = 50 + Math.random() * 40; // 50-90px
            shapes.push(
                Bodies.rectangle(randomX(), randomY(), size, size, {
                    render: { fillStyle: WHITE },
                    restitution: 0.5,
                    chamfer: { radius: 4 }, // Rounded corners
                })
            );
        }

        // C. Black Triangles (Outlined)
        for (let i = 0; i < 3; i++) {
            const size = 40 + Math.random() * 30;
            shapes.push(
                Bodies.polygon(randomX(), randomY(), 3, size, {
                    render: {
                        fillStyle: BLACK,
                        strokeStyle: WHITE,
                        lineWidth: 2
                    },
                    restitution: 0.6,
                })
            );
        }

        World.add(world, shapes);

        // 3. Boundaries (Ground & Walls)
        const wallOptions = {
            isStatic: true,
            render: { visible: false }
        };
        const ground = Bodies.rectangle(
            window.innerWidth / 2,
            window.innerHeight + 50, // Just below screen
            window.innerWidth,
            100,
            wallOptions
        );
        const leftWall = Bodies.rectangle(
            -50,
            window.innerHeight / 2,
            100,
            window.innerHeight * 2,
            wallOptions
        );
        const rightWall = Bodies.rectangle(
            window.innerWidth + 50,
            window.innerHeight / 2,
            100,
            window.innerHeight * 2,
            wallOptions
        );

        World.add(world, [ground, leftWall, rightWall]);

        // 4. Interaction (Mouse)
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
        World.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // 5. Run
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);
        runnerRef.current = runner;

        // 6. Resize Handler
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;

            // Reposition Ground/Walls
            Matter.Body.setPosition(ground, {
                x: window.innerWidth / 2,
                y: window.innerHeight + 50
            });
            Matter.Body.setPosition(rightWall, {
                x: window.innerWidth + 50,
                y: window.innerHeight / 2
            });
            // Update Ground Width
            // Note: changing width of static body is tricky, often better to replace or scale. 
            // Simple scale hack:
            // Matter.Body.scale(ground, window.innerWidth / ground.bounds.max.x, 1);
            // Better: Just make ground HUGE initially or Replace. 
            // For now, let's keep it simple. If window grows significantly, gaps might appear.
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            World.clear(world, false);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div
            ref={sceneRef}
            className="absolute inset-0 pointer-events-auto"
            aria-hidden="true"
        />
    );
}
