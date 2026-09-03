import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Input } from "../../Components/ui/Input/Input";
import { Button } from "../../Components/ui/Button/Button";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { showAlert } from "../../store/slices/alertSlice";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

const AddorEditholiday = ({
  holidayId,
  open,
  onClose,
  setPagination,
  editMode,
  holidayObj,
  setEditMode,
  setSetholidayObj,
  // setAssetID,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const holidayCategoryList = useSelector(
    (state) => state.holiday?.holidayCategoryList,
  );
  const paginationIndex = useSelector(
    (state) => state.holiday?.paginationIndex,
  );
  const paginationSize = useSelector((state) => state.holiday?.paginationSize);

  const [formData, setFormData] = useState({
    holidayName: "",
    holidayDate: "",
    holidayTypeCode: "",
  });

  React.useEffect(() => {
    if (holidayObj) {
      console.log("holiday per obj___", holidayObj);
      setFormData({
        holidayName: holidayObj?.holidayName || "",
        holidayDate: holidayObj.holidayDate || "",
        holidayTypeCode: holidayObj.holidayTypeCode || "",
      });
    }
  }, [holidayObj]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log("editMode___", editMode);

  const reset = () => {
    setFormData({
      ...formData,
      holidayName: "",
      holidayDate: "",
      holidayTypeCode: "",
    });

    setEditMode(false);

    setSetholidayObj(null); // or setSelectedAssetObj(null)

    // If you have an asset ID state
    // setAssetID(null);
  };

  const validate = () => {
    if (!formData.holidayName.trim() && !editMode) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Holiday Name",
        }),
      );
      return false;
    }

    if (!formData.holidayDate.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Holiday Date",
        }),
      );
      return false;
    }

    if (!formData.holidayTypeCode.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Holiday Type",
        }),
      );
      return false;
    }
    return true;
  };

  const onSave = () => {
    if (!validate()) return;
    const obj = {
      holidayName: formData.holidayName,
      holidayDate: formData.holidayDate,
      holidayTypeCode: formData.holidayTypeCode,
    };

    if (editMode) {
      console.log("update asset id ______", holidayId, obj);
      dispatch(
        actions.updateHolidayList(
          holidayId,
          setPagination,
          {
            ...obj,
            activeStatusCode: "ACTIVE",
          },
          paginationIndex,
          paginationSize,
        ),
      );
    } else {
      dispatch(
        actions.createHolidayList(
          obj,
          setPagination,
          paginationIndex,
          paginationSize,
        ),
      );
    }
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      {/* Header - 24px top & bottom */}
      <DialogTitle
        sx={{
          px: 3,
          py: 3,
          borderBottom: `1px solid ${theme.foundation.primaryColor}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.foundation.applicationBackground,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "12px",
              background: theme.foundation.surfaceBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.typography.bodyText,
            }}
          >
            <Inventory2RoundedIcon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: "18px", color: "#333" }}
            >
              Create Holiday
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#7d7d7d" }}>
              Fill in the holiday information below
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={() => {
            onClose();
            reset();
          }}
          sx={{
            bgcolor: theme.foundation.surfaceBackground,
            border: `1px solid ${theme.foundation.primaryColor}`,
            "&:hover": { bgcolor: theme.foundation.surfaceBackground },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ pt: 4, px: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              columnGap: 3,
              rowGap: 3,
            }}
          >
            <Input
              label="HOLIDAY NAME"
              size="sm"
              // disabled={editMode ? true : false}
              fullWidth
              value={formData.holidayName}
              onChange={(e) => handleChange("holidayName", e.target.value)}
            />
            <Input
              label="HOLIDAY DATE"
              type="date"
              size="sm"
              fullWidth
              value={formData.holidayDate}
              onChange={(e) => handleChange("holidayDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            {/* Fixed Order */}

            <FormControl fullWidth size="small">
              <InputLabel>HOLIDAY TYPE NAME</InputLabel>
              <Select
                value={formData.holidayTypeCode}
                label="HOLIDAY TYPE CODE"
                onChange={(e) =>
                  handleChange("holidayTypeCode", e.target.value)
                }
              >
                {holidayCategoryList && holidayCategoryList.length > 0 ? (
                  holidayCategoryList.map((item) => (
                    <MenuItem key={item.codeValueId} value={item.code}>
                      {item.code}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No holiday types available
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* 32px gap before footer */}
        <Box sx={{ pb: 4 }} />
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          px: 3,
          py: 3,
          borderTop: `1px solid ${theme.foundation.primaryColor}`,
          gap: 2,
        }}
      >
        <Button
          variant="secondary"
          onClick={() => {
            onClose();
            reset();
          }}
        >
          Cancel
        </Button>
        <Button onClick={onSave}>{editMode ? "Update" : "Save"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddorEditholiday;
