import React from "react";
import { useTheme, useGlobalTokens } from "../../../context/ThemeContext";

export function Text({ variant = "body", as, truncate = false, children, style, ...rest }) {
  const theme = useTheme(); const global = useGlobalTokens();
  const MAP = {
    h1:        { tag: "h1",    color: theme.typography.headingText, fontSize: global.fontSize["4xl"],  fontWeight: global.fontWeight.bold,     lineHeight: "1.2"  },
    h2:        { tag: "h2",    color: theme.typography.headingText, fontSize: global.fontSize["3xl"],  fontWeight: global.fontWeight.bold,     lineHeight: "1.25" },
    h3:        { tag: "h3",    color: theme.typography.headingText, fontSize: global.fontSize["2xl"],  fontWeight: global.fontWeight.semibold, lineHeight: "1.3"  },
    h4:        { tag: "h4",    color: theme.typography.headingText, fontSize: global.fontSize.xl,      fontWeight: global.fontWeight.semibold, lineHeight: "1.35" },
    body:      { tag: "p",     color: theme.typography.bodyText,    fontSize: global.fontSize.base,    fontWeight: global.fontWeight.regular,  lineHeight: "1.6"  },
    bodySmall: { tag: "p",     color: theme.typography.bodyText,    fontSize: global.fontSize.sm,      fontWeight: global.fontWeight.regular,  lineHeight: "1.55" },
    helper:    { tag: "span",  color: theme.typography.helperText,  fontSize: global.fontSize.sm,      fontWeight: global.fontWeight.regular,  lineHeight: "1.5"  },
    label:     { tag: "label", color: theme.typography.bodyText,    fontSize: global.fontSize.sm,      fontWeight: global.fontWeight.medium,   lineHeight: "1.4"  },
    primary:   { tag: "span",  color: theme.typography.primaryText, fontSize: global.fontSize.base,    fontWeight: global.fontWeight.semibold, lineHeight: "1.5"  },
    accent:    { tag: "span",  color: theme.typography.accentText,  fontSize: global.fontSize.base,    fontWeight: global.fontWeight.medium,   lineHeight: "1.5"  },
  };
  const def = MAP[variant]; const Tag = as || def.tag;
  return <Tag style={{ margin: 0, color: def.color, fontSize: def.fontSize, fontWeight: def.fontWeight, lineHeight: def.lineHeight, fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s ease", ...(truncate && { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }), ...style }} {...rest}>{children}</Tag>;
}
export default Text;
