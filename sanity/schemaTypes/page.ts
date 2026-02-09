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
                defineArrayMember({
                    type: 'hero',
                }),
                defineArrayMember({
                    type: 'skills',
                }),
                defineArrayMember({
                    type: 'scrollRevealImage',
                }),
                defineArrayMember({
                    type: 'projectsSection',
                }),
                defineArrayMember({
                    type: 'aboutSection',
                }),
                defineArrayMember({
                    type: 'parallaxGallery',
                }),
                defineArrayMember({
                    type: 'scrollGallery',
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
