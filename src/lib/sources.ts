/**
 * Source registry. Every data page lists the sources it relies on via
 * <SourcesFooter ids={[...]} />.
 */

export type Source = {
  id: string;
  label: string;
  detail?: string;
  url?: string;
  status: "reported" | "published" | "official" | "supplied";
};

export const sources = {
  brief: {
    id: "brief",
    label: "User brief",
    detail: "Reported local conditions and population estimate (unverified).",
    status: "reported",
  },
  pdf: {
    id: "pdf",
    label: "Supplied presentation PDF",
    detail: "Civic information and supplied profile, 8 October 2026.",
    status: "supplied",
  },
  photos: {
    id: "photos",
    label: "Supplied photographs",
    detail: "Locations and dates unverified.",
    status: "supplied",
  },
  who: {
    id: "who",
    label: "World Health Organization — Drinking-water fact sheet",
    detail: "General health risks of unsafe water and poor sanitation.",
    url: "https://www.who.int/news-room/fact-sheets/detail/drinking-water",
    status: "published",
  },
  pratidin: {
    id: "pratidin",
    label: "Sangbad Pratidin",
    detail: "Baranagar municipal results coverage, 2 March 2022.",
    status: "published",
  },
  wikipedia: {
    id: "wikipedia",
    label: "Wikipedia — 2022 West Bengal municipal elections summary",
    url: "https://en.wikipedia.org/wiki/2022_West_Bengal_municipal_elections",
    status: "published",
  },
  mycorporator: {
    id: "mycorporator",
    label: "myCorporator — Baranagar Ward 4 results",
    status: "published",
  },
  wbgov: {
    id: "wbgov",
    label: "Government of West Bengal (wb.gov.in) / Akashvani",
    detail: "State government composition, October 2026.",
    url: "https://wb.gov.in",
    status: "official",
  },
  userStatement: {
    id: "userStatement",
    label: "User statement",
    detail: "Political association start date (unverified).",
    status: "reported",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
