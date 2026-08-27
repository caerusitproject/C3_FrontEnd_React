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

const AddAssetManagement = ({
  assetID,
  open,
  onClose,
  setPagination,
  editMode,
  selectAssetObj,
  setEditMode,
  setSelectAssetObj,
  setAssetID,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    assetCode: "",
    assetName: "",
    serialNumber: "",
    categoryId: "",
    vendor: "",
    statusId: "",
    conditionId: "",
    remarks: "",
    purchaseDate: "",
    warrantyExpiry: "",
    amcExpiry: "",
    eolDate: "",
  });

  React.useEffect(() => {
    if (selectAssetObj) {
      setFormData({
        assetCode: selectAssetObj?.assetCode || "",
        assetName: selectAssetObj.assetName || "",
        serialNumber: selectAssetObj.serialNumber || "",
        categoryId: selectAssetObj.categoryCodeValueId || "",
        vendor: selectAssetObj.vendorName || "",
        statusId: selectAssetObj?.assetStatusCodeValueId || "",
        conditionId: selectAssetObj?.assetConditionCodeValueId || "",
        remarks: selectAssetObj.remarks || "",
        purchaseDate: selectAssetObj.purchaseDate || "",
        warrantyExpiry: selectAssetObj.warrantyExpiry || "",
        amcExpiry: selectAssetObj.amcExpiry || "",
        eolDate: selectAssetObj.eolDate || "",
      });
    }
  }, [selectAssetObj]);

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
      assetCode: "",
      assetName: "",
      serialNumber: "",
      categoryId: "",
      vendor: "",
      statusId: "",
      conditionId: "",
      remarks: "",
      purchaseDate: "",
      warrantyExpiry: "",
      amcExpiry: "",
      eolDate: "",
    });

    setEditMode(false);

    setSelectAssetObj(null); // or setSelectedAssetObj(null)

    // If you have an asset ID state
    setAssetID(null);
  };

  const validate = () => {
    if (!formData.assetCode.trim() && !editMode) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Asset Code",
        }),
      );
      return false;
    }

    if (!formData.assetName.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Asset Name",
        }),
      );
      return false;
    }

    if (!formData.serialNumber.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Serial Number",
        }),
      );
      return false;
    }

    if (!formData.categoryId) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select Category",
        }),
      );
      return false;
    }

    if (!formData.vendor.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Vendor",
        }),
      );
      return false;
    }

    if (!formData.statusId) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select Asset Status",
        }),
      );
      return false;
    }

    if (!formData.conditionId) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select Asset Condition",
        }),
      );
      return false;
    }

    if (!formData.purchaseDate) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select Purchase Date",
        }),
      );
      return false;
    }

    if (!formData.warrantyExpiry) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select Warranty Expiry",
        }),
      );
      return false;
    }

    if (!formData.amcExpiry) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select AMC Expiry",
        }),
      );
      return false;
    }

    if (!formData.eolDate) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select EOL Date",
        }),
      );
      return false;
    }

    if (!formData.remarks.trim()) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter Remarks",
        }),
      );
      return false;
    }

    return true;
  };

  const onSave = () => {
    if (!validate()) return;
    const obj = {
      assetName: formData.assetName,
      categoryCodeValueId: formData.categoryId,
      serialNumber: formData.serialNumber,
      vendorName: formData.vendor,
      purchaseDate: formData.purchaseDate,
      warrantyExpiry: formData.warrantyExpiry,
      amcExpiry: formData.amcExpiry,
      eolDate: formData.eolDate,
      assetStatusCodeValueId: formData.statusId,
      assetConditionCodeValueId: formData.conditionId,
      remarks: formData.remarks,
    };

    if (editMode) {
      console.log("update asset id ______", assetID, obj);
      dispatch(
        actions.updateAssetManagement(assetID, setPagination, {
          ...obj,
          activeFlag: "Y",
        }),
      );
    } else {
      dispatch(
        actions.addAssetManagement(
          { ...obj, assetCode: formData.assetCode },
          setPagination,
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
              Create Asset
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#7d7d7d" }}>
              Fill in the asset information below
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
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
              label="ASSET CODE"
              size="sm"
              disabled={editMode ? true : false}
              fullWidth
              value={formData.assetCode}
              onChange={(e) => handleChange("assetCode", e.target.value)}
            />
            <Input
              label="PURCHASE DATE"
              type="date"
              size="sm"
              fullWidth
              value={formData.purchaseDate}
              onChange={(e) => handleChange("purchaseDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Input
              label="ASSET NAME"
              size="sm"
              fullWidth
              value={formData.assetName}
              onChange={(e) => handleChange("assetName", e.target.value)}
            />
            <Input
              label="WARRANTY EXPIRY"
              type="date"
              size="sm"
              fullWidth
              value={formData.warrantyExpiry}
              onChange={(e) => handleChange("warrantyExpiry", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Input
              label="SERIAL NUMBER"
              size="sm"
              fullWidth
              value={formData.serialNumber}
              onChange={(e) => handleChange("serialNumber", e.target.value)}
            />
            <Input
              label="AMC EXPIRY"
              type="date"
              size="sm"
              fullWidth
              value={formData.amcExpiry}
              onChange={(e) => handleChange("amcExpiry", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {/* Fixed Order */}

            <Input
              label="EOL DATE"
              type="date"
              size="sm"
              fullWidth
              value={formData.eolDate}
              onChange={(e) => handleChange("eolDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Input
              label="VENDOR"
              size="sm"
              fullWidth
              value={formData.vendor}
              onChange={(e) => handleChange("vendor", e.target.value)}
            />

            <FormControl fullWidth size="small">
              <InputLabel>CONDITION ID</InputLabel>
              <Select
                value={formData.conditionId}
                label="CONDITION ID"
                onChange={(e) => handleChange("conditionId", e.target.value)}
              >
                <MenuItem value="1201">1201 (Excellent)</MenuItem>
                <MenuItem value="1202">1202 (Good)</MenuItem>
                <MenuItem value="1203">1203 (Fair)</MenuItem>
                <MenuItem value="1402">1402 (Fair)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>STATUS ID</InputLabel>
              <Select
                value={formData.statusId}
                label="STATUS ID"
                onChange={(e) => handleChange("statusId", e.target.value)}
              >
                <MenuItem value="1101">1101 (Assigned)</MenuItem>
                <MenuItem value="1102">1102 (Available)</MenuItem>
                <MenuItem value="1103">1103 (Repair)</MenuItem>
                <MenuItem value="1302">1302 (Repair)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>CATEGORY ID</InputLabel>
              <Select
                value={formData.categoryId}
                label="CATEGORY ID"
                onChange={(e) => handleChange("categoryId", e.target.value)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="102">102</MenuItem>
                <MenuItem value="103">103</MenuItem>
              </Select>
            </FormControl>
            {/* Remarks - Full Width */}
            <Box sx={{ gridColumn: { md: "1 / -1" } }}>
              <Input
                label="REMARKS"
                size="sm"
                fullWidth
                value={formData.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)}
              />
            </Box>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>{editMode ? "Update" : "Save"} Asset</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAssetManagement;
