
export const THEME_CONFIG = {
    // ============================================
    // SEMANTIC DESIGN SYSTEM
    // ============================================
    colors: {
        primary: '#FF4400',   // "Theme colour"
        secondary: '#000000', // "Secondary theme colour"
        accent: '#FF4400',    // "Dark theme colour"

        success: '#00FF88',
        warning: '#FFE600',
        error: '#EF4444',
        info: '#3B82F6',

        background: {
            // "Main background colour" & "Light color 3" are both #FAFAFA, so using that.
            primary: '#ffffff',
            // "Light colour 2"
            secondary: '#ffffff',
            // "Background colour" - Likely inner drum or dark sections
            dark: '#000000',
            card: '#FFFFFF'
        },

        text: {
            primary: '#FF4400', // "Main text colour"
            secondary: '#A3A3A3',
            muted: '#A3A3A3',
            light: '#FFFFFF',   // "Secondary text colour"
        },

        border: {
            default: '#ffffff',
            dark: '#000000',
        },

        // Component Overrides (Preserving Granular Control)
        components: {
            header: {
                background: '#000000', // Requested Change
                text: '#ffffff',       // Requested Change
                buttonBg: '#FF4400',
                buttonText: '#2F2F2F',
            },
            hero: {
                outerBoxBackground: '#FAFAFA',
                innerDrumBackground: '#000000',
                text: '#2F2F2F',
                pagination: '#2F2F2F',
                scrollBg: '#FF4400',
                scrollIcon: '#2F2F2F',
            },
            footer: {
                text: '#502B1A',
            }
        }
    },

    // ============================================
    // FONTS
    // ============================================
    fonts: {
        heading: 'var(--font-oswald)',
        body: 'var(--font-inter)',
    },

    // ============================================
    // HERO SLIDER CONFIGURATION
    // ============================================
    heroSlider: {
        faceCount: 5,
        autoRotate: false,
        dragSensitivity: 1.5,
        snapDuration: 0.8,
    },

    // ============================================
    // EFFECTS & ANIMATION TOGGLES
    // ============================================
    effects: {
        dynamicGradientBackground: true,
        reflectionEffect: false,
        ambientParticles: false,
        edgeVignetteGlow: false,
        hapticFeedback: false,
        slideMetadata: false,

        // Active Slide Border
        activeSlideBorder: true,
        activeSlideBorderColor: '#FF4400', // Matching Primary

        scrollTriggeredEntrance: true,
    },

    // ============================================
    // LAYOUT & SPACING
    // ============================================
    spacing: {
        gutter: '1rem',
        containerMax: '1920px',
        headerHeight: '100px',
    },

    // ============================================
    // BREAKPOINTS
    // ============================================
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    // ============================================
    // SHADOWS
    // ============================================
    shadows: {
        card: '0 4px 24px rgba(0, 0, 0, 0.06)',
        glow: '0 0 20px rgba(168, 139, 250, 0.3)', // Updated glow to match Primary
    },

    // ============================================
    // TRANSITIONS
    // ============================================
    transitions: {
        default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        slow: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
};

export type ThemeConfig = typeof THEME_CONFIG;
