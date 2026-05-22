import React, { useState } from "react";
import {
  useTheme,
  useGlobalTokens,
  useThemeContext,
} from "../context/ThemeContext";
import {
  Text,
  Button,
  Input,
  Card,
  Alert,
  Badge,
  Spinner,
  ThemeSwitcher,
} from "../Components/ui";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";

// ── Eye icons ──────────────────────────────────────────────────────────────────
const EyeOpen = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeClosed = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ── Divider ────────────────────────────────────────────────────────────────────
function Divider({ theme }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "18px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background: theme.foundation.borderColor,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          color: theme.typography.helperText,
          fontFamily: "'DM Mono', monospace",
          whiteSpace: "nowrap",
        }}
      >
        or sign in with email
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: theme.foundation.borderColor,
        }}
      />
    </div>
  );
}

// ── SSO button ─────────────────────────────────────────────────────────────────
function SSOButton({ children, onClick, theme, global }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: hovered ? theme.foundation.secondaryColor : "transparent",
        border: `1.5px solid ${theme.foundation.borderColor}`,
        borderRadius: global.radius.md,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        fontWeight: "500",
        color: theme.typography.bodyText,
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
        marginBottom: "8px",
      }}
    >
      {children}
    </button>
  );
}

// ── Custom checkbox ────────────────────────────────────────────────────────────
function Checkbox({ checked, onChange, label, theme, global }) {
  return (
    <div
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "4px",
          flexShrink: 0,
          border: `1.5px solid ${checked ? theme.foundation.primaryColor : theme.foundation.borderColor}`,
          background: checked
            ? theme.foundation.primaryColor
            : theme.foundation.surfaceBackground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {checked && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        )}
      </div>
      <span
        style={{
          fontSize: "12px",
          color: theme.typography.helperText,
          userSelect: "none",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── LoginPage ──────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const theme = useTheme();
  const global = useGlobalTokens();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeId, isLoading } = useThemeContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(null);
  const [error, setError] = useState(null);

  const THEME_BADGE = {
    lightOrange: { intent: "warning", label: "Light Orange" },
    lightOliveGreen: { intent: "success", label: "Light Olive Green" },
    darkGreen: { intent: "neutral", label: "Dark Green" },
  };

  function handleLogin() {
    setError(null);
    if (!email || !password) {
      setError("Please fill in your email and password.");
      return;
    }
    setSubmitting(true);

    dispatch(actions.userLogin({ email, password }));
    navigate("/home");
    // setTimeout(() => {
    //   setSubmitting(false);
    //   setError("Invalid credentials. Please try again.");
    // }, 1800);
  }

  function handleSSO(provider) {
    setSsoLoading(provider);
    setTimeout(() => setSsoLoading(null), 1500);
  }

  // ── Full-page loader ─────────────────────────────────────────────────────────
  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         background: theme.foundation.applicationBackground,
  //       }}
  //     >
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           gap: "16px",
  //         }}
  //       >
  //         <Spinner size="lg" />
  //         <Text variant="helper">Loading theme…</Text>
  //       </div>
  //     </div>
  //   );
  // }

  // ── Layout ───────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        background: theme.foundation.applicationBackground,
        transition: "background 0.35s ease",
      }}
    >
      {/* ── LEFT PANEL ────────────────────────────────────────────────────── */}
      <div
        style={{
          background: theme.foundation.surfaceBackground,
          borderRight: `1px solid ${theme.foundation.borderColor}`,
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.35s ease, border-color 0.35s ease",
        }}
      >
        {/* decorative circles */}
        {/* <svg
          viewBox="0 0 360 600"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <circle
            cx="320"
            cy="80"
            r="140"
            fill={theme.foundation.primaryColor}
            fillOpacity="0.06"
          />
          <circle
            cx="40"
            cy="480"
            r="100"
            fill={theme.foundation.primaryColor}
            fillOpacity="0.04"
          />
          <circle
            cx="200"
            cy="300"
            r="60"
            fill={theme.foundation.primaryColor}
            fillOpacity="0.03"
          />
        </svg> */}

        {/* top: logo + copy */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* logo row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: theme.foundation.primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.35s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: theme.typography.headingText,
                letterSpacing: "-0.01em",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.35s ease",
              }}
            >
              C3 Work System
            </span>
          </div>

          {/* active theme badge */}
          <div style={{ marginBottom: "20px" }}>
            <Badge
              intent={THEME_BADGE[themeId]?.intent ?? "neutral"}
              dot
              size="sm"
            >
              {THEME_BADGE[themeId]?.label ?? themeId}
            </Badge>
          </div>

          <Text
            variant="h2"
            style={{
              marginBottom: "12px",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            Welcome back to your workspace
          </Text>
        </div>

        {/* bottom: feature list */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {[
            "token-driven theming",
            "accessible components",
            "persistent theme selection",
            "role-based super-admin panel",
          ].map((f) => (
            <div
              key={f}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: theme.foundation.primaryColor,
                  flexShrink: 0,
                  transition: "background 0.35s ease",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: theme.typography.helperText,
                  fontFamily: "'DM Mono', monospace",
                  transition: "color 0.35s ease",
                }}
              >
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM COLUMN ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
          background: theme.foundation.applicationBackground,
          transition: "background 0.35s ease",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* form card */}
          <Card
            variant="default"
            padding="lg"
            header={
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: theme.foundation.primaryColor,
                    marginBottom: "8px",
                    margin: "0 0 8px",
                    transition: "color 0.35s ease",
                  }}
                >
                  Secure access
                </p>
                <Text
                  variant="h2"
                  style={{ marginBottom: "4px", letterSpacing: "-0.02em" }}
                >
                  Sign in to C3
                </Text>
                <Text variant="helper">Enter your credentials to continue</Text>
              </div>
            }
          >
            {/* error alert */}
            {error && (
              <div style={{ marginBottom: "16px" }}>
                <Alert intent="error" onDismiss={() => setError(null)}>
                  {error}
                </Alert>
              </div>
            )}

            {/* SSO */}
            <SSOButton
              theme={theme}
              global={global}
              onClick={() => handleSSO("Google")}
            >
              {ssoLoading === "Google" ? (
                <Spinner size="sm" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              {ssoLoading === "Google"
                ? "Redirecting…"
                : "Continue with Google"}
            </SSOButton>

            <SSOButton
              theme={theme}
              global={global}
              onClick={() => handleSSO("GitHub")}
            >
              {ssoLoading === "GitHub" ? (
                <Spinner size="sm" />
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={theme.typography.bodyText}
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              )}
              {ssoLoading === "GitHub"
                ? "Redirecting…"
                : "Continue with GitHub"}
            </SSOButton>

            <Divider theme={theme} />

            {/* email */}
            <div style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: theme.typography.bodyText,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.35s ease",
                  }}
                >
                  Email Address
                </label>
              </div>
              <Input
                // label="Email address"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                state={error && !email ? "error" : undefined}
                leftIcon={<EmailIcon />}
              />
            </div>

            {/* password */}
            <div style={{ marginBottom: "14px" }}>
              {/* custom label row with forgot-password link */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: theme.typography.bodyText,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.35s ease",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: theme.foundation.primaryColor,
                    textDecoration: "none",
                    marginLeft: "auto",
                    transition: "color 0.35s ease",
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <Input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                state={error && !password ? "error" : undefined}
                leftIcon={<LockIcon />}
                rightIcon={
                  <button
                    onClick={() => setShowPw((v) => !v)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: theme.typography.helperText,
                      padding: 0,
                    }}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <EyeClosed /> : <EyeOpen />}
                  </button>
                }
              />
            </div>

            {/* remember me */}
            <div style={{ marginBottom: "20px" }}>
              <Checkbox
                checked={remember}
                onChange={() => setRemember((v) => !v)}
                label="Remember me for 30 days"
                theme={theme}
                global={global}
              />
            </div>

            {/* submit */}
            <Button
              variant="primary"
              fullWidth
              loading={submitting}
              onClick={handleLogin}
            >
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </Card>

          {/* sign-up link */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text variant="helper">
              Don't have an account?{" "}
              <a
                href="#"
                style={{
                  color: theme.foundation.primaryColor,
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "color 0.35s ease",
                }}
              >
                Create one free
              </a>
            </Text>
          </div>

          {/* theme switcher */}
          <div style={{ marginTop: "24px" }}>
            <Card variant="outlined" padding="md">
              <div style={{ marginBottom: "10px" }}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: theme.typography.helperText,
                    margin: 0,
                    transition: "color 0.35s ease",
                  }}
                >
                  Theme control
                </p>
              </div>
              {/* <ThemeSwitcher isSuperAdmin={true} /> */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
