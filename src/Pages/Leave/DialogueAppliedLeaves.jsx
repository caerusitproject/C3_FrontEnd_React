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

  /*
   * Called when user clicks Edit.
   * Parent component should handle opening
   * the date selector.
   */
  handleEditLeave,

  /*
   * Kept for compatibility with your existing
   * component. You can remove this if it is no
   * longer used anywhere.
   */
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
   * COLUMN WIDTHS
   * =====================================================
   */
  const columnWidths = {
    startDate: "95px",
    endDate: "95px",
    days: "55px",
    reason: "105px",
    status: "100px",
    action: "75px",
  };

  /*
   * =====================================================
   * TOTAL TABLE WIDTH
   * =====================================================
   */
  const tableWidth = "525px";

  return (
    <Dialog
      open={leaveModalOpen}
      onClose={() => setLeaveModalOpen(false)}
      maxWidth={false}
      PaperProps={{
        sx: {
          backgroundColor: "var(--color-surface, #fff)",

          color: "var(--color-text-primary, inherit)",

          borderRadius: "10px",

          width: {
            xs: "calc(100% - 32px)",
            sm: "650px",
            md: "650px",
          },

          height: {
            xs: "500px",
            sm: "520px",
          },

          maxWidth: "650px",
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
          overflow: "hidden",

          minHeight: 0,

          flex: 1,

          width: {
            xs: "100%",
            sm: "590px",
          },

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

              width: "100%",

              minWidth: 0,

              display: "flex",
              flexDirection: "column",

              flex: 1,

              minHeight: 0,
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

                width: "100%",

                overflow: "hidden",
              }}
            >
              {/* =================================================
                  TABLE HEADER
              ================================================== */}
              <TableContainer
                sx={{
                  width: "100%",

                  overflowX: "auto",

                  overflowY: "hidden",

                  "&::-webkit-scrollbar": {
                    height: 0,
                  },
                }}
              >
                <Table
                  sx={{
                    width: tableWidth,

                    minWidth: tableWidth,

                    tableLayout: "fixed",

                    "& .MuiTableCell-root": {
                      color: "var(--color-text-primary, inherit)",

                      borderColor: "var(--color-border, rgba(0,0,0,0.08))",

                      whiteSpace: "nowrap",

                      padding: "8px",

                      boxSizing: "border-box",
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

                  overflowX: "auto",

                  /*
                   * Show maximum 2 rows.
                   */
                  height: `${Math.min(leaves.length, 2) * 42}px`,

                  /*
                   * Enable vertical scrolling
                   * only when there are more than 2 rows.
                   */
                  overflowY: leaves.length > 2 ? "auto" : "hidden",

                  "&::-webkit-scrollbar": {
                    width: "7px",
                    height: "7px",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--color-border, rgba(0,0,0,0.25))",

                    borderRadius: "10px",
                  },
                }}
              >
                <Table
                  sx={{
                    width: tableWidth,

                    minWidth: tableWidth,

                    tableLayout: "fixed",

                    "& .MuiTableCell-root": {
                      color: "var(--color-text-primary, inherit)",

                      borderColor: "var(--color-border, rgba(0,0,0,0.08))",

                      whiteSpace: "nowrap",

                      padding: "8px",

                      height: "40px",

                      boxSizing: "border-box",
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
