"use client";

import { useState, useEffect } from "react";
import { THEME_CONFIG, ThemeConfig } from "@/config/theme";
import { X, Copy, Check, Settings, ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";

export default function ThemeEditor() {
    const [isVisible, setIsVisible] = useState(false);
    const [config, setConfig] = useState<ThemeConfig>(THEME_CONFIG);
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>("Global");

    // Apply Changes Live
    useEffect(() => {
        const root = document.documentElement;

        // --- GLOBAL (New System) ---
        root.style.setProperty('--color-primary', config.colors.primary);


        root.style.setProperty('--color-bg-primary', config.colors.background.primary);
        root.style.setProperty('--color-bg-dark', config.colors.background.dark);
        root.style.setProperty('--color-text-primary', config.colors.text.primary);

        // --- HEADER ---
        if (config.colors.components?.header?.background) {
            root.style.setProperty('--color-header-bg', config.colors.components.header.background);
        }
        if (config.colors.components?.header?.text) {
            root.style.setProperty('--color-header-text', config.colors.components.header.text);
        }
        // Button
        if ((config.colors.components?.header as any)?.buttonBg) {
            root.style.setProperty('--color-header-button-bg', (config.colors.components.header as any).buttonBg);
        }
        if ((config.colors.components?.header as any)?.buttonText) {
            root.style.setProperty('--color-header-button-text', (config.colors.components.header as any).buttonText);
        }

        // --- HERO ---
        if (config.colors.components?.hero?.innerDrumBackground) {
            root.style.setProperty('--color-hero-inner', config.colors.components.hero.innerDrumBackground);
        }
        if (config.colors.components?.hero?.outerBoxBackground) {
            root.style.setProperty('--color-hero-outer', config.colors.components.hero.outerBoxBackground);
        }
        // Use generic 'text' property on hero object if we want standardizing, or just check general text
        // For now, let's assume we add a 'text' property to hero config in memory
        if ((config.colors.components?.hero as any)?.text) {
            root.style.setProperty('--color-hero-text', (config.colors.components?.hero as any).text);
        }
        // Scroll Button
        if ((config.colors.components?.hero as any)?.scrollBg) {
            root.style.setProperty('--color-hero-scroll-bg', (config.colors.components?.hero as any).scrollBg);
        }
        if ((config.colors.components?.hero as any)?.scrollIcon) {
            root.style.setProperty('--color-hero-scroll-icon', (config.colors.components?.hero as any).scrollIcon);
        }

        // Pagination
        if (config.colors.components?.hero?.pagination) {
            root.style.setProperty('--color-pagination-dot', config.colors.components.hero.pagination);
        } else {
            root.style.setProperty('--color-pagination-dot', config.colors.text.primary);
        }

        // Active Border
        if (config.effects.activeSlideBorderColor) {
            const color = config.effects.activeSlideBorder ? config.effects.activeSlideBorderColor : 'transparent';
            root.style.setProperty('--color-active-slide-border', color);
        }

        // --- FOOTER (Future Proofing) ---
        if ((config.colors.components as any)?.footer?.text) {
            root.style.setProperty('--color-footer-text', (config.colors.components as any).footer.text);
        }

    }, [config]);

    const handleCopy = () => {
        const json = JSON.stringify(config, null, 4);
        const exportString = `/* REPLACE content in config/theme.ts */\n\nexport const THEME_CONFIG = ${json};\n\nexport type ThemeConfig = typeof THEME_CONFIG;`;
        navigator.clipboard.writeText(exportString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updateNested = (category: string, subPath: string, value: any) => {
        const newConfig = { ...config };

        // Helper to safe navigate or create path
        if (category === 'global') {
            if (subPath === 'primary') newConfig.colors.primary = value;
            if (subPath === 'bgPrimary') newConfig.colors.background.primary = value;
            if (subPath === 'bgDark') newConfig.colors.background.dark = value;
            if (subPath === 'textPrimary') newConfig.colors.text.primary = value;
        }

        if (category === 'header') {
            if (!newConfig.colors.components.header) newConfig.colors.components.header = { background: '#ffffff', text: '#000000', buttonBg: '#FF4400', buttonText: '#000000' };
            if (subPath === 'bg') newConfig.colors.components.header.background = value;
            if (subPath === 'text') newConfig.colors.components.header.text = value;
            // @ts-ignore
            if (subPath === 'buttonBg') (newConfig.colors.components.header as any).buttonBg = value;
            // @ts-ignore
            if (subPath === 'buttonText') (newConfig.colors.components.header as any).buttonText = value;
        }

        if (category === 'hero') {
            if (!newConfig.colors.components.hero) newConfig.colors.components.hero = { innerDrumBackground: '#000', outerBoxBackground: '#fff', text: '#2F2F2F', pagination: '#2F2F2F', scrollBg: '#FF4400', scrollIcon: '#2F2F2F' };
            if (subPath === 'inner') newConfig.colors.components.hero.innerDrumBackground = value;
            if (subPath === 'outer') newConfig.colors.components.hero.outerBoxBackground = value;
            if (subPath === 'pagination') newConfig.colors.components.hero.pagination = value;
            if (subPath === 'text') (newConfig.colors.components.hero as any).text = value;
            if (subPath === 'scrollBg') (newConfig.colors.components.hero as any).scrollBg = value;
            if (subPath === 'scrollIcon') (newConfig.colors.components.hero as any).scrollIcon = value;
        }

        if (category === 'border') {
            if (!newConfig.effects) newConfig.effects = {
                dynamicGradientBackground: true,
                reflectionEffect: false,
                ambientParticles: false,
                edgeVignetteGlow: false,
                hapticFeedback: false,
                slideMetadata: false,
                activeSlideBorder: true,
                activeSlideBorderColor: '#FF4400',
                scrollTriggeredEntrance: true
            };
            if (subPath === 'enabled') newConfig.effects.activeSlideBorder = value;
            if (subPath === 'color') newConfig.effects.activeSlideBorderColor = value;
        }

        if (category === 'footer') {
            if (!(newConfig.colors.components as any).footer) (newConfig.colors.components as any).footer = {};
            if (subPath === 'text') (newConfig.colors.components as any).footer.text = value;
        }

        setConfig(newConfig);
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 z-[9999] bg-black text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform"
                title="Open Theme Editor"
            >
                <Settings className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed top-0 right-0 h-screen w-[320px] bg-white/95 backdrop-blur-xl border-l border-black/10 shadow-2xl z-[9999] overflow-y-auto font-sans text-black flex flex-col">

            {/* Header */}
            <div className="sticky top-0 bg-white/95 border-b border-black/5 p-4 flex items-center justify-between z-10 shrink-0">
                <h2 className="font-bold text-lg">Theme Control</h2>
                <div className="flex gap-2">
                    <button onClick={handleCopy} className="p-2 hover:bg-black/5 rounded-md transition-colors text-green-600" title="Copy Config">
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button onClick={() => setIsVisible(false)} className="p-2 hover:bg-black/5 rounded-md transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Accordion Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">

                {/* Global Section */}
                <Section title="Design System (Global)" id="Global" active={activeSection} onToggle={setActiveSection}>
                    <ColorInput label="Primary (Brand)" value={config.colors.primary} onChange={(v) => updateNested('global', 'primary', v)} />
                    <ColorInput label="BG Primary (White)" value={config.colors.background.primary} onChange={(v) => updateNested('global', 'bgPrimary', v)} />
                    <ColorInput label="BG Dark (Contrast)" value={config.colors.background.dark} onChange={(v) => updateNested('global', 'bgDark', v)} />
                    <ColorInput label="Text Primary" value={config.colors.text.primary} onChange={(v) => updateNested('global', 'textPrimary', v)} />
                </Section>

                {/* Header Section */}
                <Section title="Header / Nav" id="Header" active={activeSection} onToggle={setActiveSection}>
                    <ColorInput label="Header Background" value={config.colors.components?.header?.background as string || '#ffffff'} onChange={(v) => updateNested('header', 'bg', v)} />
                    <ColorInput label="Header Text" value={config.colors.components?.header?.text as string || config.colors.text.primary} onChange={(v) => updateNested('header', 'text', v)} />
                    <div className="h-px bg-gray-200 my-2" />
                    <ColorInput label="Button Background" value={(config.colors.components?.header as any)?.buttonBg || config.colors.primary} onChange={(v) => updateNested('header', 'buttonBg', v)} />
                    <ColorInput label="Button Text" value={(config.colors.components?.header as any)?.buttonText || '#000000'} onChange={(v) => updateNested('header', 'buttonText', v)} />
                </Section>

                {/* Hero Section */}
                <Section title="Hero Section" id="Hero" active={activeSection} onToggle={setActiveSection}>
                    <ColorInput label="Outer Box BG" value={config.colors.components.hero?.outerBoxBackground as string || '#FFFFFF'} onChange={(v) => updateNested('hero', 'outer', v)} />
                    <ColorInput label="Inner Drum BG" value={config.colors.components.hero?.innerDrumBackground as string || '#000000'} onChange={(v) => updateNested('hero', 'inner', v)} />
                    <ColorInput label="Hero Text" value={(config.colors.components.hero as any)?.text || config.colors.text.primary} onChange={(v) => updateNested('hero', 'text', v)} />

                    <div className="h-px bg-gray-200 my-2" />
                    <ColorInput label="Scroll Button BG" value={(config.colors.components.hero as any)?.scrollBg || '#FFFFFF'} onChange={(v) => updateNested('hero', 'scrollBg', v)} />
                    <ColorInput label="Scroll Button Icon" value={(config.colors.components.hero as any)?.scrollIcon || '#000000'} onChange={(v) => updateNested('hero', 'scrollIcon', v)} />

                    <div className="h-px bg-gray-200 my-2" />

                    <ColorInput label="Pagination Dot" value={config.colors.components.hero?.pagination as string || config.colors.text.primary} onChange={(v) => updateNested('hero', 'pagination', v)} />

                    <div className="flex flex-col gap-2 pt-2">
                        <ToggleInput label="Show Active Border" checked={!!config.effects?.activeSlideBorder} onChange={(v) => updateNested('border', 'enabled', v)} />
                        {config.effects?.activeSlideBorder && (
                            <ColorInput label="Border Color" value={config.effects.activeSlideBorderColor as string || '#00FF88'} onChange={(v) => updateNested('border', 'color', v)} />
                        )}
                    </div>
                </Section>

                {/* Footer Section (Placeholder) */}
                <Section title="Footer" id="Footer" active={activeSection} onToggle={setActiveSection}>
                    <ColorInput label="Footer Text" value={(config.colors.components as any)?.footer?.text || config.colors.text.primary} onChange={(v) => updateNested('footer', 'text', v)} />
                </Section>

            </div>

            <div className="p-4 bg-gray-50 text-[10px] text-gray-500 text-center shrink-0 border-t border-gray-200">
                Changes are temporary. Copy to save.
            </div>
        </div>
    );
}

// Subcomponents
const Section = ({ title, id, active, onToggle, children }: any) => {
    const isOpen = active === id;
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
                onClick={() => onToggle(isOpen ? null : id)}
                className={clsx("w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left font-semibold text-sm", isOpen && "border-b border-gray-200")}
            >
                {title}
                {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
            </button>
            {isOpen && <div className="p-3 space-y-3 animate-in slide-in-from-top-2 duration-200">{children}</div>}
        </div>
    );
};

const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
    <div className="flex items-center justify-between group">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase">{value}</span>
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-6 h-6 rounded-full border border-gray-200 shadow-sm cursor-pointer outline-none p-0 overflow-hidden"
            />
        </div>
    </div>
);

const ToggleInput = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
    <div className="flex items-center justify-between group py-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <button
            onClick={() => onChange(!checked)}
            className={clsx(
                "w-8 h-4 rounded-full relative transition-colors duration-300",
                checked ? "bg-green-500" : "bg-gray-200"
            )}
        >
            <div className={clsx(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 shadow-sm",
                checked ? "left-[calc(100%-14px)]" : "left-0.5"
            )} />
        </button>
    </div>
);
