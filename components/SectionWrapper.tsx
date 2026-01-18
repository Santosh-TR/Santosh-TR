import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string; // For overriding background colors (e.g. bg-osmo-paper)
    noPadding?: boolean;
}

export default function SectionWrapper({
    children,
    id,
    className,
    noPadding = false,
}: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={twMerge(
                'w-full relative border-b border-white/10', // The "Border Rule"
                'bg-osmo-carbon text-osmo-paper', // Default Theme
                className
            )}
        >
            <div
                className={clsx(
                    'w-full mx-auto max-w-[1400px]', // Container Max Width
                    !noPadding && 'px-4 md:px-6 lg:px-8 py-12 md:py-20' // Global Padding
                )}
            >
                {children}
            </div>
        </section>
    );
}
