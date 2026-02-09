import { client } from "@/sanity/lib/client";
import PageBuilder from "@/components/PageBuilder";
import HeroBlock from "@/components/HeroBlock";
import ImpactIntro from "@/components/ImpactIntro";
import TopSection from "@/components/TopSection";
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
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <TopSection />
      <ImpactIntro />
      <HeroBlock heroData={heroSection} variant="dark" />
      <PageBuilder sections={data.sections} />
    </main>
  );
}
