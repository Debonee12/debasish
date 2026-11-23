import type { Metadata } from "next";
import { Poppins, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FABs from "@/components/FABs";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { getSocialSettings } from "@/lib/settings-store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Ward 4, Baranagar`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Debashis Chowdhury",
    "Baranagar Municipality",
    "Ward 4 Baranagar",
    "Baranagar Ward 4 civic issues",
    "Ambedkar Colony Baranagar",
    "Baranagar community work",
    "North 24 Parganas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: site.name,
    title: `${site.name} — Ward 4, Baranagar`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/photos/debasis-3.jpg",
        width: 1200,
        height: 630,
        alt: "Debashis Chowdhury — Ward 4, Baranagar Municipality civic outreach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Ward 4, Baranagar`,
    description: site.description,
    images: ["/photos/debasis-3.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const social = await getSocialSettings();
  const sameAs = [social.facebookUrl, social.instagramUrl].filter(Boolean);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${site.name} — Ward 4 Civic Office`,
    url: site.url,
    telephone: site.contact.phoneRaw,
    areaServed: {
      "@type": "Place",
      name: site.contact.area,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — Ward 4, Baranagar`,
    url: site.url,
    inLanguage: ["en-IN", "bn-IN"],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${hind.variable}`}>
      <body>
        <JsonLd data={[organizationLd, websiteLd]} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer facebookUrl={social.facebookUrl} instagramUrl={social.instagramUrl} />
        <FABs />
      </body>
    </html>
  );
}
