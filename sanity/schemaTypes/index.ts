import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './objects/hero'
import { skills } from './objects/skills'
import { projectsSection } from './objects/projectsSection'
import { aboutSection } from './objects/aboutSection'
import { scrollRevealImage } from './objects/scrollRevealImage'
import { parallaxGallery } from './objects/parallaxGallery'
import { scrollGallery } from './objects/scrollGallery'
import { page } from './page'
import skill from './skill'
import project from './project'
import settings from './settings'
import projectsPage from './projectsPage'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [page, skill, project, settings, hero, skills, projectsSection, aboutSection, scrollRevealImage, parallaxGallery, scrollGallery, projectsPage],
}
