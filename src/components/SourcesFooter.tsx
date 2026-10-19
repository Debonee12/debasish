import { sources, type Source, type SourceId } from "@/lib/sources";

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

const statusLabel: Record<string, string> = {
  reported: "Self-reported / unverified",
  published: "Published source",
  official: "Official source",
  supplied: "Supplied material",
};
const statusColor: Record<string, string> = {
  reported: "tag-unverified",
  published: "",
  official: "tag-water",
  supplied: "tag-saffron",
};

type Props = {
  ids: SourceId[];
  extra?: string; // free-text note appended after the list
};

export default function SourcesFooter({ ids, extra }: Props) {
  const items: Source[] = ids.map((id) => sources[id] as Source);
  return (
    <aside className="sources" aria-label="Sources">
      <div className="container">
        <div className="sources-inner">
          <h2>
            <InfoIcon /> Sources
          </h2>
          <ol>
            {items.map((s) => (
              <li key={s.id}>
                <span className={`tag ${statusColor[s.status]}`} style={{ marginRight: "0.5rem" }}>
                  {statusLabel[s.status]}
                </span>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
                {s.detail && <span style={{ color: "var(--ink-muted)", marginLeft: "0.4rem" }}>— {s.detail}</span>}
              </li>
            ))}
          </ol>
          {extra && <p className="source-note">{extra}</p>}
        </div>
      </div>
    </aside>
  );
}
