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
import * as actions from "../../store/actions";

import { Button } from "../../Components/ui/Button/Button";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
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
      ),
    );

    dispatch(actions.fetchPendingAllLeaveRequest());
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
            md: 4,
          },

          overflow: "hidden",

          background: theme.foundation.applicationBackground,

          width: {
            xs: "calc(100% - 24px)",
            sm: "calc(100% - 48px)",
            md: "700px",
          },

          maxWidth: "700px",

          margin: {
            xs: "12px",
            sm: "24px",
          },
        },
      }}
    >
      {/* ==============================
          HEADER
      ============================== */}

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
          justifyContent: "space-between",
          alignItems: "center",

          color: theme.typography.bodyText,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,

            fontSize: {
              xs: "20px",
              sm: "22px",
              md: "24px",
            },

            color: theme.foundation.primaryColor,
          }}
        >
          Leave Request
        </Typography>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            ml: 1,
          }}
        >
          <CloseIcon
            sx={{
              color: theme.typography.bodyText,

              fontSize: {
                xs: 20,
                sm: 22,
                md: 24,
              },
            }}
          />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* ==============================
          BODY
      ============================== */}

      <DialogContent
        sx={{
          width: "100%",
          boxSizing: "border-box",

          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },

          py: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },

          overflowX: "hidden",
        }}
      >
        {/* ==============================
            EMPLOYEE + DURATION
        ============================== */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr",
            },

            gap: {
              xs: 3,
              sm: 4,
              md: 5,
            },
          }}
        >
          {/* ==============================
              LEFT SECTION
          ============================== */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                color: theme.typography.primaryColor,

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
                  xs: 17,
                  sm: 19,
                  md: 20,
                },

                fontWeight: 600,

                color: theme.typography.primaryColor,

                wordBreak: "break-word",
              }}
            >
              {leaveRequest?.employeeName || "-"}
            </Typography>

            <Box
              sx={{
                mt: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 11,
                    sm: 12,
                  },

                  color: theme.typography.primaryColor,

                  textTransform: "uppercase",

                  letterSpacing: 1,
                }}
              >
                Software Engineer
              </Typography>
            </Box>
          </Box>

          {/* ==============================
              RIGHT SECTION
          ============================== */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 12,
                },

                color: theme.typography.primaryColor,

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
                gap: 0.75,

                color: theme.typography.primaryColor,

                flexWrap: "wrap",

                wordBreak: "break-word",
              }}
            >
              <CalendarTodayIcon
                sx={{
                  fontSize: {
                    xs: 15,
                    sm: 16,
                  },

                  mt: "3px",

                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  fontSize: {
                    xs: 14,
                    sm: 16,
                    md: 17,
                  },

                  fontWeight: 600,

                  color: theme.typography.primaryColor,

                  lineHeight: 1.6,

                  wordBreak: "break-word",
                }}
              >
                {leaveRequest?.fromDate || "-"} - {leaveRequest?.toDate || "-"}{" "}
                ({leaveRequest?.totalDays || 0} days)
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ==============================
            JUSTIFICATION
        ============================== */}

        <Box
          sx={{
            mt: {
              xs: 3.5,
              sm: 4,
              md: 5,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 11,
                sm: 12,
              },

              color: theme.typography.primaryColor,

              textTransform: "uppercase",

              letterSpacing: 1,

              mb: {
                xs: 1.5,
                sm: 2,
              },
            }}
          >
            Justification
          </Typography>

          <Box
            sx={{
              pl: {
                xs: 1.5,
                sm: 2,
              },

              pr: {
                xs: 1,
                sm: 2,
              },

              borderLeft: {
                xs: `3px solid ${theme.foundation.primaryColor}`,
                sm: `4px solid ${theme.foundation.primaryColor}`,
              },

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
                  xs: 14,
                  sm: 15,
                  md: 16,
                },

                color: theme.typography.primaryColor,

                wordBreak: "break-word",
              }}
            >
              {leaveRequest?.reason || "Blank"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* ==============================
          FOOTER
      ============================== */}

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

      <RemarksDialogue
        open={remarksOpen}
        setRemarksOpen={setRemarksOpen}
        onClose={() => onClose()}
        leaveRequest={leaveRequest}
      />
    </Dialog>
  );
}
