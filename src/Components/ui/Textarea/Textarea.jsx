import React from "react";
import {
  useTheme,
  useGlobalTokens,
} from "../../../context/ThemeContext";

export default function Textarea({
  rows = 4,
  style,
  ...props
}) {
  const theme = useTheme();
  const global = useGlobalTokens();

  return (
    <textarea
      rows={rows}
      style={{
        width: "100%",
        borderRadius: "16px",
        border: `1px solid ${theme.foundation.borderColor}`,
        background: theme.foundation.surfaceBackground,
        color: theme.typography.bodyText,
        padding: "14px",
        resize: "vertical",
        outline: "none",
        transition: global.transition.fast,
        ...style,
      }}
      {...props}
    />
  );}
