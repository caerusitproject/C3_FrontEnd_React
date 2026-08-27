import React, { useState } from "react";
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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CloseIcon from "@mui/icons-material/Close";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";

import { Input } from "../../Components/ui/Input/Input";
import { Button } from "../../Components/ui/Button/Button";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

export default function AssetRequestDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [category, setCategory] = useState(101);
  const [requestType, setRequestType] = useState(201);
  const [assetType, setAssetType] = useState("");
  const [reason, setReason] = useState("");

  const reset = () => {
    setCategory(101);
    setRequestType("201");
    setAssetType("");
    setReason("");
  };

  const validate = () => {
    if (!assetType) {
      alert("Please select Asset Type");
      return false;
    }

    if (!reason.trim()) {
      alert("Please enter the reason for request");
      return false;
    }

    return true;
  };

  const onSave = () => {
    if (!validate()) return;

    let obj = {
      requestTypeCodeValueId: requestType,
      assetCategoryCodeValueId: category,
      requestedAssetName: assetType,
      justification: reason,
    };

    console.log({
      obj,
    });

    dispatch(actions.saveAssetRequests(obj));

    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset();
        setOpen(false);
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: theme.foundation.applicationBackground,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              bgcolor: theme.foundation.surfaceBackground,
              color: theme.foundation.primaryColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Inventory2OutlinedIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              New Asset Request
            </Typography>

            <Typography variant="body2" color={theme.foundation.primaryColor}>
              Fill in the request details below
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={() => {
            reset();
            setOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Body */}

      <DialogContent sx={{ p: 3 }}>
        {/* Category */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 1.5,
          }}
        >
          Category Selection
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            onClick={() => setCategory(101)}
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              cursor: "pointer",
              border: `2px solid ${theme.foundation.primaryColor}`,
              borderColor: category === 101 ? "primary.main" : "divider",
              bgcolor:
                category === 101 ? "action.selected" : "background.paper",
              transition: ".2s",

              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <ComputerOutlinedIcon color="primary" />

              <Box>
                <Typography fontWeight={600}>IT Asset</Typography>

                <Typography variant="caption" color="text.secondary">
                  Hardware, Software
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            onClick={() => setCategory(102)}
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              cursor: "pointer",
              border: "2px solid",
              borderColor: category === 102 ? "primary.main" : "divider",
              bgcolor:
                category === 102 ? "action.selected" : "background.paper",
              transition: ".2s",

              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <WeekendOutlinedIcon color="primary" />

              <Box>
                <Typography fontWeight={600}>Non-IT Asset</Typography>

                <Typography variant="caption" color="text.secondary">
                  Furniture, Office Equipment
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Request Type */}

        <Typography
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Request Type
        </Typography>

        <RadioGroup
          row
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          sx={{ mb: 3 }}
        >
          <FormControlLabel
            value={201}
            control={<Radio color="primary" />}
            label="New Request"
          />

          <FormControlLabel
            value={202}
            control={<Radio color="primary" />}
            label="Change Request"
          />
        </RadioGroup>

        {/* Asset Type */}

        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel>Asset Type</InputLabel>

          <Select
            value={assetType}
            label="Asset Type"
            onChange={(e) => setAssetType(e.target.value)}
          >
            <MenuItem value="Laptop">Laptop</MenuItem>

            <MenuItem value="Desktop">Desktop</MenuItem>

            <MenuItem value="Monitor">Monitor</MenuItem>

            <MenuItem value="Chair">Chair</MenuItem>

            <MenuItem value="Desk">Desk</MenuItem>
          </Select>
        </FormControl>

        {/* Reason */}

        <Input
          label="Reason for Request"
          multiline
          rows={4}
          fullWidth
          value={reason}
          placeholder="Please describe why you need this asset..."
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>

      {/* Footer */}

      <DialogActions
        sx={{
          px: 3,
          py: 3,
          gap: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          onClick={() => {
            reset();
            setOpen(false);
          }}
        >
          Cancel
        </Button>

        <Button onClick={onSave}>Submit Request</Button>
      </DialogActions>
    </Dialog>
  );
}
