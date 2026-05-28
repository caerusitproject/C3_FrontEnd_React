import React, { useState } from "react";
import { useTheme, useGlobalTokens } from "../../../context/ThemeContext";

const SIZE = {
  sm: {
    padding: "0 12px",
    fontSize: "12px",
    height: "32px",
    gap: "5px",
    iconSize: "14px",
  },
  md: {
    padding: "0 16px",
    fontSize: "14px",
    height: "38px",
    gap: "6px",
    iconSize: "16px",
  },
  lg: {
    padding: "0 20px",
    fontSize: "15px",
    height: "44px",
    gap: "7px",
    iconSize: "18px",
  },
};

function BtnSpinner({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "btnSpin 0.7s linear infinite", flexShrink: 0 }}
    >
      <style>{`@keyframes btnSpin{to{transform:rotate(360deg)}}`}</style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  width = "auto",
  leftIcon,
  rightIcon,
  children,
  disabled,
  style,
  ...rest
}) {
  const theme = useTheme();
  const global = useGlobalTokens();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;
  const sz = SIZE[size];
  const tok = (() => {
    const v = theme.button[variant];
    if (isDisabled && !loading) return v.disabled;
    if (loading) return v.loading;
    if (pressed) return v.active;
    if (hovered) return v.hover;
    return v.default;
  })();

  return (
    <button
      disabled={isDisabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: sz.gap,
        height: sz.height,
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: global.fontWeight.medium,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        userSelect: "none",
        outline: "none",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled && !loading ? 0.6 : 1,
        width: fullWidth ? "100%" : width,
        borderRadius: global.radius.md,
        border:
          tok.border && tok.border !== "transparent"
            ? `1px solid ${tok.border}`
            : "1px solid transparent",
        background: tok.background,
        color: tok.text,
        transition: global.transition.fast,
        ...style,
      }}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => !isDisabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...rest}
    >
      {loading ? (
        <BtnSpinner color={tok.text} size={sz.iconSize} />
      ) : leftIcon ? (
        <span style={{ fontSize: sz.iconSize, display: "flex" }}>
          {leftIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span style={{ fontSize: sz.iconSize, display: "flex" }}>
          {rightIcon}
        </span>
      )}
    </button>
  );
}
export default Button;
