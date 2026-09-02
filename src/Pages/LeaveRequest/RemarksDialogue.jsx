import React, { useState } from "react";
import "./style.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/slices/alertSlice";
import Button from "../../Components/ui/Button/Button";
import * as actions from "../../store/actions";

export default function ReasonDialoguePopup({
  open,
  onClose,
  leaveRequest,
  setRemarksOpen,
  handleConfirmRemarks,
  handleCancelRemarks,
}) {
  const dispatch = useDispatch();
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
          backgroundColor: "var(--color-surface, #fff)",
          color: "var(--color-text-primary, inherit)",
          borderRadius: "10px",
        },
      }}
    >
      {/* =========================
          TITLE
      ========================== */}
      <DialogTitle>
        {"Please provide a remark for your leave request rejection."}
      </DialogTitle>

      {/* =========================
          CONTENT
      ========================== */}
      <DialogContent>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
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
              color: "var(--color-text-primary, inherit)",

              backgroundColor: "var(--color-surface, #fff)",

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
              color: "var(--color-text-secondary, inherit)",
            },

            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--color-primary, #1976d2)",
            },

            "& .MuiFormHelperText-root": {
              color: "var(--color-error)",
            },
          }}
        />

        {/* =========================
            REMARKS TEXTFIELD
        ========================== */}
      </DialogContent>

      {/* =========================
          ACTIONS
      ========================== */}
      <DialogActions
        sx={{
          padding: "16px 24px",
        }}
      >
        {/* CANCEL */}
        <Button
          onClick={() => {
            setRemarks("");
            setRemarksOpen(false);
          }}
          sx={{
            color: "var(--color-text-primary, inherit)",
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

            dispatch(
              actions.ApprovalRejectAllPendingLeaveRequest(
                leaveRequest?.leaveRequestId,
                remarks,
                "reject",
              ),
            );

            dispatch(actions.fetchPendingAllLeaveRequest());
            setRemarks("");
            setRemarksOpen(false);
            onClose();
            // handleConfirmRemarks(remarks);
          }}
          disabled={!remarks.trim()}
          sx={{
            backgroundColor: "var(--color-primary, #1976d2)",

            color: "var(--color-primary-text, #fff)",

            "&:hover": {
              backgroundColor: "var(--color-primary, #1976d2)",
              opacity: 0.9,
            },

            "&.Mui-disabled": {
              backgroundColor: "var(--color-border, #ccc)",

              color: "var(--color-text-secondary, #777)",
            },
          }}
        >
          {"Apply"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
