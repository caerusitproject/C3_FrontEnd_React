import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const SZ = { sm: 16, md: 24, lg: 36, xl: 48 };

export function Spinner({ size = "md", color, label = "Loading..." }) {
  const theme = useTheme(); const px = SZ[size]; const c = color ?? theme.foundation.primaryColor;
  return (
    <span role="status" aria-label={label} style={{ display: "inline-flex", alignItems: "center" }}>
      <svg width={px} height={px} viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.7s linear infinite" }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <circle cx="12" cy="12" r="10" stroke={c} strokeOpacity="0.2" strokeWidth="3" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke={c} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}
export default Spinner;
