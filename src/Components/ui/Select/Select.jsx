import React, { useState } from "react";
import { useTheme, useGlobalTokens } from "../../../context/ThemeContext";

export function Select({ label, helperText, errorText, options = [], placeholder, state = "default", fullWidth = true, disabled, id: pid, style, ...rest }) {
  const theme = useTheme(); const global = useGlobalTokens();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const id  = pid || `sel-${Math.random().toString(36).slice(2,7)}`;
  const sk  = disabled ? "disabled" : state !== "default" ? state : focused ? "focus" : hovered ? "hover" : "default";
  const tok = theme.input[sk];
  const hintColor = state === "error" ? global.state.error : state === "success" ? global.state.success : theme.typography.helperText;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: fullWidth ? "100%" : "auto" }}>
      {label && <label htmlFor={id} style={{ display: "block", fontSize: "13px", fontWeight: global.fontWeight.medium, color: theme.typography.bodyText, marginBottom: "5px", fontFamily: "'DM Sans', sans-serif" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <select id={id} disabled={disabled}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onMouseEnter={() => !disabled && setHovered(true)} onMouseLeave={() => setHovered(false)}
          style={{ width: "100%", appearance: "none", WebkitAppearance: "none", background: tok.background, border: `1px solid ${tok.border}`, borderRadius: global.radius.md, color: tok.text, fontSize: global.fontSize.base, fontFamily: "'DM Sans', sans-serif", padding: "9px 36px 9px 12px", outline: "none", boxShadow: focused && tok.boxShadow ? tok.boxShadow : "none", transition: global.transition.fast, cursor: disabled ? "not-allowed" : "pointer", boxSizing: "border-box", ...style }}
          {...rest}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: tok.text, opacity: 0.6 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      {(state === "error" ? errorText : helperText) && <p style={{ margin: "4px 0 0", fontSize: "12px", color: hintColor, fontFamily: "'DM Sans', sans-serif" }}>{state === "error" ? errorText : helperText}</p>}
    </div>
  );
}
export default Select;
