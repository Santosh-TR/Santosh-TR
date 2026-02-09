export const skills = {
    name: 'skills',
    title: 'Skills Section',
    type: 'object',
    fields: [
        {
            name: 'sectionTitle',
            title: 'Section Title',
            type: 'string',
            initialValue: 'SKILLS & EXPERTISE',
        },
        {
            name: 'sectionSubtitle',
            title: 'Section Subtitle',
            type: 'string',
            initialValue: 'Hover to explore • Click for details',
        },
        {
            name: 'enableParticles',
            title: 'Enable Particle Effects',
            type: 'boolean',
            initialValue: false,
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Skills Constellation',
            };
        },
    },
};
