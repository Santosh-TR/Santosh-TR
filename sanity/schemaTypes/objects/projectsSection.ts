import { defineField, defineType } from 'sanity'
import { GalleryVerticalEnd } from 'lucide-react'

export const projectsSection = defineType({
    name: 'projectsSection',
    title: 'Projects Grid',
    type: 'object',
    icon: GalleryVerticalEnd,
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Selected Projects'
        }),
        defineField({
            name: 'subtitle',
            title: 'Section Subtitle',
            type: 'string',
            initialValue: 'A showcase of recent technical experiments.'
        }),
        defineField({
            name: 'showCount',
            title: 'Number of Projects to Show',
            description: 'ignored if specific projects are selected below',
            type: 'number',
            initialValue: 6
        }),
        defineField({
            name: 'selectedProjects',
            title: 'Manually Select Projects',
            description: 'Select specific projects to show. If left empty, the latest projects will be shown based on the count above.',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'project' } }]
        })
    ],
    preview: {
        select: { title: 'title' },
        prepare({ title }) {
            return {
                title: title || 'Projects Grid',
                subtitle: 'Displays project cards'
            }
        }
    }
})
