"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface AnimatedSphereProps {
    color?: string;
    speed?: number;
    distort?: number;
}

function AnimatedSphere({
    color = '#D1F840',
    speed = 1,
    distort = 0.4
}: AnimatedSphereProps) {

    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Rotate sphere
        meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
        meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;

        // Subtle scale animation
        const scale = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
    });

    return (
        <Sphere ref={meshRef} args={[1, 100, 200]}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={distort}
                speed={speed}
                roughness={0.2}
            />
        </Sphere>
    );
}

interface SkillSphere3DProps {
    className?: string;
    color?: string;
    enableControls?: boolean;
}

/**
 * 3D Skill Sphere with Three.js
 * 
 * Features:
 * - Animated distortion
 * - Auto-rotation
 * - Mouse controls (optional)
 * - Acid green color
 * 
 * Usage:
 * <SkillSphere3D color="#D1F840" />
 * 
 * IMPORTANT: Use dynamic import to avoid SSR issues!
 * const SkillSphere3D = dynamic(() => import('./SkillSphere3D'), { ssr: false });
 */
export default function SkillSphere3D({
    className = '',
    color = '#D1F840',
    enableControls = true
}: SkillSphere3DProps) {

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D1F840" />

                {/* 3D Sphere */}
                <AnimatedSphere color={color} speed={1} distort={0.4} />

                {/* Optional mouse controls */}
                {enableControls && (
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1}
                    />
                )}
            </Canvas>
        </div>
    );
}
