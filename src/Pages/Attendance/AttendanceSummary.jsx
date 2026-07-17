import React, { useState } from "react";
import "./AttendanceSummary.css";
import { Card } from "../../Components/ui/Card/Card";
import { Text } from "../../Components/ui";
import { useTheme } from "../../context/ThemeContext";
import { Select } from "../../Components/ui/Select/Select";
const AttendanceSummary = ({ workingDays, presentDays, lwpDays }) => {
  const [employee, setEmployee] = useState("");
  const theme = useTheme();
  const cards = [
    {
      value: workingDays,
      label: "Total Working Days",
      color: "#2E2E2E",
    },
    {
      value: presentDays,
      label: "Days Present",
      color: "#2DBE60",
    },
    {
      value: lwpDays,
      label: "Total LWP",
      color: "#F25555",
    },
  ];

  return (
    <Card>
      <div
        className="attendance-summary-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          background: theme.foundation.loginBackground,
          borderRadius: "10px",
          gap: "20px",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: theme.foundation.base,
            border: `2px solid ${theme.foundation.primaryColor}`,
          }}
          className="attendance-card"
        >
          <div className="attendance-value">
            <Text>23</Text>
          </div>
          <div className="attendance-label">
            <Text>Total Working Days</Text>
          </div>
        </div>

        <div
          style={{
            background: theme.foundation.base,
            border: `2px solid ${theme.foundation.primaryColor}`,
          }}
          className="attendance-card"
        >
          <div className="attendance-value present">
            <Text>21</Text>
          </div>
          <div className="attendance-label">
            <Text>Days Present</Text>
          </div>
        </div>

        <div
          style={{
            background: theme.foundation.base,
            border: `2px solid ${theme.foundation.primaryColor}`,
          }}
          className="attendance-card"
        >
          <div className="attendance-value lwp">
            <Text>2</Text>
          </div>
          <div className="attendance-label">
            <Text>Total LWP</Text>
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: "300px",
          }}
        >
          <Select
            label="Employees"
            placeholder="Select Employee"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            options={[
              { value: "java", label: "Engineering - Java" },
              { value: "react", label: "Engineering - React" },
              { value: "hr", label: "Human Resource" },
              { value: "finance", label: "Finance" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
};

export default AttendanceSummary;
