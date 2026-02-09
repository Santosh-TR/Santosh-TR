import React from 'react';
import { client } from '@/sanity/lib/client';
import { SKILLS_QUERY } from '@/sanity/lib/queries';
import SkillConstellation from './SkillConstellation';


interface SkillsSectionProps {
    data: {
        sectionTitle?: string;
        sectionSubtitle?: string;
        enableParticles?: boolean;
    };
}

export default async function SkillsSection({ data }: SkillsSectionProps) {
    // 1. Fetch all skills to display in the constellation
    const skills = await client.fetch(SKILLS_QUERY);

    return (
        <section className="relative w-full min-h-screen bg-bg-dark text-white overflow-hidden py-20">
            {/* Header Content */}
            <div className="container mx-auto px-4 mb-12 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-oswald font-bold uppercase mb-4 text-primary">
                    {data.sectionTitle || "Skills & Expertise"}
                </h2>
                <p className="font-inter text-text-muted max-w-lg mx-auto">
                    {data.sectionSubtitle || "Hover to explore the network of technologies."}
                </p>
            </div>

            {/* Interactive Constellation */}
            <div className="w-full h-[600px] md:h-[800px] relative">
                <SkillConstellation skills={skills} enableParticles={data.enableParticles} />
            </div>
        </section>
    );
}
