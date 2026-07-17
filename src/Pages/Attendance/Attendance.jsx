import React, { useState } from "react";
import Calendar from "./Calendar";
import AttendanceSummary from "./AttendanceSummary";

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      date: "2026-03-11",
      type: "present",
    },
    {
      date: "2026-03-12",
      type: "present",
    },
    {
      date: "2026-03-19",
      type: "lwp",
    },
    {
      date: "2026-03-21",
      type: "lwp",
    },
    {
      date: "2026-03-25",
      type: "holiday",
      label: "Holi",
    },
    { date: "2026-03-04", type: "lwp" },
    { date: "2026-03-05", type: "present" },
  ];

  const handleMonthChange = (direction) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + direction,
        1,
      ),
    );
  };

  return (
    <>
      <AttendanceSummary workingDays={23} presentDays={21} lwpDays={2} />
      <Calendar
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        events={events}
        onPrevMonth={() => handleMonthChange(-1)}
        onNextMonth={() => handleMonthChange(1)}
      />
    </>
  );
}
