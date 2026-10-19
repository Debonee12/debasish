import type { Metadata } from "next";
import Link from "next/link";
import SourcesFooter from "@/components/SourcesFooter";

export const metadata: Metadata = {
  title: "Education",
  description: "Debashis Chowdhury — Diploma in Electronics & Telecommunication Engineering.",
};

export default function EducationPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="edu-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li aria-current="page">Education</li>
            </ol>
          </nav>
          <p className="eyebrow">Supplied profile</p>
          <h1 id="edu-heading">Education</h1>
          <p className="lead">Diploma in Electronics &amp; Telecommunication Engineering — as stated in the supplied profile.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow prose">
          <div className="note note-green" style={{ marginBottom: "2rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p>
              <strong>Source:</strong> This detail comes from the supplied PDF (8 October 2026).
              The institution name, year and grades are not included in the supplied materials.
            </p>
          </div>

          <dl className="facts">
            <div><dt>Qualification</dt><dd>Diploma</dd></div>
            <div><dt>Field</dt><dd>Electronics &amp; Telecommunication Engineering</dd></div>
            <div><dt>Institution</dt><dd>Not stated in the supplied materials</dd></div>
            <div><dt>Year</dt><dd>Not stated in the supplied materials</dd></div>
          </dl>

          <h2>Context</h2>
          <p>
            A Diploma in Electronics &amp; Telecommunication Engineering is a polytechnic-level qualification
            covering analogue and digital circuits, telecommunications systems, signal processing and related subjects.
            It is typically a three-year programme offered by state polytechnic institutes in West Bengal.
          </p>
          <p>
            Further details — such as the awarding institution, year of completion and any additional
            qualifications — would need to be supplied to complete this profile.
          </p>
        </div>
      </section>

      <SourcesFooter ids={["pdf"]} extra="The institution name and year are not in the supplied materials." />
    </>
  );
}
