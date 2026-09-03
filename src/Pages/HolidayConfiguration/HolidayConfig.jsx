import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { ThemeProvider, createTheme, Box, IconButton } from "@mui/material";
import { Card } from "../../Components/ui/Card/Card";
import { Text } from "../../Components/ui";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../Components/ui/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
// import AddMappingModal from "./AddMappingModal";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Chip, Stack } from "@mui/material";
import { openConfirmationDialogue } from "../../store/slices/assetManagementSlice";
import AddorEditholiday from "./AddorEditholiday";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../ConfirmationDialogue";

export default function AssetManagementTable() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const holidayList = useSelector((state) => state.holiday?.holidayList);
  const countHolidays = useSelector((state) => state.holiday?.countHolidays);
  const [holidaySetList, setHolidaySetList] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [holidayObj, setSetholidayObj] = React.useState(null);
  //   const [selectAssetObj, setSelectAssetObj] = React.useState(null);
  const [holidayId, setHolidayId] = React.useState(null);
  const [actionType, setActionType] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    if (holidayList?.length > 0) {
      const sortedList = [...holidayList].sort(
        (a, b) => a.holidayId - b.holidayId,
      );
      setHolidaySetList(sortedList);
    }
  }, [holidayList]);

  React.useEffect(() => {
    dispatch(
      actions.storePaginationIndexSize(
        pagination?.pageIndex,
        pagination?.pageSize,
      ),
    );
    dispatch(
      actions.fetchAllHolidaysLeaves(
        pagination?.pageIndex,
        pagination?.pageSize,
        currentYear,
      ),
    );
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  React.useEffect(() => {
    dispatch(actions.fetchHolidayTypeCodeList());
  }, [dispatch]);

  console.log("holidayList___", holidayList);

  const dummyData = [
    {
      projectName: "AST-001",
      projectCode: "Laptop",
      softwareList: [{ softwareName: "SN-LTP-2024001" }],
      lastUpdateDate: "Dell Technologies",
      projectStatus: {
        dispalyName: "John Doe",
      },
      amcExpiry: "15 Jan 2027",
      eolDate: "15 Jan 2029",
      assetStatus: "Assigned",
    },
    {
      projectName: "AST-002",
      projectCode: "Desktop",
      softwareList: [{ softwareName: "SN-DSK-2024002" }],
      lastUpdateDate: "HP",
      projectStatus: {
        dispalyName: "Emma Watson",
      },
      amcExpiry: "20 Aug 2026",
      eolDate: "20 Aug 2028",
      assetStatus: "Available",
    },
    {
      projectName: "AST-003",
      projectCode: "Monitor",
      softwareList: [{ softwareName: "SN-MON-2024003" }],
      lastUpdateDate: "Samsung",
      projectStatus: {
        dispalyName: "Robert King",
      },
      amcExpiry: "12 Mar 2025",
      eolDate: "12 Mar 2027",
      assetStatus: "Maintenance",
    },
    {
      projectName: "AST-004",
      projectCode: "Keyboard",
      softwareList: [{ softwareName: "SN-KBD-2024004" }],
      lastUpdateDate: "Logitech",
      projectStatus: {
        dispalyName: "Sophia Lee",
      },
      amcExpiry: "01 Jul 2026",
      eolDate: "01 Jul 2028",
      assetStatus: "Assigned",
    },
    {
      projectName: "AST-005",
      projectCode: "Mouse",
      softwareList: [{ softwareName: "SN-MSE-2024005" }],
      lastUpdateDate: "Logitech",
      projectStatus: {
        dispalyName: "Michael Scott",
      },
      amcExpiry: "10 Dec 2025",
      eolDate: "10 Dec 2027",
      assetStatus: "Available",
    },
    {
      projectName: "AST-006",
      projectCode: "Printer",
      softwareList: [{ softwareName: "SN-PRN-2024006" }],
      lastUpdateDate: "Canon",
      projectStatus: {
        dispalyName: "David Miller",
      },
      amcExpiry: "18 Oct 2026",
      eolDate: "18 Oct 2029",
      assetStatus: "Assigned",
    },
    {
      projectName: "AST-007",
      projectCode: "Scanner",
      softwareList: [{ softwareName: "SN-SCN-2024007" }],
      lastUpdateDate: "Epson",
      projectStatus: {
        dispalyName: "Emily Clark",
      },
      amcExpiry: "22 Feb 2027",
      eolDate: "22 Feb 2030",
      assetStatus: "Available",
    },
    {
      projectName: "AST-008",
      projectCode: "Projector",
      softwareList: [{ softwareName: "SN-PJT-2024008" }],
      lastUpdateDate: "BenQ",
      projectStatus: {
        dispalyName: "James Anderson",
      },
      amcExpiry: "14 Nov 2026",
      eolDate: "14 Nov 2028",
      assetStatus: "Maintenance",
    },
  ];

  const columns = React.useMemo(
    () => [
      { accessorKey: "holidayId", header: "ID" },
      { accessorKey: "holidayName", header: "Holiday Name" },
      { accessorKey: "holidayDate", header: "Holiday Date" },
      {
        accessorKey: "holidayTypeCode",
        header: "Holiday Type",
      },

      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: false,
        enableColumnFilter: false,

        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => {
                setEditMode(true);
                setOpen(true);
                setHolidayId(row?.original.holidayId);
                let filteredObj = holidayList?.find(
                  (item) => item.holidayId === row?.original.holidayId,
                );
                // setSetholidayObj(filteredObj);
                setSetholidayObj(row.original);
                console.log("entire row", row.original);
              }}
              sx={{
                backgroundColor: `${theme.foundation.primaryColor}15`,
                transition: ".25s",

                "&:hover": {
                  backgroundColor: `${theme.foundation.primaryColor}30`,
                },
              }}
            >
              <EditIcon
                sx={{
                  color: theme.foundation.primaryColor,
                  fontSize: 20,
                }}
              />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => {
                console.log("Delete", row.original);
                setActionType("delete");
                setHolidayId(row?.original.holidayId);
                dispatch(
                  openConfirmationDialogue(
                    "Do you really want to delete this holiday ?",
                  ),
                );
                // Call your delete API here
                // dispatch(deleteAsset(row.original.id));
              }}
              sx={{
                backgroundColor: "#FEECEC",
                transition: "all .25s ease",

                "&:hover": {
                  backgroundColor: "#FFD9D9",
                  transform: "scale(1.05)",
                },
              }}
            >
              <DeleteIcon
                sx={{
                  color: theme.foundation.primaryColor,
                  fontSize: 20,
                }}
              />
            </IconButton>
          </Box>
        ),
      },
    ],
    [],
  );

  const isDark = theme.mode === "dark";

  const tableBg = isDark ? theme.foundation.base : "#FFFFFF";
  const alternateRow = isDark ? "#111111" : "#FAFAFA";
  const toolbarBg = isDark ? "#131414" : "#FFFFFF";
  const headerBg = isDark ? "#0a0a0a" : "#FFFFFF";
  const borderColor = `${theme.foundation.primaryColor}20`;

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme.mode === "dark" ? "dark" : "light",
          primary: { main: theme.foundation.primaryColor },
          background: {
            default: theme.foundation.loginBackground,
            paper: theme.foundation.base,
          },
        },
      }),
    [theme],
  );

  const table = useMaterialReactTable({
    columns,
    data: holidaySetList ?? [],

    // -------------------------
    // Pagination
    // -------------------------
    state: {
      pagination,
    },

    onPaginationChange: setPagination,

    manualPagination: true,

    rowCount: countHolidays ?? 0,

    // -------------------------
    // Features
    // -------------------------
    enablePagination: true,
    enableSorting: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableColumnOrdering: true,
    enableColumnActions: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableHiding: true,
    enableStickyHeader: true,

    enableTopToolbar: true,
    enableBottomToolbar: true,

    initialState: {
      density: "comfortable",
      showGlobalFilter: true,
      // pagination: {
      //   pageIndex: 0,
      //   pageSize: 5,
      // },
    },

    // -------------------------
    // PAPER
    // -------------------------
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        backgroundColor: tableBg,
        color: theme.typography.bodyText,
        borderRadius: "18px",
        overflow: "hidden",
        border: `1px solid ${borderColor}`,
      },
    },

    // -------------------------
    // CONTAINER
    // -------------------------
    muiTableContainerProps: {
      sx: {
        backgroundColor: tableBg,
      },
    },

    // -------------------------
    // TABLE
    // -------------------------
    muiTableProps: {
      sx: {
        backgroundColor: tableBg,
      },
    },

    // -------------------------
    // HEADER
    // -------------------------
    muiTableHeadProps: {
      sx: {
        backgroundColor: headerBg,
      },
    },

    muiTableHeadRowProps: {
      sx: {
        backgroundColor: headerBg,
      },
    },

    muiTableHeadCellProps: {
      sx: {
        backgroundColor: headerBg,

        color: theme.typography.helperText,

        fontWeight: 700,

        fontSize: "12px",

        textTransform: "uppercase",

        letterSpacing: "0.8px",

        borderBottom: `1px solid ${borderColor}`,

        "& .MuiTableSortLabel-root": {
          color: theme.typography.helperText,
        },

        "& .MuiTableSortLabel-icon": {
          color: theme.typography.helperText,
        },

        "& .MuiIconButton-root": {
          color: theme.typography.helperText,
        },
      },
    },

    // -------------------------
    // BODY
    // -------------------------
    muiTableBodyProps: {
      sx: {
        backgroundColor: tableBg,
      },
    },

    muiTableBodyRowProps: ({ row }) => ({
      hover: true,

      sx: {
        backgroundColor: row.index % 2 === 0 ? tableBg : alternateRow,

        transition: "0.25s",

        "&:hover td": {
          backgroundColor: `${theme.foundation.primaryColor}12 !important`,
        },
      },
    }),

    muiTableBodyCellProps: {
      sx: {
        backgroundColor: "inherit",

        color: theme.typography.bodyText,

        borderBottom: `1px solid ${borderColor}`,

        fontSize: "14px",
      },
    },

    // -------------------------
    // TOP TOOLBAR
    // -------------------------
    muiTopToolbarProps: {
      sx: {
        backgroundColor: toolbarBg,

        borderBottom: `1px solid ${borderColor}`,

        color: theme.typography.bodyText,
      },
    },

    // -------------------------
    // BOTTOM TOOLBAR
    // -------------------------
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: toolbarBg,

        borderTop: `1px solid ${borderColor}`,

        color: theme.typography.bodyText,
      },
    },

    // -------------------------
    // SEARCH
    // -------------------------
    muiSearchTextFieldProps: {
      variant: "outlined",

      size: "small",

      sx: {
        minWidth: 250,

        "& .MuiOutlinedInput-root": {
          backgroundColor: tableBg,

          color: theme.typography.bodyText,

          borderRadius: "10px",

          "& fieldset": {
            borderColor: borderColor,
          },

          "&:hover fieldset": {
            borderColor: theme.foundation.primaryColor,
          },

          "&.Mui-focused fieldset": {
            borderColor: theme.foundation.primaryColor,
          },
        },

        "& input": {
          color: theme.typography.bodyText,
        },

        "& svg": {
          color: theme.typography.helperText,
        },
      },
    },

    // -------------------------
    // Pagination
    // -------------------------
    muiPaginationProps: {
      color: "primary",

      rowsPerPageOptions: [5, 10, 20, 50],

      shape: "rounded",

      variant: "outlined",
    },

    // -------------------------
    // Toolbar Buttons
    // -------------------------
    muiToolbarAlertBannerProps: {
      sx: {
        backgroundColor: tableBg,
        color: theme.typography.bodyText,
      },
    },

    // -------------------------
    // Icons
    // -------------------------
    muiTableBodyCellCopyButtonProps: {
      sx: {
        color: theme.typography.bodyText,
      },
    },

    muiTableHeadCellFilterTextFieldProps: {
      sx: {
        "& .MuiOutlinedInput-root": {
          color: theme.typography.bodyText,
        },
      },
    },
  });

  // const handleTabChange = (_, newValue) => {
  //   setActiveTab(newValue);
  // };

  const handleAddMapping = () => {
    setEditMode(false);
    setOpen(true);
  };

  const deleteOrPhaseOuttheProject = () => {
    if (actionType == "delete") {
      dispatch(actions.deleteHolidayList(holidayId, setPagination));
    } else {
      return;
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        style={{
          padding: 24,
          borderRadius: 18,
        }}
      >
        {/* Title */}
        <Box sx={{ mb: 3 }}>
          <Text variant="h3">Holiday Configuration List</Text>
        </Box>

        {/* Navigation Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 3,
            gap: 3,
          }}
        >
          {/* LEFT */}

          {/* RIGHT */}

          <div>
            <Text
              style={{
                color: theme.typography.helperText,
                fontSize: 13,
              }}
            >
              Sort by:
            </Text>

            <select
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 600,
                color: theme.typography.bodyText,
                fontSize: 13,
              }}
            >
              <option>Last Update</option>
              <option>Project Name</option>
              <option>Status</option>
            </select>
          </div>

          <div>
            <Button
              onClick={handleAddMapping}
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: 700,
                boxShadow: `0 10px 24px ${theme.foundation.primaryColor}40`,
              }}
            >
              + Add Holiday
            </Button>
          </div>
        </Box>

        <>
          <MaterialReactTable table={table} />
          <AddorEditholiday
            open={open}
            onClose={() => setOpen(false)}
            setPagination={setPagination}
            editMode={editMode}
            setEditMode={setEditMode}
            holidayObj={holidayObj}
            holidayId={holidayId}
            setSetholidayObj={setSetholidayObj}
            // assetID={assetID}
            // setAssetID={setAssetID}
          />
          <ConfirmDialog agreedAction={deleteOrPhaseOuttheProject} />
          {/* <AddMappingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              editMode={editMode}
              setEditMode={setEditMode}
              selectedMappingObj={selectedMappingObj}
              setSelectedMappingObj={setSelectedMappingObj}
              setPagination={setPagination}
            /> */}
        </>

        {/* <MaterialReactTable table={table} /> */}
      </Card>
    </ThemeProvider>
  );
}
