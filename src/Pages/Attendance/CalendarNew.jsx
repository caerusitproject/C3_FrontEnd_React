import { useEffect, useMemo, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const CalendarNew = ({
  theme,
  year,
  month,
  events = [],
  mode = "leave",
  selectedDates = [],
  confirmedDates = [],
  disabledDates = [],
  onSelectionChange,
  isSelecting,
  isSelectionMode = false,
  today,
  onEdgeHover,
  onDateClick,
  onPrevMonth,
  onNextMonth,
  isMobile: parentIsMobile,
  buttonStyle: parentButtonStyle,
}) => {
  /* ============================================================
     RESPONSIVE STATE
  ============================================================ */

  const [isMobile, setIsMobile] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const effectiveIsMobile =
    parentIsMobile !== undefined ? parentIsMobile : isMobile;

  /* ============================================================
     THEME-AWARE BUTTON
  ============================================================ */

  const effectiveButtonStyle = parentButtonStyle || {
    backgroundColor: theme?.foundation?.primaryColor || "#6B8E23",
    border: "none",
    color: "#ffffff",

    padding: effectiveIsMobile ? "6px" : "8px",

    borderRadius: "6px",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition: "background-color 0.2s ease, opacity 0.2s ease",
  };

  /* ============================================================
     CALENDAR INFORMATION
  ============================================================ */

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  /* ============================================================
     THEME DATE TEXT COLOR
     
     Uses:
     
     Light Orange:
     #1F2937
     
     Light Olive Green:
     #1F2937
     
     Dark Green:
     #F9FAFB
     
     IMPORTANT:
     This is used only for NORMAL calendar date numbers.
     
     It does NOT change:
     - selected dates
     - holidays
     - existing leaves
     - confirmed leaves
     - weekends
     - calendar backgrounds
  ============================================================ */

  const themeDateTextColor =
    theme?.colors?.textPrimary || "var(--color-text-primary, #333333)";

  /* ============================================================
     NORMALIZE DISABLED DATES
  ============================================================ */

  const unavailableDates = useMemo(() => {
    return new Set([...(confirmedDates || []), ...(disabledDates || [])]);
  }, [confirmedDates, disabledDates]);

  /* ============================================================
     DATE HELPERS
  ============================================================ */

  const isSelected = (dateStr) => {
    if (!dateStr) {
      return false;
    }

    return selectedDates.includes(dateStr);
  };

  const isUnavailable = (dateStr) => {
    if (!dateStr) {
      return false;
    }

    return unavailableDates.has(dateStr);
  };

  /* ============================================================
     BUILD CALENDAR DAYS
  ============================================================ */

  const days = [];

  /*
   * JavaScript uses Sunday-first.
   *
   * Convert calendar to Monday-first.
   */
  const padStart = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < padStart; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);

    const weekday = date.getDay();

    const isWeekend = weekday === 0 || weekday === 6;

    const dateStr = `${year}-${String(month + 1).padStart(
      2,
      "0",
    )}-${String(d).padStart(2, "0")}`;

    const event = events.find((item) => item.date === dateStr);

    /*
     * A date is past only when it is before today.
     */
    const isPast = date < today;

    const isConfirmed = confirmedDates.includes(dateStr);

    const isDisabled = isUnavailable(dateStr);

    days.push({
      day: d,
      isWeekend,
      dateStr,
      event,
      isPast,
      isConfirmed,
      isDisabled,
    });
  }

  /* ============================================================
     CLICK
  ============================================================ */

  const handleClick = (dateStr, isPast, isWeekend, isDisabled) => {
    /*
     * Never allow past dates.
     */
    if (isPast) {
      return;
    }

    /*
     * Never allow weekends for leave selection.
     */
    if (isWeekend && mode === "leave") {
      return;
    }

    /*
     * Already applied/confirmed leave cannot be selected again.
     */
    if (isDisabled) {
      return;
    }

    /*
     * Leave selection is controlled by Leave.jsx.
     */
    if (onSelectionChange && isSelectionMode) {
      onSelectionChange(dateStr, "click");
      return;
    }

    /*
     * Preserve attendance behavior.
     */
    if (mode === "attendance" && onDateClick) {
      onDateClick(dateStr);
    }
  };

  /* ============================================================
     MOUSE ENTER / DRAG
  ============================================================ */

  const handleMouseEnter = (dateStr, isPast, isWeekend, isDisabled, dayNum) => {
    if (isPast) {
      return;
    }

    if (isWeekend && mode === "leave") {
      return;
    }

    /*
     * Do not allow an active selection to enter
     * an already applied leave date.
     */
    if (isDisabled) {
      return;
    }

    if (onSelectionChange && isSelectionMode && isSelecting) {
      onSelectionChange(dateStr, "hover");

      if (dayNum === daysInMonth) {
        onEdgeHover?.("next", dayNum);
      }
    }
  };

  /* ============================================================
     TOUCH START
  ============================================================ */

  const handleTouchStart = (dateStr, isPast, isWeekend, isDisabled) => {
    if (isPast) {
      return;
    }

    if (isWeekend && mode === "leave") {
      return;
    }

    /*
     * Existing leave cannot be selected.
     */
    if (isDisabled) {
      return;
    }

    setIsTouching(true);

    if (onSelectionChange && isSelectionMode) {
      onSelectionChange(dateStr, "click");
      return;
    }

    if (mode === "attendance" && onDateClick) {
      onDateClick(dateStr);
    }
  };

  /* ============================================================
     TOUCH MOVE
  ============================================================ */

  const handleTouchMove = (e) => {
    if (!isTouching) {
      return;
    }

    e.preventDefault();

    const touch = e.touches && e.touches[0];

    if (!touch) {
      return;
    }

    const rawElement = document.elementFromPoint(touch.clientX, touch.clientY);

    if (!rawElement) {
      return;
    }

    let cellElement = null;

    if (rawElement.closest) {
      cellElement = rawElement.closest("[data-datestr]");
    } else {
      let node = rawElement;

      while (node && node !== document.body) {
        if (node.dataset && node.dataset.datestr) {
          cellElement = node;
          break;
        }

        node = node.parentElement;
      }
    }

    if (!cellElement) {
      return;
    }

    const targetDateStr = cellElement.dataset.datestr;

    const targetIsPast = cellElement.dataset.ispast === "true";

    const targetIsWeekend = cellElement.dataset.isweekend === "true";

    const targetIsDisabled = cellElement.dataset.isdisabled === "true";

    const targetDayNum = Number.parseInt(cellElement.dataset.daynum, 10);

    /*
     * Existing leave dates are blocked during touch drag.
     */
    if (
      targetIsPast ||
      (targetIsWeekend && mode === "leave") ||
      targetIsDisabled
    ) {
      return;
    }

    if (onSelectionChange && isSelectionMode && isSelecting) {
      onSelectionChange(targetDateStr, "hover");

      if (targetDayNum === daysInMonth) {
        onEdgeHover?.("next", targetDayNum);
      }
    }
  };

  /* ============================================================
     TOUCH END
  ============================================================ */

  const handleTouchEnd = () => {
    setIsTouching(false);

    if (onSelectionChange && isSelectionMode && isSelecting) {
      onSelectionChange(null, "end");
    }
  };

  /* ============================================================
     TODAY STRING
  ============================================================ */

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  /* ============================================================
     CELL STYLE
     
     IMPORTANT:
     Only NORMAL date text uses:
     
       theme.colors.textPrimary
     
     All other calendar states preserve their
     existing colors/backgrounds.
  ============================================================ */
  const getCellStyle = (dayInfo) => {
    if (!dayInfo) {
      return {
        background: "transparent",
        border: "1px solid transparent",
        color: "inherit",
      };
    }

    const isSelectedDay = isSelected(dayInfo.dateStr);

    const normalBackground = "var(--color-surface, #ffffff)";
    const borderColor = "var(--color-border, #e0e0e0)";
    const weekendBackground = "var(--color-disabled-bg, #f0f0f0)";
    const weekendText = "var(--color-disabled-text, #777777)";

    const eventType = String(dayInfo.event?.type || "")
      .trim()
      .toLowerCase();
    const eventLabel = String(dayInfo.event?.label || "")
      .trim()
      .toLowerCase();

    let style = {
      background: normalBackground,
      color: themeDateTextColor,
      border: `1px solid ${borderColor}`,
    };

    /*
     * IMPORTANT:
     * Event styles are checked BEFORE past/weekend logic.
     * Therefore previous-month events will still get
     * their background color.
     */

    if (eventType === "holiday") {
      style = {
        background: "var(--color-warning-bg, #d87127)",
        color: "var(--color-warning-text, #b45309)",
        border: "1px solid var(--color-warning, #f59e0b)",
      };
    } else if (
      eventType === "rejected" ||
      eventLabel === "rejected" ||
      eventLabel === "Rejected"
    ) {
      style = {
        background: "#cc4d4d",
        color: "#ffffff",
        border: "1px solid #616161",
      };
    } else if (eventLabel === "Pending" || eventType === "leave") {
      style = {
        background: "#90fc96",
        color: "#ffffff",
        border: "1px solid #5eff00",
      };
    } else if (eventType === "lwp") {
      /* ==========================================================
       EXISTING LEAVE
    ========================================================== */
      style = {
        background: "#db3721",
        color: "#ffff",
        border: "1px solid var(--color-success, #e04c1f)",
      };
    } else if (eventType === "confirmed" || eventType === "approved") {
      style = {
        background: "#4eec26",
        color: "#ffffff",
        border: "1px solid #3c860a",
      };
    } else if (eventType === "present") {
      style = {
        background: "#2e7d32",
        color: "#f3f3f3",
        border: "1px solid #E5F8EA",
      };
    } else if (isSelectedDay) {
      style = {
        background: "var(--color-primary, #1976d2)",
        color: "#ffffff",
        border: "1px solid var(--color-primary, #1976d2)",
        WebkitTextFillColor: "#ffffff",
      };
    } else if (dayInfo.isWeekend) {
      style = {
        background: weekendBackground,
        color: weekendText,
        border: `1px solid ${borderColor}`,
      };
    }

    /*
     * TODAY
     */
    if (dayInfo.dateStr === todayString) {
      style.border = isSelectedDay
        ? "2px solid #ffffff"
        : "2px solid var(--color-primary, #1976d2)";
    }

    console.log("theme__id___", dayInfo?.event);
    return style;
  };

  // const getCellStyle = (dayInfo) => {
  //   if (!dayInfo) {
  //     return {
  //       background: "transparent",
  //       border: "1px solid transparent",
  //       color: "inherit",
  //     };
  //   }

  //   const isSelectedDay = isSelected(dayInfo.dateStr);

  //   const normalBackground = "var(--color-surface, #ffffff)";

  //   const borderColor = "var(--color-border, #e0e0e0)";

  //   const weekendBackground = "var(--color-disabled-bg, #f0f0f0)";

  //   const weekendText = "var(--color-disabled-text, #777777)";

  //   const eventType = String(dayInfo.event?.type || "").toLowerCase();
  //   const eventLabel = String(dayInfo.event?.label || "").toLowerCase();

  //   /*
  //    * ==========================================================
  //    * BASE / NORMAL DATE
  //    * ==========================================================
  //    *
  //    * Background remains unchanged.
  //    *
  //    * Only the text color is taken from:
  //    *
  //    * theme.colors.textPrimary
  //    */
  //   let style = {
  //     background: normalBackground,
  //     color: themeDateTextColor,
  //     border: `1px solid ${borderColor}`,
  //   };

  //   /* ==========================================================
  //      HOLIDAY
  //   ========================================================== */
  //   console.log("dayInfo.event?.type", dayInfo);

  //   console.log("Calendar Event:", dayInfo.dateStr, dayInfo.event);

  //   if (eventType === "holiday") {
  //     style = {
  //       background: "var(--color-warning-bg, #d87127)",
  //       color: "var(--color-warning-text, #b45309)",
  //       border: "1px solid var(--color-warning, #f59e0b)",
  //     };
  //   } else if (eventLabel === "Rejected" || eventLabel === "rejected") {
  //     /*
  //      * REJECTED LEAVE
  //      */
  //     style = {
  //       background: "#cc4d4d",
  //       color: "#ffffff",
  //       border: "1px solid #616161",
  //     };
  //   } else if (eventType === "lwp") {
  //     /* ==========================================================
  //      EXISTING LEAVE
  //   ========================================================== */
  //     style = {
  //       background: "#db3721",
  //       color: "#ffff",
  //       border: "1px solid var(--color-success, #e04c1f)",
  //     };
  //   } else if (eventType === "confirmed" || eventType === "Confirmed") {
  //     style = {
  //       background: "#4eec26",
  //       color: "#ffff",
  //       border: "1px solid var(--color-success, #3c860a)",
  //     };
  //   } else if (dayInfo.isConfirmed) {
  //     /* ==========================================================
  //      CONFIRMED LEAVE
  //   ========================================================== */
  //     style = {
  //       background: "var(--color-success-bg, #e8f5e9)",
  //       color: "var(--color-success-text, #2e7d32)",
  //       border: "1px solid var(--color-success, #4caf50)",
  //     };
  //   } else if (eventType === "present") {
  //     style = {
  //       background: "#2e7d32",
  //       color: "#f3f3f3",
  //       border: "#E5F8EA",
  //     };
  //   } else if (isSelectedDay) {
  //     /* ==========================================================
  //      SELECTED DATE

  //      DO NOT CHANGE THIS.

  //      Selected dates continue using the existing
  //      primary background and white text.
  //   ========================================================== */
  //     style = {
  //       background: "var(--color-primary, #1976d2)",

  //       color: "#ffffff",

  //       border: "1px solid var(--color-primary, #1976d2)",

  //       WebkitTextFillColor: "#ffffff",
  //     };
  //   } else if (dayInfo.isWeekend) {
  //     /* ==========================================================
  //      WEEKEND
  //   ========================================================== */
  //     style = {
  //       background: weekendBackground,
  //       color: weekendText,
  //       border: `1px solid ${borderColor}`,
  //     };
  //   }

  //   // if (
  //   //   dayInfo.event?.type === "Holiday" ||
  //   //   dayInfo.event?.type === "holiday"
  //   // ) {
  //   //   style = {
  //   //     background: "var(--color-warning-bg, #d87127)",
  //   //     color: "var(--color-warning-text, #b45309)",
  //   //     border: "1px solid var(--color-warning, #f59e0b)",
  //   //   };
  //   // } else if (
  //   //   dayInfo.event?.type === "Confirmed" ||
  //   //   dayInfo.event?.type === "confirmed"
  //   // ) {
  //   //   /*
  //   //    * MANAGER APPROVED LEAVE
  //   //    */
  //   //   style = {
  //   //     background: "#2e7d32",
  //   //     color: "#ffffff",
  //   //     border: "1px solid #1b5e20",
  //   //   };
  //   // } else if (
  //   //   dayInfo.event?.type === "Leave" ||
  //   //   dayInfo.event?.type === "lwp"
  //   // ) {
  //   //   /*
  //   //    * PENDING LEAVE
  //   //    */
  //   //   style = {
  //   //     background: "#db3721",
  //   //     color: "#ffffff",
  //   //     border: "1px solid #e04c1f",
  //   //   };
  //   // } else if (
  //   //   dayInfo.event?.type === "Rejected" ||
  //   //   dayInfo.event?.type === "rejected"
  //   // ) {
  //   //   /*
  //   //    * REJECTED LEAVE
  //   //    */
  //   //   style = {
  //   //     background: "#757575",
  //   //     color: "#ffffff",
  //   //     border: "1px solid #616161",
  //   //   };
  //   // } else if (dayInfo.isConfirmed) {
  //   //   style = {
  //   //     background: "var(--color-success-bg, #e8f5e9)",
  //   //     color: "var(--color-success-text, #2e7d32)",
  //   //     border: "1px solid var(--color-success, #4caf50)",
  //   //   };
  //   // } else if (dayInfo.event?.type === "present") {
  //   //   style = {
  //   //     background: "#2e7d32",
  //   //     color: "#f3f3f3",
  //   //     border: "1px solid #E5F8EA",
  //   //   };
  //   // } else if (isSelectedDay) {
  //   //   style = {
  //   //     background: "var(--color-primary, #1976d2)",
  //   //     color: "#ffffff",
  //   //     border: "1px solid var(--color-primary, #1976d2)",
  //   //     WebkitTextFillColor: "#ffffff",
  //   //   };
  //   // } else if (dayInfo.isWeekend) {
  //   //   style = {
  //   //     background: weekendBackground,
  //   //     color: weekendText,
  //   //     border: `1px solid ${borderColor}`,
  //   //   };
  //   // }

  //   /* ==========================================================
  //      TODAY

  //      Only modify the border.
  //      Never replace the existing background/color.
  //   ========================================================== */

  //   if (dayInfo.dateStr === todayString) {
  //     style.border = isSelectedDay
  //       ? "2px solid #ffffff"
  //       : "2px solid var(--color-primary, #1976d2)";
  //   }

  //   return style;
  // };

  /* ============================================================
   THEME-BASED CALENDAR TEXT COLORS
   ============================================================ */

  const getCalendarTextPrimary = () => {
    if (theme?.colors?.textPrimary) {
      return theme.colors.textPrimary;
    }

    if (theme?.foundation?.textPrimary) {
      return theme.foundation.textPrimary;
    }

    if (theme?.id === "darkGreen") {
      return "#F9FAFB";
    }

    return "#1F2937";
  };
  console.log("theme__id___", theme);

  const calendarTextPrimary = getCalendarTextPrimary();
  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div
      style={{
        background: "var(--color-surface, #ffffff)",

        padding: effectiveIsMobile ? "15px 8px" : "20px",

        borderRadius: effectiveIsMobile ? "8px" : "12px",

        boxShadow: "var(--shadow-medium, 0 4px 12px rgba(0, 0, 0, 0.1))",

        width: "100%",

        margin: "0 auto",

        height: effectiveIsMobile ? "auto" : "80vh",

        minHeight: "auto",

        position: "relative",

        boxSizing: "border-box",

        color: "var(--color-text-primary, #333333)",
      }}
    >
      {/* ======================================================
          MONTH HEADER
      ======================================================= */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          marginBottom: effectiveIsMobile ? "12px" : "20px",
        }}
      >
        <IconButton
          onClick={onPrevMonth}
          disabled={!onPrevMonth}
          sx={{
            ...effectiveButtonStyle,

            "& .MuiSvgIcon-root": {
              color: "#ffffff",
            },

            "&:hover": {
              backgroundColor: theme?.foundation?.primaryColor || "#6B8E23",
              opacity: 0.9,
            },

            "&.Mui-disabled": {
              backgroundColor: theme?.foundation?.primaryColor || "#6B8E23",
              color: "#ffffff",
              opacity: 0.5,

              "& .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            },
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <h3
          style={{
            textAlign: "center",
            color: calendarTextPrimary,
            WebkitTextFillColor: calendarTextPrimary,
            margin: 0,
            flex: 1,
            fontSize: effectiveIsMobile ? "16px" : "22px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: effectiveIsMobile ? "0.5px" : "1px",
          }}
        >
          {monthName} {year}
        </h3>

        <IconButton
          onClick={onNextMonth}
          disabled={!onNextMonth}
          sx={{
            ...effectiveButtonStyle,

            "& .MuiSvgIcon-root": {
              color: "#ffffff",
            },

            "&:hover": {
              backgroundColor: theme?.foundation?.primaryColor || "#6B8E23",
              opacity: 0.9,
            },

            "&.Mui-disabled": {
              backgroundColor: theme?.foundation?.primaryColor || "#6B8E23",
              color: "#ffffff",
              opacity: 0.5,

              "& .MuiSvgIcon-root": {
                color: "#ffffff",
              },
            },
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>

      {/* ======================================================
          CALENDAR GRID
      ======================================================= */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(7, 1fr)",

          gap: effectiveIsMobile ? "1px" : "2px",

          border: "1px solid var(--color-border, #e0e0e0)",

          borderRadius: effectiveIsMobile ? "6px" : "8px",

          height: effectiveIsMobile ? "auto" : "calc(100% - 60px)",

          overflow: "hidden",
        }}
        onTouchMove={effectiveIsMobile ? handleTouchMove : undefined}
        onTouchEnd={effectiveIsMobile ? handleTouchEnd : undefined}
      >
        {/* ====================================================
            WEEK HEADERS
        ===================================================== */}

        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((header) => (
          <div
            key={header}
            style={{
              background: "var(--color-primary-light, #f8f9fa)",

              fontWeight: 600,

              color: "var(--color-text-secondary, #444444)",

              textAlign: "center",

              padding: effectiveIsMobile ? "6px 2px" : "10px",

              fontSize: effectiveIsMobile ? "10px" : "14px",

              borderBottom: "1px solid var(--color-border, #ddd)",

              textTransform: "uppercase",

              boxSizing: "border-box",
            }}
          >
            {effectiveIsMobile ? header.slice(0, 1) : header}
          </div>
        ))}

        {/* ====================================================
            CALENDAR DAYS
        ===================================================== */}

        {days.map((dayInfo, index) => {
          const cellStyle = getCellStyle(dayInfo);

          return (
            <div
              key={index}
              data-datestr={dayInfo?.dateStr || ""}
              data-ispast={dayInfo?.isPast || false}
              data-isweekend={dayInfo?.isWeekend || false}
              data-isdisabled={dayInfo?.isDisabled || false}
              data-daynum={dayInfo?.day || ""}
              style={{
                minHeight: effectiveIsMobile ? "45px" : "60px",

                padding: effectiveIsMobile ? "4px" : "8px",

                borderRadius: "0",

                cursor:
                  dayInfo &&
                  !dayInfo.isPast &&
                  !dayInfo.isWeekend &&
                  !dayInfo.isDisabled &&
                  isSelectionMode
                    ? "pointer"
                    : "default",

                transition:
                  "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",

                display: "flex",

                flexDirection: "column",

                justifyContent: "space-between",

                alignItems: "flex-start",

                position: "relative",

                touchAction: effectiveIsMobile && dayInfo ? "none" : "auto",

                boxSizing: "border-box",

                /*
                 * IMPORTANT:
                 * Apply calculated cell style last.
                 */
                ...cellStyle,
              }}
              onClick={() => {
                if (!dayInfo) {
                  return;
                }

                handleClick(
                  dayInfo.dateStr,
                  dayInfo.isPast,
                  dayInfo.isWeekend,
                  dayInfo.isDisabled,
                );
              }}
              onMouseEnter={() => {
                if (!dayInfo) {
                  return;
                }

                handleMouseEnter(
                  dayInfo.dateStr,
                  dayInfo.isPast,
                  dayInfo.isWeekend,
                  dayInfo.isDisabled,
                  dayInfo.day,
                );
              }}
              onTouchStart={() => {
                if (!dayInfo) {
                  return;
                }

                handleTouchStart(
                  dayInfo.dateStr,
                  dayInfo.isPast,
                  dayInfo.isWeekend,
                  dayInfo.isDisabled,
                );
              }}
            >
              {dayInfo && (
                <>
                  {/* ==========================================
                      DAY NUMBER
                      
                      IMPORTANT:
                      color is inherited from getCellStyle().
                      
                      Normal:
                        theme.colors.textPrimary
                      
                      Selected:
                        white
                      
                      Holiday:
                        warning color
                      
                      Leave:
                        success color
                      
                      Weekend:
                        disabled color
                  ========================================== */}

                  <div
                    style={{
                      fontSize: effectiveIsMobile ? "12px" : "16px",

                      fontWeight: 500,

                      marginBottom: effectiveIsMobile ? "2px" : "4px",

                      color: theme.foundation.primaryColor,

                      WebkitTextFillColor: "inherit",
                    }}
                  >
                    {dayInfo.day}
                  </div>

                  {/* ==========================================
                      LEAVE / HOLIDAY LABEL
                  ========================================== */}

                  {dayInfo.event && (
                    <div
                      style={{
                        fontSize: effectiveIsMobile ? "9px" : "11px",

                        padding: effectiveIsMobile ? "1px 2px" : "2px 4px",

                        borderRadius: "4px",

                        color: "inherit",

                        textAlign: "left",

                        width: "100%",

                        boxSizing: "border-box",
                      }}
                    >
                      {dayInfo.event.label}
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
};

export default CalendarNew;
