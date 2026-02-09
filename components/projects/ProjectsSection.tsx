import React from 'react';
import { client } from '@/sanity/lib/client';
import { PROJECTS_QUERY } from '@/sanity/lib/queries';
import ProjectCarousel from './ProjectCarousel';

interface ProjectsSectionProps {
    data: {
        title?: string;
        subtitle?: string;
        showCount?: number;
        selectedProjects?: any[];
    };
}

export default async function ProjectsSection({ data }: ProjectsSectionProps) {
    // Determine projects source: Manual selection OR Automatic fetch
    let projects = data.selectedProjects;

    if (!projects || projects.length === 0) {
        // Fallback: Fetch latest projects based on limit
        projects = await client.fetch(PROJECTS_QUERY, { limit: data.showCount || 10 });
    }

    if (!projects || projects.length === 0) return null;

    return (
        <section className="relative w-full min-h-screen flex flex-col justify-start items-center bg-white text-black overflow-hidden pt-24 md:pt-24">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
                {/* Section Header - Left Aligned */}
                <div className="flex flex-col items-start text-left mb-6 gap-2 w-full">
                    <div className="max-w-2xl">
                        <p className="text-primary text-lg font-mono mb-2">
                            {data.subtitle || "Showcase of above project"}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-oswald font-bold uppercase text-black mb-6 leading-[0.85]">
                            {data.title || "Selected Projects"}
                        </h2>
                    </div>
                </div>

                {/* Projects Carousel (Replacing Grid) */}
                <div className="w-full flex-1 flex items-center justify-center">
                    <ProjectCarousel projects={projects} />
                </div>
            </div>
        </section>
    );
}
