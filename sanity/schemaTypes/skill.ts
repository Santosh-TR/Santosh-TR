import { Zap } from 'lucide-react';

export default {
    name: 'skill',
    title: 'Skill',
    type: 'document',
    icon: Zap,
    fields: [
        {
            name: 'name',
            title: 'Skill Name',
            type: 'string',
            validation: (Rule: any) => Rule.required().min(2).max(50),
        },
        {
            name: 'icon',
            title: 'Skill Icon',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Upload a skill icon (recommended: SVG or PNG, 128x128px)',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Frontend', value: 'frontend' },
                    { title: 'Backend', value: 'backend' },
                    { title: 'Tools & DevOps', value: 'tools' },
                    { title: 'Design', value: 'design' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'proficiency',
            title: 'Proficiency Level (%)',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0).max(100),
            description: '0-100: Your skill level percentage',
        },
        {
            name: 'yearsExperience',
            title: 'Years of Experience',
            type: 'number',
            validation: (Rule: any) => Rule.min(0).max(50),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Brief description of your experience with this skill',
        },
        {
            name: 'relatedSkills',
            title: 'Related Skills',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'skill' }] }],
            description: 'Skills that connect to this one in the constellation',
        },
        {
            name: 'position',
            title: 'Constellation Position',
            type: 'object',
            fields: [
                { name: 'x', title: 'X Position (%)', type: 'number', validation: (Rule: any) => Rule.min(0).max(100) },
                { name: 'y', title: 'Y Position (%)', type: 'number', validation: (Rule: any) => Rule.min(0).max(100) },
            ],
            description: 'Optional: Custom position in constellation (0-100%)',
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            media: 'icon',
            proficiency: 'proficiency',
        },
        prepare({ title, subtitle, media, proficiency }: any) {
            return {
                title,
                subtitle: `${subtitle} - ${proficiency}%`,
                media,
            };
        },
    },
    orderings: [
        {
            title: 'Proficiency (High to Low)',
            name: 'proficiencyDesc',
            by: [{ field: 'proficiency', direction: 'desc' }],
        },
        {
            title: 'Name (A-Z)',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
    ],
};
