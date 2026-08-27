import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CloseIcon from "@mui/icons-material/Close";

import { Input } from "../../Components/ui/Input/Input";
import { Button } from "../../Components/ui/Button/Button";
import { useTheme } from "../../context/ThemeContext";

import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { showAlert } from "../../store/slices/alertSlice";

const statusOptions = [
  { value: "Y", label: "Y" },
  { value: "N", label: "N" },
  { value: "Archive", label: "Archive" },
];

export default function AddProject({
  selectedProjectObj,
  setSelectedProjectObj,
  isOpen,
  onClose,
  editMode,
  setEditMode,
  setPagination,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    projectDescription: "",
    projectStatus: "",
  });

  useEffect(() => {
    if (selectedProjectObj) {
      setFormData({
        projectName: selectedProjectObj.projectName || "",
        projectCode: selectedProjectObj.projectCode || "",
        projectDescription: selectedProjectObj.projectDescription || "",
        projectStatus: selectedProjectObj.projectStatus?.code || "",
      });
    }
  }, [selectedProjectObj]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => {
    setFormData({
      projectName: "",
      projectCode: "",
      projectDescription: "",
      projectStatus: "",
    });

    setSelectedProjectObj(null);
    setEditMode(false);
  };

  const validate = () => {
    if (!formData.projectName.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter project name",
        }),
      );
      return false;
    }

    if (!formData.projectCode.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter project code",
        }),
      );
      return false;
    }

    if (editMode && !formData.projectStatus) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select project status",
        }),
      );
      return false;
    }

    return true;
  };

  const onSave = () => {
    if (!validate()) return;

    const obj = {
      projectName: formData.projectName,
      projectCode: formData.projectCode,
      projectDescription: formData.projectDescription,
    };

    if (editMode) {
      dispatch(
        actions.updateProject(
          {
            ...obj,
            projectStatus: formData.projectStatus,
          },
          setPagination,
        ),
      );
    } else {
      dispatch(actions.addProject(obj, setPagination));
    }

    reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}

      <DialogTitle
        sx={{
          px: 3,
          py: 3,
          borderBottom: "1px solid #ececec",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.foundation.applicationBackground,
        }}
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "12px",
              background: theme.foundation.surfaceBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <FolderRoundedIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {editMode ? "Update Project" : "Create Project"}
            </Typography>

            <Typography
              sx={{
                color: "#777",
                fontSize: 13,
              }}
            >
              Fill in the project information below
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={() => {
            reset();
            onClose();
          }}
          sx={{
            bgcolor: theme.foundation.surfaceBackground,
            border: `1px solid ${theme.foundation.primaryColor}`,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Body */}

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 3,
            display: "grid",
            rowGap: 3,
          }}
        >
          <Input
            label="PROJECT NAME"
            fullWidth
            size="sm"
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
          />

          <Input
            label="PROJECT CODE"
            fullWidth
            size="sm"
            disabled={editMode}
            value={formData.projectCode}
            onChange={(e) => handleChange("projectCode", e.target.value)}
          />

          <Input
            label="PROJECT DESCRIPTION"
            fullWidth
            multiline
            rows={5}
            value={formData.projectDescription}
            onChange={(e) => handleChange("projectDescription", e.target.value)}
          />

          {editMode && (
            <FormControl fullWidth size="small">
              <InputLabel>PROJECT STATUS</InputLabel>

              <Select
                value={formData.projectStatus}
                label="PROJECT STATUS"
                onChange={(e) => handleChange("projectStatus", e.target.value)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>

      {/* Footer */}

      <DialogActions
        sx={{
          px: 3,
          py: 3,
          borderTop: "1px solid #ececec",
          gap: 2,
        }}
      >
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>

        <Button onClick={onSave}>
          {editMode ? "Update" : "Create"} Project
        </Button>
      </DialogActions>
    </Dialog>
  );
}
