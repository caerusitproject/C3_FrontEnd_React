import React from "react";
import { useSelector } from "react-redux";
import { Text, Badge, Card } from "../../Components/ui";
import { useTheme, useThemeContext } from "../../context/ThemeContext";

const THEME_BADGE = {
  lightOrange:    { intent: "warning", label: "Light Orange" },
  lightOliveGreen:{ intent: "success", label: "Light Olive Green" },
  darkGreen:      { intent: "neutral", label: "Dark Green" },
};

export default function Home() {
  const theme = useThemeContext();
  const { loggedInUser } = useSelector((state) => state.login);

  return (
    <div className="p-6 md:p-10 flex flex-col gap-8">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <Text variant="h2">
          Welcome back{loggedInUser?.employeeName ? `, ${loggedInUser.employeeName}` : ""}
        </Text>
        <Text variant="helper" style={{ color: "#6b7280" }}>
          Here's what's happening today.
        </Text>
      </div>

      
    </div>
  );
}