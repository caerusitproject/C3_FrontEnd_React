export const darkGreenTheme = {
  id: "darkGreen",
  name: "Dark Green",
  mode: "dark",
  foundation: {
    primaryColor: "#26B75F",
    primaryHover: "#145E31",
    primaryDarkHover: "#0F4825",
    loadingAccent: "#26B75F",
    secondaryColor: "#D1E8C9",
    applicationBackground: "#0A0E0F",
    loginBackground: "#000000",
    surfaceBackground: "#2a2c29",
    profilePanelBackground: "#3E4138",
    borderColor: "#5B6152",
    base: "#050505",
  },
  typography: {
    headingText: "#FFFFFF",
    bodyText: "#FFFFFF",
    primaryText: "#1B7C41",
    accentText: "#26B75F",
    helperText: "rgba(255,255,255,0.55)",
    inverseText: "#FFFFFF",
  },
  button: {
    primary: {
      default: {
        background: "#26B75F",
        text: "#FFFFFF",
        border: "transparent",
      },
      hover: { background: "#145E31", text: "#FFFFFF", border: "transparent" },
      active: { background: "#0F4825", text: "#FFFFFF", border: "transparent" },
      disabled: {
        background: "#2C2F31",
        text: "#8A8F93",
        border: "transparent",
      },
      loading: {
        background: "#26B75F",
        text: "#FFFFFF",
        border: "transparent",
      },
    },
    secondary: {
      default: { background: "#3E4138", text: "#FFFFFF", border: "#5B6152" },
      hover: { background: "#4B4F45", text: "#FFFFFF", border: "#6B7063" },
      active: { background: "#555950", text: "#FFFFFF", border: "#6B7063" },
      disabled: { background: "#2C2F31", text: "#8A8F93", border: "#44474A" },
      loading: { background: "#4B4F45", text: "#FFFFFF", border: "#5B6152" },
    },
    surface: {
      default: {
        background: "#2F3236",
        text: "#F3F4F6",
        border: "none",
      },

      hover: {
        background: "#3A3E43",
        text: "#FFFFFF",
        border: "none",
      },

      active: {
        background: "#454A50",
        text: "#FFFFFF",
        border: "none",
      },

      disabled: {
        background: "#26292D",
        text: "#7A7F87",
        border: "none",
      },

      loading: {
        background: "#3A3E43",
        text: "#F3F4F6",
        border: "none",
      },
    },
    tertiary: {
      default: {
        background: "transparent",
        text: "#D1E8C9",
        border: "transparent",
      },
      hover: {
        background: "rgba(209,232,201,0.08)",
        text: "#FFFFFF",
        border: "transparent",
      },
      active: {
        background: "rgba(209,232,201,0.14)",
        text: "#FFFFFF",
        border: "transparent",
      },
      disabled: {
        background: "transparent",
        text: "#70757A",
        border: "transparent",
      },
      loading: {
        background: "rgba(209,232,201,0.08)",
        text: "#D1E8C9",
        border: "transparent",
      },
    },
    ghost: {
      default: {
        background: "transparent",
        text: "#FFFFFF",
        border: "#D1E8C9",
      },
      hover: {
        background: "rgba(209,232,201,0.08)",
        text: "#FFFFFF",
        border: "#26B75F",
      },
      active: {
        background: "rgba(209,232,201,0.14)",
        text: "#FFFFFF",
        border: "#26B75F",
      },
      disabled: {
        background: "transparent",
        text: "#8A8F93",
        border: "#44474A",
      },
      loading: {
        background: "rgba(209,232,201,0.08)",
        text: "#FFFFFF",
        border: "#D1E8C9",
      },
    },
  },
  input: {
    default: {
      background: "#3E4138",
      border: "#5B6152",
      text: "#FFFFFF",
      placeholder: "rgba(255,255,255,0.45)",
    },
    hover: {
      background: "#454940",
      border: "#26B75F",
      text: "#FFFFFF",
      placeholder: "rgba(255,255,255,0.45)",
    },
    focus: {
      background: "#454940",
      border: "#26B75F",
      text: "#FFFFFF",
      placeholder: "rgba(255,255,255,0.45)",
      boxShadow: "0px 0px 0px 3px rgba(38,183,95,0.18)",
    },
    disabled: {
      background: "#2C2F31",
      border: "#44474A",
      text: "#8A8F93",
      placeholder: "#70757A",
    },
    readonly: {
      background: "#343837",
      border: "#5B6152",
      text: "#C7D0CC",
      placeholder: "#C7D0CC",
    },
    error: {
      background: "#3E4138",
      border: "#DC3545",
      text: "#FFFFFF",
      placeholder: "rgba(255,255,255,0.45)",
      boxShadow: "0px 0px 0px 3px rgba(220,53,69,0.18)",
    },
    success: {
      background: "#3E4138",
      border: "#4ADE80",
      text: "#FFFFFF",
      placeholder: "rgba(255,255,255,0.45)",
      boxShadow: "0px 0px 0px 3px rgba(74,222,128,0.18)",
    },
  },
  interaction: {
    secondaryHoverBackground: "#4B4F45",
    secondaryHoverBorder: "#6B7063",
    tertiaryHoverBackground: "rgba(209,232,201,0.08)",
    focusOutline: "#1B7C41",
  },
  cssVars: {
    "--color-primary": "#1B7C41",
    "--color-primary-hover": "#145E31",
    "--color-primary-dark": "#0F4825",
    "--color-secondary": "#D1E8C9",
    "--color-app-bg": "#0A0E0F",
    "--color-login-bg": "#000000",
    "--color-surface": "#3E4138",
    "--color-profile-panel": "#3E4138",
    "--color-border": "#5B6152",
    "--color-heading": "#FFFFFF",
    "--color-body": "#FFFFFF",
    "--color-primary-text": "#1B7C41",
    "--color-accent-text": "#26B75F",
    "--color-helper-text": "rgba(255,255,255,0.55)",
    "--color-inverse-text": "#FFFFFF",
    "--color-focus-outline": "#1B7C41",
    "--color-loading-accent": "#26B75F",
  },
};
