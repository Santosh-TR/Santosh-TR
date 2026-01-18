import React from 'react';
import SectionWrapper from './SectionWrapper';

// Registry of all available blocks
// We will import the actual components here later
const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
    hero: (props) => (
        <SectionWrapper>
            <div className="min-h-[50vh] flex items-center justify-center border-2 border-dashed border-osmo-acid">
                <h2 className="text-4xl font-oswald text-osmo-acid">HERO BLOCK: {props.title}</h2>
                <p className="ml-4 font-mono text-sm">{props.marqueeText}</p>
            </div>
        </SectionWrapper>
    ),
    // Future blocks: showcase, grid, etc.
};

interface PageBuilderProps {
    sections: any[]; // We will type this properly with Sanity types later
}

export default function PageBuilder({ sections }: PageBuilderProps) {
    if (!sections || sections.length === 0) {
        return (
            <div className="py-20 text-center text-osmo-paper/50 font-mono">
                [PageBuilder] No sections found. Add some in Sanity Studio.
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            {sections.map((section) => {
                const Component = BLOCK_COMPONENTS[section._type];

                if (!Component) {
                    // Fallback for unknown block types
                    return (
                        <div key={section._key} className="p-4 border border-red-500 text-red-500">
                            Unknown Block Type: {section._type}
                        </div>
                    );
                }

                return <Component key={section._key} {...section} />;
            })}
        </div>
    );
}
