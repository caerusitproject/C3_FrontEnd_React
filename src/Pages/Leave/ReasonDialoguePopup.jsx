import React, { useState } from "react";
import "./style.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  FormControl,
  MenuItem,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { showAlert } from "../../store/slices/alertSlice";

import Button from "../../Components/ui/Button/Button";

import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { useTheme } from "../../context/ThemeContext";

export default function ReasonDialoguePopup({
  reasonModalOpen,
  startDate,
  endDate,
  selectedDates,
  leaveReason,
  setLeaveReason,
  setReasonModalOpen,
  handleCancel,
  handleConfirm,
  editingLeaveId,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isEditing = Boolean(editingLeaveId);

  const [leaveType, setLeaveType] = useState("0");

  const validate = () => {
    if (leaveReason && leaveReason.length < 5) {
      dispatch(
        showAlert({
          type: "error",
          title: "Leave Reason has to be greater than 5",
        }),
      );

      return false;
    }

    return true;
  };

  return (
    <Dialog
      open={reasonModalOpen}
      onClose={() => {
        setReasonModalOpen(false);
      }}
      fullWidth
      maxWidth="sm"
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

          maxWidth: "600px",

          maxHeight: {
            xs: "calc(100vh - 32px)",
            sm: "90vh",
          },

          margin: {
            xs: "12px",
            sm: "24px",
          },

          display: "flex",
          flexDirection: "column",

          backgroundColor: "var(--color-surface, #977272)",
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

          backgroundColor: "var(--color-surface, #fff)",

          borderBottom: "1px solid var(--color-primary, rgba(0,0,0,0.12))",

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

              backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.04))",

              border: "1px solid var(--color-primary, rgba(0,0,0,0.12))",
            }}
          >
            <EventNoteRoundedIcon
              sx={{
                fontSize: {
                  xs: 21,
                  sm: 24,
                },

                color: theme?.typography?.bodyText || "inherit",
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
              {isEditing ? "Modify Leave Request" : "Leave Request"}
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
              {isEditing
                ? "Review your selected dates and update your leave request."
                : "Provide the details required to submit your leave request."}
            </Typography>
          </Box>
        </Box>

        {/* CLOSE BUTTON */}
        <IconButton
          onClick={() => {
            setReasonModalOpen(false);
          }}
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

            border: "1px solid var(--color-primary, rgba(0,0,0,0.12))",

            backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.04))",

            color: theme?.typography?.bodyText || "inherit",

            "&:hover": {
              backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.08))",
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

          backgroundColor: "var(--color-surface, #fff)",

          overflowY: "auto",

          overflowX: "hidden",

          minHeight: 0,

          "&::-webkit-scrollbar": {
            width: "6px",
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
          }}
        >
          {/* =================================================
              SECTION HEADING
          ================================================== */}
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

                letterSpacing: "0.08em",

                textTransform: "uppercase",

                color: theme?.typography?.bodyText || "inherit",

                mb: 0.5,
              }}
            >
              Leave Details
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
              {isEditing
                ? "Review the selected dates and update the leave reason."
                : "Review the selected dates and provide a reason for your leave."}
            </Typography>
          </Box>

          {/* =================================================
              SELECTED DATE DETAILS
          ================================================== */}
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },

              gap: {
                xs: 1,
                sm: 1.5,
              },

              mb: {
                xs: 2,
                sm: 2.5,
              },
            }}
          >
            {/* START DATE */}
            <Box
              sx={{
                p: {
                  xs: 1.5,
                  sm: 2,
                },

                borderRadius: 2,

                backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.03))",

                border: "1px solid var(--color-border, rgba(0,0,0,0.08))",

                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,

                  mb: 0.75,
                }}
              >
                <CalendarMonthRoundedIcon
                  sx={{
                    fontSize: 17,

                    color: theme?.typography?.bodyText || "inherit",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "11px",

                    fontWeight: 700,

                    textTransform: "uppercase",

                    letterSpacing: "0.04em",

                    color: theme?.typography?.bodyText || "text.secondary",
                  }}
                >
                  Start Date
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "14px",
                  },

                  fontWeight: 600,

                  color: theme?.typography?.bodyText || "inherit",

                  overflow: "hidden",

                  textOverflow: "ellipsis",

                  whiteSpace: "nowrap",
                }}
              >
                {startDate || "-"}
              </Typography>
            </Box>

            {/* END DATE */}
            <Box
              sx={{
                p: {
                  xs: 1.5,
                  sm: 2,
                },

                borderRadius: 2,

                backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.03))",

                border: "1px solid var(--color-border, rgba(0,0,0,0.08))",

                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,

                  mb: 0.75,
                }}
              >
                <CalendarMonthRoundedIcon
                  sx={{
                    fontSize: 17,

                    color: theme?.typography?.bodyText || "inherit",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "11px",

                    fontWeight: 700,

                    textTransform: "uppercase",

                    letterSpacing: "0.04em",

                    color: theme?.typography?.bodyText || "text.secondary",
                  }}
                >
                  End Date
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "14px",
                  },

                  fontWeight: 600,

                  color: theme?.typography?.bodyText || "inherit",

                  overflow: "hidden",

                  textOverflow: "ellipsis",

                  whiteSpace: "nowrap",
                }}
              >
                {endDate || "-"}
              </Typography>
            </Box>

            {/* DAYS */}
            <Box
              sx={{
                p: {
                  xs: 1.5,
                  sm: 2,
                },

                borderRadius: 2,

                backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.03))",

                border: "1px solid var(--color-border, rgba(0,0,0,0.08))",

                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,

                  mb: 0.75,
                }}
              >
                <CalendarMonthRoundedIcon
                  sx={{
                    fontSize: 17,

                    color: theme?.typography?.bodyText || "inherit",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "11px",

                    fontWeight: 700,

                    textTransform: "uppercase",

                    letterSpacing: "0.04em",

                    color: theme?.typography?.bodyText || "text.secondary",
                  }}
                >
                  Days
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "14px",
                  },

                  fontWeight: 600,

                  color: theme?.typography?.bodyText || "inherit",
                }}
              >
                {selectedDates?.length || 0}
              </Typography>
            </Box>
          </Box>

          {/* =================================================
              LEAVE TYPE
          ================================================== */}
          <Box
            sx={{
              mb: {
                xs: 2,
                sm: 2.5,
              },

              p: {
                xs: 1.5,
                sm: 2,
              },

              borderRadius: 2,

              backgroundColor: "var(--color-primary-light, rgba(0,0,0,0.03))",

              border: "1px solid var(--color-border, rgba(0,0,0,0.08))",
            }}
          >
            <Box
              sx={{
                display: "flex",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                alignItems: {
                  xs: "stretch",
                  sm: "center",
                },

                justifyContent: "space-between",

                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CategoryRoundedIcon
                  sx={{
                    fontSize: 20,

                    color: theme?.typography?.bodyText || "inherit",
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      fontSize: "13px",

                      fontWeight: 700,

                      color: theme?.typography?.bodyText || "inherit",
                    }}
                  >
                    Leave Type
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "11px",

                      color: theme?.typography?.bodyText || "text.secondary",
                    }}
                  >
                    Select the applicable leave type
                  </Typography>
                </Box>
              </Box>

              <FormControl
                size="small"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "220px",
                  },
                }}
              >
                <Select
                  size="small"
                  value={leaveType}
                  onChange={(e) => {
                    setLeaveType(e.target.value);
                  }}
                  sx={{
                    backgroundColor: "var(--color-surface, #fff)",

                    color: theme?.typography?.bodyText || "inherit",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-border, rgba(0,0,0,0.23))",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-primary, #1976d2)",
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-primary, #1976d2)",
                    },
                  }}
                >
                  <MenuItem value="0">Earned Leave</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* =================================================
              REASON SECTION
          ================================================== */}
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                fontWeight: 700,

                letterSpacing: "0.08em",

                textTransform: "uppercase",

                color: theme?.typography?.bodyText || "inherit",

                mb: 0.5,
              }}
            >
              Leave Reason
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                color: theme?.typography?.bodyText || "text.secondary",

                mb: 1.5,
              }}
            >
              Please provide a brief reason for your leave.
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Reason"
              placeholder="Enter reason for leave"
              value={leaveReason}
              onChange={(event) => {
                setLeaveReason(event.target.value);
              }}
              required
              autoFocus
              error={!leaveReason.trim()}
              helperText={!leaveReason.trim() ? "Reason is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: theme?.typography?.bodyText || "inherit",

                  backgroundColor: "var(--color-surface, #fff)",

                  borderRadius: 2,

                  "& fieldset": {
                    borderColor: "var(--color-border, rgba(0,0,0,0.23))",
                  },

                  "&:hover fieldset": {
                    borderColor: "var(--color-primary, #1976d2)",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-primary, #1976d2)",
                  },
                },

                "& .MuiInputLabel-root": {
                  color: theme?.typography?.bodyText || "text.secondary",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme?.typography?.bodyText || "text.secondary",
                },

                "& .MuiFormHelperText-root": {
                  color: theme?.typography?.bodyText || "text.secondary",
                },
              }}
            />
          </Box>
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

          backgroundColor: "var(--color-surface, #fff)",

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
        {/* CANCEL */}
        <Button
          onClick={() => {
            setReasonModalOpen(false);

            if (handleCancel) {
              handleCancel();
            }
          }}
          sx={{
            color: theme?.typography?.bodyText || "inherit",

            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Cancel
        </Button>

        {/* APPLY / UPDATE */}
        <Button
          onClick={() => {
            let validation = validate();

            if (!validation) {
              return;
            }

            handleConfirm();
          }}
          disabled={!leaveReason.trim()}
          sx={{
            backgroundColor: "var(--color-primary, #1976d2)",

            color: theme?.typography?.bodyText || "inherit",

            width: {
              xs: "100%",
              sm: "auto",
            },

            "&:hover": {
              backgroundColor: "var(--color-primary, #1976d2)",

              opacity: 0.9,
            },

            "&.Mui-disabled": {
              backgroundColor: "var(--color-border, #ccc)",

              color: theme?.typography?.bodyText || "inherit",
            },
          }}
        >
          {isEditing ? "Update" : "Apply"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
