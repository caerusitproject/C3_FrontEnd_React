import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../Components/ui/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import ApproveRejectModal from "./ApproveRejectModal";
// import { TablePagination } from "@mui/material";
import Pagination from "@mui/material/Pagination";

export default function LeaveReq() {
  const dispatch = useDispatch();
  const allPendingLeaveReq = useSelector(
    (state) => state.leaveManagement.allPendingLeaveReq,
  )?.filter((ele) => ele.status == "Pending");

  const totalPendingLeaves = useSelector(
    (state) => state.leaveManagement.totalPendingLeaves,
  );
  const totalPages = useSelector((state) => state.leaveManagement.totalPages);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(1);
  const [leaveRequest, setLeaveRequest] = useState(null);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(actions.fetchPendingAllLeaveRequest());
  }, []);

  const handleOpen = (item) => {
    let filteredLeaveRequest = allPendingLeaveReq.find(
      (ele) => ele.leaveRequestId == item?.leaveRequestId,
    );
    console.log("filter__", filteredLeaveRequest);
    setLeaveRequest(filteredLeaveRequest);
    setOpen(true);
  };

  console.log("open modal____", open);

  const data = [
    {
      id: 1,
      title: "Tanmay Kumar Sah Asset Request",
      issuedDate: "June 12, 2025",
    },
    {
      id: 2,
      title: "Santosh Kumar Sahoo Asset Request",
      issuedDate: "June 22, 2025",
    },
    {
      id: 3,
      title: "Sudeep Yadav Sah Asset Request",
      issuedDate: "June 20, 2025",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        bgcolor: theme.foundation.applicationBackground,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ color: theme.typography.bodyText }}
      >
        Leave Requests
      </Typography>

      {allPendingLeaveReq &&
        allPendingLeaveReq?.length > 0 &&
        allPendingLeaveReq?.map((item) => (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.foundation.surfaceBackground,
              border: `1px solid ${theme.foundation.primaryColor}20`,
              transition: ".25s",

              "&:hover": {
                boxShadow: `0 6px 18px ${theme.foundation.primaryColor}25`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  border: `1px solid ${theme.foundation.primaryColor}`,
                  color: theme.foundation.primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: theme.foundation.surfaceBackground,
                }}
              >
                <AssignmentOutlinedIcon fontSize="small" />
              </Box>

              <Box>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: theme.typography.bodyText,
                  }}
                >
                  {/* {item.requestedBy} */}
                  {item.employeeName}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color:
                      theme.themeId === "darkGreen" ? "#9CA3AF" : "#6B7280",
                  }}
                >
                  {/* Issued on {item.requestDate} */}
                  Issued on {item.appliedOn}
                </Typography>
              </Box>
            </Box>

            <Button
              // variant="contained"
              onClick={() => handleOpen(item)}
              sx={{
                minWidth: 90,
                borderRadius: 2,
                bgcolor: theme.foundation.applicationBackground,

                "&:hover": {
                  bgcolor: theme.foundation.applicationBackground,
                  opacity: 0.9,
                },
              }}
            >
              Open
            </Button>
          </Paper>
        ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.typography.helperText,
          }}
        >
          Total Records : {totalPendingLeaves}
        </Typography>

        <Pagination
          page={page}
          count={totalPages || 1}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme.typography.bodyText,
              borderColor: theme.foundation.borderColor,
            },

            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: theme.foundation.primaryColor,
              color: "#fff",

              "&:hover": {
                backgroundColor: theme.foundation.primaryHover,
              },
            },

            "& .MuiPaginationItem-root:hover": {
              backgroundColor: `${theme.foundation.primaryColor}15`,
            },
          }}
        />
      </Box>
      <ApproveRejectModal
        open={open}
        // request={selectedRequest}
        leaveRequest={leaveRequest}
        onClose={() => setOpen(false)}
        onProceed={(item) => {
          console.log(item);
          setOpen(false);
        }}
      />
    </Box>
  );
}
