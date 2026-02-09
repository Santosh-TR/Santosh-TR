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
// Query for all skills
export const SKILLS_QUERY = groq`
  *[_type == "skill"] | order(order asc, proficiency desc) {
    _id,
    name,
    icon{
      asset->{
        url
      }
    },
    category,
    proficiency,
    yearsExperience,
    description,
    relatedSkills,
    position,
    order
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    tagline,
    mainImage {
        asset->{
            url,
            metadata {
                lqip
            }
        },
        alt
    },
    techStack[]->{
        _id,
        name,
        icon {
            asset->{
                url
            }
        }
    },
    demoLink,
    repoLink,
    year
  }
`;

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
      },
      _type == "skills" => {
        _type,
        sectionTitle,
        sectionSubtitle,
        enableParticles
      },
      _type == "scrollRevealImage" => {
        _type,
        centerText,
        mainMedia {
            type,
            image {
                asset->{ url },
                alt
            },
            videoUrl
        },
        gallery[]{
            asset->{
                url,
                metadata { lqip }
            },
            alt
        },
        overlayColor
      },
      _type == "projectsSection" => {
        _type,
        title,
        subtitle,
        showCount,
        selectedProjects[]->{
            _id,
            title,
            slug,
            tagline,
            mainImage {
                asset->{
                    url,
                    metadata {
                        lqip
                    }
                },
                alt
            },
            techStack[]->{
                _id,
                name,
                icon {
                    asset->{
                        url
                    }
                }
            },
            demoLink,
            repoLink,
            year
        }
      },
      _type == "aboutSection" => {
        _type,
        title,
        bio,
        profileImage {
          asset->{
            url
          }
        },
        stats[]
      },
      _type == "parallaxGallery" => {
        _type,
        title,
        items[]{
            heading,
            subheading,
            image {
                asset->{ url },
                alt
            },
            videoUrl,
            overlayColor,
            overlayOpacity
        }
      },
      _type == "scrollGallery" => {
        _type,
        centerText,
        mainMedia {
            type,
            image { asset->{ url }, alt },
            videoUrl
        },
        floatingImages[]{
            asset->{ url, metadata { lqip } },
            alt
        },
        overlayColor,
        galleryItems[]{
            heading,
            subheading,
            image { asset->{ url }, alt },
            videoUrl,
            overlayColor,
            overlayOpacity
        }
      }
    }
  }
`;

// Projects Page Query
export const PROJECTS_PAGE_QUERY = groq`
  *[_type == "projectsPage"][0] {
    title,
    heroImage {
      asset-> {
        _id,
        url
      }
    },
    leftHeading,
    leftSubheading,
    leftDescription,
    rightHeading,
    rightSubheading,
    sections[]{
        _key,
        _type == "projectsSection" => {
            _type,
            title,
            subtitle,
            showCount,
            selectedProjects[]->{
                _id,
                title,
                slug,
                tagline,
                mainImage {
                    asset->{
                        url,
                        metadata {
                            lqip
                        }
                    },
                    alt
                },
                techStack[]->{
                    _id,
                    name,
                    icon {
                        asset->{
                            url
                        }
                    }
                },
                demoLink,
                repoLink,
                year
            }
        },
        _type == "scrollRevealImage" => {
            _type,
            centerText,
            mainMedia {
                type,
                image {
                    asset->{ url },
                    alt
                },
                videoUrl
            },
            gallery[]{
                asset->{
                    url,
                    metadata { lqip }
                },
                alt
            },
            overlayColor
        }
    }
  }
`;
