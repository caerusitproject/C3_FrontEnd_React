import { DEFAULT_THEME_ID } from "../../themes/tokens";

// STORAGE KEYS
const LS_KEY = "c3_active_theme";

const CACHE_KEY = "c3_theme_cache";

// 5 MIN CACHE
const CACHE_TTL = 5 * 60 * 1000;

// NETWORK DELAY
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// CACHE READ
function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw);

    const isExpired =
      Date.now() - parsed.cachedAt > CACHE_TTL;

    if (isExpired) {
      sessionStorage.removeItem(CACHE_KEY);

      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

// CACHE WRITE
function writeCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        ...data,
        cachedAt: Date.now(),
      }),
    );
  } catch {}
}

// CLEAR CACHE
export function clearThemeCache() {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {}
}

// FETCH THEME
export async function fetchActiveTheme() {
  // CACHE FIRST
  const cached = readCache();

  if (cached?.themeId) {
    return cached.themeId;
  }

  // SIMULATE API DELAY
  await delay(1200);

  // DUMMY API RESPONSE
  const response = {
    success: true,

    data: {
      themeId:
        localStorage.getItem(LS_KEY) ||
        DEFAULT_THEME_ID,
    },
  };

  // API FAILURE TEST
  if (!response.success) {
    throw new Error("Failed to fetch theme");
  }

  const themeId = response.data.themeId;

  // WRITE CACHE
  writeCache({ themeId });

  return themeId;
}

// UPDATE THEME
export async function updateActiveTheme(themeId) {
  // OPTIMISTIC DELAY
  await delay(500);

  // DUMMY API RESPONSE
  const response = {
    success: true,
  };

  if (!response.success) {
    throw new Error("Theme update failed");
  }

  // PERSIST
  localStorage.setItem(LS_KEY, themeId);

  // CLEAR OLD CACHE
  clearThemeCache();

  return response;
}

export default {
  fetchActiveTheme,
  updateActiveTheme,
  clearThemeCache,
};