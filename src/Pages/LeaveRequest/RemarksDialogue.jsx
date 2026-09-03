import React, { useState } from "react";
import "./style.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import { Input } from "../../Components/ui/Input/Input";
import CloseIcon from "@mui/icons-material/Close";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";

import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../store/slices/alertSlice";
import Button from "../../Components/ui/Button/Button";
import * as actions from "../../store/actions";
import { useTheme } from "../../context/ThemeContext";

export default function ReasonDialoguePopup({
  open,
  onClose,
  leaveRequest,
  setRemarksOpen,
  handleConfirmRemarks,
  handleCancelRemarks,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const pageIndex = useSelector((state) => state.leaveManagement.pageIndex);

  const pageSize = useSelector((state) => state.leaveManagement.pageSize);

  const [remarks, setRemarks] = useState("");

  console.log("leave request for remarks___", leaveRequest);

  const validate = () => {
    if (remarks && remarks.length < 5) {
      dispatch(
        showAlert({
          type: "error",
          title: "Remarks has to be greater than 5",
        }),
      );

      return false;
    }

    return true;
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setRemarksOpen(false);
      }}
      maxWidth="sm"
      fullWidth
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

          maxWidth: "600px",

          margin: {
            xs: "12px",
            sm: "24px",
          },

          backgroundColor: theme.foundation.applicationBackground,

          color: theme.typography.primaryColor,
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
            <RateReviewRoundedIcon
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

                color: theme.typography.primaryColor,

                lineHeight: 1.3,

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Rejection Remarks
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
              Please provide a reason for rejecting this leave request
            </Typography>
          </Box>
        </Box>

        {/* Close Button */}

        <IconButton
          onClick={() => {
            setRemarksOpen(false);
          }}
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
          {/* Section Heading */}

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
              Remarks
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },

                color: theme.typography.bodyText,

                lineHeight: 1.5,
              }}
            >
              Enter the reason that will be shared with the employee.
            </Typography>
          </Box>

          {/* Remarks Field */}

          <Box
            sx={{
              width: "100%",

              p: {
                xs: 1.5,
                sm: 2,
              },

              borderRadius: 2,

              backgroundColor: theme.foundation.surfaceBackground,

              border: `1px solid ${theme.foundation.primaryColor}`,

              boxSizing: "border-box",
            }}
          >
            <Input
              fullWidth
              multiline
              minRows={4}
              maxRows={7}
              label="Remarks"
              placeholder="Enter remarks for rejected leave"
              value={remarks}
              onChange={(event) => {
                setRemarks(event.target.value);
              }}
              required
              autoFocus
              error={!remarks.trim()}
              helperText={!remarks.trim() ? "Remarks is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: theme.typography.primaryColor,

                  backgroundColor: theme.foundation.applicationBackground,

                  borderRadius: 1.5,

                  "& fieldset": {
                    borderColor: theme.foundation.primaryColor,
                  },

                  "&:hover fieldset": {
                    borderColor: theme.foundation.primaryColor,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: theme.foundation.primaryColor,
                  },
                },

                "& .MuiInputLabel-root": {
                  color: theme.typography.bodyText,
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.foundation.primaryColor,
                },

                "& .MuiFormHelperText-root": {
                  marginLeft: 0,

                  color: "var(--color-error)",
                },

                "& textarea": {
                  lineHeight: 1.6,
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
        {/* CANCEL */}

        <Button
          onClick={() => {
            setRemarks("");
            setRemarksOpen(false);
          }}
          variant="secondary"
        >
          Cancel
        </Button>

        {/* APPLY */}

        <Button
          onClick={() => {
            let validation = validate();

            if (!validation) {
              return;
            }

            dispatch(
              actions.ApprovalRejectAllPendingLeaveRequest(
                leaveRequest?.leaveRequestId,
                remarks,
                "reject",
                pageIndex,
                pageSize,
              ),
            );

            dispatch(actions.fetchPendingAllLeaveRequest());

            setRemarks("");
            setRemarksOpen(false);
            onClose();

            // handleConfirmRemarks(remarks);
          }}
          disabled={!remarks.trim()}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
