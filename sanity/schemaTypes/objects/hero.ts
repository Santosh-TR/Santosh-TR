import { defineField, defineType } from 'sanity'
import { Sparkles } from 'lucide-react'

export const hero = defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'object',
    icon: Sparkles,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Main Headline',
            description: 'Hero section headline',
            initialValue: 'DEV TOOLKIT BUILT TO FLEX',
            validation: (rule) => rule.required().max(100),
        }),
        defineField({
            name: 'subtitle',
            type: 'text',
            title: 'Subtitle',
            description: 'Optional subtitle text',
            rows: 2,
        }),
        defineField({
            name: 'sliderImages',
            type: 'array',
            title: 'Slider Images',
            description: 'Upload 3-7 images for the 3D drum slider (recommended: 16:9 aspect ratio)',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                            description: 'Important for SEO and accessibility',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                            description: 'Optional image caption',
                        },
                    ],
                },
            ],
            validation: (rule) => rule.min(3).max(7).required(),
        }),
        defineField({
            name: 'marqueeText',
            type: 'string',
            title: 'Marquee Text',
            description: 'Scrolling text (will repeat automatically)',
            initialValue: 'EXPLORE THE OSMO SHOWCASE • ',
        }),
        defineField({
            name: 'enableParticles',
            type: 'boolean',
            title: 'Enable Ambient Particles',
            description: 'Show floating particles effect',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            media: 'sliderImages.0',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Hero Section',
                subtitle: subtitle || 'Physics 3D Slider',
                media: media,
            }
        },
    },
})
