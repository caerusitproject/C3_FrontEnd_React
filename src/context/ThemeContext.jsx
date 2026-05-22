import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME_ID,
  getTheme,
  globalTokens,
  THEME_REGISTRY,
} from "../themes/tokens";
import {
  fetchActiveTheme,
  updateActiveTheme,
  clearThemeCache,
} from "../store/services/themeService";

export const ThemeContext = createContext({
  theme: THEME_REGISTRY[DEFAULT_THEME_ID],
  global: globalTokens,
  themeId: DEFAULT_THEME_ID,
  isLoading: true,
  error: null,
  setTheme: async () => {},
  refetch: () => {},
});

function applyThemeCssVars(tokens) {
  const root = document.documentElement;
  Object.entries(tokens.cssVars).forEach(([p, v]) =>
    root.style.setProperty(p, v),
  );
  root.style.setProperty("--color-success", globalTokens.state.success);
  root.style.setProperty(
    "--color-success-text",
    globalTokens.state.successText,
  );
  root.style.setProperty(
    "--color-success-bg",
    globalTokens.state.successBackground,
  );
  root.style.setProperty("--color-warning", globalTokens.state.warning);
  root.style.setProperty(
    "--color-warning-text",
    globalTokens.state.warningText,
  );
  root.style.setProperty(
    "--color-warning-bg",
    globalTokens.state.warningBackground,
  );
  root.style.setProperty("--color-error", globalTokens.state.error);
  root.style.setProperty("--color-error-text", globalTokens.state.errorText);
  root.style.setProperty(
    "--color-error-bg",
    globalTokens.state.errorBackground,
  );
  root.style.setProperty(
    "--color-disabled-bg",
    globalTokens.disabled.background,
  );
  root.style.setProperty(
    "--color-disabled-border",
    globalTokens.disabled.border,
  );
  root.style.setProperty("--color-disabled-text", globalTokens.disabled.text);
  root.setAttribute("data-theme", tokens.id);
  root.setAttribute("data-theme-mode", tokens.mode);
}

export function ThemeProvider({ children, overrideThemeId }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [isLoading, setIsLoading] = useState(!overrideThemeId);
  const [error, setError] = useState(null);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    if (!overrideThemeId) return;
    setThemeId(overrideThemeId);
    applyThemeCssVars(getTheme(overrideThemeId));
    setIsLoading(false);
  }, [overrideThemeId]);

  useEffect(() => {
    if (overrideThemeId) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    fetchActiveTheme()
      .then((id) => {
        if (cancelled) return;
        setThemeId(id);
        applyThemeCssVars(getTheme(id));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[ThemeProvider]", err.message);
        setError(err.message);
        applyThemeCssVars(getTheme(DEFAULT_THEME_ID));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchKey, overrideThemeId]);

  console.log("the value of loading____", isLoading);

  const setTheme = useCallback(
    async (id) => {
      const prev = themeId;
      setThemeId(id);
      applyThemeCssVars(getTheme(id));
      try {
        await updateActiveTheme(id);
      } catch (err) {
        console.error("[ThemeProvider] persist failed:", err);
        setThemeId(prev);
        applyThemeCssVars(getTheme(prev));
        throw err;
      }
    },
    [themeId],
  );

  const refetch = useCallback(() => {
    clearThemeCache();
    setFetchKey((k) => k + 1);
  }, []);

  const value = useMemo(
    () => ({
      theme: getTheme(themeId),
      global: globalTokens,
      themeId,
      isLoading,
      error,
      setTheme,
      refetch,
    }),
    [themeId, isLoading, error, setTheme, refetch],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
export const useTheme = () => useContext(ThemeContext).theme;
export const useGlobalTokens = () => useContext(ThemeContext).global;
