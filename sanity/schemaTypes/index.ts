import { type SchemaTypeDefinition } from 'sanity'
import { page } from './page'
import { hero } from './objects/hero'
import settings from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [settings, page, hero],
}
