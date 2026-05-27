import React from "react";
import { useSelector } from "react-redux";
import { Text, Badge, Card } from "../Components/ui";
import { useTheme, useThemeContext } from "../context/ThemeContext";

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
          Welcome back{loggedInUser?.name ? `, ${loggedInUser.name}` : ""}
        </Text>
        <Text variant="helper" style={{ color: "#6b7280" }}>
          Here's what's happening today.
        </Text>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users",    value: "2,847",  change: "+12%",  up: true  },
          { label: "Active Sessions",value: "143",    change: "+5%",   up: true  },
          { label: "Errors Today",   value: "3",      change: "-80%",  up: false },
          { label: "Uptime",         value: "99.9%",  change: "stable",up: true  },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3 shadow-sm"
          >
            <Text variant="helper" style={{ color: "#6b7280" }}>
              {stat.label}
            </Text>
            <Text variant="h2" style={{ lineHeight: 1 }}>
              {stat.value}
            </Text>
            <span
              className={`text-xs font-medium ${
                stat.up ? "text-green-600" : "text-red-500"
              }`}
            >
              {stat.change} from last week
            </span>
          </div>
        ))}
      </div>

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
          <Text variant="h4">Recent Activity</Text>
          <div className="flex flex-col divide-y divide-gray-50">
            {[
              { user: "Alice",   action: "logged in",          time: "2 min ago",  role: "admin"  },
              { user: "Bob",     action: "updated profile",     time: "18 min ago", role: "user"   },
              { user: "Charlie", action: "exported a report",   time: "1 hr ago",   role: "user"   },
              { user: "Diana",   action: "changed theme",       time: "3 hr ago",   role: "admin"  },
              { user: "Ethan",   action: "reset password",      time: "yesterday",  role: "user"   },
            ].map((item) => (
              <div
                key={item.user}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold shrink-0">
                    {item.user[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">
                      {item.user}
                    </span>
                    <span className="text-xs text-gray-400">{item.action}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    intent={item.role === "admin" ? "warning" : "neutral"}
                    size="sm"
                  >
                    {item.role}
                  </Badge>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACCOUNT CARD */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col gap-4">
          <Text variant="h4">Your Account</Text>

          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              {loggedInUser?.name?.[0] ?? "U"}
            </div>
            <div className="text-center">
              <Text variant="body" style={{ fontWeight: 600 }}>
                {loggedInUser?.name ?? "User"}
              </Text>
              <Text variant="helper" style={{ color: "#6b7280" }}>
                {loggedInUser?.email ?? "—"}
              </Text>
            </div>
            <Badge
              intent={loggedInUser?.role === "admin" ? "warning" : "neutral"}
              dot
            >
              {loggedInUser?.role ?? "user"}
            </Badge>
          </div>

          <div className="border-t border-gray-50 pt-4 flex flex-col gap-2">
            {[
              { label: "Member since", value: "Jan 2024" },
              { label: "Last login",   value: "Just now"  },
              { label: "Theme",        value: THEME_BADGE[theme.themeId]?.label ?? theme.themeId },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-gray-400">{row.label}</span>
                <span className="text-gray-700 font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}