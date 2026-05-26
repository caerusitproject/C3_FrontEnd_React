import React, { useState } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import { THEME_REGISTRY } from "../../../themes/tokens";

const PREVIEW = {
  lightOrange:     { dot: "#F69B29", label: "Light Orange",      desc: "Friendly & modern" },
  lightOliveGreen: { dot: "#022511", label: "Light Olive Green",  desc: "Professional enterprise" },
  darkGreen:       { dot: "#1B7C41", label: "Dark Green",         desc: "Premium dark mode" },
};

export function ThemeSwitcher({ isSuperAdmin = true }) {
  const { themeId, theme, setTheme } = useThemeContext();
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState(null);

  if (!isSuperAdmin) return null;

  const handleSelect = async (id) => {
    if (id === themeId || saving) return;
    setSaving(true); setError(null); setSaved(false);
    try {
      await setTheme(id);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { setError("Failed to save. Please try again."); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ background: theme.foundation.surfaceBackground, border: `1px solid ${theme.foundation.borderColor}`, borderRadius: "12px", padding: "20px", maxWidth: "340px", width: "100%" }}>
      <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: "600", color: theme.typography.headingText, fontFamily: "'DM Sans', sans-serif" }}>Application Theme</p>
      <p style={{ margin: "0 0 16px", fontSize: "12px", color: theme.typography.helperText, fontFamily: "'DM Sans', sans-serif" }}>Controls the theme for all users. Changes persist in localStorage (demo) / DB (production).</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {Object.keys(THEME_REGISTRY).map((id) => {
          const p = PREVIEW[id]; const isActive = id === themeId;
          return (
            <div key={id} onClick={() => handleSelect(id)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", border: `1.5px solid ${isActive ? theme.foundation.primaryColor : theme.foundation.borderColor}`, background: isActive ? theme.interaction.secondaryHoverBackground : "transparent", cursor: saving ? "not-allowed" : "pointer", opacity: saving && !isActive ? 0.55 : 1, transition: "all 0.15s ease" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: p.dot, flexShrink: 0, border: isActive ? `2px solid ${theme.foundation.primaryColor}` : "2px solid transparent", outline: isActive ? `2px solid ${theme.interaction.focusOutline}` : "none" }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: "500", color: theme.typography.bodyText, fontFamily: "'DM Sans', sans-serif" }}>{p.label}</p>
                <p style={{ margin: 0, fontSize: "11px", color: theme.typography.helperText, fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
              </div>
              {isActive && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={theme.foundation.primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          );
        })}
      </div>
      {(saving || saved || error) && <p style={{ marginTop: "10px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: error ? "#DC3545" : saving ? theme.typography.helperText : "#28A745" }}>{error ? `⚠ ${error}` : saving ? "Saving…" : "✓ Theme saved and applied"}</p>}
    </div>
  );
}
export default ThemeSwitcher;
