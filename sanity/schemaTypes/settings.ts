import { defineField, defineType } from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'OSMO SUPPLY',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'link', type: 'string', title: 'Link (Slug)' }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'link',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'CLONE THIS',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: 'https://github.com/santosh',
    }),
  ],
})
