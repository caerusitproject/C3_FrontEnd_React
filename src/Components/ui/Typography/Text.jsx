import React from "react";
import { useTheme, useGlobalTokens } from "../../../context/ThemeContext";

export function Text({
  variant = "body",
  as,
  truncate = false,
  children,
  style,
  ...rest
}) {
  const theme = useTheme();
  const global = useGlobalTokens();
  const MAP = {
    h1: {
      tag: "h1",
      color: theme.typography.headingText,
      fontSize: global.fontSize["4xl"],
      fontWeight: global.fontWeight.bold,
      lineHeight: "1.2",
    },

    h2: {
      tag: "h2",
      color: theme.typography.headingText,
      fontSize: global.fontSize["3xl"],
      fontWeight: global.fontWeight.bold,
      lineHeight: "1.25",
    },

    h3: {
      tag: "h3",
      color: theme.typography.headingText,
      fontSize: global.fontSize["2xl"],
      fontWeight: global.fontWeight.semibold,
      lineHeight: "1.3",
    },

    h4: {
      tag: "h4",
      color: theme.typography.headingText,
      fontSize: global.fontSize.xl,
      fontWeight: global.fontWeight.semibold,
      lineHeight: "1.35",
    },

    h5: {
      tag: "h5",
      color: theme.typography.headingText,
      fontSize: global.fontSize.lg,
      fontWeight: global.fontWeight.semibold,
      lineHeight: "1.4",
    },

    h6: {
      tag: "h6",
      color: theme.typography.headingText,
      fontSize: global.fontSize.base,
      fontWeight: global.fontWeight.semibold,
      lineHeight: "1.4",
    },

    body: {
      tag: "p",
      color: theme.typography.bodyText,
      fontSize: global.fontSize.base,
      fontWeight: global.fontWeight.regular,
      lineHeight: "1.6",
    },

    bodySmall: {
      tag: "p",
      color: theme.typography.bodyText,
      fontSize: global.fontSize.sm,
      fontWeight: global.fontWeight.regular,
      lineHeight: "1.55",
    },

    bodyLarge: {
      tag: "p",
      color: theme.typography.bodyText,
      fontSize: global.fontSize.lg,
      fontWeight: global.fontWeight.regular,
      lineHeight: "1.7",
    },

    helper: {
      tag: "span",
      color: theme.typography.helperText,
      fontSize: global.fontSize.sm,
      fontWeight: global.fontWeight.regular,
      lineHeight: "1.5",
    },

    caption: {
      tag: "span",
      color: theme.typography.helperText,
      fontSize: global.fontSize.xs,
      fontWeight: global.fontWeight.regular,
      lineHeight: "1.4",
    },

    label: {
      tag: "label",
      color: theme.typography.bodyText,
      fontSize: global.fontSize.sm,
      fontWeight: global.fontWeight.medium,
      lineHeight: "1.4",
    },

    overline: {
      tag: "span",
      color: theme.typography.helperText,
      fontSize: global.fontSize.xs,
      fontWeight: global.fontWeight.semibold,
      lineHeight: "1.2",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },

    primary: {
      tag: "span",
      color: theme.typography.primaryText,
      fontSize: global.fontSize.base,
      fontWeight: global.fontWeight.semibold,
      lineHeight: "1.5",
    },

    accent: {
      tag: "span",
      color: theme.typography.accentText,
      fontSize: global.fontSize.base,
      fontWeight: global.fontWeight.medium,
      lineHeight: "1.5",
    },

    link: {
      tag: "span",
      color: theme.foundation.primaryColor,
      fontSize: global.fontSize.base,
      fontWeight: global.fontWeight.medium,
      lineHeight: "1.5",
      cursor: "pointer",
    },

    success: {
      tag: "span",
      color: global.state.success,
      fontSize: global.fontSize.sm,
      fontWeight: global.fontWeight.medium,
      lineHeight: "1.5",
    },

    warning: {
      tag: "span",
      color: global.state.warning,
      fontSize: global.fontSize.sm,
      fontWeight: global.fontWeight.medium,
      lineHeight: "1.5",
    },

    error: {
      tag: "span",
      color: global.state.error,
      fontSize: global.fontSize.sm,
      fontWeight: global.fontWeight.medium,
      lineHeight: "1.5",
    },

    muted: {
      tag: "span",
      color: theme.typography.helperText,
      fontSize: global.fontSize.base,
      fontWeight: global.fontWeight.regular,
      lineHeight: "1.5",
    },
  };
  const def = MAP[variant];
  const Tag = as || def.tag;
  return (
    <Tag
      style={{
        margin: 0,
        color: def.color,
        fontSize: def.fontSize,
        fontWeight: def.fontWeight,
        lineHeight: def.lineHeight,
        fontFamily: "'DM Sans', sans-serif",
        transition: "color 0.2s ease",
        ...(truncate && {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
export default Text;
