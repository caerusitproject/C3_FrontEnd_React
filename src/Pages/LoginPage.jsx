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
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleLogin() {
    setError(null);
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email) {
      setEmailError("Please enter your email address.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      hasError = true;
    }

    if (hasError) return;

    setSubmitting(true);

    // Simulate or dispatch login
    dispatch(actions.userLogin({ email, password }));
    // For demo - in real app handle async
    setTimeout(() => {
      setSubmitting(false);
      navigate("/home");
    }, 1200);
  }

  // ── Layout ───────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: theme.foundation.loginBackground || "#FFF1DD",
        transition: "all 0.35s ease",
        padding: "32px",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background decorative elements - matching SVG vibe */}
      <div
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: theme.foundation.primaryColor,
          opacity: 0.06,
          filter: "blur(90px)",
          top: "-180px",
          right: "-120px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: theme.foundation.primaryColor,
          opacity: 0.04,
          filter: "blur(100px)",
          bottom: "-180px",
          left: "-100px",
          pointerEvents: "none",
        }}
      />

      {/* Left Branding Section */}
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "0",
          bottom: "0",
          width: "40%",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Top Left Logo */}
        <div
          style={{
            position: "absolute",
            top: "55px",
            left: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: "182px",
              fontWeight: "300",
              lineHeight: "0.85",
              letterSpacing: "-5px",
              color: theme.foundation.primaryColor || "#F69B29",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            C3
          </div>

          <div
            style={{
              marginTop: "2px",
              marginLeft: "90px",
              fontSize: "12px",
              fontWeight: "600",
              color: theme.typography.helperText,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            By CaerusIT
          </div>
        </div>

        {/* Main Heading */}
        <div
          style={{
            marginTop: "40px",
            maxWidth: "390px",
          }}
        >
          <Text
            variant="body"
            style={{
              fontSize: "70px",
              fontWeight: "250",
              color: theme.foundation.primaryColor || "#F69B29",
              lineHeight: "1.05",
              letterSpacing: "-2px",
              textAlign: "left",
            }}
          >
            Login into Your Account
          </Text>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "0",
            fontSize: "11px",
            color: theme.typography.helperText,
            opacity: 0.7,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ©CaerusIT All Rights Reserved 2026-2028
        </div>
      </div>

      {/* Main Card Container - matching SVG dimensions and style */}
      <div
        style={{
          width: "100%",
          maxWidth: "580px",
          borderRadius: "51px",
          background: theme.foundation.surfaceBackground || "#FFF4E9",
          border: `3px solid ${theme.foundation.borderColor || "#FFFAF6"}`,
          boxShadow: `
            0 8px 30px rgba(0,0,0,0.04),
            0 40px 80px rgba(0,0,0,0.08)
          `,
          padding: "56px 64px",
          position: "absolute",
          right: "8%",
          top: "57%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        {/* Title / Header */}
        {/* <div style={{ marginBottom: "42px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: theme.typography.bodyText,
              marginBottom: "8px",
            }}
          >
            Log In
          </div>
          <Text
            variant="helper"
            style={{ fontSize: "15px", color: theme.typography.helperText }}
          >
            Enter your credentials to access your account
          </Text>
        </div> */}

        {/* Global Error */}
        {error && (
          <div style={{ marginBottom: "20px" }}>
            <Alert intent="error" onDismiss={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        {/* Email Field */}
        <div style={{ marginBottom: "26px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "9px",
            }}
          >
            <label
              style={{
                fontSize: "13.5px",
                fontWeight: "600",
                color: theme.typography.bodyText,
              }}
            >
              Email Address
            </label>
          </div>

          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            leftIcon={
              <EmailIcon
                style={{
                  fontSize: "19px",
                  color: theme.typography.helperText,
                }}
              />
            }
            state={emailError ? "error" : undefined}
            style={{
              height: "62px",
              borderRadius: "16px",
              fontSize: "15.5px",
              paddingLeft: "48px",
              background: theme.foundation.surfaceBackground || "#FFFCF9",
              // border: `1.5px solid ${
              //   emailError ? "#ff4d4f" : theme.foundation.borderColor
              // }`,
            }}
          />

          {emailError && (
            <div
              style={{
                marginTop: "6px",
                fontSize: "12.5px",
                color: "#ff4d4f",
                paddingLeft: "4px",
              }}
            >
              {emailError}
            </div>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: theme.typography.bodyText,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Password
            </label>
          </div>

          <div style={{ position: "relative" }}>
            <Input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              state={passwordError && !password ? "error" : undefined}
              leftIcon={<LockIcon style={{ fontSize: "18px" }} />}
              style={{
                height: "60px",
                borderRadius: "16px",
                fontSize: "15px",
                paddingLeft: "42px",
                paddingRight: "50px", // ← Extra padding for eye icon
                background: theme.foundation.surfaceBackground,
              }}
            />

            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              style={{
                position: "absolute",
                right: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                padding: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: showPw
                  ? theme.foundation.primaryColor
                  : theme.typography.helperText,
                zIndex: 2,
              }}
            >
              {showPw ? <EyeClosed /> : <EyeOpen />}
            </button>

          </div>
          {passwordError && (
            <div
              style={{
                marginTop: "6px",
                fontSize: "12.5px",
                color: "#ff4d4f",
                paddingLeft: "4px",
              }}
            >
              {passwordError}
            </div>
          )}
        </div>
        {/* Remember Me */}
        {/* <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setRemember(!remember)}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              style={{ accentColor: theme.foundation.primaryColor }}
            />
            <span
              style={{ fontSize: "13px", color: theme.typography.helperText }}
            >
              Remember me for 30 days
            </span>
          </label>
        </div> */}

        {/* Login Button */}
        <Button
          variant="primary"
          size="lg"
          loading={submitting}
          onClick={handleLogin}
          // style={{
          //   height: "62px",
          //   borderRadius: "16px",
          //   fontSize: "15.5px",
          //   fontWeight: "600",
          //   background: theme.foundation.primaryColor || "#FE9E50",
          //   boxShadow: "0 4px 12px rgba(254, 158, 80, 0.3)",
          // }}
        >
          {submitting ? "Signing in..." : "Log In"}
        </Button>

        {/* Optional footer text */}
        {/* <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Text variant="helper" style={{ fontSize: "13px" }}>
            Don't have an account? <a href="#" style={{ color: theme.foundation.primaryColor, textDecoration: "none" }}>Sign up</a>
          </Text>
        </div> */}
      </div>
    </div>
  );
}
