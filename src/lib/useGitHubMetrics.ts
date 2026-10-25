"use client";

import { useEffect, useState } from "react";
import { PRODUCT } from "./constants";
import { fetchPublicMetrics, type PublicMetrics } from "./github-metrics";

const CACHE_KEY = "itl-metrics-cache-v1";
const CACHE_TTL_MS = 5 * 60 * 1000;

const EMPTY: PublicMetrics = { downloads: null, stars: null };

interface CacheShape extends PublicMetrics {
  storedAt: number;
}

function readCache(): PublicMetrics | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed || typeof parsed.storedAt !== "number") return null;
    if (Date.now() - parsed.storedAt > CACHE_TTL_MS) return null;
    return { downloads: parsed.downloads ?? null, stars: parsed.stars ?? null };
  } catch {
    return null;
  }
}

function writeCache(value: PublicMetrics) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ...value, storedAt: Date.now() })
    );
  } catch {
    /* sessionStorage may be disabled; ignore */
  }
}

// Shared in-flight request so Hero and Download trigger a single fetch.
let pending: Promise<PublicMetrics> | null = null;

function loadMetrics(): Promise<PublicMetrics> {
  if (!pending) {
    pending = fetchPublicMetrics(PRODUCT.github.api, (url) => fetch(url)).then(
      (metrics) => {
        // Only cache a complete-enough answer; failures retry next visit.
        if (metrics.downloads !== null || metrics.stars !== null) {
          writeCache(metrics);
        }
        return metrics;
      },
      () => {
        pending = null;
        return EMPTY;
      }
    );
  }
  return pending;
}

/**
 * Public reach metrics (total release downloads, GitHub stars), hydrated in
 * the browser like `useGitHubRelease`. Values are `null` until known and > 0.
 */
export function useGitHubMetrics(): PublicMetrics {
  const [metrics, setMetrics] = useState<PublicMetrics>(EMPTY);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is browser-only; we hydrate from cache after mount.
      setMetrics(cached);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      loadMetrics().then((next) => {
        if (!cancelled) setMetrics(next);
      });
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return metrics;
}
