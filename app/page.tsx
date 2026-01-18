import { client } from "@/sanity/lib/client";
import PageBuilder from "@/components/PageBuilder";
import HeroBlock from "@/components/HeroBlock";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function Home() {
  const data = await client.fetch(HOME_PAGE_QUERY);

  // Extract hero section from page data
  const heroSection = data?.sections?.find((section: any) => section._type === 'hero');

  if (!data) {
    return (
      <main className="min-h-screen bg-osmo-carbon">
        <HeroBlock />
        <div className="flex flex-col items-center justify-center p-4 text-osmo-paper mt-12 opacity-50">
          <h1 className="text-4xl font-oswald text-osmo-acid mb-4">404: HOME NOT FOUND</h1>
          <p className="font-mono text-sm max-w-md text-center">
            (HeroBlock with static images is visible above. Create "home" page in Sanity Studio to load CMS data.)
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-osmo-carbon">
      <HeroBlock heroData={heroSection} />
      <PageBuilder sections={data.sections} />
    </main>
  );
}
