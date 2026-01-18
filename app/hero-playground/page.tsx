"use client";

import { useState } from "react";
import HeroBlock from "@/components/HeroBlock";
import EffectsControlPanel from "@/components/EffectsControlPanel";

interface HeroEffects {
    dynamicGradientBackground: boolean;
    reflectionEffect: boolean;
    ambientParticles: boolean;
    edgeVignetteGlow: boolean;
    hapticFeedback: boolean;
    slideMetadata: boolean;
    activeSlideBorder: boolean;
    scrollTriggeredEntrance: boolean;
}

const DEFAULT_EFFECTS: HeroEffects = {
    dynamicGradientBackground: true,
    reflectionEffect: true,
    ambientParticles: false,
    edgeVignetteGlow: true,
    hapticFeedback: false,
    slideMetadata: false,
    activeSlideBorder: false,
    scrollTriggeredEntrance: false,
};

export default function HeroPlayground() {
    const [effects, setEffects] = useState<HeroEffects>(DEFAULT_EFFECTS);

    return (
        <div className="relative min-h-screen bg-osmo-carbon">
            {/* Info Banner */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-osmo-acid/10 border-b border-osmo-acid/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-white mb-1">
                                🎨 Hero Effects Playground
                            </h1>
                            <p className="text-sm text-white/60">
                                Toggle effects in real-time using the control panel →
                            </p>
                        </div>
                        <a
                            href="/"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium text-white transition-all duration-200"
                        >
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>

            {/* Hero Block with Configurable Effects */}
            <HeroBlock effectsConfig={effects} />

            {/* Control Panel */}
            <EffectsControlPanel
                effects={effects}
                onEffectsChange={setEffects}
            />

            {/* Instructions Overlay (Bottom) */}
            <div className="fixed bottom-6 left-6 z-40 max-w-md">
                <div className="bg-[#0D0D0D]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-osmo-acid mb-3">
                        💡 Quick Tips
                    </h3>
                    <ul className="space-y-2 text-xs text-white/60">
                        <li className="flex items-start gap-2">
                            <span className="text-osmo-acid">•</span>
                            <span>Use the control panel to toggle effects on/off</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-osmo-acid">•</span>
                            <span>Changes apply instantly without refresh</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-osmo-acid">•</span>
                            <span>Click "Reset" to restore default settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-osmo-acid">•</span>
                            <span>"Soon" badges indicate features not yet implemented</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
