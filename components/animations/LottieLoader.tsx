"use client";

import Lottie from 'lottie-react';

interface LottieLoaderProps {
    animationData?: any; // JSON animation data
    loop?: boolean;
    autoplay?: boolean;
    width?: number | string;
    height?: number | string;
    className?: string;
}

/**
 * Lottie Animation Loader
 * 
 * Usage:
 * 1. Download animation from https://lottiefiles.com/
 * 2. Save JSON to public/lottie/
 * 3. Import and pass as animationData
 * 
 * Example:
 * import loadingAnimation from '@/public/lottie/loading.json';
 * <LottieLoader animationData={loadingAnimation} />
 */
export default function LottieLoader({
    animationData,
    loop = true,
    autoplay = true,
    width = 200,
    height = 200,
    className = '',
}: LottieLoaderProps) {

    // Default loading animation (spinning circle)
    const defaultAnimation = {
        v: "5.7.4",
        fr: 30,
        ip: 0,
        op: 60,
        w: 100,
        h: 100,
        nm: "Loading",
        ddd: 0,
        assets: [],
        layers: [{
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Circle",
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] },
                p: { a: 0, k: [50, 50, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] }
            },
            ao: 0,
            shapes: [{
                ty: "gr",
                it: [{
                    ty: "el",
                    p: { a: 0, k: [0, 0] },
                    s: { a: 0, k: [80, 80] }
                }, {
                    ty: "st",
                    c: { a: 0, k: [0.82, 0.97, 0.25, 1] }, // Acid green
                    o: { a: 0, k: 100 },
                    w: { a: 0, k: 8 },
                    lc: 2,
                    lj: 1
                }]
            }],
            ip: 0,
            op: 60,
            st: 0,
        }]
    };

    return (
        <div className={`lottie-container ${className}`} style={{ width, height }}>
            <Lottie
                animationData={animationData || defaultAnimation}
                loop={loop}
                autoplay={autoplay}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
