"use client";

import { useState } from "react";
import clsx from "clsx";
import { Settings, X, RotateCcw } from "lucide-react";

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

interface EffectsControlPanelProps {
    effects: HeroEffects;
    onEffectsChange: (effects: HeroEffects) => void;
}

const EFFECT_GROUPS = [
    {
        title: "Content & Particles",
        effects: [
            { key: "ambientParticles", label: "Ambient Particles", implemented: true },
        ]
    }
];

const DEFAULT_EFFECTS: HeroEffects = {
    dynamicGradientBackground: false,
    reflectionEffect: false,
    ambientParticles: true,
    edgeVignetteGlow: false,
    hapticFeedback: false,
    slideMetadata: false,
    activeSlideBorder: false,
    scrollTriggeredEntrance: false,
};

export default function EffectsControlPanel({ effects, onEffectsChange }: EffectsControlPanelProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const activeCount = Object.values(effects).filter(Boolean).length;

    const handleToggle = (key: keyof HeroEffects) => {
        onEffectsChange({
            ...effects,
            [key]: !effects[key]
        });
    };

    const handleReset = () => {
        onEffectsChange(DEFAULT_EFFECTS);
    };

    return (
        <div className="fixed top-24 right-6 z-50 w-80">
            {/* Collapsed State - Icon Button */}
            {isCollapsed ? (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="ml-auto flex items-center gap-2 px-4 py-3 bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-osmo-acid/50 transition-all duration-300 group"
                >
                    <Settings className="w-5 h-5 text-osmo-acid group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-sm font-medium text-white">
                        Effects ({activeCount}/8)
                    </span>
                </button>
            ) : (
                /* Expanded Panel */
                <div className="bg-[#0D0D0D]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Settings className="w-5 h-5 text-osmo-acid" />
                            <h3 className="text-lg font-semibold text-white">
                                Hero Effects
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsCollapsed(true)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-white/60" />
                        </button>
                    </div>

                    {/* Active Count Badge */}
                    <div className="mb-6 p-3 bg-osmo-acid/10 border border-osmo-acid/20 rounded-xl">
                        <p className="text-sm text-osmo-acid text-center font-medium">
                            {activeCount} of 8 effects active
                        </p>
                    </div>

                    {/* Effect Groups */}
                    <div className="space-y-6 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        {EFFECT_GROUPS.map((group, groupIdx) => (
                            <div key={groupIdx}>
                                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                                    {group.title}
                                </h4>
                                <div className="space-y-2">
                                    {group.effects.map((effect) => {
                                        const isActive = effects[effect.key as keyof HeroEffects];
                                        return (
                                            <div
                                                key={effect.key}
                                                className={clsx(
                                                    "flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                                                    isActive ? "bg-osmo-acid/5 border border-osmo-acid/20" : "bg-white/5 border border-transparent hover:border-white/10"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={clsx(
                                                        "text-sm font-medium transition-colors",
                                                        isActive ? "text-white" : "text-white/60"
                                                    )}>
                                                        {effect.label}
                                                    </span>
                                                    {!effect.implemented && (
                                                        <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">
                                                            Soon
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Toggle Switch */}
                                                <button
                                                    onClick={() => handleToggle(effect.key as keyof HeroEffects)}
                                                    disabled={!effect.implemented}
                                                    className={clsx(
                                                        "relative w-11 h-6 rounded-full transition-all duration-300",
                                                        isActive ? "bg-osmo-acid" : "bg-white/10",
                                                        !effect.implemented && "opacity-50 cursor-not-allowed"
                                                    )}
                                                >
                                                    <div
                                                        className={clsx(
                                                            "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-lg",
                                                            isActive && "transform translate-x-5"
                                                        )}
                                                    />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-osmo-acid/50 rounded-xl transition-all duration-200 group"
                    >
                        <RotateCcw className="w-4 h-4 text-white/60 group-hover:text-osmo-acid group-hover:rotate-180 transition-all duration-300" />
                        <span className="text-sm font-medium text-white/80 group-hover:text-white">
                            Reset to Defaults
                        </span>
                    </button>
                </div>
            )}

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(186, 230, 55, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(186, 230, 55, 0.5);
                }
            `}</style>
        </div>
    );
}
