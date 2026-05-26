import React, { useState, forwardRef } from "react";
import { useTheme, useGlobalTokens } from "../../../context/ThemeContext";

export const Input = forwardRef(function Input(props, ref) {
  const { label, helperText, errorText, successText, state = "default", multiline = false, rows = 4, leftIcon, rightIcon, fullWidth = true, disabled, readOnly, id: pid, style, ...rest } = props;
  const theme  = useTheme();
  const global = useGlobalTokens();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const id = pid || `inp-${Math.random().toString(36).slice(2,7)}`;

  const sk = disabled ? "disabled" : readOnly ? "readonly" : state !== "default" ? state : focused ? "focus" : hovered ? "hover" : "default";
  const tok = theme.input[sk];
  const hintColor = state === "error" ? global.state.error : state === "success" ? global.state.success : theme.typography.helperText;
  const hintText  = state === "error" ? errorText : state === "success" ? successText : helperText;

  const inputStyle = {
    width: "100%", background: tok.background, border: `1px solid ${tok.border}`,
    borderRadius: global.radius.md, color: tok.text, fontSize: global.fontSize.base,
    fontFamily: "'DM Sans', sans-serif", lineHeight: "1.5", outline: "none", boxSizing: "border-box",
    boxShadow: focused && tok.boxShadow ? tok.boxShadow : "none",
    transition: global.transition.fast, cursor: disabled ? "not-allowed" : readOnly ? "default" : "text",
    padding: `9px ${rightIcon ? "36px" : "12px"} 9px ${leftIcon ? "36px" : "12px"}`, ...style,
  };
  const events = {
    onFocus: () => setFocused(true), onBlur: () => setFocused(false),
    onMouseEnter: () => !disabled && !readOnly && setHovered(true), onMouseLeave: () => setHovered(false),
  };
  const iconStyle = (side) => ({ position: "absolute", [side]: "10px", top: "50%", transform: "translateY(-50%)", color: tok.text, opacity: 0.55, pointerEvents: "none", display: "flex", fontSize: "16px" });

  return (
    <div style={{ display: "flex", flexDirection: "column", width: fullWidth ? "100%" : "auto" }}>
      {label && <label htmlFor={id} style={{ display: "block", fontSize: "13px", fontWeight: global.fontWeight.medium, color: theme.typography.bodyText, marginBottom: "5px", fontFamily: "'DM Sans', sans-serif" }}>{label}</label>}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {leftIcon  && <span style={iconStyle("left")}>{leftIcon}</span>}
        {rightIcon && <span style={iconStyle("right")}>{rightIcon}</span>}
        {multiline
          ? <textarea ref={ref} id={id} disabled={disabled} readOnly={readOnly} rows={rows} style={{ ...inputStyle, resize: "vertical" }} {...events} {...rest} />
          : <input    ref={ref} id={id} disabled={disabled} readOnly={readOnly} style={inputStyle} {...events} {...rest} />
        }
      </div>
      {hintText && <p style={{ margin: "4px 0 0", fontSize: "12px", color: hintColor, lineHeight: "1.4", fontFamily: "'DM Sans', sans-serif" }}>{hintText}</p>}
    </div>
  );
});
export default Input;
