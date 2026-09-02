import React from "react";

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
  DialogTitle,
  Tooltip,
} from "@mui/material";

import Button from "../../Components/ui/Button/Button";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import ClearIcon from "@mui/icons-material/Clear";

export default function DialogueAppliedLeaves({
  theme,
  themeSurface,
  isMobile,

  leaveModalOpen,

  leaves,
  setLeaves,

  setLeaveModalOpen,

  handleEditLeave,

  handleSendConfirm,
}) {
  /*
   * =====================================================
   * EDIT LEAVE
   * =====================================================
   */
  const handleEditClick = (leave) => {
    if (handleEditLeave) {
      handleEditLeave(leave);
    }
  };

  /*
   * =====================================================
   * RESPONSIVE COLUMN WIDTHS
   * =====================================================
   */
  const columnWidths = {
    startDate: "19%",
    endDate: "18%",
    days: "11%",
    reason: "18%",
    status: "18%",
    action: "16%",
  };

  console.log("leaves inside a pop up___", leaves);

  return (
    <Dialog
      open={leaveModalOpen}
      onClose={() => setLeaveModalOpen(false)}
      maxWidth={false}
      style={{
        zIndex: 10000,
      }}
      PaperProps={{
        sx: {
          backgroundColor: "var(--color-surface, #fff)",
          color: "var(--color-text-primary, inherit)",
          borderRadius: "10px",

          width: {
            xs: "calc(100% - 24px)",
            sm: "60vw",
          },

          maxWidth: {
            xs: "calc(100% - 24px)",
            sm: "60vw",
          },

          height: {
            xs: "500px",
            sm: "520px",
          },

          maxHeight: "520px",

          display: "flex",
          flexDirection: "column",

          overflow: "hidden",
        },
      }}
    >
      {/* =====================================================
          MODAL HEADER
      ====================================================== */}
      <DialogTitle
        sx={{
          flexShrink: 0,
          pb: 1,
        }}
      >
        Applied Leaves
      </DialogTitle>

      {/* =====================================================
          MODAL CONTENT
      ====================================================== */}
      <DialogContent
        sx={{
          /*
           * Prevent horizontal scrolling
           */
          overflowX: "hidden",

          /*
           * Dialog itself does not vertically scroll.
           * Table body handles vertical scrolling.
           */
          overflowY: "hidden",

          minHeight: 0,

          flex: 1,

          /*
           * Important for responsive layout
           */
          width: "60vw",
          maxWidth: "70vw",

          boxSizing: "border-box",

          pt: 1,

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* =====================================================
            NO LEAVES
        ====================================================== */}
        {!leaves || leaves.length === 0 ? (
          <div
            style={{
              marginTop: "20px",
              color: "var(--color-text-primary)",
            }}
          >
            No Leaves Applied Yet
          </div>
        ) : (
          <div
            style={{
              marginTop: "10px",

              /*
               * Responsive width
               */
              width: "100%",
              maxWidth: "100%",

              minWidth: 0,

              display: "flex",
              flexDirection: "column",

              flex: 1,

              minHeight: 0,

              /*
               * Prevent child from creating
               * horizontal overflow
               */
              overflow: "hidden",
            }}
          >
            {/* =================================================
                TABLE PAPER
            ================================================== */}
            <Paper
              sx={{
                borderRadius: theme?.borderRadius?.large || "8px",

                boxShadow:
                  theme?.shadows?.medium || "0 2px 8px rgba(0,0,0,0.08)",

                color: "var(--color-text-primary, inherit)",

                border: "1px solid var(--color-border, rgba(0,0,0,0.08))",

                /*
                 * Responsive width
                 */
                width: "100%",
                maxWidth: "100%",

                /*
                 * Prevent horizontal overflow
                 */
                overflow: "hidden",

                boxSizing: "border-box",
              }}
            >
              {/* =================================================
                  TABLE HEADER
              ================================================== */}
              <TableContainer
                sx={{
                  width: "100%",
                  maxWidth: "100%",

                  /*
                   * NO horizontal scrolling
                   */
                  overflowX: "hidden",

                  overflowY: "hidden",

                  boxSizing: "border-box",
                }}
              >
                <Table
                  sx={{
                    /*
                     * Responsive table width
                     */
                    width: "100%",
                    minWidth: 0,

                    tableLayout: "fixed",

                    "& .MuiTableCell-root": {
                      color: "var(--color-text-primary, inherit)",

                      borderColor: "var(--color-border, rgba(0,0,0,0.08))",

                      /*
                       * Keep existing behavior
                       */
                      whiteSpace: "nowrap",

                      padding: "8px",

                      boxSizing: "border-box",

                      /*
                       * Prevent cell from expanding table
                       */
                      overflow: "hidden",
                    },
                  }}
                >
                  {/* =================================================
                      COLUMN WIDTHS
                  ================================================== */}
                  <colgroup>
                    <col
                      style={{
                        width: columnWidths.startDate,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.endDate,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.days,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.reason,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.status,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.action,
                      }}
                    />
                  </colgroup>

                  {/* =================================================
                      HEADER
                  ================================================== */}
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor:
                          "var(--color-primary-light, rgba(0,0,0,0.04))",

                        height: "40px",

                        "& .MuiTableCell-root": {
                          fontWeight: 600,
                        },
                      }}
                    >
                      <TableCell align="left">Start Date</TableCell>

                      <TableCell align="left">End Date</TableCell>

                      <TableCell align="center">Days</TableCell>

                      <TableCell align="center">Reason</TableCell>

                      <TableCell align="center">Status</TableCell>

                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>

              {/* =================================================
                  TABLE BODY
              ================================================== */}
              <TableContainer
                sx={{
                  width: "100%",
                  maxWidth: "100%",

                  /*
                   * Explicitly disable horizontal scrolling
                   */
                  overflowX: "hidden",

                  /*
                   * Show maximum 3 rows
                   */
                  height: `${Math.min(leaves.length, 3) * 48}px`,

                  /*
                   * Vertical scrolling only
                   */
                  overflowY: leaves.length > 3 ? "auto" : "hidden",

                  boxSizing: "border-box",

                  /*
                   * Vertical scrollbar
                   */
                  "&::-webkit-scrollbar": {
                    width: "7px",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--color-border, rgba(0,0,0,0.25))",

                    borderRadius: "10px",
                  },

                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                }}
              >
                <Table
                  sx={{
                    /*
                     * Responsive table
                     */
                    width: "100%",
                    minWidth: 0,

                    tableLayout: "fixed",

                    "& .MuiTableCell-root": {
                      color: "var(--color-text-primary, inherit)",

                      borderColor: "var(--color-border, rgba(0,0,0,0.08))",

                      whiteSpace: "nowrap",

                      padding: "8px",

                      height: "40px",

                      boxSizing: "border-box",

                      /*
                       * Prevent cell content from
                       * increasing table width
                       */
                      overflow: "hidden",
                    },
                  }}
                >
                  {/* =================================================
                      SAME COLUMN WIDTHS AS HEADER
                  ================================================== */}
                  <colgroup>
                    <col
                      style={{
                        width: columnWidths.startDate,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.endDate,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.days,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.reason,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.status,
                      }}
                    />

                    <col
                      style={{
                        width: columnWidths.action,
                      }}
                    />
                  </colgroup>

                  {/* =================================================
                      TABLE BODY
                  ================================================== */}
                  <TableBody>
                    {leaves.map((leave) => (
                      <TableRow
                        key={leave.id}
                        hover
                        sx={{
                          height: "40px",
                        }}
                      >
                        {/* =========================
                            START DATE
                        ========================== */}
                        <TableCell align="left">{leave.start || "-"}</TableCell>

                        {/* =========================
                            END DATE
                        ========================== */}
                        <TableCell align="left">{leave.end || "-"}</TableCell>

                        {/* =========================
                            DAYS
                        ========================== */}
                        <TableCell align="center">{leave.days || 0}</TableCell>

                        {/* =========================
                            REASON
                        ========================== */}
                        <TableCell align="center">
                          <Tooltip title={leave.reason || "No reason provided"}>
                            <AirlineSeatReclineExtraIcon
                              sx={{
                                display: "block",

                                margin: "0 auto",

                                fontSize: "20px",

                                color: "var(--color-text-secondary)",
                              }}
                            />
                          </Tooltip>
                        </TableCell>

                        {/* =========================
                            STATUS
                        ========================== */}
                        <TableCell align="center">
                          <span
                            style={{
                              display: "inline-flex",

                              alignItems: "center",

                              justifyContent: "center",

                              padding: "4px 10px",

                              borderRadius: "999px",

                              fontSize: "12px",

                              fontWeight: 600,

                              color: "var(--color-warning-text)",

                              backgroundColor: "var(--color-warning-bg)",

                              whiteSpace: "nowrap",

                              /*
                               * Prevent status from
                               * increasing table width
                               */
                              maxWidth: "100%",

                              overflow: "hidden",

                              textOverflow: "ellipsis",

                              boxSizing: "border-box",
                            }}
                          >
                            {leave.status || "Pending"}
                          </span>
                        </TableCell>

                        {/* =========================
                            EDIT ACTION
                        ========================== */}
                        <TableCell align="center">
                          <Tooltip title="Modify Leave">
                            <IconButton
                              onClick={() => handleEditClick(leave)}
                              size="small"
                              sx={{
                                color: "var(--color-primary)",

                                padding: "4px",

                                "&:hover": {
                                  backgroundColor: "var(--color-primary-light)",
                                },
                              }}
                            >
                              {leave?.status == "Pending" ||
                              leave?.status == "pending" ? (
                                <EditIcon fontSize="small" />
                              ) : leave?.status == "rejected" ||
                                leave?.status == "Rejected" ? (
                                <ClearIcon
                                  sx={{ color: "red" }}
                                  fontSize="small"
                                />
                              ) : (
                                <CheckIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        )}
      </DialogContent>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <DialogActions
        sx={{
          flexShrink: 0,

          pt: 1,

          padding: "8px 24px 16px",
        }}
      >
        <Button
          onClick={() => setLeaveModalOpen(false)}
          sx={{
            color: "var(--color-text-primary, inherit)",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
