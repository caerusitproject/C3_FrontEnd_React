import React from "react";
import { useGlobalTokens } from "../../../context/ThemeContext";

const C = {
  success: { bg: "#EAF8EE", text: "#1E7E34", border: "#D1F0DA" },
  warning: { bg: "#FFF6D8", text: "#8A6300", border: "#FFE99A" },
  error:   { bg: "#FDEBEC", text: "#B02A37", border: "#F8C9CC" },
  info:    { bg: "#E8F0FE", text: "#1A56DB", border: "#C3D4FC" },
  neutral: { bg: "#F3F4F6", text: "#4B5563", border: "#E5E7EB" },
};

export function Badge({ intent = "neutral", size = "md", dot = false, children }) {
  const global = useGlobalTokens(); const c = C[intent];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: size === "sm" ? "2px 7px" : "3px 10px",
      borderRadius: global.radius.full, border: `1px solid ${c.border}`, background: c.bg,
      color: c.text, fontSize: size === "sm" ? "11px" : "12px", fontWeight: global.fontWeight.medium,
      whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>
      {dot && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.text, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
export default Badge;
