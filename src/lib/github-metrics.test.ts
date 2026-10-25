import { test } from "node:test";
import assert from "node:assert/strict";
import {
  fetchPublicMetrics,
  fetchTotalDownloads,
  formatCount,
  formatMetricLabel,
  sumDownloads,
} from "./github-metrics.ts";

const API = "https://api.github.com/repos/MAECLY/image-transform-lite";
const LABELS = { one: "{count} download", other: "{count} downloads" };
const LABELS_ES = { one: "{count} descarga", other: "{count} descargas" };

function json(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: () => Promise.resolve(body) });
}

test("sumDownloads adds every asset of every release", () => {
  assert.equal(
    sumDownloads([
      { assets: [{ download_count: 5 }, { download_count: 3 }] },
      { assets: [] },
      { assets: [{ download_count: 5 }, { download_count: "x" }] },
    ]),
    13
  );
});

test("fetchTotalDownloads paginates until a short page", async () => {
  const urls: string[] = [];
  const full = Array.from({ length: 100 }, () => ({
    assets: [{ download_count: 1 }],
  }));
  const total = await fetchTotalDownloads(API, (url) => {
    urls.push(url);
    return json(url.endsWith("page=1") ? full : [{ assets: [{ download_count: 7 }] }]);
  });
  assert.equal(total, 107);
  assert.equal(urls.length, 2);
  assert.match(urls[0], /releases\?per_page=100&page=1$/);
});

test("metrics are null on API failure or rate limit", async () => {
  assert.deepEqual(
    await fetchPublicMetrics(API, () => json({ message: "rate limited" }, false)),
    { downloads: null, stars: null }
  );
  assert.deepEqual(
    await fetchPublicMetrics(API, () => Promise.reject(new Error("offline"))),
    { downloads: null, stars: null }
  );
});

test("zero downloads and zero stars become null (hidden)", async () => {
  const metrics = await fetchPublicMetrics(API, (url) =>
    json(url.includes("/releases") ? [{ assets: [{ download_count: 0 }] }] : { stargazers_count: 0 })
  );
  assert.deepEqual(metrics, { downloads: null, stars: null });
});

test("positive values are kept", async () => {
  const metrics = await fetchPublicMetrics(API, (url) =>
    json(url.includes("/releases") ? [{ assets: [{ download_count: 13 }] }] : { stargazers_count: 4 })
  );
  assert.deepEqual(metrics, { downloads: 13, stars: 4 });
});

test("formatMetricLabel renders only when > 0", () => {
  assert.equal(formatMetricLabel(13, "en", LABELS), "13 downloads");
  assert.equal(formatMetricLabel(1, "en", LABELS), "1 download");
  assert.equal(formatMetricLabel(208, "es", LABELS_ES), "208 descargas");
  assert.equal(formatMetricLabel(0, "en", LABELS), null);
  assert.equal(formatMetricLabel(null, "en", LABELS), null);
  assert.equal(formatMetricLabel(undefined, "es", LABELS_ES), null);
});

test("formatCount is locale-aware", () => {
  assert.equal(formatCount(1234, "en"), "1,234");
  assert.equal(formatCount(1234, "es"), "1.234");
});
