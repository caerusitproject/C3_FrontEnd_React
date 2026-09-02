// Updated Attendance.jsx
import React, { useState, useEffect } from "react";
// import { useAuth } from "../../hooks/useAuth";
import CalendarNew from "./CalendarNew";
import { useTheme } from "../../context/ThemeContext";
// import { AttendanceAPI } from "../../api/attendanceApi";
// import { AllemployeeApi } from "../../api/getallemployeeApi";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
// import CustomLoader from "../../components/common/CustomLoader";

const AttendanceNew = () => {
  //   const { user } = useAuth();
  const allAttendanceRequest = useSelector(
    (state) => state.attendanceManagement.allAttendanceRequest,
  );
  const attendanceSummary = useSelector(
    (state) => state.attendanceManagement.attendanceSummary,
  );

  const employeeList = useSelector(
    (state) => state.attendanceManagement.employeeList,
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loggedInUser } = useSelector((state) => state.login);
  const [selectedEmployee, setSelectedEmployee] = useState({
    employeeId: loggedInUser?.empId || "",
    employeeCode: loggedInUser?.empCode || "",
  });
  // const [empId, setEmpId] = useState(loggedInUser?.empId || "");
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmpCode, setSelectedEmpCode] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const today = new Date();
  //   const role = user?.role || "USER";
  //   const canViewAll = ["MANAGER", "ADMIN", "HR"].includes(role);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const getYearMonth = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}`;
  };

  // Default to current user's empCode
  //   useEffect(() => {
  //     if (user?.empCode) {
  //       setSelectedEmpCode(user.empCode);
  //     } else {
  //       setSelectedEmpCode("EMP001");
  //     }
  //   }, [user]);
  useEffect(() => {
    dispatch(actions.fetchAllEmployeesList());
  }, []);

  useEffect(() => {
    if (loggedInUser?.empCode && !selectedEmployee) {
      setSelectedEmployee({
        ...selectedEmployee,
        employeeCode: loggedInUser?.empCode,
      });
      setSelectedEmployee({
        ...selectedEmployee,
        employeeId: loggedInUser?.empCode,
      });
    }
  }, [
    loggedInUser?.empCode,
    selectedEmployee?.employeeCode,
    selectedEmployee?.employeeId,
  ]);

  useEffect(() => {
    if (!selectedEmployee) return;

    const yearMonth = getYearMonth(currentDate);

    dispatch(
      actions.fetchAllAttendanceLeaveRequest(
        selectedEmployee?.employeeId,
        selectedEmployee?.employeeCode,
        yearMonth,
      ),
    );
  }, [
    selectedEmployee,
    currentDate.getFullYear(),
    currentDate.getMonth(),
    dispatch,
  ]);

  console.log("employee code__", loggedInUser?.empCode);

  // useEffect(() => {
  //   const yearMonth = getYearMonth(currentDate);
  //   dispatch(
  //     actions.fetchAllAttendanceLeaveRequest(loggedInUser?.empCode, yearMonth),
  //   );
  // }, [currentDate.getFullYear(), currentDate.getMonth()]);

  useEffect(() => {
    if (!Array.isArray(allAttendanceRequest)) {
      setEvents([]);
      return;
    }

    const formattedEvents = allAttendanceRequest
      .filter((attendance) => attendance.status !== "WEEKEND")
      .map((attendance) => {
        const statusMap = {
          PRESENT: "present",
          ABSENT: "lwp",
          HOLIDAY: "holiday",
        };

        return {
          date: attendance.date,
          type: statusMap[attendance.status] || "unknown",

          ...(attendance.status === "HOLIDAY" && {
            label: attendance.holidayName || "Holiday",
          }),
        };
      });

    setEvents(formattedEvents);
  }, [allAttendanceRequest]);

  console.log("events____", employeeList);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(
    "all attendance req and summary",
    // allAttendanceRequest,
    attendanceSummary,
  );

  // Fetch employees list if authorized
  //   useEffect(() => {
  //     if (canViewAll) {
  //       const fetchEmployees = async () => {
  //         try {
  //           setEmployeesLoading(true);
  //           const response = await AllemployeeApi.getEmployeesByRole();
  //           if (response.success) {
  //             setEmployees(response.data.employeeList || []);
  //             if (user?.id) {
  //               const currentEmp = response.data.employeeList.find(
  //                 (emp) => emp.id === user.id.toString(),
  //               );
  //               if (currentEmp) {
  //                 setSelectedEmpCode(currentEmp.empCode);
  //               }
  //             }
  //           } else {
  //             throw new Error(response.message || "Failed to fetch employees");
  //           }
  //         } catch (err) {
  //           console.error("Error fetching employees:", err);
  //           setShowDropdown(false);
  //         } finally {
  //           setEmployeesLoading(false);
  //         }
  //       };
  //       fetchEmployees();
  //     }
  //   }, [canViewAll, user]);

  // Fetch attendance data when month/year or selectedEmpCode changes
  // useEffect(() => {
  // if (!selectedEmpCode) return;
  // const fetchAttendance = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const month = currentDate.getMonth() + 1;
  //     const year = currentDate.getFullYear();
  //     const response = await AttendanceAPI.getAttendanceByEmployee(
  //       selectedEmpCode,
  //       month,
  //       year,
  //     );
  //     if (response.success) {
  //       setAttendanceData(response.data);
  //     } else {
  //       throw new Error(
  //         response.message || "Failed to fetch attendance data",
  //       );
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // fetchAttendance();
  // }, [currentDate, selectedEmpCode]);

  const handleEmployeeChange = (selectedEmployee) => {
    setSelectedEmployee({
      employeeId: selectedEmployee.employeeId,
      employeeCode: selectedEmployee.employeeCode,
    });
  };

  // Calculate hours from checkIn and checkOut times
  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "Absent";
    const start = new Date(`1970-01-01T${checkIn}Z`);
    const end = new Date(`1970-01-01T${checkOut}Z`);
    const diffMs = end - start;
    if (diffMs <= 0) return "Absent";
    const hours = diffMs / (1000 * 60 * 60);
    return `${hours.toFixed(1)}hrs`;
  };

  // Transform API data for calendar
  // const events = [
  //   {
  //     date: "2026-03-11",
  //     type: "present",
  //   },
  //   {
  //     date: "2026-03-12",
  //     type: "present",
  //   },
  //   {
  //     date: "2026-03-19",
  //     type: "lwp",
  //   },
  //   {
  //     date: "2026-03-21",
  //     type: "lwp",
  //   },
  //   {
  //     date: "2026-03-25",
  //     type: "holiday",
  //     label: "Holiday",
  //   },
  //   { date: "2026-03-04", type: "lwp" },
  //   { date: "2026-03-05", type: "present" },
  // ];

  // Totals
  const totalHours = attendanceData
    .filter((a) => a.status !== "Absent")
    .reduce((sum, a) => {
      const hours = calculateHours(a.checkIn, a.checkOut);
      return sum + (hours !== "Absent" ? parseFloat(hours) : 0);
    }, 0);

  const absentDays = attendanceData.filter((a) => a.status === "Absent").length;
  const presentDays = attendanceData.length - absentDays;

  // const handleMonthChange = (direction) => {
  //   const newDate = new Date(currentDate);
  //   newDate.setMonth(newDate.getMonth() + direction);
  //   setCurrentDate(newDate);
  // };

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);

    // Always use the first day of the month
    // to prevent date overflow when changing months.
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + direction);

    setCurrentDate(newDate);
  };

  const boxStyle = {
    textAlign: "center",
    fontSize: isMobile ? "12px" : "16px",
    fontWeight: 600,
  };

  const labelStyle = {
    fontSize: isMobile ? "9px" : "16px",
    opacity: 0.9,
    whiteSpace: "nowrap",
  };

  const headerCommonStyle = {
    width: "100%",
    marginBottom: "16px",
    // backgroundColor: `${theme.colors.primaryLight}34`,
    borderRadius: "10px",
  };

  const summaryBoxesStyle = {
    display: "flex",
    gap: isMobile ? "20px" : "25px",
    justifyContent: "center",
    flexWrap: "nowrap",
  };

  const summariesContainerStyle = isMobile
    ? {
        width: "100%",
        display: "flex",
        gap: isMobile ? "20px" : "20px",
        justifyContent: "center",
        paddingBottom: "3px",
      }
    : summaryBoxesStyle;

  //   if (loading || employeesLoading) {
  //     return (
  //       <div>
  //         <CustomLoader />
  //       </div>
  //     );
  //   }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1
        style={{
          fontSize: "25px",
          fontWeight: "700",
          //   color: theme.colors.text.primary,
          margin: 0,
        }}
      >
        Attendance Calender
      </h1>
      <div
        style={{
          ...headerCommonStyle,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          padding: isMobile ? "4px 8px" : "12px 16px",
          gap: isMobile ? "8px" : "0",
          marginTop: isMobile ? "15px" : "20px",
          paddingTop: isMobile ? "8px" : "10px",
          paddingBottom: isMobile ? "8px" : "10px",
        }}
      >
        <div style={summariesContainerStyle}>
          <div
            style={{
              ...boxStyle,
              backgroundColor: "var(--color-surface, transparent)",
              border: `${isMobile ? "1px" : "2px"} solid ${theme.foundation.primaryColor}`,
              borderRadius: isMobile ? "10px" : "8px",
              padding: isMobile ? "6px 8px" : "8px 12px",
            }}
          >
            <p style={{ color: theme.foundation.primaryColor }}>
              {attendanceSummary?.totalWorkingHours || "0.0"}
            </p>
            <div
              style={{
                ...labelStyle,
                color: theme.foundation.primaryColor,
              }}
            >
              Total Hours
            </div>
          </div>
          <div
            style={{
              ...boxStyle,
              backgroundColor: "var(--color-surface, transparent)",
              border: `${isMobile ? "1px" : "2px"} solid ${theme.foundation.primaryColor}`,
              borderRadius: isMobile ? "10px" : "8px",
              padding: isMobile ? "6px 8px" : "8px 12px",
            }}
          >
            <p style={{ color: theme.foundation.primaryColor }}>
              {attendanceSummary?.presentDays || "0"}
            </p>
            <div
              style={{
                ...labelStyle,
                color: theme.foundation.primaryColor,
              }}
            >
              Days Present
            </div>
          </div>
          <div
            style={{
              ...boxStyle,
              backgroundColor: "var(--color-surface, transparent)",
              border: `${isMobile ? "1px" : "2px"} solid ${theme.foundation.primaryColor}`,
              borderRadius: isMobile ? "10px" : "8px",
              padding: isMobile ? "6px 8px" : "8px 12px",
            }}
          >
            <p style={{ color: theme.foundation.primaryColor }}>
              {Number(attendanceSummary?.totalWorkingDays) -
                (Number(attendanceSummary?.presentDays) +
                  Number(attendanceSummary?.holidayDays)) || "0"}
            </p>
            <div
              style={{
                ...labelStyle,
                color: theme.foundation.primaryColor,
              }}
            >
              Days Absent
            </div>
          </div>
        </div>
        {loggedInUser &&
          (loggedInUser?.role == "Human Resources" ||
            loggedInUser?.role == "Team Manager") && (
            <div
              style={{
                width: isMobile ? "100%" : "auto",
                display: "flex",
                alignItems: "baseline",
                justifyContent: isMobile ? "flex-end" : "center",
              }}
            >
              <div
                style={{
                  width: isMobile ? "230px" : "350px",
                }}
              >
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedEmployee?.employeeCode || ""}
                    onChange={(e) => {
                      const employeeCode = e.target.value;

                      // My Attendance
                      if (employeeCode === loggedInUser?.empCode) {
                        handleEmployeeChange({
                          employeeId: loggedInUser?.empId,
                          employeeCode: loggedInUser?.empCode,
                        });

                        return;
                      }

                      // Other employee
                      const employee = employeeList.find(
                        (emp) => emp.employeeCode === employeeCode,
                      );

                      if (employee) {
                        handleEmployeeChange({
                          employeeId: employee.employeeId,
                          employeeCode: employee.employeeCode,
                        });
                      }
                    }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <em style={{ fontStyle: "italic" }}>
                            Select Employee
                          </em>
                        );
                      }

                      if (selected === loggedInUser?.empCode) {
                        return "My Attendance";
                      }

                      return selected;
                    }}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      fontSize: isMobile ? "12px" : "14px",

                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },

                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },

                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },

                      "& .MuiSelect-select": {
                        padding: isMobile ? "6px 10px" : "8px 12px",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em style={{ fontStyle: "italic" }}>Select Employee</em>
                    </MenuItem>

                    {/* My Attendance */}
                    <MenuItem value={loggedInUser?.empCode}>
                      My Attendance
                    </MenuItem>

                    {/* Other Employees */}
                    {employeeList
                      .filter(
                        (emp) => emp.employeeCode !== loggedInUser?.empCode,
                      )
                      .map((emp) => (
                        <MenuItem key={emp.employeeId} value={emp.employeeCode}>
                          {emp.employeeCode}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
      </div>

      <CalendarNew
        theme={theme}
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        events={events}
        mode="attendance"
        darkTheme={false}
        today={today}
        onPrevMonth={() => handleMonthChange(-1)}
        onNextMonth={() => handleMonthChange(1)}
        isMobile={isMobile}
        buttonStyle={{
          background: "var(--color-primary, #1976d2)",

          border: "2px solid var(--color-surface, #fff)",

          color: "var(--color-primary-text, #fff)",

          padding: isMobile ? "8px 12px" : "8px 14px",

          borderRadius: "6px",

          cursor: "pointer",

          fontSize: isMobile ? "10px" : "12px",

          fontWeight: "bold",

          transition: "background-color 0.2s ease",
        }}
      />
    </div>
  );
};

export default AttendanceNew;
