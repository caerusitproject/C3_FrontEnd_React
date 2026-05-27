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

import GlobalLoader from "../Config/GlobalLoader";
import themeData from "../data/theme";

export const ThemeContext = createContext({
  theme: getTheme(DEFAULT_THEME_ID),
  global: globalTokens,
  themeId: DEFAULT_THEME_ID,
  isLoading: true,
  error: null,
  setTheme: async () => {},
});

function applyThemeCssVars(tokens) {
  const root = document.documentElement;

  // theme vars
  Object.entries(tokens.cssVars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  // global state vars
  root.style.setProperty("--color-success", globalTokens.state.success);

  root.style.setProperty(
    "--color-success-text",
    globalTokens.state.successText
  );

  root.style.setProperty(
    "--color-success-bg",
    globalTokens.state.successBackground
  );

  root.style.setProperty("--color-warning", globalTokens.state.warning);

  root.style.setProperty(
    "--color-warning-text",
    globalTokens.state.warningText
  );

  root.style.setProperty(
    "--color-warning-bg",
    globalTokens.state.warningBackground
  );

  root.style.setProperty("--color-error", globalTokens.state.error);

  root.style.setProperty("--color-error-text", globalTokens.state.errorText);

  root.style.setProperty(
    "--color-error-bg",
    globalTokens.state.errorBackground
  );

  root.style.setProperty(
    "--color-disabled-bg",
    globalTokens.disabled.background
  );

  root.style.setProperty(
    "--color-disabled-border",
    globalTokens.disabled.border
  );

  root.style.setProperty("--color-disabled-text", globalTokens.disabled.text);

  root.setAttribute("data-theme", tokens.id);

  root.setAttribute("data-theme-mode", tokens.mode);
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  // INITIAL LOAD
  useEffect(() => {
    let mounted = true;

    async function initializeTheme() {
      try {
        setIsLoading(true);

        //const response = await themeService.getThemes();
         const response =  themeData;
        // console.log(```"Fetched themes from backend:", data```);
        // console.log(```"Fetched themes from local data:", response```);

        if (!mounted) return;

        const activeThemeId = response?.defaultThemeId || DEFAULT_THEME_ID;

        applyThemeCssVars(getTheme(activeThemeId));

        setThemeId(activeThemeId);
      } catch (err) {
        console.error("[ThemeProvider]", err);

        if (!mounted) return;

        setError(err.message);

        applyThemeCssVars(getTheme(DEFAULT_THEME_ID));

        setThemeId(DEFAULT_THEME_ID);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initializeTheme();

    return () => {
      mounted = false;
    };
  }, []);

  // CHANGE THEME
  const setTheme = useCallback(
    async (id) => {
      const previousTheme = themeId;

      try {
        // instant UI update
        setThemeId(id);

        applyThemeCssVars(getTheme(id));

        localStorage.setItem("active-theme", id);

        // persist to backend
        await themeService.updateTheme(id);
      } catch (err) {
        console.error("[ThemeProvider]", err);

        // rollback
        setThemeId(previousTheme);

        applyThemeCssVars(getTheme(previousTheme));
      }
    },
    [themeId]
  );

  const value = useMemo(
    () => ({
      theme: getTheme(themeId || DEFAULT_THEME_ID),

      global: globalTokens,

      themeId: themeId || DEFAULT_THEME_ID,

      isLoading,

      error,

      setTheme,
    }),
    [themeId, isLoading, error, setTheme]
  );

  // BLOCK APP UNTIL THEME LOADS
  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// MAIN HOOK
export const useThemeContext = () => useContext(ThemeContext);

// ONLY THEME
export const useTheme = () => {
  return useContext(ThemeContext).theme;
};

// GLOBAL TOKENS
export const useGlobalTokens = () => {
  return useContext(ThemeContext).global;
};
