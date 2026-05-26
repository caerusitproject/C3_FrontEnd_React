import React from "react";
import { useTheme, useGlobalTokens, useThemeContext } from "../context/ThemeContext";
import { Text, Button, Badge, Spinner } from "../Components/ui";

export default function Home() {
  const theme  = useTheme();
  const global = useGlobalTokens();
  const { themeId, isLoading } = useThemeContext();

  const THEME_BADGE = {
    lightOrange:     { intent: "warning", label: "Light Orange"      },
    lightOliveGreen: { intent: "success", label: "Light Olive Green"  },
    darkGreen:       { intent: "neutral", label: "Dark Green"         },
  };

  function handleLogout() {
    // replace with your real logout logic
    alert("Logged out");
  }

  // ── Loading splash ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: theme.foundation.applicationBackground,
          transition: "background 0.35s ease",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <Spinner size="lg" />
          <Text variant="helper">Loading…</Text>
        </div>
      </div>
    );
  }

  // ── Page ─────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.foundation.applicationBackground,
        transition: "background 0.35s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Top nav bar ────────────────────────────────────────────────────── */}
      <nav
        style={{
          background: theme.foundation.surfaceBackground,
          borderBottom: `1px solid ${theme.foundation.borderColor}`,
          padding: "0 40px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: theme.foundation.primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.35s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <Text variant="h4" style={{ letterSpacing: "-0.01em" }}>
            C3 Design System
          </Text>
        </div>

        {/* Right side: badge + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Badge intent={THEME_BADGE[themeId]?.intent ?? "neutral"} dot size="sm">
            {THEME_BADGE[themeId]?.label ?? themeId}
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            leftIcon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            }
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        {/* Accent bar above heading */}
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "2px",
            background: theme.foundation.primaryColor,
            marginBottom: "8px",
            transition: "background 0.35s ease",
          }}
        />

        <Text variant="h1" style={{ letterSpacing: "-0.02em" }}>
          Welcome Home
        </Text>

        <Text
          variant="body"
          style={{ maxWidth: "420px", lineHeight: 1.65 }}
        >
          You are successfully logged in. The background, text, and all UI elements
          adapt automatically to whichever theme is active.
        </Text>

        {/* Logout button in the center too */}
        <div style={{ marginTop: "24px" }}>
          <Button
            variant="primary"
            onClick={handleLogout}
            leftIcon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            }
          >
            Logout
          </Button>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: theme.foundation.surfaceBackground,
          borderTop: `1px solid ${theme.foundation.borderColor}`,
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        <Text variant="helper">
          C3 Design System · {THEME_BADGE[themeId]?.label ?? themeId} theme active
        </Text>
      </footer>
    </div>
  );
}
