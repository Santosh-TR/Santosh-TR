import { defineArrayMember, defineField, defineType } from 'sanity'
import { Square } from 'lucide-react'

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: Square,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Page Title',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                // We will add more blocks here later (Showcase, Grid, etc.)
                defineArrayMember({
                    type: 'hero',
                }),
            ],
            options: {
                insertMenu: {
                    views: [
                        { name: 'grid', previewImageUrl: (schemaType) => `/static/previews/${schemaType}.png` },
                    ]
                }
            }
        }),
    ],
})
