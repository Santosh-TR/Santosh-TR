"use client";

import { useEffect } from "react";
import { THEME_CONFIG } from "@/config/theme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const root = document.documentElement;
        const { colors, effects } = THEME_CONFIG;

        // 1. Sync Colors (Light Theme Mapping)
        // Primary
        root.style.setProperty('--color-osmo-acid', colors.primary);
        root.style.setProperty('--color-osmo-primary', colors.primary);

        // Background & Text
        root.style.setProperty('--color-osmo-paper', colors.background.primary);
        root.style.setProperty('--color-osmo-carbon', colors.background.dark || '#1F1F1F');
        root.style.setProperty('--color-osmo-text', colors.text.primary);

        // 2. Sync Component-Specific Colors
        if (colors.components) {
            // Header
            if (colors.components.header) {
                if (colors.components.header.background) {
                    root.style.setProperty('--color-header-bg', colors.components.header.background);
                }
            }

            // Hero
            if (colors.components.hero) {
                if (colors.components.hero.outerBoxBackground) {
                    root.style.setProperty('--color-hero-outer', colors.components.hero.outerBoxBackground);
                }
                if (colors.components.hero.innerDrumBackground) {
                    root.style.setProperty('--color-hero-inner', colors.components.hero.innerDrumBackground);
                }
            }
        }

        // 3. Sync Effects Settings
        if (effects && effects.activeSlideBorderColor) {
            root.style.setProperty('--color-active-slide-border', effects.activeSlideBorderColor);
        }

    }, []);

    return <>{children}</>;
}
