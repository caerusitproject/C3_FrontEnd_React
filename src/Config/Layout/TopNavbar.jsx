import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { logout } from "../../store/slices/loginSlice";
import { Button } from "../../Components/ui/Button/Button";

export default function TopNavbar({
  isMobile,
  mobileOpen,
  onMobileToggle,
  isTablet,
  collapsed,
  onOpenProfile,
  showProfile,
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

            filter: `
      drop-shadow(0.8px 0 white)
      drop-shadow(-0.8px 0 white)
      drop-shadow(0 0.8px white)
      drop-shadow(0 -0.8px white)
    `,
          }}
        />
      </div>
      {/* RIGHT: profile avatar + dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div ref={profileRef} style={{ position: "relative" }}>
          {/* Avatar */}
          {!profileOpen && !showProfile && (
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
              {loggedInUser?.employeeName?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}

          {profileOpen && (
            <>
              {/* Backdrop */}
              <div
                onClick={() => setProfileOpen(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.15)",
                  zIndex: 998,
                }}
              />

              {/* Profile Card */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "0px",
                  width: "300px",
                  background: `${theme.foundation.surfaceBackground}cc`, // cc = 80% opacity
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "22px",
                  boxShadow:
                    "0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  zIndex: 999,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: "24px 20px 18px",
                    background: `linear-gradient(
            135deg,
            ${theme.foundation.applicationBackground},
            ${theme.foundation.base}
          )`,
                    // background: theme.foundation.secondaryColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: theme.foundation.primaryColor,
                      color: theme.typography.inverseText,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      fontWeight: "700",
                      //boxShadow: "0 8px 18px rgba(246,155,41,0.35)",
                    }}
                  >
                    {loggedInUser?.employeeName?.[0]?.toUpperCase() ?? "U"}
                  </div>

                  {/* User Info */}
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {/* Status */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "10px 14px",
                        borderRadius: "999px",
                        background:
                          loggedInUser?.status === true ||
                          loggedInUser?.status === "true"
                            ? "rgba(40,167,69,0.12)"
                            : "rgba(220,53,69,0.12)",
                        width: "fit-content",
                        alignSelf: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background:
                            loggedInUser?.status === true ||
                            loggedInUser?.status === "true"
                              ? "#28A745"
                              : "#DC3545",
                          boxShadow:
                            loggedInUser?.status === true ||
                            loggedInUser?.status === "true"
                              ? "0 0 12px rgba(40,167,69,0.6)"
                              : "0 0 12px rgba(220,53,69,0.6)",
                        }}
                      />

                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color:
                            loggedInUser?.status === true ||
                            loggedInUser?.status === "true"
                              ? "#28A745"
                              : "#DC3545",
                        }}
                      >
                        {loggedInUser?.status === true ||
                        loggedInUser?.status === "true"
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: "700",
                        color: theme.typography.headingText,
                      }}
                    >
                      {loggedInUser?.employeeName}
                    </div>

                    <div
                      style={{
                        fontSize: "12px",
                        color: theme.typography.helperText,
                        wordBreak: "break-word",
                      }}
                    >
                      {loggedInUser?.email}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    background: `${theme.foundation.surfaceBackground}88`,
                    borderTop: `3px solid ${theme.foundation.borderColor}`,
                  }}
                >
                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "17px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setProfileOpen(false);
                          onOpenProfile();
                        }}
                      >
                        View Profile
                      </Button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "5px",
                      }}
                    >
                      <div
                        onClick={handleLogout}
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          background: "rgba(220,53,69,0.10)",
                          transition: "all 0.25s ease",
                          background: "rgba(220,53,69,0.08)",
                          border: "1px solid rgba(220,53,69,0.2)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#DC3545"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
