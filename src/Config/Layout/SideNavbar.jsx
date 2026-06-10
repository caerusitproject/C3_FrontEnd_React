import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, useGlobalTokens } from "../../context/ThemeContext";
import { logout, toggleSidebar } from "../../store/slices/loginSlice";
import MODULE_ICONS from "../../data/MODULE_ICONS";

const DEFAULT_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const HAMBURGER_ICON = (
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
);

const DEFAULT_MENUS = [{ moduleName: "Home", url: "/home" }];

export default function SideNavbar({
  collapsed,
  onNavClick,
  isMobile,
  isTablet,
  onToggleMobile,
  onToggleSidebar,
}) {
  const theme = useTheme();
  const globalTokens = useGlobalTokens();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menus = useSelector((state) => state.login.menus);
  const loggedInUser = useSelector((state) => state.login.loggedInUser);
  const menuList = menus?.length > 0 ? menus : DEFAULT_MENUS;
//   const menuList = [
//   {
//     moduleName: "Home",
//     url: "/home",
//   },
//   {
//     moduleName: "Attendance",
//     url: "/attendance",
//     indicator: {
//       pending: 3,
//       total: 5,
//     },
//   },
//   {
//     moduleName: "LMS",
//     url: "/lms",
//   },
//   {
//     moduleName: "HR Policies",
//     url: "/hr-policies",
//   },
//   {
//     moduleName: "Assessments",
//     url: "/assessments",
//     indicator: {
//       pending: 2,
//       total: 6,
//     },
//   },
//   {
//     moduleName: "Payroll",
//     url: "/payroll",
//   },
//   {
//     moduleName: "Agreements & Contracts",
//     url: "/agreements",
//   },
// ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <nav
      style={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        padding: "12px 8px",
        gap: "4px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── COLLAPSED HEADER: hamburger at top in place of employee details ── */}
      {/* Tablet icon-only OR desktop collapsed */}
      {collapsed && !isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "4px 4px 12px",
            //borderBottom: `1px solid ${theme.foundation.borderColor}`,
            marginBottom: "4px",
            minHeight: "52px",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => onToggleSidebar?.()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: theme.typography.bodyText,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                theme.foundation.secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {HAMBURGER_ICON}
          </button>
        </div>
      )}

      {/* ── EXPANDED HEADER: user info + collapse button (mobile & tablet open, desktop) ── */}
      {/* Renders when sidebar is expanded — mobile open, tablet open, or desktop always */}
      {!collapsed && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 4px 12px",
            borderBottom: `3px solid ${theme.foundation.borderColor}`,
            marginBottom: "4px",
            gap: "8px",
            minHeight: "52px",
            flexShrink: 0,
          }}
        >
          {/* User info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: theme.typography.bodyText,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {loggedInUser?.employeeName || loggedInUser?.name || "User"}
            </div>
            <div
              style={{
                fontSize: "11px",
                marginTop: "1px",
              }}
            >
              <span
                style={{
                  color: theme.typography.primaryText,
                  fontWeight: 500,
                }}
              >
                {loggedInUser?.employeeId}
              </span>

              {loggedInUser?.designation && (
                <span
                  style={{
                    color: theme.typography.helperText,
                  }}
                >
                  {" • "}
                  {loggedInUser.designation}
                </span>
              )}
            </div>
          </div>

          {/* Collapse button — always visible when sidebar is expanded (all breakpoints) */}
          <button
            onClick={() => {
              if (isMobile) {
                onToggleMobile?.();
              } else {
                // tablet & desktop both dispatch toggleSidebar
                onToggleSidebar?.();
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: theme.typography.bodyText,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                theme.foundation.secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {HAMBURGER_ICON}
          </button>
        </div>
      )}

      {/* ── MENU ITEMS ── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {menuList.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            onClick={onNavClick}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              color: isActive
                ? theme.foundation.primaryColor
                : theme.typography.bodyText,
              background: isActive
                ? theme.foundation.secondaryColor
                : "transparent",
            })}
          >
            <span style={{ flexShrink: 0 }}>
              {MODULE_ICONS[item.moduleName] ?? DEFAULT_ICON}
            </span>
            {!collapsed && (
              <>
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.moduleName}
                </span>

                {item.indicator?.pending > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: theme.foundation.primaryColor,
                      color: "#fff",
                    }}
                  >
                    {item.indicator.pending}/{item.indicator.total}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* ── LOGOUT ── */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: "10px",
          padding: "10px 12px",
          borderRadius: "10px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "14px",
          whiteSpace: "nowrap",
          width: "100%",
          color: theme.typography.bodyText,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = globalTokens.state.errorBackground;
          e.currentTarget.style.color = globalTokens.state.errorText;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = theme.typography.bodyText;
        }}
      >
        <span style={{ flexShrink: 0 }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </span>
        <span>Logout</span>
      </button>
    </nav>
  );
}
