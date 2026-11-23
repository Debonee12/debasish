"use client";
import { useEffect, useState } from "react";
import type { EventImage } from "@/lib/events-types";

type Props = {
  images: EventImage[];
  eventTitle: string;
};

export default function EventGallery({ images, eventTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="note" style={{ maxWidth: 680 }}>
        <p style={{ margin: 0 }}>No photographs have been attached to this event yet.</p>
      </div>
    );
  }

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <button
            key={img.id || img.url}
            type="button"
            className="gallery-item"
            onClick={() => setActiveIndex(idx)}
            aria-label={`View photo ${idx + 1} of ${images.length}: ${img.alt || eventTitle}`}
          >
            <div className="photo-frame ratio-4-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || `${eventTitle} — photograph ${idx + 1}`}
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
            {(img.caption || img.alt) && (
              <div className="overlay">
                <span className="tag">Photo {idx + 1}</span>
                <p style={{ marginTop: "0.4rem" }}>{img.caption || img.alt}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {active && activeIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Event photograph viewer">
          <div className="lightbox-top">
            <span>
              {activeIndex + 1} / {images.length} — {eventTitle}
            </span>
            <button
              type="button"
              className="lb-btn"
              onClick={() => setActiveIndex(null)}
              aria-label="Close photograph viewer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="lightbox-stage">
            {images.length > 1 && (
              <button
                type="button"
                className="lb-btn lb-prev"
                onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                aria-label="Previous photograph"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div className="photo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.url}
                alt={active.alt || `${eventTitle} — photograph ${activeIndex + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            {images.length > 1 && (
              <button
                type="button"
                className="lb-btn lb-next"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                aria-label="Next photograph"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          <div className="lightbox-caption">
            <h2>{active.caption || eventTitle}</h2>
            {active.alt && active.alt !== active.caption && <p>{active.alt}</p>}
          </div>
        </div>
      )}
    </>
  );
}
