/**
 * Photographs and illustrations used across the site.
 *
 * Real photographs: all 9 supplied JPGs from the Debasis pics folder
 * are placed in /public/photos as debasis-1.jpg through debasis-9.jpg.
 */

export type GalleryCategory = "field-work" | "public-events" | "community-activities";

export type PhotoItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  /** Extra provenance / verification note shown in captions & lightbox */
  note?: string;
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "field-work", label: "Field Work" },
  { id: "public-events", label: "Public Events" },
  { id: "community-activities", label: "Community Activities" },
];

export const photos = {
  laneDrain: {
    id: "lane-drain",
    src: "/photos/debasis-3.jpg",
    alt: "Field activity in Ward 4 — community sanitation and cleanliness work.",
    title: "Community field activity",
    caption: "Community sanitation and cleanliness work in Ward 4 lanes.",
    category: "field-work",
    note: "Supplied photograph. Location and date unverified.",
  },
  housingBlock: {
    id: "housing-block",
    src: "/photos/debasis-7.jpg",
    alt: "Ward 4 community engagement — residents and local representative during neighbourhood activity.",
    title: "Community engagement in Ward 4",
    caption: "Residents and ward representative during a neighbourhood improvement activity.",
    category: "field-work",
    note: "Supplied photograph. Location and date unverified.",
  },
  wallTreatment: {
    id: "wall-treatment",
    src: "/photos/debasis-1.jpg",
    alt: "Field visit to inspect drainage and sanitation conditions in Ward 4.",
    title: "Drainage inspection visit",
    caption: "Field visit to inspect drainage and sanitation conditions.",
    category: "field-work",
    note: "Supplied photograph. Location and date unverified.",
  },
  healthCamp: {
    id: "health-camp",
    src: "/photos/debasis-5.jpg",
    alt: "Community health and welfare camp organised for Ward 4 residents.",
    title: "Health and welfare camp",
    caption: "Community health camp organised for Ward 4 residents.",
    category: "community-activities",
    note: "Supplied photograph. Location and date unverified.",
  },
  nightMarch: {
    id: "night-march",
    src: "/photos/debasis-9.jpg",
    alt: "Public gathering and community event in Ward 4.",
    title: "Public community gathering",
    caption: "Public gathering and community event in Ward 4.",
    category: "public-events",
    note: "Supplied photograph. Location and date unverified.",
  },
  statueGarlanding: {
    id: "statue-garlanding",
    src: "/photos/debasis-4.jpg",
    alt: "Ward representative participating in a public civic ceremony.",
    title: "Public civic ceremony",
    caption: "Ward representative at a public civic ceremony with community members.",
    category: "public-events",
    note: "Supplied photograph. Location and date unverified.",
  },
  communityWork1: {
    id: "community-work-1",
    src: "/photos/debasis-2.jpg",
    alt: "Community outreach and social work activity in Baranagar Ward 4.",
    title: "Community outreach",
    caption: "Social and community outreach work carried out in Ward 4.",
    category: "community-activities",
    note: "Supplied photograph. Location and date unverified.",
  },
  communityWork2: {
    id: "community-work-2",
    src: "/photos/debasis-6.jpg",
    alt: "Ward 4 field activity — civic engagement and sanitation drive.",
    title: "Civic engagement drive",
    caption: "Civic engagement and sanitation drive in Ward 4 neighbourhood.",
    category: "field-work",
    note: "Supplied photograph. Location and date unverified.",
  },
  communityWork3: {
    id: "community-work-3",
    src: "/photos/debasis-8.jpg",
    alt: "Community members and ward representative during a relief or welfare activity.",
    title: "Ward 4 welfare activity",
    caption: "Community members alongside the ward representative during a welfare initiative.",
    category: "community-activities",
    note: "Supplied photograph. Location and date unverified.",
  },
} satisfies Record<string, PhotoItem>;

export const galleryPhotos: PhotoItem[] = [
  photos.laneDrain,
  photos.housingBlock,
  photos.wallTreatment,
  photos.healthCamp,
  photos.nightMarch,
  photos.statueGarlanding,
  photos.communityWork1,
  photos.communityWork2,
  photos.communityWork3,
];

export const illustrations = {
  drainage: {
    src: "/illustrations/ai-drain-cleaning.png",
    alt: "AI-generated illustration: workers in orange hi-vis vests clean a street drain, with a hand-cart and a canal alongside.",
    caption:
      "AI-generated conceptual illustration — workers in orange hi-vis cleaning a street drain, with a cart and canal. Not a photograph of Ward 4.",
  },
  water: {
    src: "/illustrations/ai-water-hygiene.png",
    alt: "AI-generated illustration: a neighbourhood with a water tower, women collecting water, a technician testing water, a toilet block and children.",
    caption:
      "AI-generated illustration — a neighbourhood with a water tower, women collecting water, a technician, a toilet block and children. Not a photograph of Ambedkar Colony.",
  },
};
