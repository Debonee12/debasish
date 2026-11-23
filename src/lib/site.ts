/**
 * Site-wide configuration: identity, contact channels, social links, and navigation.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://debashischowdhury.in";
const normalizedUrl = rawUrl.endsWith("/") ? rawUrl.slice(0, -1) : rawUrl;

export const site = {
  name: "Debashis Chowdhury",
  nameBn: "দেবাশিস চৌধুরী",
  label: "Baranagar Municipality",
  labelBn: "বরানগর পৌরসভা · ওয়ার্ড ৪",
  tagline: "Community Work and Ward 4’s Civic Priorities",
  description:
    "Civic information on Baranagar Ward 4 — drainage, sanitation and water priorities, community events, the 2022 election picture, and public engagement by Debashis Chowdhury.",
  asOf: "8 October 2026",
  url: normalizedUrl,

  contact: {
    phoneDisplay: "+91 70032 38851",
    phoneRaw: "+91 7003238851",
    phoneHref: "tel:+917003238851",
    whatsapp: "919051268110",
    whatsappDisplay: "+91 90512 68110",
    whatsappRaw: "+91 9051268110",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@example.org",
    area: "Ward 4, Baranagar Municipality, North 24 Parganas, West Bengal",
    hours: "Mon–Sat, 10:00 am – 7:00 pm",
  },

  social: {
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ||
      "https://www.facebook.com/debashis.chowdhurybapi",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
      "https://www.instagram.com/debashischowdhurybapi",
  },
} as const;

export type NavChild = { href: string; label: string; hint?: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Profile", hint: "Supplied profile at a glance" },
      { href: "/about/education", label: "Education", hint: "Diploma in E&TC Engineering" },
      {
        href: "/about/political-engagement",
        label: "Political association & engagement",
        hint: "Association and public events",
      },
    ],
  },
  {
    href: "/community-work",
    label: "Community Work",
    children: [
      { href: "/community-work", label: "All community work", hint: "Overview of activities" },
      { href: "/community-work/health-blood-donation-camps", label: "Health & Blood-Donation Camps" },
      { href: "/community-work/educational-assistance", label: "Educational Assistance" },
      { href: "/community-work/cleanliness-drives", label: "Cleanliness Drives" },
      { href: "/community-work/relief-work", label: "Relief Work" },
    ],
  },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "Upcoming & Past Events", hint: "Community events & photo galleries" },
      { href: "/gallery", label: "Photo Gallery", hint: "Field work & public events" },
    ],
  },
  {
    href: "/ward-4",
    label: "Ward 4 & Baranagar",
    children: [
      { href: "/ward-4", label: "Overview", hint: "Ward 4 at a glance" },
      { href: "/ward-4/drainage-sanitation", label: "Drainage & Sanitation", hint: "9,000+ reportedly affected" },
      { href: "/ward-4/ambedkar-colony", label: "Ambedkar Colony", hint: "Water, sanitation, public health" },
      { href: "/ward-4/election-2022", label: "2022 Election Picture", hint: "Results & seat share" },
      { href: "/ward-4/evidence-sources", label: "Evidence & Sources", hint: "What is verified, what is not" },
    ],
  },
  {
    href: "/proposals",
    label: "Proposals",
    children: [
      { href: "/proposals", label: "All proposals", hint: "Municipal discussion proposals" },
      { href: "/proposals/drainage", label: "Drainage Improvements", hint: "Inspect · Maintain · Follow up" },
      { href: "/proposals/water-hygiene", label: "Water & Hygiene Improvements", hint: "Supply, quality, access" },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
    children: [
      { href: "/contact", label: "Contact", hint: "Phone, WhatsApp, social" },
      { href: "/contact/report-issue", label: "Report a Ward 4 Issue", hint: "Drains, water, sanitation" },
    ],
  },
];

export const utilityLinks: NavChild[] = [
  { href: "/privacy", label: "Privacy & Photo Consent" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/ward-4/evidence-sources", label: "Evidence & Sources" },
  { href: "/admin/events", label: "Event Admin" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function canonicalUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? site.url : `${site.url}${clean}`;
}
