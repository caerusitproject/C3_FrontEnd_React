import React, { useState } from "react";

import "./LoginPage.css";

import { useTheme } from "../../context/ThemeContext";

import { Button, Input } from "../../Components/ui";

import BadgeIcon from "@mui/icons-material/Badge";
import LockIcon from "@mui/icons-material/Lock";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import * as actions from "../../store/actions";

// ─────────────────────────────────────────────────────────────
// Eye Icons
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// Login Page
// ─────────────────────────────────────────────────────────────

export default function LoginPage() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ───────────────────────────────────────────────────────────
  // STATES
  // ───────────────────────────────────────────────────────────

  const [empId, setEmpId] = useState("");

  const [password, setPassword] = useState("");

  const [showPw, setShowPw] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [empIdError, setEmpIdError] = useState("");

  const [passwordError, setPasswordError] = useState("");

  // ───────────────────────────────────────────────────────────
  // LOGIN
  // ───────────────────────────────────────────────────────────

  async function handleLogin() {
    setEmpIdError("");
    setPasswordError("");

    let hasError = false;

    // EMPLOYEE ID VALIDATION

    if (!empId?.trim()) {
      setEmpIdError("Please enter your employee ID.");
      hasError = true;
    }

    // PASSWORD VALIDATION

    if (!password?.trim()) {
      setPasswordError("Please enter your password.");
      hasError = true;
    }

    if (hasError) return;

    setSubmitting(true);

    try {
      const res = await dispatch(
        actions.userLogin({
          samAccountName: empId.trim(),
          password,
        })
      );

      setSubmitting(false);

      if (res?.success) {
        setTimeout(() => navigate("/home"), 800);
      }
    } catch (err) {
      setSubmitting(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    handleLogin();
  };

  // ───────────────────────────────────────────────────────────
  // UI
  // ───────────────────────────────────────────────────────────

  return (
    <>
      <div
        className="login-page"
        style={{
          background: theme.foundation.loginBackground || "#FFF1DD",
        }}
      >
        {/* BACKGROUND BLUR */}

        <div
          className="login-blur-1"
          style={{
            background: theme.foundation.primaryColor,
          }}
        />

        <div
          className="login-blur-2"
          style={{
            background: theme.foundation.primaryColor,
          }}
        />

        {/* LEFT BRANDING */}

        <div className="login-branding">
          {/* LOGO */}

          <div className="login-logo-wrapper">
            <div
              className="login-logo"
              style={{
                color: theme.foundation.primaryColor,
              }}
            >
              C3
            </div>

            <div
              className="login-logo-subtitle"
              style={{
                color: theme.typography.helperText,
              }}
            >
              By CaerusIT
            </div>
          </div>

          {/* HEADING */}

          <div
            className="login-heading"
            style={{
              color: theme.foundation.primaryColor,
            }}
          >
            <span className="desktop-break">Login into</span> Your Account
          </div>

          {/* FOOTER */}

          <div
            className="login-footer"
            style={{
              color: theme.typography.helperText,
            }}
          >
            ©CaerusIT All Rights Reserved 2026-2028
          </div>
        </div>

        {/* LOGIN CARD */}

        <form
          onSubmit={handleSubmit}
          className="login-card"
          style={{
            background: theme.foundation.surfaceBackground,

            border: `3px solid ${theme.foundation.borderColor}`,

            boxShadow: `
            0 8px 30px rgba(0,0,0,0.04),
            0 40px 80px rgba(0,0,0,0.08)
          `,
          }}
        >
          {/* EMPLOYEE ID */}

          <div className="login-form-group">
            <label
              className="login-label"
              style={{
                color: theme.typography.bodyText,
              }}
            >
              Employee ID
            </label>

            <Input
              type="text"
              size="lg"
              variant="filled"
              placeholder="Enter employee ID"
              value={empId}
              onChange={(e) => {
                setEmpId(e.target.value);
                setEmpIdError("");
              }}
              leftIcon={<BadgeIcon />}
              state={empIdError ? "error" : "default"}
            />

            {empIdError && <div className="login-error">{empIdError}</div>}
          </div>

          {/* PASSWORD */}

          <div className="login-form-group">
            <label
              className="login-label"
              style={{
                color: theme.typography.bodyText,
              }}
            >
              Password
            </label>

            <div className="password-wrapper">
              <Input
                type={showPw ? "text" : "password"}
                size="lg"
                variant="filled"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                leftIcon={<LockIcon />}
                state={passwordError ? "error" : "default"}
                style={{
                  paddingRight: "54px",
                }}
              />

              {/* EYE BUTTON */}

              <button
                type="button"
                className="password-eye-btn"
                onClick={() => setShowPw((v) => !v)}
                style={{
                  color: showPw
                    ? theme.foundation.primaryColor
                    : theme.typography.helperText,
                }}
              >
                {showPw ? <EyeClosed /> : <EyeOpen />}
              </button>
            </div>

            {passwordError && (
              <div className="login-error">{passwordError}</div>
            )}
          </div>

          {/* LOGIN BUTTON */}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={submitting}
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </div>
    </>
  );
}
