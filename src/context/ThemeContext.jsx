// ThemeContext.jsx

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { DEFAULT_THEME_ID, getTheme, globalTokens } from "../themes/tokens";

// Uncomment when API integration is needed
import { themeService } from "../store/services/themeService";

import themeData from "../data/theme";

// Uncomment when API integration is needed
import { store } from "../store";
import { showAlert } from "../store/slices/alertSlice";

// Cache key used to remember selected theme
const CACHE_KEY = "active-theme";

/**
 * Apply all theme CSS variables to :root
 */
function applyThemeCssVars(tokens) {
  const root = document.documentElement;

  Object.entries(tokens.cssVars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  const g = globalTokens.state;
  const d = globalTokens.disabled;

  root.style.setProperty("--color-success", g.success);
  root.style.setProperty("--color-success-text", g.successText);
  root.style.setProperty("--color-success-bg", g.successBackground);

  root.style.setProperty("--color-warning", g.warning);
  root.style.setProperty("--color-warning-text", g.warningText);
  root.style.setProperty("--color-warning-bg", g.warningBackground);

  root.style.setProperty("--color-error", g.error);
  root.style.setProperty("--color-error-text", g.errorText);
  root.style.setProperty("--color-error-bg", g.errorBackground);

  root.style.setProperty("--color-disabled-bg", d.background);
  root.style.setProperty("--color-disabled-border", d.border);
  root.style.setProperty("--color-disabled-text", d.text);

  root.setAttribute("data-theme", tokens.id);
  root.setAttribute("data-theme-mode", tokens.mode);
}

/**
 * Resolve initial theme
 *
 * Current Flow:
 * 1. Check localStorage
 * 2. Use themeData default theme
 * 3. Use hardcoded fallback
 *
 * Future API Flow:
 * 1. Check localStorage
 * 2. Call Theme API
 * 3. Use themeData fallback
 * 4. Use hardcoded fallback
 */
async function resolveInitialThemeId() {
  // Step 1: Check cached theme
  const cachedTheme = localStorage.getItem(CACHE_KEY);

  if (cachedTheme && getTheme(cachedTheme)) {
    return cachedTheme;
  }

  /**
   * ==========================================================
   * FUTURE API IMPLEMENTATION
   * ==========================================================
   */

 
  // try {
  //   const response = await themeService.getThemes();

  //   const apiDefaultTheme = response?.defaultThemeId;

  //   if (apiDefaultTheme && getTheme(apiDefaultTheme)) {
  //     localStorage.setItem(CACHE_KEY, apiDefaultTheme);
  //     return apiDefaultTheme;
  //   }
  // } catch (error) {
  //   store.dispatch(
  //     showAlert({
  //       type: "error",
  //       title: "Theme Error",
  //       message: "Failed to load theme from server."
  //     })
  //   );
  // }
  

  // Step 2: Use local theme configuration
  const localDefaultTheme = themeData?.defaultThemeId;

  if (localDefaultTheme && getTheme(localDefaultTheme)) {
    return localDefaultTheme;
  }

  // Step 3: Hard fallback
  return DEFAULT_THEME_ID;
}

/**
 * Theme Context
 */
export const ThemeContext = createContext({
  theme: getTheme(DEFAULT_THEME_ID),
  global: globalTokens,
  themeId: DEFAULT_THEME_ID,
  isLoading: false,
  error: null,
  setTheme: () => {},
});

/**
 * Theme Provider
 */
export function ThemeProvider({ children }) {
  // Load local default theme immediately
  const [themeId, setThemeId] = useState(() => {
    const initialTheme =
      themeData?.defaultThemeId || DEFAULT_THEME_ID;

    applyThemeCssVars(getTheme(initialTheme));

    return initialTheme;
  });

  const [error] = useState(null);

  /**
   * Resolve actual theme after app loads
   */
  useEffect(() => {
    let mounted = true;

    resolveInitialThemeId().then((resolvedThemeId) => {
      if (!mounted) return;

      applyThemeCssVars(getTheme(resolvedThemeId));
      setThemeId(resolvedThemeId);
    });

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Change theme instantly
   */
  const setTheme = useCallback((id) => {
    if (!getTheme(id)) {
      console.warn("[ThemeProvider] Unknown theme:", id);
      return;
    }

    // Apply CSS variables immediately
    applyThemeCssVars(getTheme(id));

    // Update state
    setThemeId(id);

    // Save selection
    localStorage.setItem(CACHE_KEY, id);

    /**
     * Future API save call
     */
    /*
    try {
      await themeService.updateTheme(id);
    } catch (error) {
      console.error("Failed to save theme");
    }
    */
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
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom Hooks
 */
export const useThemeContext = () => useContext(ThemeContext);
export const useTheme = () => useContext(ThemeContext).theme;
export const useGlobalTokens = () => useContext(ThemeContext).global;