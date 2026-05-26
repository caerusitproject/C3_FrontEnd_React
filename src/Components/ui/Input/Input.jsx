import React, {
  useState,
  forwardRef,
  useMemo,
} from "react";

import {
  useTheme,
  useGlobalTokens,
} from "../../../context/ThemeContext";

const SIZE_CONFIG = {
  sm: {
    height: "40px",
    fontSize: "13px",
    paddingX: "12px",
    iconOffset: "36px",
    radius: "12px",
  },

  md: {
    height: "48px",
    fontSize: "14px",
    paddingX: "14px",
    iconOffset: "40px",
    radius: "14px",
  },

  lg: {
    height: "62px",
    fontSize: "15.5px",
    paddingX: "16px",
    iconOffset: "48px",
    radius: "16px",
  },
};

export const Input = forwardRef(function Input(
  props,
  ref,
) {
  const {
    label,
    helperText,
    errorText,
    successText,

    state = "default",

    size = "md",

    variant = "default",

    multiline = false,

    rows = 4,

    leftIcon,
    rightIcon,

    fullWidth = true,

    disabled,
    readOnly,

    id: pid,

    style,

    containerStyle,

    ...rest
  } = props;

  const theme = useTheme();

  const global = useGlobalTokens();

  const [focused, setFocused] = useState(false);

  const [hovered, setHovered] = useState(false);

  const id =
    pid ||
    `inp-${Math.random()
      .toString(36)
      .slice(2, 7)}`;

  const sizeConfig = SIZE_CONFIG[size];

  // STATE KEY
  const sk = disabled
    ? "disabled"
    : readOnly
    ? "readonly"
    : state !== "default"
    ? state
    : focused
    ? "focus"
    : hovered
    ? "hover"
    : "default";

  const tok = theme.input[sk];

  const hintColor =
    state === "error"
      ? global.state.error
      : state === "success"
      ? global.state.success
      : theme.typography.helperText;

  const hintText =
    state === "error"
      ? errorText
      : state === "success"
      ? successText
      : helperText;

  const inputStyle = useMemo(
    () => ({
      width: "100%",

      height: multiline
        ? "auto"
        : sizeConfig.height,

      background:
        variant === "filled"
          ? theme.foundation.surfaceBackground
          : tok.background,

      border: `1px solid ${tok.border}`,

      borderRadius: sizeConfig.radius,

      color: tok.text,

      fontSize: sizeConfig.fontSize,

      fontFamily: "'DM Sans', sans-serif",

      lineHeight: "1.5",

      outline: "none",

      boxSizing: "border-box",

      transition: global.transition.fast,

      boxShadow:
        focused && tok.boxShadow
          ? tok.boxShadow
          : "none",

      cursor: disabled
        ? "not-allowed"
        : readOnly
        ? "default"
        : "text",

      padding: `0 ${
        rightIcon
          ? sizeConfig.iconOffset
          : sizeConfig.paddingX
      } 0 ${
        leftIcon
          ? sizeConfig.iconOffset
          : sizeConfig.paddingX
      }`,

      resize: multiline ? "vertical" : "none",

      ...style,
    }),
    [
      focused,
      tok,
      disabled,
      readOnly,
      leftIcon,
      rightIcon,
      multiline,
      sizeConfig,
      style,
      variant,
      theme,
      global,
    ],
  );

  const events = {
    onFocus: () => setFocused(true),

    onBlur: () => setFocused(false),

    onMouseEnter: () =>
      !disabled &&
      !readOnly &&
      setHovered(true),

    onMouseLeave: () => setHovered(false),
  };

  const iconStyle = (side) => ({
    position: "absolute",

    [side]: "14px",

    top: "50%",

    transform: "translateY(-50%)",

    color: tok.text,

    opacity: 0.6,

    pointerEvents: "none",

    display: "flex",

    fontSize: "18px",
  });

  const Element = multiline
    ? "textarea"
    : "input";

  return (
    <div
      style={{
        display: "flex",

        flexDirection: "column",

        width: fullWidth
          ? "100%"
          : "auto",

        ...containerStyle,
      }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            marginBottom: "6px",

            fontSize: "13px",

            fontWeight:
              global.fontWeight.medium,

            color:
              theme.typography.bodyText,

            fontFamily:
              "'DM Sans', sans-serif",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          position: "relative",

          display: "flex",

          alignItems: "center",
        }}
      >
        {leftIcon && (
          <span style={iconStyle("left")}>
            {leftIcon}
          </span>
        )}

        {rightIcon && (
          <span style={iconStyle("right")}>
            {rightIcon}
          </span>
        )}

        <Element
          ref={ref}
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          rows={multiline ? rows : undefined}
          style={inputStyle}
          {...events}
          {...rest}
        />
      </div>

      {hintText && (
        <p
          style={{
            margin: "6px 0 0",

            fontSize: "12px",

            color: hintColor,

            lineHeight: "1.4",

            fontFamily:
              "'DM Sans', sans-serif",
          }}
        >
          {hintText}
        </p>
      )}
    </div>
  );
});

export default Input;