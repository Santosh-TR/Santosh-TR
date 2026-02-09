/**
 * 🎨 Skills Section Configuration
 * Edit this file to customize the Skills Constellation
 */

export const SKILLS_CONFIG = {
    // ============================================
    // SECTION CONTENT
    // ============================================
    sectionTitle: 'SKILLS & EXPERTISE',
    sectionSubtitle: 'Hover to explore • Click for details',

    // ============================================
    // LAYOUT & POSITIONING
    // ============================================
    layout: {
        // Auto-positioning
        circularRadius: 35, // % from center (for auto-layout)
        autoPosition: true, // Use automatic circular layout

        // Container
        minHeight: '100vh',
        maxWidth: '1200px',
        aspectRatio: 'square', // 'square' | '16:9' | '4:3'
    },

    // ============================================
    // NODE STYLING
    // ============================================
    nodes: {
        // Size range based on proficiency
        minSize: 60, // px (for low proficiency)
        maxSize: 100, // px (for high proficiency)

        // Colors
        backgroundColor: '#1A1A1A',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,

        // Active/Hover state
        activeBackground: 'rgba(209, 248, 64, 0.2)',
        activeBorder: '#D1F840', // osmo-acid
        activeGlowStrength: '0_0_30px_rgba(209,248,64,0.6)',

        // Rounded corners
        borderRadius: '50%', // full circle
    },

    // ============================================
    // CONNECTION LINES
    // ============================================
    connections: {
        enabled: true,
        strokeColor: 'rgba(209, 248, 64, 0.3)',
        strokeWidth: 2,
        strokeDasharray: '1000', // for animation

        // Hover effects
        hoverBrightness: 'rgba(209, 248, 64, 0.6)',
    },

    // ============================================
    // ANIMATIONS
    // ============================================
    animations: {
        // Entrance animation
        entrance: {
            enabled: true,
            nodeDelay: 0.1, // stagger delay (seconds)
            nodeDuration: 0.6,
            nodeEasing: 'back.out(1.7)',

            linesDelay: 0.5,
            linesDuration: 1,
        },

        // Floating animation
        floating: {
            enabled: true,
            distance: 10, // px
            durationMin: 2, // seconds
            durationMax: 3,
            easing: 'sine.inOut',
        },

        // Hover animation
        hover: {
            scale: 1.2,
            duration: 0.3,
            easing: 'back.out(2)',
        },

        // Click detail panel
        detailPanel: {
            slideDirection: 'bottom', // 'bottom' | 'right' | 'left'
            duration: 0.3,
        },
    },

    // ============================================
    // TOOLTIP STYLING
    // ============================================
    tooltip: {
        enabled: true,
        backgroundColor: '#1A1A1A',
        borderColor: 'rgba(209, 248, 64, 0.5)',
        borderWidth: 1,
        borderRadius: '8px',
        padding: '8px 16px',

        // Typography
        nameColor: '#F2F2F2',
        nameFontSize: '16px',
        proficiencyColor: '#D1F840',
        proficiencyFontSize: '14px',
    },

    // ============================================
    // DETAIL PANEL
    // ============================================
    detailPanel: {
        width: '256px', // 16rem
        backgroundColor: '#1A1A1A',
        borderColor: '#D1F840',
        borderWidth: 1,
        borderRadius: '8px',
        padding: '16px',

        // Progress bar
        progressBar: {
            height: '8px',
            backgroundColor: '#0D0D0D',
            fillColor: '#D1F840',
            borderRadius: '9999px',
            animationDuration: 1000, // ms
        },
    },

    // ============================================
    // CATEGORY LEGEND
    // ============================================
    categoryLegend: {
        enabled: true,
        categories: ['frontend', 'backend', 'tools', 'design'],

        // Styling
        backgroundColor: '#1A1A1A',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderRadius: '9999px',
        padding: '8px 16px',

        textColor: 'rgba(242, 242, 242, 0.7)',
        fontSize: '14px',
    },

    // ============================================
    // RESPONSIVE BREAKPOINTS
    // ============================================
    responsive: {
        mobile: {
            enabled: true,
            breakpoint: 768, // px
            nodeMinSize: 50,
            nodeMaxSize: 80,
            simplifyAnimations: true,
        },

        tablet: {
            enabled: true,
            breakpoint: 1024, // px
            nodeMinSize: 55,
            nodeMaxSize: 90,
        },
    },

    // ============================================
    // PERFORMANCE
    // ============================================
    performance: {
        enableGPU: true, // force3D
        reducedMotion: true, // respect prefers-reduced-motion
        maxParticles: 0, // set > 0 to enable particles
    },

    // ============================================
    // SCROLL TRIGGER
    // ============================================
    scrollTrigger: {
        enabled: true,
        threshold: 0.2, // 20% in viewport
    },
};

// Export individual sections for convenience
export const SKILLS_LAYOUT = SKILLS_CONFIG.layout;
export const SKILLS_NODES = SKILLS_CONFIG.nodes;
export const SKILLS_ANIMATIONS = SKILLS_CONFIG.animations;
export const SKILLS_TOOLTIP = SKILLS_CONFIG.tooltip;
export const SKILLS_DETAIL_PANEL = SKILLS_CONFIG.detailPanel;
export const SKILLS_RESPONSIVE = SKILLS_CONFIG.responsive;

export default SKILLS_CONFIG;
