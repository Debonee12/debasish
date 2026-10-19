/**
 * Site-wide configuration: identity, contact channels and navigation.
 *
 * IMPORTANT: Contact details were NOT included in the supplied PDF.
 * Replace the placeholder values below before publishing.
 */

export const site = {
  name: "Debashis Chowdhury",
  nameBn: "দেবাশিস চৌধুরী",
  label: "Baranagar Municipality",
  labelBn: "বরানগর পৌরসভা · ওয়ার্ড ৪",
  tagline: "Community Work and Ward 4’s Civic Priorities",
  description:
    "Civic information on Baranagar Ward 4 — drainage, sanitation and water priorities, the 2022 election picture, community work and discussion proposals — alongside the supplied profile of Debashis Chowdhury.",
  asOf: "8 October 2026",
  url: "https://example.org", // TODO: replace with the live domain

  contact: {
    // TODO: replace with the real numbers / email (not in the supplied PDF)
    phoneDisplay: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    whatsapp: "910000000000",
    email: "contact@example.org",
    area: "Ward 4, Baranagar Municipality, North 24 Parganas, West Bengal",
    hours: "Mon–Sat, 10:00 am – 7:00 pm",
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
  { href: "/gallery", label: "Gallery" },
  {
    href: "/contact",
    label: "Contact",
    children: [
      { href: "/contact", label: "Contact", hint: "Phone, WhatsApp, email" },
      { href: "/contact/report-issue", label: "Report a Ward 4 Issue", hint: "Drains, water, sanitation" },
    ],
  },
];

export const utilityLinks: NavChild[] = [
  { href: "/privacy", label: "Privacy & Photo Consent" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/ward-4/evidence-sources", label: "Evidence & Sources" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
