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
  Box,
  Typography,
  Divider,
} from "@mui/material";

import Button from "../../Components/ui/Button/Button";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import ClearIcon from "@mui/icons-material/Clear";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
  /* =====================================================
     EDIT LEAVE
  ====================================================== */
  const handleEditClick = (leave) => {
    if (handleEditLeave) {
      handleEditLeave(leave);
    }
  };

  /* =====================================================
     COLUMN WIDTHS
  ====================================================== */
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
      fullWidth
      maxWidth="md"
      sx={{
        zIndex: 10000,
      }}
      PaperProps={{
        sx: {
          borderRadius: {
            xs: 2,
            sm: 3,
          },

          overflow: "hidden",

          width: {
            xs: "calc(100% - 24px)",
            sm: "calc(100% - 48px)",
            md: "100%",
          },

          maxWidth: "820px",

          height: {
            xs: "calc(100vh - 48px)",
            sm: "560px",
          },

          maxHeight: {
            xs: "calc(100vh - 48px)",
            sm: "560px",
          },

          margin: {
            xs: "12px",
            sm: "24px",
          },

          display: "flex",
          flexDirection: "column",

          backgroundColor: theme?.foundation?.applicationBackground || "#fff",
        },
      }}
    >
      {/* =====================================================
          MODAL HEADER
      ====================================================== */}
      <DialogTitle
        sx={{
          flexShrink: 0,

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          py: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },

          backgroundColor: theme?.foundation?.applicationBackground || "#fff",

          borderBottom: `1px solid ${
            theme?.foundation?.primaryColor || "rgba(0,0,0,0.12)"
          }`,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          gap: 2,
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 1.25,
              sm: 1.5,
            },

            minWidth: 0,
          }}
        >
          {/* HEADER ICON */}
          <Box
            sx={{
              width: {
                xs: 40,
                sm: 46,
              },

              height: {
                xs: 40,
                sm: 46,
              },

              flexShrink: 0,

              borderRadius: 2,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              backgroundColor:
                theme?.foundation?.surfaceBackground || "rgba(0,0,0,0.04)",

              border: `1px solid ${
                theme?.foundation?.primaryColor || "rgba(0,0,0,0.12)"
              }`,
            }}
          >
            <EventNoteRoundedIcon
              sx={{
                fontSize: {
                  xs: 21,
                  sm: 24,
                },

                color: theme?.foundation?.primaryColor || "inherit",
              }}
            />
          </Box>

          {/* TITLE */}
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "17px",
                  sm: "19px",
                  md: "20px",
                },

                fontWeight: 700,

                lineHeight: 1.2,

                color: theme?.typography?.bodyText || "inherit",

                whiteSpace: "nowrap",

                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              Applied Leaves
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                color: theme?.typography?.bodyText || "text.secondary",

                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              View and manage your applied leave requests
            </Typography>
          </Box>
        </Box>

        {/* CLOSE BUTTON */}
        <IconButton
          onClick={() => setLeaveModalOpen(false)}
          size="small"
          sx={{
            width: {
              xs: 34,
              sm: 38,
            },

            height: {
              xs: 34,
              sm: 38,
            },

            flexShrink: 0,

            borderRadius: 1.5,

            border: `1px solid ${
              theme?.foundation?.primaryColor || "rgba(0,0,0,0.12)"
            }`,

            backgroundColor:
              theme?.foundation?.surfaceBackground || "rgba(0,0,0,0.04)",

            color: theme?.typography?.bodyText || "inherit",

            "&:hover": {
              backgroundColor:
                theme?.foundation?.surfaceBackground || "rgba(0,0,0,0.08)",
            },
          }}
        >
          <CloseRoundedIcon
            sx={{
              fontSize: {
                xs: 19,
                sm: 21,
              },
            }}
          />
        </IconButton>
      </DialogTitle>

      {/* =====================================================
          MODAL CONTENT
      ====================================================== */}
      <DialogContent
        sx={{
          p: 0,

          backgroundColor: theme?.foundation?.applicationBackground || "#fff",

          overflowX: "hidden",

          overflowY: "hidden",

          minHeight: 0,

          flex: 1,

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* CONTENT WRAPPER */}
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },

            minHeight: 0,

            flex: 1,

            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* =====================================================
              SECTION HEADING
          ====================================================== */}
          <Box
            sx={{
              mb: {
                xs: 1.5,
                sm: 2,
              },

              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                fontWeight: 700,

                letterSpacing: "0.08em",

                textTransform: "uppercase",

                color: theme?.foundation?.primaryColor || "inherit",

                mb: 0.5,
              }}
            >
              Leave Requests
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                color: theme?.typography?.bodyText || "text.secondary",
              }}
            >
              Review your submitted leave requests and their current status.
            </Typography>
          </Box>

          {/* =====================================================
              NO LEAVES
          ====================================================== */}
          {!leaves || leaves.length === 0 ? (
            <Box
              sx={{
                flex: 1,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                minHeight: 180,

                borderRadius: 2,

                backgroundColor:
                  theme?.foundation?.surfaceBackground || "rgba(0,0,0,0.02)",

                border: `1px solid ${
                  theme?.foundation?.primaryColor || "rgba(0,0,0,0.08)"
                }`,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "14px",
                  },

                  color: theme?.typography?.bodyText || "text.secondary",

                  textAlign: "center",
                }}
              >
                No Leaves Applied Yet
              </Typography>
            </Box>
          ) : (
            /* =====================================================
                TABLE SECTION
            ====================================================== */
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,

                backgroundColor: theme?.foundation?.surfaceBackground || "#fff",

                border: `1px solid ${
                  theme?.foundation?.primaryColor || "rgba(0,0,0,0.08)"
                }`,

                overflow: "hidden",

                width: "100%",

                minWidth: 0,

                flex: 1,

                minHeight: 0,

                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* =================================================
                  TABLE HEADER
              ================================================== */}
              <TableContainer
                sx={{
                  width: "100%",

                  overflowX: "hidden",

                  overflowY: "hidden",

                  flexShrink: 0,
                }}
              >
                <Table
                  sx={{
                    width: "100%",

                    minWidth: 0,

                    tableLayout: "fixed",

                    "& .MuiTableCell-root": {
                      color: theme?.typography?.primaryColor || "inherit",

                      borderColor:
                        theme?.foundation?.primaryColor || "rgba(0,0,0,0.08)",

                      whiteSpace: "nowrap",

                      padding: {
                        xs: "7px 5px",
                        sm: "8px",
                      },

                      boxSizing: "border-box",

                      overflow: "hidden",

                      fontSize: {
                        xs: "11px",
                        sm: "12px",
                        md: "13px",
                      },
                    },
                  }}
                >
                  <colgroup>
                    <col style={{ width: columnWidths.startDate }} />
                    <col style={{ width: columnWidths.endDate }} />
                    <col style={{ width: columnWidths.days }} />
                    <col style={{ width: columnWidths.reason }} />
                    <col style={{ width: columnWidths.status }} />
                    <col style={{ width: columnWidths.action }} />
                  </colgroup>

                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor:
                          theme?.foundation?.applicationBackground ||
                          "rgba(0,0,0,0.04)",

                        height: {
                          xs: "42px",
                          sm: "44px",
                        },

                        "& .MuiTableCell-root": {
                          fontWeight: 700,

                          color: theme?.typography?.bodyText || "inherit",
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

                  minWidth: 0,

                  overflowX: "hidden",

                  overflowY: leaves.length > 3 ? "auto" : "hidden",

                  flex: 1,

                  minHeight: 0,

                  boxSizing: "border-box",

                  "&::-webkit-scrollbar": {
                    width: "7px",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor:
                      theme?.foundation?.primaryColor || "rgba(0,0,0,0.25)",

                    borderRadius: "10px",
                  },

                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                }}
              >
                <Table
                  sx={{
                    width: "100%",

                    minWidth: 0,

                    tableLayout: "fixed",

                    "& .MuiTableCell-root": {
                      color: theme?.typography?.bodyText || "inherit",

                      borderColor:
                        theme?.foundation?.primaryColor || "rgba(0,0,0,0.08)",

                      whiteSpace: "nowrap",

                      padding: {
                        xs: "7px 5px",
                        sm: "8px",
                      },

                      height: {
                        xs: "42px",
                        sm: "44px",
                      },

                      boxSizing: "border-box",

                      overflow: "hidden",

                      fontSize: {
                        xs: "11px",
                        sm: "12px",
                        md: "13px",
                      },
                    },
                  }}
                >
                  <colgroup>
                    <col style={{ width: columnWidths.startDate }} />
                    <col style={{ width: columnWidths.endDate }} />
                    <col style={{ width: columnWidths.days }} />
                    <col style={{ width: columnWidths.reason }} />
                    <col style={{ width: columnWidths.status }} />
                    <col style={{ width: columnWidths.action }} />
                  </colgroup>

                  <TableBody>
                    {leaves.map((leave) => (
                      <TableRow
                        key={leave.id}
                        hover
                        sx={{
                          height: {
                            xs: "42px",
                            sm: "44px",
                          },

                          "&:last-child td": {
                            borderBottom: 0,
                          },
                        }}
                      >
                        {/* START DATE */}
                        <TableCell align="left">{leave.start || "-"}</TableCell>

                        {/* END DATE */}
                        <TableCell align="left">{leave.end || "-"}</TableCell>

                        {/* DAYS */}
                        <TableCell align="center">{leave.days || 0}</TableCell>

                        {/* REASON */}
                        <TableCell align="center">
                          <Tooltip
                            title={leave?.message || "No reason provided"}
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 10001,
                                },
                              },
                            }}
                          >
                            <IconButton
                              size="small"
                              sx={{
                                width: 30,
                                height: 30,

                                color:
                                  theme?.foundation?.primaryColor || "inherit",

                                "&:hover": {
                                  backgroundColor:
                                    theme?.foundation?.applicationBackground ||
                                    "rgba(0,0,0,0.05)",
                                },
                              }}
                            >
                              <AirlineSeatReclineExtraIcon
                                sx={{
                                  fontSize: 19,
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>

                        {/* STATUS */}
                        <TableCell align="center">
                          <Box
                            component="span"
                            sx={{
                              display: "inline-flex",

                              alignItems: "center",

                              justifyContent: "center",

                              padding: {
                                xs: "3px 7px",
                                sm: "4px 10px",
                              },

                              borderRadius: "999px",

                              fontSize: {
                                xs: "10px",
                                sm: "11px",
                                md: "12px",
                              },

                              fontWeight: 600,

                              color: theme?.typography?.bodyText || "inherit",

                              backgroundColor:
                                theme?.foundation?.applicationBackground ||
                                "rgba(0,0,0,0.04)",

                              border: `1px solid ${
                                theme?.foundation?.primaryColor ||
                                "rgba(0,0,0,0.12)"
                              }`,

                              whiteSpace: "nowrap",

                              maxWidth: "100%",

                              overflow: "hidden",

                              textOverflow: "ellipsis",

                              boxSizing: "border-box",
                            }}
                          >
                            {leave.status || "Pending"}
                          </Box>
                        </TableCell>

                        {/* ACTION */}
                        <TableCell align="center">
                          <Tooltip title="Modify Leave">
                            <IconButton
                              onClick={() => handleEditClick(leave)}
                              size="small"
                              sx={{
                                width: 30,
                                height: 30,

                                color:
                                  theme?.foundation?.primaryColor || "inherit",

                                "&:hover": {
                                  backgroundColor:
                                    theme?.foundation?.applicationBackground ||
                                    "rgba(0,0,0,0.05)",
                                },
                              }}
                            >
                              {leave?.status === "Pending" ||
                              leave?.status === "pending" ? (
                                <EditIcon fontSize="small" />
                              ) : leave?.status === "rejected" ||
                                leave?.status === "Rejected" ? (
                                <ClearIcon
                                  sx={{
                                    color: "red",
                                  }}
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
          )}
        </Box>
      </DialogContent>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <Divider />

      <DialogActions
        sx={{
          flexShrink: 0,

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          py: {
            xs: 1.5,
            sm: 2,
          },

          backgroundColor: theme?.foundation?.applicationBackground || "#fff",

          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },

          gap: {
            xs: 1,
            sm: 1.5,
          },
        }}
      >
        <Button
          onClick={() => setLeaveModalOpen(false)}
          sx={{
            color: theme?.typography?.primaryColor || "inherit",

            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
