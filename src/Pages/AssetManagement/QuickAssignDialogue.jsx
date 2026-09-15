import React, { useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Button } from "../../Components/ui";
import Select from "react-select";
import * as actions from "../../store/actions";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch } from "react-redux";
import { useThemeContext } from "../../context/ThemeContext";

// Replace this with your actual asset data from Redux/API.
const DEFAULT_ASSETS = [
  { value: "L526", label: 'Dell Inspiron 14"' },
  { value: "L426", label: 'Dell XPS 13"' },
  { value: "H456", label: "JBL Tune Headphones" },
  { value: "M226", label: "Dell Mouse & Keyboard" },
  { value: "M226", label: "Lenovo AMD Monitor" },
];

function QuickAssetTagging({
  open,
  onClose,
  employee,
  assets = DEFAULT_ASSETS,
  initialSelectedAssets = [],
  onTagAssets,
}) {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const assetOptions = assets.map((item) => ({
    value: item?.assetId,
    label: item?.assetName,
  }));

  const employeeList = employee.map((ele) => {
    return {
      value: ele?.employeeId,
      label: ele?.firstName,
    };
  });

  console.log("assets__", assets, employee);
  // Active theme tokens from ThemeContext.
  const colors = useMemo(
    () => ({
      primary: theme.foundation.primaryColor,
      primaryText: theme.typography.bodyText,
      text: theme.typography.bodyText,
      secondaryText: "var(--color-text-secondary, #64748b)",
      border: theme.foundation.primaryColor,
      background: theme.foundation.surfaceBackground,
      surface: "var(--color-surface, #f8fafc)",
      error: "var(--color-error, #dc2626)",
    }),
    [theme],
  );

  const handleClose = () => {
    setSelectedAssets([]);
    setEmployeeName([]);
    if (!submitting) onClose?.();
  };

  const handleTagAssets = async () => {
    // if (!selectedAssets.length || !employeeName.length || submitting) return;

    const payload = {
      employeeId: employeeName.value,
      assetIds: selectedAssets.map((asset) => asset.value),
    };
    console.log("payload___", payload);

    dispatch(actions.quickAssignAssetManagement(payload));

    setSelectedAssets([]);
    setEmployeeName([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 520,
          margin: 2,
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: colors.background,
          color: colors.text,
          boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(15, 23, 42, 0.35)",
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 2.5,
          py: 2.25,
          fontSize: "18px",
          fontWeight: 700,
          color: colors.text,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        Quick Asset Tagging
      </DialogTitle>

      <DialogContent
        sx={{
          px: 2.5,
          py: 2.5,
          backgroundColor: colors.background,
          "&.MuiDialogContent-root": {
            overflowY: "auto",
          },
        }}
      >
        <Box display="flex" flexDirection="column" gap={2.5}>
          {/* Employee Name */}
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: colors.text,
                mb: 0.75,
                mt: 1,
              }}
            >
              Employee Name
            </Typography>

            <Select
              options={employeeList}
              value={employeeName}
              onChange={(value) => {
                setEmployeeName(value);
              }}
              getOptionValue={(option) => String(option.value)}
              placeholder={"Select Employee Name"}
              hideSelectedOptions={false}
              isSearchable
              isClearable={false}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "42px",
                  height: "42px",
                  borderRadius: "10px",

                  borderColor: state.isFocused ? colors.primary : colors.border,

                  backgroundColor: colors.background,

                  boxShadow: state.isFocused
                    ? `0 0 0 1px ${colors.primary}`
                    : "none",

                  fontSize: "13px",
                  cursor: "pointer",

                  "&:hover": {
                    borderColor: colors.primary,
                  },
                }),

                valueContainer: (base) => ({
                  ...base,
                  padding: "2px 10px",
                }),

                input: (base) => ({
                  ...base,
                  color: colors.text,
                  fontSize: "13px",
                  margin: 0,
                  padding: 0,
                }),

                placeholder: (base) => ({
                  ...base,
                  color: colors.secondaryText,
                  fontSize: "13px",
                }),

                menuPortal: (base) => ({
                  ...base,
                  zIndex: 999999,
                }),

                menu: (base) => ({
                  ...base,
                  marginTop: "4px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: colors.background,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }),

                menuList: (base) => ({
                  ...base,
                  padding: "4px 0",
                  maxHeight: "220px",
                  backgroundColor: colors.background,
                }),

                option: (base, state) => ({
                  ...base,
                  fontSize: "13px",
                  color: colors.text,

                  backgroundColor: state.isSelected
                    ? colors.surface
                    : state.isFocused
                      ? colors.surface
                      : colors.background,

                  cursor: "pointer",
                  padding: "7px 10px",

                  "&:active": {
                    backgroundColor: colors.surface,
                  },
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  color: colors.secondaryText,
                  padding: "6px",

                  "&:hover": {
                    color: colors.text,
                  },
                }),

                indicatorSeparator: () => ({
                  display: "none",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: colors.text,
                  fontSize: "13px",
                }),

                noOptionsMessage: (base) => ({
                  ...base,
                  fontSize: "12px",
                  color: colors.secondaryText,
                }),
              }}
            />

            <Typography
              sx={{
                fontSize: "11px",
                color: colors.secondaryText,
                mt: 0.75,
              }}
            >
              Employee record locked for assignment.
            </Typography>
          </Box>

          {/* Select Assets */}
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: colors.text,
                mb: 0.75,
              }}
            >
              Select Assets
            </Typography>

            <Select
              isMulti
              options={assetOptions}
              value={selectedAssets}
              onChange={(value) => {
                setSelectedAssets(value || []);
              }}
              getOptionLabel={(option) =>
                `${option.label} (ID ${option.value})`
              }
              getOptionValue={(option) => String(option.value)}
              placeholder={
                selectedAssets.length ? "Add another asset" : "Select assets"
              }
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              isSearchable
              isClearable={false}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "42px",
                  height: "42px",
                  borderRadius: "10px",

                  borderColor: state.isFocused ? colors.primary : colors.border,

                  backgroundColor: colors.background,

                  boxShadow: state.isFocused
                    ? `0 0 0 1px ${colors.primary}`
                    : "none",

                  fontSize: "13px",
                  cursor: "pointer",

                  "&:hover": {
                    borderColor: colors.primary,
                  },
                }),

                valueContainer: (base) => ({
                  ...base,
                  padding: "2px 10px",
                }),

                input: (base) => ({
                  ...base,
                  color: colors.text,
                  fontSize: "13px",
                  margin: 0,
                  padding: 0,
                }),

                placeholder: (base) => ({
                  ...base,
                  color: colors.secondaryText,
                  fontSize: "13px",
                }),

                menuPortal: (base) => ({
                  ...base,
                  zIndex: 999999,
                }),

                menu: (base) => ({
                  ...base,
                  marginTop: "4px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: colors.background,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }),

                menuList: (base) => ({
                  ...base,
                  padding: "4px 0",
                  maxHeight: "220px",
                  backgroundColor: colors.background,
                }),

                option: (base, state) => ({
                  ...base,
                  fontSize: "13px",
                  color: colors.text,

                  backgroundColor: state.isSelected
                    ? colors.surface
                    : state.isFocused
                      ? colors.surface
                      : colors.background,

                  cursor: "pointer",
                  padding: "7px 10px",

                  "&:active": {
                    backgroundColor: colors.surface,
                  },
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  color: colors.secondaryText,
                  padding: "6px",

                  "&:hover": {
                    color: colors.text,
                  },
                }),

                indicatorSeparator: () => ({
                  display: "none",
                }),

                noOptionsMessage: (base) => ({
                  ...base,
                  fontSize: "12px",
                  color: colors.secondaryText,
                }),
              }}
            />

            {/* Selected Assets */}
            {/* {selectedAssets.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {selectedAssets.map((asset) => (
                  <Chip
                    key={`${asset.id}-${asset.name}`}
                    label={`${asset.name} (ID ${asset.id})`}
                    size="small"
                    onDelete={() =>
                      setSelectedAssets((current) =>
                        current.filter(
                          (item) =>
                            item.id !== asset.id || item.name !== asset.name,
                        ),
                      )
                    }
                    sx={{
                      height: 26,
                      borderRadius: "6px",
                      backgroundColor: "var(--color-warning-bg, #fff7ed)",
                      border: "1px solid var(--color-warning, #fed7aa)",
                      color: "var(--color-warning-text, #c2410c)",
                      fontSize: "11px",

                      "& .MuiChip-deleteIcon": {
                        fontSize: 14,
                        color: "var(--color-warning-text, #c2410c)",
                      },
                    }}
                  />
                ))}
              </Box>
            )} */}
          </Box>
        </Box>
      </DialogContent>

      <Divider sx={{ borderColor: colors.border }} />

      <DialogActions
        sx={{
          px: 2.5,
          py: 2,
          gap: 1.25,
          backgroundColor: colors.surface,
          "& > :not(style) ~ :not(style)": {
            marginLeft: 0,
          },
        }}
      >
        <Button onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>

        <Button
          onClick={handleTagAssets}
          disabled={
            selectedAssets.length === 0 ||
            employeeName.length === 0 ||
            submitting
          }
          startIcon={<LocalOfferOutlinedIcon sx={{ fontSize: 16 }} />}
        >
          {submitting ? "Tagging..." : "Tag Assets"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuickAssetTagging;
