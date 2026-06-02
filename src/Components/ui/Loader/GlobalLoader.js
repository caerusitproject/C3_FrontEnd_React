import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "../../../context/ThemeContext";

export default function GlobalLoader({ contained = false }) {
  const theme = useTheme();
  const loading = useSelector((state) => state.global?.globalloader?.loading || false);

  if (!loading) return null;

  const primary = theme.foundation.primaryColor;
  const secondary = theme.foundation.secondaryColor || primary;

  return (
    <>
      {/* SVG Gradient Definition */}
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="global_loader_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
        </defs>
      </svg>

      <Box
        sx={{
          position: contained ? "absolute" : "fixed",
          inset: 0,
          zIndex: contained ? 10 : 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Box
          sx={{
            minWidth: 280,
            p: "40px 48px",
            borderRadius: "28px",
            background: theme.foundation.surfaceBackground,
            border: `1px solid ${theme.foundation.borderColor}`,
            boxShadow: theme.mode === "dark"
              ? "0 25px 70px rgba(0,0,0,0.6)"
              : "0 25px 70px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle background glow */}
          <Box
            sx={{
              position: "absolute",
              top: -80,
              left: "50%",
              transform: "translateX(-50%)",
              width: 180,
              height: 180,
              background: `radial-gradient(circle, ${primary}15 0%, transparent 70%)`,
              borderRadius: "50%",
              zIndex: 0,
            }}
          />

          <CircularProgress
            size={72}
            thickness={4.8}
            sx={{
              "& .MuiCircularProgress-svg circle": {
                stroke: "url(#global_loader_gradient)",
                strokeLinecap: "round",
              },
            }}
          />

          <Box sx={{ mt: 1 }}>
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: theme.typography.headingText,
                letterSpacing: "-0.02em",
              }}
            >
              Loading
            </Typography>

            <Typography
              sx={{
                fontSize: "0.875rem",
                color: theme.typography.helperText,
                mt: 0.5,
                maxWidth: 240,
              }}
            >
              Please wait while we fetch your data
            </Typography>
          </Box>

          {/* Optional pulsing dots */}
          <Box sx={{ display: "flex", gap: "4px", mt: 1 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: primary,
                  animation: `pulse 1.4s infinite ease-in-out ${i * 0.2}s`,
                  "@keyframes pulse": {
                    "0%, 80%, 100%": { transform: "scale(0)" },
                    "40%": { transform: "scale(1)" },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}