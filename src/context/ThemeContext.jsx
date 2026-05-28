import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { DEFAULT_THEME_ID, getTheme, globalTokens } from "../themes/tokens";
import { themeService } from "../store/services/themeService";
import themeData from "../data/theme";
import { store } from "../store";
import { showAlert } from "../store/slices/alertSlice";

// ─── Cache key ────────────────────────────────────────────────────────────────
const CACHE_KEY = "active-theme";

// ─── Apply CSS vars to :root ──────────────────────────────────────────────────
function applyThemeCssVars(tokens) {
  const root = document.documentElement;

  Object.entries(tokens.cssVars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  const g = globalTokens.state;
  const d = globalTokens.disabled;

  root.style.setProperty("--color-success",         g.success);
  root.style.setProperty("--color-success-text",    g.successText);
  root.style.setProperty("--color-success-bg",      g.successBackground);
  root.style.setProperty("--color-warning",         g.warning);
  root.style.setProperty("--color-warning-text",    g.warningText);
  root.style.setProperty("--color-warning-bg",      g.warningBackground);
  root.style.setProperty("--color-error",           g.error);
  root.style.setProperty("--color-error-text",      g.errorText);
  root.style.setProperty("--color-error-bg",        g.errorBackground);
  root.style.setProperty("--color-disabled-bg",     d.background);
  root.style.setProperty("--color-disabled-border", d.border);
  root.style.setProperty("--color-disabled-text",   d.text);

  root.setAttribute("data-theme",      tokens.id);
  root.setAttribute("data-theme-mode", tokens.mode);
}

// ─── Resolve theme ID ─────────────────────────────────────────────────────────
// Priority: localStorage → API → local theme.js → hard fallback
async function resolveInitialThemeId() {
  // 1. Check localStorage — instant, no network needed
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached && getTheme(cached)) return cached;

  // 2. Call API
  try {
    const response = await themeService.getThemes();
    const apiDefault = response?.defaultThemeId;
    if (apiDefault && getTheme(apiDefault)) {
      // Cache it so next load skips the API
      localStorage.setItem(CACHE_KEY, apiDefault);
      return apiDefault;
    }
  } catch (err) {
    // API failed — show global alert, then fall through to local data
    store.dispatch(
      showAlert({
        type: "success",
        title: "Theme Error",
        message: "Using default theme.",
      })
    );
  }

  // 3. Fall back to local theme.js
  const localDefault = themeData?.defaultThemeId;
  if (localDefault && getTheme(localDefault)) return localDefault;

  // 4. Hard fallback
  return DEFAULT_THEME_ID;
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const ThemeContext = createContext({
  theme: getTheme(DEFAULT_THEME_ID),
  global: globalTokens,
  themeId: DEFAULT_THEME_ID,
  isLoading: false,
  error: null,
  setTheme: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  // Apply local default synchronously — no flicker, no blocking loader
  const [themeId, setThemeId] = useState(() => {
    const id = themeData?.defaultThemeId || DEFAULT_THEME_ID;
    applyThemeCssVars(getTheme(id));
    return id;
  });

  const [error, setError] = useState(null);

  // Resolve real theme in background after first render
  useEffect(() => {
    let mounted = true;

    resolveInitialThemeId().then((id) => {
      if (!mounted) return;
      applyThemeCssVars(getTheme(id));
      setThemeId(id);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // ── Public setTheme — instant UI + cache ─────────────────────────────────
  const setTheme = useCallback((id) => {
    if (!getTheme(id)) {
      console.warn("[ThemeProvider] Unknown theme id:", id);
      return;
    }
    // 1. Apply CSS vars instantly
    applyThemeCssVars(getTheme(id));
    // 2. Update React state
    setThemeId(id);
    // 3. Cache for next app load
    localStorage.setItem(CACHE_KEY, id);
  }, []);

  const value = useMemo(
    () => ({
      theme: getTheme(themeId),
      global: globalTokens,
      themeId,
      isLoading: false,
      error,
      setTheme,
    }),
    [themeId, error, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
export const useThemeContext  = () => useContext(ThemeContext);
export const useTheme         = () => useContext(ThemeContext).theme;
export const useGlobalTokens  = () => useContext(ThemeContext).global;