import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import Button from "../../Components/ui/Button/Button";

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
  const isEditing = Boolean(editingLeaveId);

  return (
    <Dialog
      open={reasonModalOpen}
      onClose={() => {
        setReasonModalOpen(false);
      }}
      maxWidth="sm"
      fullWidth
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
        {isEditing ? "Modify Leave Request" : "Leave Request"}
      </DialogTitle>

      {/* =========================
          CONTENT
      ========================== */}
      <DialogContent>
        <DialogContentText
          sx={{
            color: "var(--color-text-secondary, inherit)",
            mb: 2,
          }}
        >
          {isEditing
            ? "Review your selected dates and update the reason for your leave request."
            : "Please provide a reason for your leave request."}
        </DialogContentText>

        {/* =========================
            SELECTED DATES
        ========================== */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {/* START DATE */}
          <div>
            <strong>Start Date</strong>

            <div
              style={{
                marginTop: "4px",
                color: "var(--color-text-secondary, inherit)",
              }}
            >
              {startDate || "-"}
            </div>
          </div>

          {/* END DATE */}
          <div>
            <strong>End Date</strong>

            <div
              style={{
                marginTop: "4px",
                color: "var(--color-text-secondary, inherit)",
              }}
            >
              {endDate || "-"}
            </div>
          </div>

          {/* DAYS */}
          <div>
            <strong>Days</strong>

            <div
              style={{
                marginTop: "4px",
                color: "var(--color-text-secondary, inherit)",
              }}
            >
              {selectedDates?.length || 0}
            </div>
          </div>
        </div>

        {/* =========================
            REASON
        ========================== */}
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
            setReasonModalOpen(false);

            if (handleCancel) {
              handleCancel();
            }
          }}
          sx={{
            color: "var(--color-text-primary, inherit)",
          }}
        >
          Cancel
        </Button>

        {/* APPLY / UPDATE */}
        <Button
          onClick={handleConfirm}
          disabled={!leaveReason.trim()}
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
          {isEditing ? "Update" : "Apply"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
