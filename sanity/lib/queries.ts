import { groq } from "next-sanity";

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    logoText,
    navLinks[]{
      label,
      link
    },
    ctaLabel,
    ctaLink
  }
`;

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    sections
  }
`;

// Query for home page with hero section data
export const HOME_PAGE_QUERY = groq`
  *[_type == "page" && slug.current == "home"][0] {
    title,
    sections[]{
      _key,
      _type == "hero" => {
        _type,
        title,
        subtitle,
        sliderImages[]{
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        marqueeText,
        enableParticles
      }
    }
  }
`;
