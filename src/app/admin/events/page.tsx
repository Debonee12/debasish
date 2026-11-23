import type { Metadata } from "next";
import Link from "next/link";
import AdminEventsClient from "@/components/AdminEventsClient";
import { isAdminAuthenticated, isUsingDefaultPassword } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Event Management Admin",
  description: "Administrative dashboard for managing Ward 4 community events, photo galleries, and social media links.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminEventsPage() {
  const authenticated = await isAdminAuthenticated();
  const usingDefaultPassword = isUsingDefaultPassword();

  return (
    <>
      <section className="page-hero" aria-labelledby="admin-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li aria-current="page">Admin</li>
            </ol>
          </nav>
          <p className="eyebrow">Administration</p>
          <h1 id="admin-heading">Event &amp; Media Manager</h1>
          <p className="lead">
            Add, edit, and publish Ward 4 events, upload and optimize multiple event photographs, and
            configure official social media links.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AdminEventsClient
            initialAuthenticated={authenticated}
            usingDefaultPassword={usingDefaultPassword}
          />
        </div>
      </section>
    </>
  );
}
