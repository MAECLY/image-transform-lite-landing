"use client";

import { useEffect, useState } from "react";
import { PRODUCT, getDownloadUrls } from "./constants";

export interface ReleaseInfo {
  version: string;
  pkgUrl: string;
  zipUrl: string;
  isLoading: boolean;
  isFresh: boolean;
}

const RELEASE_API = `${PRODUCT.github.api}/releases/latest`;
const CACHE_KEY = "itl-release-cache-v1";
const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheShape {
  version: string;
  pkgUrl: string;
  zipUrl: string;
  storedAt: number;
}

function readCache(): CacheShape | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed?.version) return null;
    if (Date.now() - parsed.storedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(value: Omit<CacheShape, "storedAt">) {
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

const fallbackUrls = getDownloadUrls(PRODUCT.fallbackVersion);

const initial: ReleaseInfo = {
  version: PRODUCT.fallbackVersion,
  pkgUrl: fallbackUrls.pkg,
  zipUrl: fallbackUrls.zip,
  isLoading: true,
  isFresh: false,
};

interface ReleaseAsset {
  name?: string;
  browser_download_url?: string;
}

interface ReleasePayload {
  tag_name?: string;
  assets?: ReleaseAsset[];
}

export function useGitHubRelease(): ReleaseInfo {
  const [info, setInfo] = useState<ReleaseInfo>(initial);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is browser-only; we hydrate from cache after mount.
      setInfo({
        version: cached.version,
        pkgUrl: cached.pkgUrl,
        zipUrl: cached.zipUrl,
        isLoading: false,
        isFresh: true,
      });
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      fetch(RELEASE_API)
        .then((r) => (r.ok ? (r.json() as Promise<ReleasePayload>) : null))
        .then((data) => {
          if (cancelled) return;
          if (!data) {
            setInfo((prev) => ({ ...prev, isLoading: false }));
            return;
          }
          const version =
            (data.tag_name ?? "").replace(/^v/, "") || PRODUCT.fallbackVersion;
          const assets = data.assets ?? [];
          const pkgAsset = assets.find((a) => /\.pkg$/i.test(a.name ?? ""));
          const zipAsset = assets.find((a) => /\.zip$/i.test(a.name ?? ""));
          const built = getDownloadUrls(version);
          const next: ReleaseInfo = {
            version,
            pkgUrl: pkgAsset?.browser_download_url ?? built.pkg,
            zipUrl: zipAsset?.browser_download_url ?? built.zip,
            isLoading: false,
            isFresh: true,
          };
          setInfo(next);
          writeCache({
            version: next.version,
            pkgUrl: next.pkgUrl,
            zipUrl: next.zipUrl,
          });
        })
        .catch(() => {
          if (!cancelled) {
            setInfo((prev) => ({ ...prev, isLoading: false }));
          }
        });
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return info;
}
