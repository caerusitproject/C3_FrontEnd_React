import React, { useEffect, useMemo, useRef, useState } from "react";

import { useThemeContext } from "../../context/ThemeContext";

import Button from "../../Components/ui/Button/Button";
import * as actions from "../../store/actions";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
} from "@mui/material";

import CalendarNew from "../Attendance/CalendarNew";
import DialogueAppliedLeaves from "./DialogueAppliedLeaves";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FreeCancellationIcon from "@mui/icons-material/FreeCancellation";
import Badge from "@mui/material/Badge";
import ReasonDialoguePopup from "./ReasonDialoguePopup";
import { useDispatch, useSelector } from "react-redux";

import {
  leaveRequestManagementService,
  fetchleaveRequestManagementService,
  updateAssetManagementService,
  deleteAssetManagementService,
} from "../../store/services/leaveManagementService";
import { showAlert } from "../../store/slices/alertSlice";
// import { storeAssetManagement } from "../slices/assetManagementSlice";
import {
  globalLoaderOpen,
  globalLoaderClose,
} from "../../store/slices/globalSlice";

const Leave = () => {
  /* ============================================================
  THEME
  ============================================================ */
  const dispatch = useDispatch();
  const leavefetchedRequest = useSelector(
    (state) => state.leaveManagement.leaveRequest,
  );
  const { loggedInUser } = useSelector((state) => state.login);
  const { theme, isLoading: themeLoading } = useThemeContext();

  /* ============================================================
     BASIC STATE
     ============================================================ */

  const [currentDate, setCurrentDate] = useState(new Date());

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768,
  );

  /*
   * Local leave data only.
   *
   * No API.
   * No authentication.
   * No roles.
   * No backend.
   */

  const [leaves, setLeaves] = useState([]);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveSendRequest, setLeaveSendReq] = useState(null);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [selectedLeaveToEdit, setSelectedLeaveToEdit] = useState(null);
  const [editingLeaveId, setEditingLeaveId] = useState(null);

  /* ============================================================
     LEAVE SELECTION STATE
     ============================================================ */

  const [isApplyingLeave, setIsApplyingLeave] = useState(false);

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const [isSelecting, setIsSelecting] = useState(false);

  const [selectedDates, setSelectedDates] = useState([]);

  const [dragStart, setDragStart] = useState(null);

  const [dragEnd, setDragEnd] = useState(null);

  const [showNextMonthButton, setShowNextMonthButton] = useState(false);

  /* ============================================================
     SELECTION REF
     ============================================================ */

  const isSelectingRef = useRef(false);

  /* ============================================================
     DELETE MODAL
     ============================================================ */

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedLeaveToDelete, setSelectedLeaveToDelete] = useState(null);

  /* ============================================================
     TODAY
     ============================================================ */

  const today = new Date();

  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  /* ============================================================
     HOLIDAYS
     ============================================================ */

  const holidays = [];

  const handleEditLeave = (leave) => {
    console.log("Editing leave:", leave);

    const existingDates =
      leave.selectedDates?.length > 0
        ? leave.selectedDates
        : getDatesInRange(leave.start, leave.end);

    setSelectedLeaveToEdit(leave);

    setEditingLeaveId(leave.id);

    /*
     * Show the existing dates initially.
     */
    setSelectedDates(existingDates);

    /*
     * IMPORTANT:
     * Do NOT keep the old range active.
     *
     * The first date the user clicks will become
     * the new start date.
     */
    setStartDate(null);
    setEndDate(null);

    setDragStart(null);
    setDragEnd(null);

    isSelectingRef.current = false;
    setIsSelecting(false);

    /*
     * Enable calendar selection while editing.
     */
    setIsApplyingLeave(true);

    /*
     * Load existing reason.
     */
    setLeaveReason(leave.reason || "");

    /*
     * Navigate calendar to the existing leave's month.
     */
    if (leave.start) {
      const editDate = new Date(`${leave.start}T00:00:00`);

      if (!Number.isNaN(editDate.getTime())) {
        setCurrentDate(editDate);
      }
    }

    /*
     * Close Applied Leaves dialog.
     */
    setLeaveModalOpen(false);

    /*
     * Make sure reason popup is closed initially.
     */
    setReasonModalOpen(false);
  };

  console.log("all Leave___", leaves);

  // const handleEditLeave = (leave) => {
  //   console.log("Editing leave:", leave);

  //   setSelectedLeaveToEdit(leave);

  //   setEditingLeaveId(leave.id);

  //   /*
  //    * Load the existing selected dates
  //    * into your calendar.
  //    */
  //   setSelectedDates(leave.selectedDates || []);

  //   /*
  //    * Load the existing reason.
  //    */
  //   setLeaveReason(leave.reason || "");

  //   /*
  //    * Close Applied Leaves dialog.
  //    */
  //   setLeaveModalOpen(false);

  //   /*
  //    * Open your date-selection/calendar UI.
  //    */
  //   // setCalendarOpen(true);
  // };

  /* ============================================================
     RESPONSIVE HANDLING
     ============================================================ */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ============================================================
     KEEP SELECTION REF SYNCHRONIZED
     ============================================================ */

  useEffect(() => {
    isSelectingRef.current = isSelecting;
  }, [isSelecting]);

  // useEffect(() => {
  //   dispatch(actions.getLeaveRequest(loggedInUser?.empCode));
  // }, []);

  console.log("fetched all leaves__", leavefetchedRequest);
  /* ============================================================
     GET WORKING DAYS BETWEEN TWO DATES
     ============================================================ */

  const getDatesInRange = (start, end) => {
    if (!start || !end) {
      return [];
    }

    const startDateValue = new Date(start);

    const endDateValue = new Date(end);

    const minDate = new Date(
      Math.min(startDateValue.getTime(), endDateValue.getTime()),
    );

    const maxDate = new Date(
      Math.max(startDateValue.getTime(), endDateValue.getTime()),
    );

    const dates = [];

    let current = new Date(minDate);

    while (current <= maxDate) {
      const currentYear = current.getFullYear();

      const currentMonth = String(current.getMonth() + 1).padStart(2, "0");

      const currentDay = String(current.getDate()).padStart(2, "0");

      const dateStr = `${currentYear}-${currentMonth}-${currentDay}`;

      const dayOfWeek = current.getDay();

      const isHoliday = holidays.includes(dateStr);

      /*
       * Only future working days.
       */
      if (
        dateStr > todayStr &&
        dayOfWeek !== 0 &&
        dayOfWeek !== 6 &&
        !isHoliday
      ) {
        dates.push(dateStr);
      }

      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const getWorkingDatesBetween = (start, end) => {
    if (!start || !end) {
      return [];
    }

    const dates = [];

    const current = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);

    while (current <= endDate) {
      const dayOfWeek = current.getDay();

      /*
       * Monday-Friday only
       */
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const year = current.getFullYear();

        const month = String(current.getMonth() + 1).padStart(2, "0");

        const day = String(current.getDate()).padStart(2, "0");

        dates.push(`${year}-${month}-${day}`);
      }

      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const mapLeaveFromApi = (leave) => {
    const start = leave?.fromDate;
    const end = leave?.toDate;

    return {
      id: leave?.leaveRequestId,

      empCode: leave?.empCode,

      leaveTypeId: leave?.leaveTypeId,

      leaveTypeName: leave?.leaveTypeName,

      start,

      end,

      days: Number(leave?.totalDays || 0),

      status: leave?.status,

      statusCodeValueId: leave?.statusCodeValueId,

      appliedOn: leave?.appliedOn,

      message: leave?.message,

      selectedDates: getWorkingDatesBetween(start, end),
    };
  };

  useEffect(() => {
    if (!loggedInUser?.empCode) {
      return;
    }

    dispatch(globalLoaderOpen());

    fetchleaveRequestManagementService(loggedInUser.empCode)
      .then((res) => {
        dispatch(globalLoaderClose());

        console.log("GET leave response:", res);

        const apiLeaves = Array.isArray(res)
          ? res
          : res?.data?.data?.items || [];

        const formattedLeaves = apiLeaves.map(mapLeaveFromApi);

        setLeaves(formattedLeaves);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());

        console.error("Failed to fetch leaves:", err);

        setLeaves([]);

        dispatch(
          showAlert({
            type: "error",
            title: err?.message || "Failed to fetch leave requests",
          }),
        );
      });
  }, [
    loggedInUser?.empCode,
    leavefetchedRequest,
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ]);

  // const allConfirmedDates = useMemo(() => {
  //   return leaves.flatMap((leave) => getDatesInRange(leave.start, leave.end));
  // }, [leaves]);

  const allConfirmedDates = useMemo(() => {
    return leaves
      .filter((leave) => leave.id !== editingLeaveId)
      .flatMap((leave) => getDatesInRange(leave.start, leave.end));
  }, [leaves, editingLeaveId]);

  /* ============================================================
     EXISTING LEAVE DATE SET
     
     Used for fast checks while selecting.
     ============================================================ */

  const existingLeaveDateSet = useMemo(() => {
    return new Set(allConfirmedDates);
  }, [allConfirmedDates]);

  /* ============================================================
     CALENDAR EVENTS
     ============================================================ */

  //   const events = useMemo(() => {
  //     const leaveEvents = leaves.flatMap((leave) => {
  //       const dates = getDatesInRange(leave.start, leave.end);

  //       return dates.map((date) => ({
  //         date,
  //         type: "Leave",
  //         label: leave.status || "Pending",
  //       }));
  //     });

  //     const holidayEvents = holidays.map((date) => ({
  //       date,
  //       type: "Holiday",
  //       label: "Holiday",
  //     }));

  //     return [...leaveEvents, ...holidayEvents];
  //   }, [leaves]);

  // const events = useMemo(() => {
  //   const leaveEvents = leaves.flatMap((leave) => {
  //     const dates = getDatesInRange(leave.start, leave.end);

  //     const status = String(leave.status || "Approved").toLowerCase();

  //     return dates.map((date) => {
  //       let type = "Leave";

  //       if (status === "approved" || status === "confirmed") {
  //         type = "Confirmed";
  //       } else if (status === "pending") {
  //         type = "Leave";
  //       } else if (status === "rejected") {
  //         type = "Rejected";
  //       }

  //       return {
  //         date,
  //         type,
  //         label: leave.status || "Pending",
  //       };
  //     });
  //   });

  //   const holidayEvents = holidays.map((date) => ({
  //     date,
  //     type: "Holiday",
  //     label: "Holiday",
  //   }));

  //   return [...leaveEvents, ...holidayEvents];
  // }, [leaves, holidays]);

  const events = useMemo(() => {
    const leaveEvents = leaves
      .filter((leave) => leave.id !== editingLeaveId)
      .flatMap((leave) => {
        const dates =
          leave.selectedDates?.length > 0
            ? leave.selectedDates
            : getDatesInRange(leave.start, leave.end);

        const status = String(leave.status || "Approved").toLowerCase();

        return dates.map((date) => {
          let type = "Leave";

          if (status === "approved" || status === "confirmed") {
            type = "Confirmed";
          } else if (status === "Pending") {
            type = "Leave";
          } else if (status === "Rejected") {
            type = "Rejected";
          }

          return {
            date,
            type,
            label: leave.status || "Pending",
          };
        });
      });

    const holidayEvents = holidays.map((date) => ({
      date,
      type: "Holiday",
      label: "Holiday",
    }));

    return [...leaveEvents, ...holidayEvents];
  }, [leaves, editingLeaveId]);

  const resetLeaveSelection = () => {
    setIsSelecting(false);
    setSelectedDates([]);
    setStartDate(null);
    setEndDate(null);
    setDragStart(null);
    setDragEnd(null);

    isSelectingRef.current = false;
  };

  /* ============================================================
     CHECK WHETHER RANGE CONTAINS EXISTING LEAVE
     
     This prevents a new leave request from spanning through
     an already-applied leave.
     ============================================================ */

  const rangeContainsExistingLeave = (dates) => {
    return dates.some((date) => existingLeaveDateSet.has(date));
  };

  /* ============================================================
     MONTH NAVIGATION
     ============================================================ */

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);

    newDate.setMonth(newDate.getMonth() + direction);

    setCurrentDate(newDate);

    /*
     * Continue selection when moving
     * between months.
     */

    if (isSelectingRef.current && dragStart) {
      const newYear = newDate.getFullYear();

      const newMonth = newDate.getMonth();

      const newDragEndDate =
        direction > 0
          ? new Date(newYear, newMonth, 1)
          : new Date(newYear, newMonth + 1, 0);

      const newDragEndStr = `${newDragEndDate.getFullYear()}-${String(
        newDragEndDate.getMonth() + 1,
      ).padStart(2, "0")}-${String(newDragEndDate.getDate()).padStart(2, "0")}`;

      /*
       * Do not extend a selection into
       * an already-applied leave.
       */

      const dates = getDatesInRange(dragStart, newDragEndStr);

      if (rangeContainsExistingLeave(dates)) {
        return;
      }

      setDragEnd(newDragEndStr);

      setSelectedDates(dates);
    }

    setShowNextMonthButton(false);
  };

  /* ============================================================
     CALENDAR SELECTION
     ============================================================ */

  const handleSelectionChange = (dateStr, action) => {
    /* ==========================================================
       SELECTION FINISHED
       ========================================================== */

    if (action === "end") {
      if (startDate && selectedDates.length > 0) {
        const endStr = selectedDates[selectedDates.length - 1];

        setEndDate(endStr);

        // Open reason popup only after
        // start and end date are calculated.
        setLeaveReason("");
        setReasonModalOpen(true);
      }

      isSelectingRef.current = false;
      setIsSelecting(false);

      return;
    }

    console.log("from and to date____", dateStr);

    /* ==========================================================
       INVALID DATE
       ========================================================== */

    if (!dateStr || dateStr <= todayStr) {
      return;
    }

    /* ==========================================================
       IMPORTANT:
       PREVIOUSLY APPLIED LEAVE CANNOT BE SELECTED.
       ========================================================== */

    if (existingLeaveDateSet.has(dateStr)) {
      return;
    }

    const date = new Date(dateStr);

    const clickedDay = date.getDay();

    const isHoliday = holidays.includes(dateStr);

    /*
     * Do not select weekends or holidays.
     */

    if (clickedDay === 0 || clickedDay === 6 || isHoliday) {
      return;
    }

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

    /* ==========================================================
       CLICK
       ========================================================== */

    if (action === "click") {
      /*
       * ==========================================================
       * FIRST CLICK
       *
       * This also starts a NEW selection when editing.
       * Existing edited dates are replaced.
       * ==========================================================
       */

      if (!startDate) {
        setStartDate(dateStr);

        setEndDate(null);

        setDragStart(dateStr);

        setDragEnd(dateStr);

        /*
         * IMPORTANT:
         * Replace the old edited dates.
         */
        setSelectedDates([dateStr]);

        isSelectingRef.current = true;

        setIsSelecting(true);

        setShowNextMonthButton(date.getDate() === lastDay);

        return;
      }

      /*
       * ==========================================================
       * SECOND CLICK
       * ==========================================================
       */

      const dates = getDatesInRange(startDate, dateStr);

      /*
       * Do not allow the new range to contain another
       * employee's existing leave.
       *
       * The leave currently being edited has already been
       * removed from existingLeaveDateSet.
       */

      if (rangeContainsExistingLeave(dates)) {
        return;
      }

      setEndDate(dateStr);

      setDragEnd(dateStr);

      setSelectedDates(dates);

      isSelectingRef.current = false;

      setIsSelecting(false);

      setLeaveReason(selectedLeaveToEdit?.reason || leaveReason || "");

      setReasonModalOpen(true);

      setShowNextMonthButton(false);

      return;
    }
    /* ==========================================================
       HOVER
       ========================================================== */

    if (action === "hover" && isSelectingRef.current && dragStart) {
      const dates = getDatesInRange(dragStart, dateStr);

      /*
       * Do not allow hover selection to cross
       * an existing leave.
       */

      if (rangeContainsExistingLeave(dates)) {
        return;
      }

      setDragEnd(dateStr);

      setSelectedDates(dates);

      setShowNextMonthButton(date.getDate() === lastDay);
    }
  };

  /* ============================================================
     CALENDAR EDGE HOVER
     ============================================================ */

  const handleEdgeHover = (direction, dayNum) => {
    if (!isSelectingRef.current) {
      return;
    }

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

    setShowNextMonthButton(direction === "next" && dayNum === lastDay);
  };

  /* ============================================================
     CANCEL
     ============================================================ */
  const handleCancel = () => {
    setIsApplyingLeave(false);

    setStartDate(null);

    setEndDate(null);

    isSelectingRef.current = false;

    setIsSelecting(false);

    setSelectedDates([]);

    setDragStart(null);

    setDragEnd(null);

    setShowNextMonthButton(false);

    setReasonModalOpen(false);

    /*
     * IMPORTANT:
     * Exit edit mode.
     */
    setEditingLeaveId(null);

    setSelectedLeaveToEdit(null);

    setLeaveReason("");
  };
  // const handleCancel = () => {
  //   setIsApplyingLeave(false);

  //   setStartDate(null);

  //   setEndDate(null);

  //   isSelectingRef.current = false;

  //   setIsSelecting(false);

  //   setSelectedDates([]);

  //   setDragStart(null);

  //   setDragEnd(null);

  //   setShowNextMonthButton(false);

  //   setReasonModalOpen(false);
  // };

  /* ============================================================
     CONFIRM LEAVE
     ============================================================ */
  const handleConfirm = () => {
    if (
      !startDate ||
      !endDate ||
      selectedDates.length === 0 ||
      !leaveReason.trim()
    ) {
      return;
    }

    /*
     * Final safety check.
     *
     * existingLeaveDateSet already excludes the leave
     * currently being edited.
     */
    if (rangeContainsExistingLeave(selectedDates)) {
      return;
    }

    /*
     * ==========================================================
     * EDIT EXISTING LEAVE
     * ==========================================================
     */

    if (editingLeaveId) {
      let editLeaveClone = {
        fromDate: startDate,

        toDate: endDate,

        leaveTypeId: 1,

        reason: leaveReason.trim(),
      };
      setLeaves((previousLeaves) =>
        previousLeaves.map((leave) => {
          if (leave.id !== editingLeaveId) {
            return leave;
          }

          return {
            ...leave,

            start: startDate,

            end: endDate,

            days: selectedDates.length,

            reason: leaveReason.trim(),

            selectedDates: [...selectedDates],
          };
        }),
      );
      console.log("edit leave______", editLeaveClone);
      // dispatch(actions.postLeaveRequest(loggedInUser?.empCode, editLeaveClone));
      dispatch(globalLoaderOpen());

      leaveRequestManagementService(loggedInUser?.empCode, editLeaveClone)
        .then((res) => {
          dispatch(globalLoaderClose());

          console.log("leave API response___", res);

          /*
           * ==========================================================
           * BACKEND VALIDATION ERROR
           * ==========================================================
           *
           * Depending on your service implementation, the API may
           * resolve successfully even when the backend returns a
           * validation failure.
           */

          if (
            res?.success === false ||
            res?.status === false ||
            res?.error ||
            res?.errors ||
            res?.validationErrors
          ) {
            resetLeaveSelection();

            dispatch(
              showAlert({
                type: "error",
                title:
                  res?.message ||
                  res?.error ||
                  "Leave Request Validation Failed",
                message:
                  res?.errorCode ||
                  res?.errorCode ||
                  "Please check your leave request.",
              }),
            );

            return;
          }

          /*
           * ==========================================================
           * SUCCESS
           * ==========================================================
           */

          resetLeaveSelection();

          dispatch(
            showAlert({
              type: "success",
              title: res?.message || "Leave Request Stored Successfully",
            }),
          );

          console.log("leave details___", res);
        })
        .catch((err) => {
          dispatch(globalLoaderClose());

          /*
           * Backend/API error
           */
          resetLeaveSelection();
          setLeaves([]);

          dispatch(
            showAlert({
              type: "error",
              title:
                err?.error ||
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                "Leave Post Failed",

              message:
                err?.response?.data?.errorCode ||
                err?.message ||
                "Leave Management API failed",
            }),
          );

          console.log("error_message", err);
        });
    } else {
      /*
       * ==========================================================
       * CREATE NEW LEAVE
       * ==========================================================
       */
      const newLeave = {
        id: Date.now(),

        start: startDate,

        end: endDate,

        days: selectedDates.length,

        reason: leaveReason.trim(),

        selectedDates: [...selectedDates],

        status: "Pending",
      };

      let newLeaveClone = {
        fromDate: startDate,

        toDate: endDate,

        leaveTypeId: 1,

        reason: leaveReason.trim(),
      };

      setLeaves((previousLeaves) => [...previousLeaves, newLeave]);

      // dispatch(actions.postLeaveRequest(loggedInUser?.empCode, newLeaveClone));

      dispatch(globalLoaderOpen());

      leaveRequestManagementService(loggedInUser?.empCode, newLeaveClone)
        .then((res) => {
          dispatch(globalLoaderClose());

          console.log("leave API response___", res);

          /*
           * ==========================================================
           * BACKEND VALIDATION ERROR
           * ==========================================================
           *
           * Depending on your service implementation, the API may
           * resolve successfully even when the backend returns a
           * validation failure.
           */

          if (
            res?.success === false ||
            res?.status === false ||
            res?.error ||
            res?.errors ||
            res?.validationErrors
          ) {
            resetLeaveSelection();

            dispatch(
              showAlert({
                type: "error",
                title:
                  res?.message ||
                  res?.error ||
                  "Leave Request Validation Failed",
                message:
                  res?.errorCode ||
                  res?.errorCode ||
                  "Please check your leave request.",
              }),
            );

            return;
          }

          /*
           * ==========================================================
           * SUCCESS
           * ==========================================================
           */

          resetLeaveSelection();

          dispatch(
            showAlert({
              type: "success",
              title: res?.message || "Leave Request Stored Successfully",
            }),
          );

          console.log("leave details___", res);
        })
        .catch((err) => {
          dispatch(globalLoaderClose());

          /*
           * Backend/API error
           */
          resetLeaveSelection();
          setLeaves([]);

          dispatch(
            showAlert({
              type: "error",
              title:
                err?.error ||
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                "Leave Post Failed",

              message:
                err?.response?.data?.errorCode ||
                err?.message ||
                "Leave Management API failed",
            }),
          );

          console.log("error_message", err);
        });

      // dispatch(globalLoaderOpen());
      // leaveRequestManagementService(loggedInUser?.empCode, newLeaveClone)
      //   .then((res) => {
      //     dispatch(globalLoaderClose());
      //     dispatch(
      //       showAlert({
      //         type: "success",
      //         title: res?.message || "Leave Request Stored Successfully",
      //       }),
      //     );
      //     console.log("leave details___", res);
      //   })
      //   .catch((err) => {
      //     dispatch(globalLoaderClose());
      //     setIsSelecting(false);
      //     setSelectedDates([]);
      //     dispatch(
      //       showAlert({
      //         type: "error",
      //         title: err?.error || "Leave Post Failed",
      //         message: err?.response?.message || "Leave Management API failed",
      //       }),
      //     );

      //     console.log("error_message", err?.message);
      //   });

      console.log("API leave Submit or edit______", newLeaveClone);
    }

    /*
     * ==========================================================
     * RESET
     * ==========================================================
     */

    setEditingLeaveId(null);

    setSelectedLeaveToEdit(null);

    setLeaveReason("");

    setStartDate(null);

    setEndDate(null);

    setSelectedDates([]);

    setDragStart(null);

    setDragEnd(null);

    isSelectingRef.current = false;

    setIsSelecting(false);

    setIsApplyingLeave(false);

    setReasonModalOpen(false);
  };
  // const handleConfirm = () => {
  //   if (
  //     !startDate ||
  //     !endDate ||
  //     selectedDates.length === 0 ||
  //     !leaveReason.trim()
  //   ) {
  //     return;
  //   }

  //   /*
  //    * Final safety check:
  //    * never save a leave containing an already
  //    * existing leave date.
  //    */

  //   if (rangeContainsExistingLeave(selectedDates)) {
  //     return;
  //   }

  //   const newLeave = {
  //     id: Date.now(),

  //     start: startDate,

  //     end: endDate,

  //     days: selectedDates.length,

  //     reason: leaveReason.trim(),

  //     status: "Pending",
  //   };

  //   setLeaveSendReq(newLeave);

  //   setLeaves((prev) => [...prev, newLeave]);

  //   handleCancel();
  // };

  // const handleResetConfirm = () => {
  //   handleCancel();
  //   // setReasonModalOpen(false);
  // };

  // const handleConfirm = () => {
  //   if (
  //     !startDate ||
  //     !endDate ||
  //     selectedDates.length === 0 ||
  //     !leaveReason.trim()
  //   ) {
  //     return;
  //   }

  //   /*
  //    * Final safety check:
  //    * never save a leave containing an
  //    * already existing leave date.
  //    */
  //   if (rangeContainsExistingLeave(selectedDates)) {
  //     return;
  //   }

  //   const newLeave = {
  //     fromDate: startDate,

  //     toDate: endDate,

  //     // days: selectedDates.length,

  //     reason: leaveReason.trim(),

  //     leaveTypeId: 1,

  //     // status: "Pending",
  //   };

  //   setLeaveSendReq(newLeave);

  //   setLeaves((prev) => [...prev, newLeave]);

  //   // Close reason popup.
  //   setReasonModalOpen(false);

  //   // Clear reason.
  //   setLeaveReason("");

  //   dispatch(actions.postLeaveRequest(loggedInUser?.empCode, newLeave));

  //   console.log("one leaves___", newLeave);
  //   // Reset calendar selection.
  //   handleCancel();
  // };

  /* ============================================================
     DELETE LEAVE
     ============================================================ */

  //   const handleDeleteClick = (leave) => {
  //     setSelectedLeaveToDelete(leave);

  //     setDeleteModalOpen(true);
  //   };

  const handleDeleteConfirm = () => {
    if (selectedLeaveToDelete) {
      setLeaves((prev) =>
        prev.filter((leave) => leave.id !== selectedLeaveToDelete.id),
      );
    }

    setDeleteModalOpen(false);

    setSelectedLeaveToDelete(null);
  };

  /* ============================================================
     THEME-AWARE STYLES
     ============================================================ */

  const pageStyle = {
    width: "100%",

    color: "var(--color-text-primary, inherit)",

    backgroundColor: "var(--color-background, transparent)",

    transition: "background-color 0.2s ease, color 0.2s ease",

    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: isMobile ? "22px" : "25px",

    fontWeight: 700,

    color: "var(--color-text-primary, inherit)",

    margin: 0,
  };

  const headerStyle = {
    width: "100%",

    marginBottom: "16px",

    backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.04))",

    border: "1px solid var(--color-border, rgba(0,0,0,0.08))",

    borderRadius: "10px",

    boxSizing: "border-box",

    display: "flex",

    flexDirection: isMobile ? "column" : "row",

    justifyContent: isMobile ? "center" : "space-between",

    alignItems: "center",

    padding: isMobile ? "8px" : "10px 16px",

    gap: isMobile ? "10px" : "0",

    marginTop: isMobile ? "15px" : "20px",

    transition: "background-color 0.2s ease, border-color 0.2s ease",
  };

  const summaryContainerStyle = {
    display: "flex",

    gap: isMobile ? "12px" : "20px",

    justifyContent: "center",

    flexWrap: "wrap",
  };

  const summaryBoxStyle = {
    textAlign: "center",

    fontSize: isMobile ? "12px" : "16px",

    fontWeight: 600,

    backgroundColor: "var(--color-surface, transparent)",

    borderRadius: isMobile ? "10px" : "8px",

    padding: isMobile ? "6px 10px" : "8px 14px",

    minWidth: isMobile ? "90px" : "120px",

    boxSizing: "border-box",
  };

  const summaryLabelStyle = {
    fontSize: isMobile ? "9px" : "14px",

    color: "var(--color-text-secondary, inherit)",

    whiteSpace: "nowrap",

    marginTop: "2px",
  };

  const themeSurface =
    theme?.surface || theme?.colors?.surface || "var(--color-surface, #ffffff)";

  /* ============================================================
     THEME LOADING
     ============================================================ */

  if (themeLoading) {
    return (
      <div
        style={{
          ...pageStyle,
          minHeight: "200px",
        }}
      />
    );
  }

  const handleTestApproveLeave = (leaveId) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === leaveId
          ? {
              ...leave,
              status: "Approved",
            }
          : leave,
      ),
    );
  };

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <div style={pageStyle}>
      {/* ======================================================
          PAGE TITLE
          ====================================================== */}

      <h1 style={titleStyle}>Leave Calendar</h1>

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div style={headerStyle}>
        {/* ==================================================
            SUMMARY
            ================================================== */}

        <div style={summaryContainerStyle}>
          {/* Applied Leaves */}

          <div
            style={{
              ...summaryBoxStyle,

              border: theme.foundation.primaryColor,

              color: theme.foundation.primaryColor,
            }}
          >
            {leaves.length}

            <div style={summaryLabelStyle}>Earned Leaves</div>
          </div>

          {/* Total Leave Days */}

          <div
            style={{
              ...summaryBoxStyle,

              border: theme.foundation.primaryColor,

              color: theme.foundation.primaryColor,
            }}
          >
            {leaves.reduce((total, leave) => total + leave.days, 0)}

            <div style={summaryLabelStyle}>Casual Leaves</div>
          </div>

          <div
            style={{
              ...summaryBoxStyle,

              border: theme.foundation.primaryColor,

              color: theme.foundation.primaryColor,
            }}
          >
            {leaves.reduce((total, leave) => total + leave.days, 0)}

            <div style={summaryLabelStyle}>Sick Leaves</div>
          </div>
        </div>

        {/* ==================================================
            ACTION BUTTONS
            ================================================== */}

        <div
          style={{
            width: isMobile ? "100%" : "auto",

            display: "flex",

            alignItems: "center",

            justifyContent: "flex-end",

            gap: "10px",
          }}
        >
          <Badge badgeContent={leaves?.length} color="primary">
            <Button type="primary" onClick={() => setLeaveModalOpen(true)}>
              <FreeCancellationIcon />
            </Button>
          </Badge>
          {!isApplyingLeave ? (
            <Button type="primary" onClick={() => setIsApplyingLeave(true)}>
              Apply Leave
            </Button>
          ) : endDate ? (
            <>
              <Button type="secondary" onClick={handleCancel}>
                Cancel
              </Button>

              <Button type="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </>
          ) : (
            <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          {/* {!isApplyingLeave ? (
            <Button type="primary" onClick={() => setIsApplyingLeave(true)}>
              Apply Leave
            </Button>
          ) : (
            <Button type="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )} */}
          {leaves.length > 0 && (
            <Button
              type="primary"
              onClick={() => handleTestApproveLeave(leaves[0].id)}
            >
              Test Manager Approve
            </Button>
          )}
        </div>
      </div>

      {/* ======================================================
          CALENDAR
          ====================================================== */}

      <div
        style={{
          position: "relative",
        }}
      >
        <CalendarNew
          theme={theme}
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          events={events}
          mode="leave"
          selectedDates={selectedDates}
          /*
           * Existing leaves remain visually highlighted.
           */
          confirmedDates={allConfirmedDates}
          /*
           * Existing leaves are also locked.
           */
          disabledDates={allConfirmedDates}
          onSelectionChange={handleSelectionChange}
          isSelecting={isSelecting}
          isSelectionMode={isApplyingLeave}
          today={today}
          onEdgeHover={handleEdgeHover}
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

        {/* ==================================================
            NEXT MONTH BUTTON
            ================================================== */}

        {showNextMonthButton && !isMobile && (
          <button
            onClick={() => handleMonthChange(1)}
            style={{
              position: "absolute",

              bottom: "15px",

              left: "calc(100% + 10px)",

              background: "var(--color-primary, #1976d2)",

              border: "none",

              color: "var(--color-primary-text, #fff)",

              padding: "8px 16px",

              borderRadius: "6px",

              cursor: "pointer",

              fontWeight: 500,

              fontSize: "14px",

              transition: "opacity 0.2s ease",
            }}
          >
            →
          </button>
        )}
      </div>

      {/* ======================================================
          APPLIED LEAVES TABLE
          ====================================================== */}
      <DialogueAppliedLeaves
        theme={theme}
        themeSurface={themeSurface}
        isMobile={isMobile}
        leaves={leaves}
        setLeaves={setLeaves}
        leaveModalOpen={leaveModalOpen}
        setLeaveModalOpen={setLeaveModalOpen}
        selectedLeaveToDelete={selectedLeaveToDelete}
        // setSelectedLeaveToDelete={setSelectedLeaveToDelete}
        handleEditLeave={handleEditLeave}
        // handleSendConfirm={handleSendConfirm}
        // sendParentChild={sendParentChild}
      />
      {/* {leaves.length > 0 && (
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "18px" : "20px",

              color: "var(--color-text-primary, inherit)",

              marginBottom: "16px",
            }}
          >
            Applied Leaves
          </h2>

          <Paper
            sx={{
              overflowX: "auto",

              borderRadius: theme?.borderRadius?.large || "8px",

              boxShadow: theme?.shadows?.medium || "0 2px 8px rgba(0,0,0,0.08)",

              backgroundColor: themeSurface,

              color: "var(--color-text-primary, inherit)",

              border: "1px solid var(--color-border, rgba(0,0,0,0.08))",

              transition: "background-color 0.2s ease, border-color 0.2s ease",
            }}
          >
            <TableContainer>
              <Table
                sx={{
                  minWidth: 500,

                  "& .MuiTableCell-root": {
                    color: "var(--color-text-primary, inherit)",

                    borderColor: "var(--color-border, rgba(0,0,0,0.08))",
                  },
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor:
                        "var(--color-primary-light, rgba(0,0,0,0.04))",

                      "& .MuiTableCell-root": {
                        fontWeight: 600,
                      },
                    }}
                  >
                    <TableCell>Start Date</TableCell>

                    <TableCell>End Date</TableCell>

                    <TableCell>Days</TableCell>

                    <TableCell>Status</TableCell>

                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {leaves.map((leave) => (
                    <TableRow key={leave.id} hover>
                      <TableCell>{leave.start}</TableCell>

                      <TableCell>{leave.end}</TableCell>

                      <TableCell>{leave.days}</TableCell>

                      <TableCell>
                        <span
                          style={{
                            display: "inline-flex",

                            alignItems: "center",

                            padding: "4px 10px",

                            borderRadius: "999px",

                            fontSize: "12px",

                            fontWeight: 600,

                            color: "var(--color-warning-text)",

                            backgroundColor: "var(--color-warning-bg)",
                          }}
                        >
                          {leave.status}
                        </span>
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleDeleteClick(leave)}
                          size="small"
                          sx={{
                            color: "var(--color-error)",

                            "&:hover": {
                              backgroundColor: "var(--color-error-bg)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )} */}

      {/* ======================================================
          DELETE CONFIRMATION
          ====================================================== */}

      {/* <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "var(--color-surface, #fff)",

            color: "var(--color-text-primary, inherit)",

            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              color: "var(--color-text-secondary, inherit)",
            }}
          >
            Are you sure you want to delete this leave application?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <MuiButton
            onClick={() => setDeleteModalOpen(false)}
            sx={{
              color: "var(--color-text-primary, inherit)",
            }}
          >
            Cancel
          </MuiButton>

          <MuiButton
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: "var(--color-error)",

              color: "var(--color-error-text)",

              "&:hover": {
                backgroundColor: "var(--color-error)",

                opacity: 0.9,
              },
            }}
          >
            Confirm ({selectedLeaveToDelete?.days || 0})
          </MuiButton>
        </DialogActions>
      </Dialog> */}
      <ReasonDialoguePopup
        reasonModalOpen={reasonModalOpen}
        startDate={startDate}
        endDate={endDate}
        selectedDates={selectedDates}
        leaveReason={leaveReason}
        setLeaveReason={setLeaveReason}
        setReasonModalOpen={setReasonModalOpen}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        editingLeaveId={editingLeaveId}
      />
    </div>
  );
};

export default Leave;
