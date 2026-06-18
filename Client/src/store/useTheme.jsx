import { createContext, useState, useContext, useEffect } from "react";

// ── Shared Context ──────────────────────────────────────────────────────────
const ThemeContext = createContext(null);

/**
 * Wrap your app with <ThemeProvider> once (in main.jsx).
 * Every component can then call useTheme() to get the SAME theme state.
 */
export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(() => {
    // Seamlessly migrate from old 'theme' key to 'themePreference'
    const oldTheme = localStorage.getItem("theme");
    if (oldTheme) {
      localStorage.removeItem("theme");
      return oldTheme;
    }
    return localStorage.getItem("themePreference") || "system";
  });

  const [systemTheme, setSystemTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    localStorage.setItem("themePreference", themePreference);
  }, [themePreference]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setSystemTheme(e.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const theme = themePreference === "system" ? systemTheme : themePreference;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setThemePreference(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider
      value={{ theme, themePreference, setThemePreference, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
};
