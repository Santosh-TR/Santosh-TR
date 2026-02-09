import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export const aboutSection = defineType({
    name: 'aboutSection',
    title: 'About Section',
    type: 'object',
    icon: User,
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'About Me'
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 5,
            description: 'A short, impactful biography.'
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'stats',
            title: 'Key Statistics',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'value', type: 'string', title: 'Value (e.g. 5+)' },
                    { name: 'label', type: 'string', title: 'Label (e.g. Years Exp)' }
                ]
            }]
        })
    ],
    preview: {
        select: { title: 'title', media: 'profileImage' }
    }
})
