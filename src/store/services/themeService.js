import { DEFAULT_THEME_ID } from "../../themes/tokens";

// ─────────────────────────────────────────────────────────────────────────────
// themeService.js
//
// In this DEMO, localStorage is used instead of a real API, so you can run
// the app without any backend. In production, swap the two functions below
// to real fetch() calls against your API:
//
//   GET  /api/settings/theme     → { themeId }
//   PUT  /api/settings/theme     body: { themeId }
// ─────────────────────────────────────────────────────────────────────────────

const LS_KEY     = "c3_active_theme";
const CACHE_KEY  = "c3_theme_cache";
const CACHE_TTL  = 5 * 60 * 1000;

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { themeId, cachedAt } = JSON.parse(raw);
    if (Date.now() - cachedAt > CACHE_TTL) { sessionStorage.removeItem(CACHE_KEY); return null; }
    return themeId;
  } catch { return null; }
}

function writeCache(themeId) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ themeId, cachedAt: Date.now() })); } catch {}
}

export function clearThemeCache() {
  try { sessionStorage.removeItem(CACHE_KEY); } catch {}
}

// ── DEMO: reads from localStorage (simulates DB) ──────────────────────────────
export async function fetchActiveTheme() {
  const cached = readCache();
  if (cached) return cached;

  // Simulate a small network delay so the loading state is visible
  await new Promise((r) => setTimeout(r, 400));

  const stored = localStorage.getItem(LS_KEY) || DEFAULT_THEME_ID;
  writeCache(stored);
  return stored;

  // ── PRODUCTION: replace the block above with: ────────────────────────────
  // const res  = await fetch("/api/settings/theme", { credentials: "include" });
  // const data = await res.json();
  // writeCache(data.themeId);
  // return data.themeId;
}

// ── DEMO: writes to localStorage ──────────────────────────────────────────────
export async function updateActiveTheme(themeId) {
  await new Promise((r) => setTimeout(r, 300)); // simulate latency
  localStorage.setItem(LS_KEY, themeId);
  clearThemeCache();

  // ── PRODUCTION: replace with: ────────────────────────────────────────────
  // await fetch("/api/settings/theme", {
  //   method: "PUT", credentials: "include",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ themeId }),
  // });
  // clearThemeCache();
}

export default { fetchActiveTheme, updateActiveTheme, clearThemeCache };
