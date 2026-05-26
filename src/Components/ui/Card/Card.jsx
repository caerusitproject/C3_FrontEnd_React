// Card
import React, { useState } from "react";
import { useTheme, useGlobalTokens } from "../../../context/ThemeContext";

export function Card({ variant = "default", padding = "md", hoverable = false, header, footer, children, style, ...rest }) {
  const theme = useTheme(); const global = useGlobalTokens();
  const [hov, setHov] = useState(false);
  const PAD = { none: "0", sm: "12px", md: "20px", lg: "28px" };
  return (
    <div
      style={{ background: theme.foundation.surfaceBackground, borderRadius: global.radius.lg, overflow: "hidden",
        transition: global.transition.normal, cursor: hoverable ? "pointer" : "default",
        ...(variant === "default"  && { boxShadow: hov && hoverable ? global.shadow.md : global.shadow.sm }),
        ...(variant === "outlined" && { border: `1px solid ${theme.foundation.borderColor}` }),
        ...(variant === "flat"     && { background: theme.foundation.secondaryColor }),
        ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      {...rest}
    >
      {header && <div style={{ padding: PAD[padding], borderBottom: `1px solid ${theme.foundation.borderColor}`, paddingBottom: "14px" }}>{header}</div>}
      <div style={{ padding: PAD[padding] }}>{children}</div>
      {footer && <div style={{ padding: PAD[padding], borderTop: `1px solid ${theme.foundation.borderColor}`, paddingTop: "14px" }}>{footer}</div>}
    </div>
  );
}
