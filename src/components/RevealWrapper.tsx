"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  style?: React.CSSProperties;
};

/**
 * Wraps children and adds the `in-view` class once they enter the viewport.
 * Elements inside can use the .reveal CSS class for the fade-up animation,
 * or .bar-chart / .seat-grid / etc. for chart animations.
 */
export default function RevealWrapper({ children, className = "", delay = 0, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${className} ${inView ? "in-view" : ""}`.trim()} style={style}>
      {children}
    </div>
  );
}
