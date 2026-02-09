import { defineField, defineType } from 'sanity'
import { CopyIcon } from '@sanity/icons'

export const parallaxGallery = defineType({
    name: 'parallaxGallery',
    title: 'Parallax Gallery (Vertical)',
    type: 'object',
    icon: CopyIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            description: 'Internal title for reference',
        }),
        defineField({
            name: 'items',
            title: 'Gallery Items',
            type: 'array',
            of: [
                defineField({
                    name: 'galleryItem',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'videoUrl',
                            title: 'Video URL (Optional)',
                            type: 'url',
                            description: 'If provided, will autoplay muted loop. Overrides image.',
                        }),
                        defineField({
                            name: 'heading',
                            title: 'Heading',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subheading',
                            title: 'Subheading',
                            type: 'text',
                            rows: 3,
                        }),
                        defineField({
                            name: 'overlayColor',
                            title: 'Overlay Color',
                            type: 'string',
                            description: 'Hex color (e.g., #000000) or rgba for text contrast.',
                            initialValue: '#000000'
                        }),
                        defineField({
                            name: 'overlayOpacity',
                            title: 'Overlay Opacity',
                            type: 'number',
                            initialValue: 0.3,
                            validation: (Rule) => Rule.min(0).max(1)
                        })
                    ],
                    preview: {
                        select: {
                            title: 'heading',
                            media: 'image',
                        },
                        prepare({ title, media }) {
                            return {
                                title: title || 'Gallery Item',
                                media: media,
                            }
                        },
                    },
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({ title, items }) {
            return {
                title: title || 'Parallax Gallery',
                subtitle: `${items?.length || 0} items`,
            }
        },
    },
})
