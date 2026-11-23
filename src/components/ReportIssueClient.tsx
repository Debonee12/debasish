"use client";
import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

const issueTypes = [
  "Drainage / Waterlogging",
  "Drinking Water Supply",
  "Sanitation / Waste",
  "Streetlight / Lane",
  "Other Civic Matter",
];

export default function ReportIssueClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [issueType, setIssueType] = useState(issueTypes[0]);
  const [details, setDetails] = useState("");
  const [refCode, setRefCode] = useState<string | null>(null);

  function buildMessage() {
    return [
      `Ward 4 Civic Issue Report`,
      `Category: ${issueType}`,
      `Location: ${location || "Ward 4, Baranagar"}`,
      `Reporter: ${name || "Resident"}${phone ? ` (${phone})` : ""}`,
      `Details: ${details}`,
    ].join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = `W4-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setRefCode(code);
  }

  if (refCode) {
    return (
      <div className="form-card form-success">
        <div className="icon-badge">✓</div>
        <h2>Report Prepared</h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: "52ch", margin: "0 auto 1.25rem" }}>
          Your Ward 4 issue summary is ready. Reference: <span className="ref-code">{refCode}</span>
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a
            href={whatsappLink(buildMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green"
          >
            Send Directly on WhatsApp ({site.contact.whatsappDisplay})
          </a>
          <a href={site.contact.phoneHref} className="btn btn-outline">
            Call {site.contact.phoneDisplay}
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setRefCode(null);
              setDetails("");
            }}
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        <fieldset className="field full">
          <legend>Issue Category <span className="req">*</span></legend>
          <div className="choice-grid">
            {issueTypes.map((type) => (
              <label key={type} className="choice">
                <input
                  type="radio"
                  name="issueType"
                  value={type}
                  checked={issueType === type}
                  onChange={() => setIssueType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="rep-name">Your Name <span className="req">*</span></label>
          <input
            id="rep-name"
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="rep-phone">Phone / WhatsApp Number</label>
          <input
            id="rep-phone"
            type="tel"
            className="input"
            placeholder="+91 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="field full">
          <label htmlFor="rep-loc">Lane / Landmark in Ward 4 <span className="req">*</span></label>
          <input
            id="rep-loc"
            type="text"
            className="input"
            placeholder="e.g., Ambedkar Colony, near ..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="field full">
          <label htmlFor="rep-details">Issue Details <span className="req">*</span></label>
          <textarea
            id="rep-details"
            className="textarea"
            placeholder="Describe the problem, how long it has been occurring, and how many households are affected…"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-green">
          Prepare &amp; Send via WhatsApp
        </button>
        <a href={site.contact.phoneHref} className="btn btn-outline">
          Or Call {site.contact.phoneDisplay}
        </a>
      </div>
    </form>
  );
}
