import React from "react";
import { useGlobalTokens } from "../../../context/ThemeContext";

const C = {
  success: { bg: "#EAF8EE", border: "#C3EDD1", icon: "#28A745", title: "#1E7E34", text: "#276138" },
  warning: { bg: "#FFF6D8", border: "#FFE89A", icon: "#D39E00", title: "#8A6300", text: "#7A5800" },
  error:   { bg: "#FDEBEC", border: "#F8C9CC", icon: "#DC3545", title: "#B02A37", text: "#A0242F" },
  info:    { bg: "#E8F0FE", border: "#C3D4FC", icon: "#1A56DB", title: "#1446A0", text: "#1A4090" },
};

const ICONS = {
  success: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
  warning: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  error:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  info:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
};

export function Alert({ intent, title, children, onDismiss, icon }) {
  const global = useGlobalTokens(); const c = C[intent];
  return (
    <div role="alert" style={{ display: "flex", gap: "10px", padding: "12px 14px", borderRadius: global.radius.md, border: `1px solid ${c.border}`, background: c.bg }}>
      <span style={{ color: c.icon, flexShrink: 0, marginTop: "1px", display: "flex" }}>{icon ?? ICONS[intent]}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title    && <p style={{ margin: "0 0 2px", fontSize: "14px", fontWeight: "600", color: c.title, fontFamily: "'DM Sans', sans-serif" }}>{title}</p>}
        {children && <p style={{ margin: 0, fontSize: "13px", color: c.text, lineHeight: "1.5", fontFamily: "'DM Sans', sans-serif" }}>{children}</p>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss" style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px", color: c.icon, opacity: 0.7, flexShrink: 0, alignSelf: "flex-start", lineHeight: 1 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}
export default Alert;
