import { defineField, defineType } from 'sanity'
import { FolderGit2 } from 'lucide-react'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    icon: FolderGit2,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Short impactful description for the card',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                })
            ]
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'skill' } }]
        }),
        defineField({
            name: 'demoLink',
            title: 'Live Demo Link',
            type: 'url'
        }),
        defineField({
            name: 'repoLink',
            title: 'GitHub Repo',
            type: 'url'
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            initialValue: '2025'
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'tagline',
            media: 'mainImage'
        }
    }
})
