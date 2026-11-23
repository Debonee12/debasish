"use client";
import { useEffect, useState } from "react";
import { galleryCategories, type GalleryCategory, type PhotoItem } from "@/lib/photos";

type Props = {
  items: PhotoItem[];
};

export default function GalleryClient({ items }: Props) {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, visible.length]);

  const active = activeIndex !== null ? visible[activeIndex] : null;

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter photographs by category">
        <button
          type="button"
          className="filter-btn"
          aria-pressed={filter === "all"}
          onClick={() => {
            setFilter("all");
            setActiveIndex(null);
          }}
        >
          All <span className="count">{items.length}</span>
        </button>
        {galleryCategories.map((cat) => {
          const count = items.filter((i) => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              className="filter-btn"
              aria-pressed={filter === cat.id}
              onClick={() => {
                setFilter(cat.id);
                setActiveIndex(null);
              }}
            >
              {cat.label} <span className="count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="gallery-grid">
        {visible.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className="gallery-item"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Open ${item.title}`}
          >
            <div className="photo-frame ratio-4-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span className="gallery-zoom" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm0-11v6m-3-3h6" />
              </svg>
            </span>
            <div className="overlay">
              <span className="tag">
                {galleryCategories.find((c) => c.id === item.category)?.label}
              </span>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {active && activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photograph lightbox">
          <div className="lightbox-top">
            <span>
              {activeIndex + 1} / {visible.length} — {active.title}
            </span>
            <button
              type="button"
              className="lb-btn"
              onClick={() => setActiveIndex(null)}
              aria-label="Close lightbox"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="lightbox-stage">
            <button
              type="button"
              className="lb-btn lb-prev"
              onClick={() => setActiveIndex((activeIndex - 1 + visible.length) % visible.length)}
              aria-label="Previous photograph"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <button
              type="button"
              className="lb-btn lb-next"
              onClick={() => setActiveIndex((activeIndex + 1) % visible.length)}
              aria-label="Next photograph"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="lightbox-caption">
            <h2>{active.title}</h2>
            <p>{active.caption}</p>
            {active.note && <p style={{ marginTop: "0.35rem", opacity: 0.8 }}>{active.note}</p>}
          </div>
        </div>
      )}
    </>
  );
}
