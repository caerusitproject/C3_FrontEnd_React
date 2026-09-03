import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

import * as actions from "../../store/actions";

import { Button } from "../../Components/ui/Button/Button";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import RemarksDialogue from "./RemarksDialogue";

export default function ApproveRejectModal({
  open,
  onClose,
  leaveRequest,
  onProceed,
  request,
  assetRequestByIdAll,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [remarksOpen, setRemarksOpen] = React.useState(false);

  const pageIndex = useSelector((state) => state.leaveManagement.pageIndex);

  const pageSize = useSelector((state) => state.leaveManagement.pageSize);

  const handleReject = () => {
    // onClose();
    setRemarksOpen(true);
  };

  const handleApprove = () => {
    dispatch(
      actions.ApprovalRejectAllPendingLeaveRequest(
        leaveRequest?.leaveRequestId,
        "",
        "approve",
        pageIndex,
        pageSize,
      ),
    );

    // dispatch(actions.fetchPendingAllLeaveRequest());
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      style={{
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

          maxWidth: "720px",

          margin: {
            xs: "12px",
            sm: "24px",
          },
        },
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <DialogTitle
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

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          backgroundColor: theme.foundation.applicationBackground,

          borderBottom: `1px solid ${theme.foundation.primaryColor}`,
        }}
      >
        {/* Header Left */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 1.5,
              sm: 2,
            },

            minWidth: 0,
          }}
        >
          {/* Icon */}

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

              borderRadius: {
                xs: "10px",
                sm: "12px",
              },

              backgroundColor: theme.foundation.surfaceBackground,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: theme.typography.bodyText,

              border: `1px solid ${theme.foundation.primaryColor}`,
            }}
          >
            <EventAvailableRoundedIcon
              sx={{
                fontSize: {
                  xs: 21,
                  sm: 24,
                },
              }}
            />
          </Box>

          {/* Header Text */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,

                fontSize: {
                  xs: "17px",
                  sm: "18px",
                  md: "20px",
                },

                color: theme.typography.bodyText,

                lineHeight: 1.3,

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Leave Request
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                color: theme.typography.bodyText,

                lineHeight: 1.4,

                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Review the leave request details below
            </Typography>
          </Box>
        </Box>

        {/* Close Button */}

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            ml: 2,

            flexShrink: 0,

            width: {
              xs: 34,
              sm: 38,
            },

            height: {
              xs: 34,
              sm: 38,
            },

            backgroundColor: theme.foundation.surfaceBackground,

            border: `1px solid ${theme.foundation.primaryColor}`,

            "&:hover": {
              backgroundColor: theme.foundation.surfaceBackground,
            },
          }}
        >
          <CloseIcon
            sx={{
              fontSize: {
                xs: 19,
                sm: 21,
              },

              color: theme.typography.bodyText,
            }}
          />
        </IconButton>
      </DialogTitle>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <DialogContent
        sx={{
          p: 0,

          backgroundColor: theme.foundation.applicationBackground,

          width: "100%",
          boxSizing: "border-box",

          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: {
              xs: 3,
              sm: 3.5,
              md: 4,
            },
          }}
        >
          {/* =================================================
              SECTION HEADING
          ================================================== */}

          <Box
            sx={{
              mb: {
                xs: 2.5,
                sm: 3,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                fontWeight: 700,

                letterSpacing: "0.8px",

                textTransform: "uppercase",

                color: theme.foundation.primaryColor,
              }}
            >
              Leave Details
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                color: theme.typography.bodyText,
              }}
            >
              Review the employee and leave duration information.
            </Typography>
          </Box>

          {/* =================================================
              EMPLOYEE + DURATION
          ================================================== */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },

              columnGap: {
                xs: 0,
                sm: 3,
              },

              rowGap: {
                xs: 3,
                sm: 3,
              },
            }}
          >
            {/* =================================================
                REQUESTED BY
            ================================================== */}

            <Box
              sx={{
                minWidth: 0,

                p: {
                  xs: 2,
                  sm: 2.5,
                },

                borderRadius: 2,

                backgroundColor: theme.foundation.surfaceBackground,

                border: `1px solid ${theme.foundation.primaryColor}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "11px",
                    sm: "12px",
                  },

                  color: theme.typography.bodyText,

                  textTransform: "uppercase",

                  letterSpacing: 1,

                  mb: 1,
                }}
              >
                Requested By
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "17px",
                    sm: "18px",
                    md: "19px",
                  },

                  fontWeight: 600,

                  color: theme.typography.bodyText,

                  wordBreak: "break-word",

                  lineHeight: 1.4,
                }}
              >
                {leaveRequest?.employeeName || "-"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.75,

                  fontSize: {
                    xs: "11px",
                    sm: "12px",
                  },

                  color: theme.typography.bodyText,

                  textTransform: "uppercase",

                  letterSpacing: 0.8,
                }}
              >
                Software Engineer
              </Typography>
            </Box>

            {/* =================================================
                DURATION
            ================================================== */}

            <Box
              sx={{
                minWidth: 0,

                p: {
                  xs: 2,
                  sm: 2.5,
                },

                borderRadius: 2,

                backgroundColor: theme.foundation.surfaceBackground,

                border: `1px solid ${theme.foundation.primaryColor}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "11px",
                    sm: "12px",
                  },

                  color: theme.typography.bodyText,

                  textTransform: "uppercase",

                  letterSpacing: 1,

                  mb: 1,
                }}
              >
                Duration
              </Typography>

              <Box
                sx={{
                  display: "flex",

                  alignItems: "flex-start",

                  gap: 1,

                  minWidth: 0,

                  color: theme.typography.primaryColor,
                }}
              >
                <CalendarTodayIcon
                  sx={{
                    fontSize: {
                      xs: 16,
                      sm: 18,
                    },

                    mt: "3px",

                    flexShrink: 0,

                    color: theme.foundation.primaryColor,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "15px",
                      md: "16px",
                    },

                    fontWeight: 600,

                    color: theme.typography.bodyText,

                    lineHeight: 1.6,

                    wordBreak: "break-word",
                  }}
                >
                  {leaveRequest?.fromDate || "-"} -{" "}
                  {leaveRequest?.toDate || "-"} ({leaveRequest?.totalDays || 0}{" "}
                  days)
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* =================================================
              JUSTIFICATION
          ================================================== */}

          <Box
            sx={{
              mt: {
                xs: 3.5,
                sm: 4,
              },
            }}
          >
            <Box
              sx={{
                mb: {
                  xs: 1.5,
                  sm: 2,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                  },

                  fontWeight: 700,

                  letterSpacing: "0.8px",

                  textTransform: "uppercase",

                  color: theme.foundation.primaryColor,
                }}
              >
                Justification
              </Typography>
            </Box>

            <Box
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },

                borderRadius: 2,

                backgroundColor: theme.foundation.surfaceBackground,

                borderLeft: {
                  xs: `3px solid ${theme.foundation.primaryColor}`,
                  sm: `4px solid ${theme.foundation.primaryColor}`,
                },

                borderTop: `1px solid ${theme.foundation.primaryColor}`,
                borderRight: `1px solid ${theme.foundation.primaryColor}`,
                borderBottom: `1px solid ${theme.foundation.primaryColor}`,

                maxWidth: "100%",

                overflowWrap: "break-word",
              }}
            >
              <Typography
                sx={{
                  lineHeight: {
                    xs: 1.6,
                    sm: 1.8,
                  },

                  fontSize: {
                    xs: "14px",
                    sm: "15px",
                    md: "16px",
                  },

                  color: theme.typography.bodyText,

                  wordBreak: "break-word",
                }}
              >
                {leaveRequest?.message || "Blank"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Divider />

      <DialogActions
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

          gap: {
            xs: 1.5,
            sm: 2,
          },

          backgroundColor: theme.foundation.applicationBackground,

          justifyContent: "flex-end",

          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },

          "& > *": {
            width: {
              xs: "100%",
              sm: "auto",
            },
          },
        }}
      >
        <Button variant="secondary" onClick={handleReject}>
          Reject
        </Button>

        <Button onClick={handleApprove}>Approve</Button>
      </DialogActions>

      {/* =====================================================
          REMARKS DIALOG
      ====================================================== */}

      <RemarksDialogue
        open={remarksOpen}
        setRemarksOpen={setRemarksOpen}
        onClose={() => onClose()}
        leaveRequest={leaveRequest}
      />
    </Dialog>
  );
}
