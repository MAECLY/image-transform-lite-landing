// Public reach metrics read from the GitHub REST API (no token, no tracking).
// Pure helpers only, so they can be unit-tested with `node --test`.
//
// Honesty rule: a metric is only shown when it is known and > 0. Any API
// failure, rate limit or zero value yields `null`, and the UI renders nothing.

export interface PublicMetrics {
  downloads: number | null;
  stars: number | null;
}

export interface ReleaseAssetLike {
  download_count?: unknown;
}

export interface ReleaseLike {
  assets?: ReleaseAssetLike[] | null;
}

type FetchLike = (url: string) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

const PER_PAGE = 100;
const MAX_PAGES = 10;

function positiveOrNull(value: number): number | null {
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function sumDownloads(releases: ReleaseLike[]): number {
  let total = 0;
  for (const release of releases) {
    for (const asset of release.assets ?? []) {
      const count = asset.download_count;
      if (typeof count === "number" && Number.isFinite(count) && count > 0) {
        total += count;
      }
    }
  }
  return total;
}

/** Sums `download_count` over every asset of every release (paginated). */
export async function fetchTotalDownloads(
  apiBase: string,
  fetchFn: FetchLike
): Promise<number | null> {
  try {
    let total = 0;
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetchFn(
        `${apiBase}/releases?per_page=${PER_PAGE}&page=${page}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!Array.isArray(data)) return null;
      total += sumDownloads(data as ReleaseLike[]);
      if (data.length < PER_PAGE) break;
    }
    return positiveOrNull(total);
  } catch {
    return null;
  }
}

export async function fetchStars(
  apiBase: string,
  fetchFn: FetchLike
): Promise<number | null> {
  try {
    const res = await fetchFn(apiBase);
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown } | null;
    const stars = data?.stargazers_count;
    return typeof stars === "number" ? positiveOrNull(stars) : null;
  } catch {
    return null;
  }
}

export async function fetchPublicMetrics(
  apiBase: string,
  fetchFn: FetchLike
): Promise<PublicMetrics> {
  const [downloads, stars] = await Promise.all([
    fetchTotalDownloads(apiBase, fetchFn),
    fetchStars(apiBase, fetchFn),
  ]);
  return { downloads, stars };
}

/** Locale-aware integer: es → "1.234", en → "1,234". */
export function formatCount(value: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      // "always" keeps the thousands separator in Spanish for 4-digit numbers.
      useGrouping: "always",
    } as Intl.NumberFormatOptions).format(value);
  } catch {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
      value
    );
  }
}

export interface CountLabels {
  one: string;
  other: string;
}

/**
 * Returns the translated label ("13 downloads" / "13 descargas"), or `null`
 * when the metric is unknown or not > 0, so nothing is rendered.
 */
export function formatMetricLabel(
  value: number | null | undefined,
  locale: string,
  labels: CountLabels
): string | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }
  const template = value === 1 ? labels.one : labels.other;
  return template.replace("{count}", formatCount(value, locale));
}
