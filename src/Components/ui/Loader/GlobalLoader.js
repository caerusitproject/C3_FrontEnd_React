import React from "react";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

import { useSelector } from "react-redux";

export default function GlobalLoader() {
  const loading = useSelector(
    (state) => state.global?.globalloader?.loading || false,
  );

  return (
    <>
      {/* Gradient Definition */}
      <svg width={0} height={0}>
        <defs>
          <linearGradient
            id="global_loader_gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      <Backdrop
        open={loading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 999,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(15, 23, 42, 0.45)",
        }}
      >
        <Box
          sx={{
            minWidth: "260px",
            padding: "30px 35px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Animated Loader */}
          <CircularProgress
            size={60}
            thickness={4.5}
            sx={{
              "svg circle": {
                stroke: "url(#global_loader_gradient)",
              },
            }}
          />

          {/* Loading Text */}
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "0.5px",
            }}
          >
            Loading...
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            Please wait while we fetch your data
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
