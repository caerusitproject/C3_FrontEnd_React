import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function Checkbox({
  label,
  checked,
  style,
  ...props
}) {
  const theme = useTheme();

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        color: theme.typography.bodyText,
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        style={{
          width: "18px",
          height: "18px",
          accentColor: theme.brand.primary,
          cursor: "pointer",
        }}
        {...props}
      />

      {label}
    </label>
  );}
