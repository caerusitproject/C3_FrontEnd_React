import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import * as actions from "../../store/actions";

import { Button } from "../../Components/ui/Button/Button";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
  const totalDays = useSelector((state) => state.leaveManagement.totalDays);

  // if (!request) return null;

  console.log("inside modal dialogue____", open);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          background: theme.foundation.applicationBackground,
        },
      }}
    >
      {/* Header */}

      <DialogTitle
        sx={{
          p: 3,
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
            color: theme.foundation.primaryColor,
          }}
        >
          Leave Request
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon
            sx={{
              color: theme.typography.bodyText,
            }}
          />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Body */}

      <DialogContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* Left */}

          <Box>
            <Typography
              sx={{
                fontSize: 12,
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
                fontSize: 20,
                fontWeight: 600,
                color: theme.typography.primaryColor,
              }}
            >
              {leaveRequest?.employeeName}
              {/* {"Tanmay Kumar"} */}
            </Typography>

            <Box mt={5}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: theme.typography.primaryColor,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  mb: 1,
                }}
              >
                {/* Asset Details */}
                {"Software Engineer"}
              </Typography>

              {/* <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: theme.typography.primaryColor,
                }}
              >
                {"Requested Name"}
                
              </Typography> */}
            </Box>
          </Box>

          {/* Right */}

          <Box>
            <Typography
              sx={{
                fontSize: 12,
                color: theme.typography.primaryColor,
                textTransform: "uppercase",
                letterSpacing: 1,
                mb: 1,
              }}
            >
              Duration
            </Typography>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: theme.typography.primaryColor,
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: 16 }} />{" "}
                {leaveRequest?.fromDate} - {leaveRequest?.toDate}{" "}
                {`(${leaveRequest?.totalDays})`}
              </Typography>

              {/* <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: theme.typography.primaryColor,
                }}
              >
                {"2027-05-15"} {totalDays || 0}
              </Typography> */}
            </div>
            {/* 
            <Box mt={5}>
              <Chip
                icon={<CheckCircleOutlineRoundedIcon />}
                label={"New Request"}
                sx={{
                  fontWeight: 600,
                  borderRadius: 10,
                  bgcolor: `${theme.foundation.primaryColor}20`,
                  color: theme.foundation.primaryColor,

                  "& .MuiChip-icon": {
                    color: theme.foundation.primaryColor,
                  },
                }}
              />
            </Box> */}
          </Box>
        </Box>

        {/* Justification */}

        <Box mt={5}>
          <Typography
            sx={{
              fontSize: 12,
              color: theme.typography.primaryColor,
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 2,
            }}
          >
            Justification
          </Typography>

          <Box
            sx={{
              pl: 2,
              borderLeft: `4px solid ${theme.foundation.primaryColor}`,
            }}
          >
            <Typography
              sx={{
                lineHeight: 1.8,
                color: theme.typography.primaryColor,
              }}
            >
              {/* {assetRequestByIdAll?.justification} */}
              {leaveRequest?.reason || "Blank"}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Footer */}

      <DialogActions
        sx={{
          p: 3,
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => {
            let obj = {};
            dispatch(
              actions.ApprovalRejectAllPendingLeaveRequest(
                leaveRequest?.leaveRequestId,
                "reject",
              ),
            );
            dispatch(actions.fetchPendingAllLeaveRequest());
            onClose();
          }}
        >
          Reject
        </Button>

        <Button
          onClick={() => {
            let obj = {};
            dispatch(
              actions.ApprovalRejectAllPendingLeaveRequest(
                leaveRequest?.leaveRequestId,
                "approve",
              ),
            );
            dispatch(actions.fetchPendingAllLeaveRequest());
            onClose();
          }}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
}
