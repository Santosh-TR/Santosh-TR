import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import HeaderClient from "./HeaderClient";

// Define the interface for our Settings data
interface Settings {
    logoText: string;
    navLinks?: {
        label: string;
        link: string;
    }[];
    ctaLabel?: string;
    ctaLink?: string;
}

export default async function Header() {
    const data = await client.fetch<Settings>(SETTINGS_QUERY);

    if (!data) return null;

    return <HeaderClient data={data} />;
}
