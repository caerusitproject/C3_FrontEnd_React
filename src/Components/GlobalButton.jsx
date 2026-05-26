import React from "react";

/**
 * ============================================================
 * GLOBAL BUTTON COMPONENT
 * ============================================================
 *
 * Usage:
 *
 * <GlobalButton
 *    variant="primary"
 *    state="default"
 * >
 *    Submit
 * </GlobalButton>
 *
 * Available Variants:
 * - primary
 * - secondary
 * - tertiary
 * - ghost
 *
 * Available States:
 * - default
 * - loading
 * - success
 * - warning
 * - error
 *
 */
// Usage in jsx

{
  /* <GlobalButton variant="primary">
  Submit
</GlobalButton>

<GlobalButton variant="secondary">
  Cancel
</GlobalButton>

<GlobalButton variant="tertiary">
  Learn More
</GlobalButton>

<GlobalButton variant="ghost">
  View Details
</GlobalButton>

<GlobalButton
  variant="primary"
  state="loading"
>
  Saving
</GlobalButton>

<GlobalButton
  variant="primary"
  state="success"
>
  Success
</GlobalButton>

<GlobalButton
  variant="primary"
  disabled
>
  Disabled
</GlobalButton> */
}

const BUTTON_THEME = {
  primary: {
    default: {
      background: "#022511",
      textColor: "#FFFFFF",
      borderColor: "transparent",
    },

    hover: {
      background: "#03602B",
      textColor: "#FFFFFF",
      borderColor: "transparent",
    },

    disabled: {
      background: "#F3F4F6",
      textColor: "#929292",
      borderColor: "transparent",
      opacity: 0.6,
    },

    loading: {
      background: "#F69B29",
      textColor: "#FFFFFF",
      borderColor: "transparent",
      cursor: "progress",
    },

    success: {
      background: "#28A745",
      textColor: "#FFFFFF",
      borderColor: "#28A745",
    },

    warning: {
      background: "#FFC107",
      textColor: "#000000",
      borderColor: "transparent",
    },

    error: {
      background: "#DC3545",
      textColor: "#FFFFFF",
      borderColor: "transparent",
    },
  },

  secondary: {
    default: {
      background: "#EAF4EE",
      textColor: "#022511",
      borderColor: "#CFE3D6",
    },

    hover: {
      background: "#DDEEE5",
      textColor: "#022511",
      borderColor: "#B8D6C3",
    },

    disabled: {
      background: "#F3F4F6",
      textColor: "#929292",
      borderColor: "#E5E7EB",
      opacity: 0.6,
    },

    loading: {
      background: "#EAF4EE",
      textColor: "#022511",
      borderColor: "#CFE3D6",
      cursor: "progress",
    },

    success: {
      background: "#DDF5E5",
      textColor: "#1E7E34",
      borderColor: "#28A745",
    },

    warning: {
      background: "#FFF4D6",
      textColor: "#8A6300",
      borderColor: "#FFC107",
    },

    error: {
      background: "#FCE8EA",
      textColor: "#B02A37",
      borderColor: "#DC3545",
    },
  },

  tertiary: {
    default: {
      background: "transparent",
      textColor: "#022511",
      borderColor: "transparent",
    },

    hover: {
      background: "#F3FAF5",
      textColor: "#03602B",
      borderColor: "transparent",
    },

    disabled: {
      background: "transparent",
      textColor: "#A0A0A0",
      borderColor: "transparent",
      opacity: 0.5,
    },

    loading: {
      background: "transparent",
      textColor: "#022511",
      borderColor: "transparent",
      cursor: "progress",
    },

    success: {
      background: "transparent",
      textColor: "#28A745",
      borderColor: "transparent",
    },

    warning: {
      background: "transparent",
      textColor: "#D39E00",
      borderColor: "transparent",
    },

    error: {
      background: "transparent",
      textColor: "#DC3545",
      borderColor: "transparent",
    },
  },

  ghost: {
    default: {
      background: "#FFFFFF",
      textColor: "#022511",
      borderColor: "#022511",
    },

    hover: {
      background: "#F3FAF5",
      textColor: "#03602B",
      borderColor: "#03602B",
    },

    disabled: {
      background: "#FFFFFF",
      textColor: "#BDBDBD",
      borderColor: "#D6D6D6",
      opacity: 0.5,
    },

    loading: {
      background: "#FFFFFF",
      textColor: "#022511",
      borderColor: "#022511",
      cursor: "progress",
    },

    success: {
      background: "#FFFFFF",
      textColor: "#28A745",
      borderColor: "#28A745",
    },

    warning: {
      background: "#FFFFFF",
      textColor: "#D39E00",
      borderColor: "#FFC107",
    },

    error: {
      background: "#FFFFFF",
      textColor: "#DC3545",
      borderColor: "#DC3545",
    },
  },
};

export default function GlobalButton({
  children,
  variant = "primary",
  state = "default",
  disabled = false,
  onClick,
  style = {},
  type = "button",
}) {
  const currentVariant = BUTTON_THEME[variant];

  const currentStyle = disabled
    ? currentVariant.disabled
    : currentVariant[state];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        background: currentStyle.background,
        color: currentStyle.textColor,
        border: `1px solid ${currentStyle.borderColor}`,
        opacity: currentStyle.opacity || 1,
        cursor: currentStyle.cursor || (disabled ? "not-allowed" : "pointer"),

        padding: "12px 22px",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: "600",

        transition: "all 0.25s ease",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",

        minWidth: "140px",

        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && state === "default") {
          const hoverStyle = currentVariant.hover;

          e.target.style.background = hoverStyle.background;

          e.target.style.color = hoverStyle.textColor;

          e.target.style.borderColor = hoverStyle.borderColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && state === "default") {
          e.target.style.background = currentStyle.background;

          e.target.style.color = currentStyle.textColor;

          e.target.style.borderColor = currentStyle.borderColor;
        }
      }}
    >
      {state === "loading" ? (
        <>
          <span
            style={{
              width: "16px",
              height: "16px",
              border: `2px solid ${currentStyle.textColor}`,
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Loading...
        </>
      ) : (
        children
      )}

      {/* Spinner Animation */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </button>
  );
}
