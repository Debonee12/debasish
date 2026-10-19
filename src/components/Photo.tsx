"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Short label shown inside the placeholder, e.g. "Field Work Photo 1" */
  label?: string;
  /** One-line description inside the placeholder */
  description?: string;
  className?: string;
  /** Override the default 4/3 aspect-ratio class */
  ratioClass?: string;
  /** Show the AI-generated chip */
  isAI?: boolean;
  /** Pass-through priority for LCP images */
  priority?: boolean;
};

export default function Photo({
  src,
  alt,
  label,
  description,
  className = "",
  ratioClass = "ratio-4-3",
  isAI = false,
  priority = false,
}: Props) {
  const [error, setError] = useState(false);
  const showPlaceholder = !src || error;

  return (
    <div className={`photo-frame ${ratioClass} ${className}`}>
      {isAI && (
        <div className="ai-chip">
          <span className="tag tag-ai">AI illustration</span>
        </div>
      )}
      {showPlaceholder ? (
        <div className="photo-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5A1.5 1.5 0 003.75 21z" />
          </svg>
          {label && <strong>{label}</strong>}
          {description && <p>{description}</p>}
          {src && <code>→ /public{src}</code>}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
          priority={priority}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
