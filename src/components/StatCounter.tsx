"use client";
import { useEffect, useRef } from "react";

type Props = {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

/** Animates a number counting up when it enters the viewport. */
export default function StatCounter({ target, suffix = "", prefix = "", duration = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.floor(ease * target);
          el.textContent = prefix + current.toLocaleString("en-IN") + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, prefix, duration]);

  return (
    <span ref={ref} aria-label={`${prefix}${target.toLocaleString("en-IN")}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
}
