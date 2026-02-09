import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY, PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import BookContainer from "@/components/projects/BookContainer";
import PageBuilder from "@/components/PageBuilder";

export const metadata: Metadata = {
    title: "Projects | Santosh TR",
    description: "Explore my portfolio of creative projects and technical work",
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function ProjectsPage() {
    // Fetch projects and page data from Sanity
    const [projects, pageData] = await Promise.all([
        client.fetch(PROJECTS_QUERY, { limit: 50 }),
        client.fetch(PROJECTS_PAGE_QUERY),
    ]);

    return (
        <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FF4400 0%, #FF6B35 100%)' }}>
            <BookContainer projects={projects} pageData={pageData}>
                {/* Render dynamic sections (like the Projects Grid) INSIDE the book container for slide-up animation */}
                {pageData.sections && pageData.sections.length > 0 && (
                    <div className="relative z-10 bg-bg-dark min-h-full">
                        <PageBuilder sections={pageData.sections} />
                    </div>
                )}
            </BookContainer>
        </main>
    );
}
