"use client";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A1.5 1.5 0 014.5 4h2.379a.75.75 0 01.698.474l1.29 3.221a.75.75 0 01-.217.858l-1.428 1.071a11.025 11.025 0 005.155 5.155l1.071-1.428a.75.75 0 01.858-.217l3.221 1.29a.75.75 0 01.474.698V19.5A1.5 1.5 0 0119.5 21C10.44 21 3 13.56 3 4.5z" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

export default function FABs() {
  return (
    <div className="fab-stack" aria-label="Quick actions">
      <a
        href={whatsappLink("Hello, I want to report a Ward 4 issue.")}
        className="fab fab-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <a
        href={site.contact.phoneHref}
        className="fab fab-call"
        aria-label={`Call ${site.contact.phoneDisplay}`}
        title="Call"
      >
        <PhoneIcon />
      </a>
      <Link
        href="/contact/report-issue"
        className="fab fab-report"
        aria-label="Report a Ward 4 issue"
      >
        <AlertIcon />
        <span className="fab-text">Report an Issue</span>
      </Link>
    </div>
  );
}
