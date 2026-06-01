import React from "react";
import { useSelector } from "react-redux";

import { Card } from "../../Components/ui/Card/Card";
import { Text } from "../../Components/ui";
import { Button } from "../../Components/ui/Button/Button";
import { useTheme } from "../../context/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function ProfileView({ onClose }) {
  const theme = useTheme();

  const { loggedInUser } = useSelector((state) => state.login);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.foundation.applicationBackground,
        overflow: "auto",
        zIndex: 100,
        padding: "24px",
      }}
    >
      <Text
        variant="primary"
        onClick={onClose}
        style={{
          cursor: "pointer",
          display: "inline-block",
          marginBottom: "20px",
          width: "fit-content",
        }}
      >
        <ArrowBackIcon />
      </Text>

      <Card>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: theme.foundation.primaryColor,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            {loggedInUser?.employeeName?.[0]}
          </div>

          <div>
            <Text variant="h3">{loggedInUser?.employeeName}</Text>

            <Text variant="bodySmall">{loggedInUser?.designation}</Text>

            <Text variant="helper">{loggedInUser?.email}</Text>
          </div>
        </div>
      </Card>

      <Card style={{ marginTop: "20px" }}>
        <Text variant="h4">Employee Information</Text>

        <div style={{ marginTop: "20px" }}>
          <p>Employee ID: {loggedInUser?.employeeId}</p>

          <p>Department: Technology</p>

          <p>Manager: John Smith</p>

          <p>Location: Kolkata</p>
        </div>
      </Card>
    </div>
  );
}
