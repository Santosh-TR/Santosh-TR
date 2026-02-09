import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
    name: 'projectsPage',
    title: 'Projects Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            initialValue: 'Projects',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Book Image',
            type: 'image',
            description: 'The centered book/creative process image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'leftHeading',
            title: 'Left Heading',
            type: 'string',
            initialValue: 'Idea',
        }),
        defineField({
            name: 'leftSubheading',
            title: 'Left Subheading',
            type: 'string',
            initialValue: 'from',
        }),
        defineField({
            name: 'leftDescription',
            title: 'Left Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'rightHeading',
            title: 'Right Heading',
            type: 'string',
            initialValue: 'Done.',
        }),
        defineField({
            name: 'rightSubheading',
            title: 'Right Subheading',
            type: 'string',
            initialValue: 'to',
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'projectsSection',
                }),
                // Add other sections here if needed in the future
                defineArrayMember({
                    type: 'scrollRevealImage',
                }),
            ],
        }),
    ],
});
