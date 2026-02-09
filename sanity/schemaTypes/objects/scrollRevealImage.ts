import { defineField, defineType } from 'sanity'
import { Images, Play, Type } from 'lucide-react'

export const scrollRevealImage = defineType({
    name: 'scrollRevealImage',
    title: 'Implosion Scroll Section',
    type: 'object',
    icon: Images,
    fields: [
        defineField({
            name: 'centerText',
            title: 'Center Text',
            type: 'text',
            rows: 2,
            icon: Type,
            description: 'The large text that scales UP as the user scrolls.',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'mainMedia',
            title: 'Main Center Background',
            type: 'object',
            fields: [
                defineField({
                    name: 'type',
                    title: 'Media Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Image', value: 'image' },
                            { title: 'Video URL', value: 'video' }
                        ],
                        layout: 'radio'
                    },
                    initialValue: 'image'
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: { hotspot: true },
                    hidden: ({ parent }) => parent?.type === 'video'
                }),
                defineField({
                    name: 'videoUrl',
                    title: 'Video URL (MP4/WebM)',
                    type: 'url',
                    hidden: ({ parent }) => parent?.type === 'image'
                })
            ]
        }),
        defineField({
            name: 'gallery',
            title: 'Floating Cards (Must be 6)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: rule => rule.length(6).error('You must stick to exactly 6 images for the animation physics to work.')
        }),
        defineField({
            name: 'overlayColor',
            title: 'Overlay Color',
            type: 'string',
            initialValue: 'black',
            options: {
                list: [
                    { title: 'Black / Dark', value: 'black' },
                    { title: 'White / Light', value: 'white' }
                ]
            }
        })
    ],
    preview: {
        select: {
            title: 'centerText',
            media: 'mainMedia.image'
        },
        prepare({ title, media }) {
            return {
                title: title || 'Implosion Scroll',
                subtitle: '6-Card Animation',
                media: media
            }
        }
    }
})
