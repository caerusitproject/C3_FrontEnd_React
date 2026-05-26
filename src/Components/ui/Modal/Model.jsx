import React from "react";
import { useTheme } from "../../../context/ThemeContext";

export default function Modal({
  open,
  onClose,
  children,
  width = "500px",
}) {
  const theme = useTheme();

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "92vw",
          background: theme.foundation.surfaceBackground,
          borderRadius: "24px",
          padding: "28px",
          border: `1px solid ${theme.foundation.borderColor}`,
        }}
      >
        {children}
      </div>
    </div>
  );}
