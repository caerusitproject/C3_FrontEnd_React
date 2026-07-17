import React from "react";
import { Text } from "../../Components/ui";

export default function Calendar({
  year,
  month,
  events = [],
  onPrevMonth,
  onNextMonth,
}) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();

  // Monday = first column
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;

  const cells = [];

  // previous blanks
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const getEvent = (date) => {
    if (!date) return null;

    return events.find(
      (e) => new Date(e.date).toDateString() === date.toDateString(),
    );
  };

  const getColor = (event, date) => {
    if (!date) return "#fff";

    const day = date.getDay();

    if (day === 0 || day === 6) {
      return "#f1f1f1";
    }

    if (!event) return "#fff";

    switch (event.type) {
      case "present":
        return "#E5F8EA";

      case "lwp":
        return "#FFD6D6";

      case "holiday":
        return "#DDEBFF";

      default:
        return "#fff";
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <button onClick={onPrevMonth}>
          <Text>←</Text>
        </button>

        <h2>
          <Text>
            <b>
              {new Date(year, month).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </b>
          </Text>
        </h2>

        <button onClick={onNextMonth}>
          <Text>→</Text>
        </button>
      </div>

      {/* Week Names */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
        }}
      >
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div
            key={d}
            style={{
              padding: 14,
              textAlign: "center",
              background: "#e6e6e6",
              border: "1px solid #ccc",
              fontWeight: 600,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
        }}
      >
        {cells.map((date, index) => {
          const event = getEvent(date);

          return (
            <div
              key={index}
              style={{
                height: 95,
                border: "1px solid #ddd",
                background: getColor(event, date),
                padding: 8,
                position: "relative",
              }}
            >
              {date && (
                <>
                  <div>{date.getDate()}</div>

                  {event?.label && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        fontSize: 12,
                        color: "#555",
                      }}
                    >
                      {event.label}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
