import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../store/slices/loginSlice";

export default function TopNavbar({
  isMobile,
  mobileOpen,
  onMobileToggle,
  isTablet,
  collapsed,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.login);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hamburger in top navbar rules:
  // Mobile  → show when sidebar is CLOSED (mobileOpen=false)
  // Tablet  → NEVER — on tablet the hamburger lives inside the sidebar itself
  // Desktop → NEVER — sidebar is always expanded
  const showHamburger = isMobile && !mobileOpen;

  return (
    <header
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: theme.foundation.surfaceBackground,
        //borderBottom: `1px solid ${theme.foundation.borderColor}`,
        flexShrink: 0,
        zIndex: 10,
        // Smooth background transition when theme changes
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* LEFT: hamburger (mobile only) + logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          // Reserve space even when hamburger is hidden so logo doesn't jump
          minWidth: "48px",
        }}
      >
        {showHamburger && (
          <button
            onClick={onMobileToggle}
            style={{
              width: "36px",
              height: "36px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: theme.typography.bodyText,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              flexShrink: 0,
              // Fade in/out smoothly
              opacity: 1,
              transition: "opacity 0.2s ease",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{
            height: isMobile ? "36px" : "60px",
            width: isMobile ? "auto" : "140px",
            maxWidth: isMobile ? "100px" : "140px",
            objectFit: "contain",
            flexShrink: 0,
            // Shift left on tablet & desktop, center on mobile
            marginLeft: isMobile ? "auto" : "-12px",
            marginRight: isMobile ? "auto" : "0",
            display: "block",
          }}
        />
      </div>
      {/* RIGHT: profile avatar + dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div ref={profileRef} style={{ position: "relative" }}>
          {/* Avatar */}
          <div
            onClick={() => setProfileOpen((prev) => !prev)}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: theme.foundation.primaryColor,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              cursor: "pointer",
              userSelect: "none",
              transition: "background 0.3s ease",
            }}
          >
            {loggedInUser?.name?.[0]?.toUpperCase() ?? "U"}
          </div>

          {profileOpen && (
            <>
              {/* Backdrop */}
              <div
                onClick={() => setProfileOpen(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.15)",
                  zIndex: 998,
                }}
              />

              {/* Profile card */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "45px",
                  width: "260px",
                  background: theme.foundation.surfaceBackground,
                  border: `1px solid ${theme.foundation.borderColor}`,
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  padding: "16px",
                  zIndex: 999,
                  transition: "background 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: theme.typography.bodyText,
                  }}
                >
                  {loggedInUser?.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: theme.typography.helperText,
                    marginTop: "2px",
                  }}
                >
                  {loggedInUser?.email}
                </div>
                <div
                  style={{
                    margin: "10px 0",
                    fontSize: "12px",
                    color: theme.typography.bodyText,
                  }}
                >
                  🟢 Available
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    border: `1px solid ${theme.foundation.borderColor}`,
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: theme.typography.bodyText,
                  }}
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#e53935",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
