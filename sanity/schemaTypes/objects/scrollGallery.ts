import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const scrollGallery = defineType({
    name: 'scrollGallery',
    title: 'Scroll Gallery (Combined)',
    type: 'object',
    icon: ImagesIcon,
    fieldsets: [
        { name: 'intro', title: 'Part 1: Intro (Implosion)', options: { collapsible: true } },
        { name: 'stack', title: 'Part 2: Stacking Gallery', options: { collapsible: true } },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Internal Title',
            type: 'string',
        }),

        // --- PART 1: INTRO ---
        defineField({
            name: 'centerText',
            title: 'Center Text',
            type: 'string',
            fieldset: 'intro',
            initialValue: 'DESIGN THAT CAPTIVATES'
        }),
        defineField({
            name: 'mainMedia',
            title: 'Background Media',
            type: 'object',
            fieldset: 'intro',
            fields: [
                defineField({ name: 'type', type: 'string', options: { list: ['image', 'video'] } }),
                defineField({ name: 'image', type: 'image', options: { hotspot: true }, hidden: ({ parent }) => parent?.type !== 'image' }),
                defineField({ name: 'videoUrl', type: 'url', hidden: ({ parent }) => parent?.type !== 'video' }),
            ]
        }),
        defineField({
            name: 'floatingImages',
            title: 'Floating Images (6 Cards)',
            type: 'array',
            fieldset: 'intro',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: Rule => Rule.max(6).warning('Best with exactly 6 images')
        }),
        defineField({
            name: 'overlayColor',
            title: 'Overlay Color',
            type: 'string',
            fieldset: 'intro',
            options: { list: ['black', 'white'] },
            initialValue: 'black'
        }),

        // --- PART 2: STACKING ---
        defineField({
            name: 'galleryItems',
            title: 'Gallery Items (Vertical Stack)',
            type: 'array',
            fieldset: 'stack',
            of: [
                defineField({
                    name: 'item',
                    type: 'object',
                    fields: [
                        defineField({ name: 'heading', type: 'string' }),
                        defineField({ name: 'subheading', type: 'text', rows: 2 }),
                        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
                        defineField({ name: 'videoUrl', type: 'url' }),
                        defineField({ name: 'overlayColor', type: 'string', initialValue: '#000000' }),
                        defineField({ name: 'overlayOpacity', type: 'number', initialValue: 0.3 }),
                    ],
                    preview: {
                        select: { title: 'heading', media: 'image' },
                        prepare({ title, media }) {
                            return { title: title || 'Gallery Item', media }
                        }
                    }
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            text: 'centerText',
        },
        prepare({ title, text }) {
            return {
                title: title || 'Combined Gallery',
                subtitle: text,
            }
        },
    },
})
