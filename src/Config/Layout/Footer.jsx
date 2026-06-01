import React from "react";
import {
  useTheme,
  useGlobalTokens,
} from "../../context/ThemeContext";

export default function Footer() {
  const theme = useTheme();
  const global = useGlobalTokens();

  return (
    <>
    
     {/* <footer
      style={{
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background: theme.foundation.borderColor,
        borderTop: `1px solid ${theme.foundation.borderColor}`,

        color: theme.typography.helperText,
        fontSize: global.fontSize.sm,

        padding: "0 16px",
      }}
    >
      © {new Date().getFullYear()} Caerus Control Center (C3)
    </footer> */}
    </>
  );
}