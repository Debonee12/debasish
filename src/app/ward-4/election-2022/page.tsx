"use client";
import Link from "next/link";
import RevealWrapper from "@/components/RevealWrapper";
import SourcesFooter from "@/components/SourcesFooter";
import { municipalSeats, ward4Results, ward4Totals } from "@/lib/election";

export default function Election2022Page() {
  return (
    <>
      <section className="page-hero" aria-labelledby="elec-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/ward-4">Ward 4</Link></li>
              <li aria-current="page">2022 Election</li>
            </ol>
          </nav>
          <p className="eyebrow">2022 Baranagar Municipal Election</p>
          <h1 id="elec-heading">2022 Election Picture</h1>
          <p className="lead">Results for all 34 Baranagar Municipality seats and a detailed breakdown for Ward 4.</p>
          <div className="tag-row">
            <span className="tag">AITC 32 seats</span>
            <span className="tag tag-urgent">CPI(M) 2</span>
            <span className="tag tag-saffron">BJP 0</span>
          </div>
        </div>
      </section>

      {/* Municipal overview */}
      <section className="section" aria-labelledby="municipal-heading">
        <div className="container">
          <p className="eyebrow">All 34 seats · Baranagar Municipality</p>
          <h2 id="municipal-heading">Municipal seat share</h2>

          <RevealWrapper className="seat-grid" style={{ marginBottom: "1.5rem" }}>
            {Array.from({ length: 34 }, (_, i) => {
              const cls = i < 32 ? "seat aitc" : i === 32 ? "seat uncontested" : "seat cpim";
              return <div key={i} className={cls} style={{ "--i": i } as React.CSSProperties} aria-hidden="true" />;
            })}
          </RevealWrapper>

          <div className="legend" aria-label="Legend">
            <span><i style={{ background: "#2e9e5f" }} /> AITC — 32 seats (incl. 1 uncontested)</span>
            <span><i style={{ background: "var(--crimson)" }} /> CPI(M) — 2 seats</span>
            <span><i style={{ background: "var(--saffron)", outline: "1.5px solid var(--line)" }} /> BJP — 0 seats</span>
          </div>

          {/* Bar chart */}
          <RevealWrapper className="bar-chart" style={{ maxWidth: 720, marginTop: "2.5rem" }}>
            {municipalSeats.parties.map((p) => {
              const pct = Math.round((p.seats / municipalSeats.total) * 100);
              const w = pct < 3 ? "3%" : `${pct}%`;
              return (
                <div key={p.id} className="bar-row">
                  <div className="bar-label">
                    <strong>{p.name}</strong>
                    <span>{p.seats} seat{p.seats !== 1 ? "s" : ""}{p.note ? ` (${p.note})` : ""}</span>
                  </div>
                  <div className="bar-track" role="meter" aria-label={`${p.name}: ${p.seats} seats`} aria-valuenow={p.seats} aria-valuemin={0} aria-valuemax={municipalSeats.total}>
                    <div
                      className={`bar-fill bar-${p.id}${pct < 8 ? " short" : ""}`}
                      style={{ "--w": w, background: p.color } as React.CSSProperties}
                    >
                      {pct >= 8 ? `${pct}%` : <span>{pct}%</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </RevealWrapper>
        </div>
      </section>

      {/* Ward 4 results table */}
      <section className="section section-leaf" aria-labelledby="ward4-results">
        <div className="container">
          <p className="eyebrow">Ward 4 detailed results</p>
          <h2 id="ward4-results">Ward 4 candidate results</h2>

          <div className="table-wrap" style={{ maxWidth: 680, marginBottom: "1.5rem" }}>
            <table className="data-table">
              <caption>Ward 4, Baranagar Municipality — 2022 election results</caption>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Party</th>
                  <th className="num">Votes</th>
                  <th className="num">Share</th>
                </tr>
              </thead>
              <tbody>
                {ward4Results.map((r) => (
                  <tr key={r.candidate}>
                    <td>{r.candidate}</td>
                    <td>
                      <span className="party-dot" style={{ background: r.color }} aria-hidden="true" />
                      {r.party}
                    </td>
                    <td className="num">{r.votes.toLocaleString("en-IN")}</td>
                    <td className="num">{r.share.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Total</td>
                  <td className="num">{ward4Totals.totalVotes.toLocaleString("en-IN")}</td>
                  <td className="num">100.00%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="callout" style={{ maxWidth: 440 }}>
            <strong className="big">BJP: third place</strong>
            <p>
              Winning margin: {ward4Totals.margin.toLocaleString("en-IN")} votes ·
              Total votes cast: {ward4Totals.totalVotes.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </section>

      <SourcesFooter ids={["pratidin", "wikipedia", "mycorporator"]} />
    </>
  );
}
