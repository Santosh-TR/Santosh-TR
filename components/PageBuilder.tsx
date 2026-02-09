import React from 'react';

import { client } from '@/sanity/lib/client';

import SkillsSection from './skills/SkillsSection';
import ScrollRevealImage from './ScrollRevealImage';
import ProjectsSection from './projects/ProjectsSection';
import AboutSection from './AboutSection';
import ParallaxGallery from './ParallaxGallery';
import ScrollGallery from './ScrollGallery';

// Registry of all available blocks
const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
    // We don't render the 'hero' block here because it's extracted and rendered separately in page.tsx
    hero: (props) => null,
    skills: (props) => <SkillsSection data={props} />,
    scrollRevealImage: (props) => <ScrollRevealImage data={props} />,
    projectsSection: (props) => <ProjectsSection data={props} />,

    aboutSection: (props) => <AboutSection data={props} />,
    parallaxGallery: (props) => <ParallaxGallery data={props} />,
    scrollGallery: (props) => <ScrollGallery data={props} />,
};

interface PageBuilderProps {
    sections: any[]; // We will type this properly with Sanity types later
}

export default async function PageBuilder({ sections }: PageBuilderProps) {
    if (!sections || sections.length === 0) {
        return (
            <div className="py-20 text-center text-osmo-paper/50 font-mono">
                [PageBuilder] No sections found. Add some in Sanity Studio.
            </div>
        );
    }

    // Render sections sequentially to handle async components
    const renderedSections = await Promise.all(
        sections.map(async (section) => {
            const Component: any = BLOCK_COMPONENTS[section._type];

            if (!Component) {
                // Fallback for unknown block types
                return (
                    <div key={section._key} className="p-4 border border-red-500 text-red-500">
                        Unknown Block Type: {section._type}
                    </div>
                );
            }

            // Handle async components
            const rendered = await Promise.resolve(Component(section));
            return <React.Fragment key={section._key}>{rendered}</React.Fragment>;
        })
    );

    return <div className="flex flex-col w-full">{renderedSections}</div>;
}
