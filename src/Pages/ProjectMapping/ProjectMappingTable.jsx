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
import AddMappingModal from "./AddMappingModal";
import { Tabs, Tab } from "@mui/material";
import ProjectTable from "./ProjectsTable";
import SoftwaresTable from "./SoftwaresTable";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Chip, Stack } from "@mui/material";

export default function ProjectMappingTable() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const allProjectMapping = useSelector(
    (state) => state.projectMapping?.allProjectMappings,
  );
  const countProjectMappings = useSelector(
    (state) => state.projectMapping?.countProjectMappings,
  );
  const [activeTab, setActiveTab] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [selectedMappingObj, setSelectedMappingObj] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  React.useEffect(() => {
    dispatch(
      actions.fetchAllProjectsMappings(
        pagination?.pageIndex,
        pagination?.pageSize,
      ),
    );
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  const columns = React.useMemo(
    () => [
      { accessorKey: "projectName", header: "Project Name" },
      { accessorKey: "projectCode", header: "Project Code" },
      {
        accessorKey: "softwareList",
        header: "Associated Software",
        Cell: ({ row }) => {
          const softwareList = row.original.softwareList || [];

          return (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {softwareList.map((software, index) => (
                <Chip
                  key={index}
                  size="small"
                  label={software.softwareName}
                  sx={{
                    backgroundColor: `${theme.foundation.primaryColor}20`,
                    color: theme.foundation.primaryColor,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          );
        },
      },
      { accessorKey: "lastUpdateDate", header: "Last Updated" },
      { accessorKey: "projectStatus.dispalyName", header: "Status" },
      {
        accessorKey: "actions",
        header: "Actions",
        enableSorting: false,
        enableColumnFilter: false,

        Cell: ({ row }) => (
          <IconButton
            size="small"
            onClick={() => {
              setEditMode(true);
              setIsModalOpen(true);
              setSelectedMappingObj(row?.original);
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
          // <Button
          //   onClick={() =>
          //     //  handleEdit(row.original)
          //     {
          //       console.log("entire row", row.original);
          //     }
          //   }
          //   style={{
          //     padding: "6px 14px",
          //     background: theme.foundation.primaryColor,
          //     color: "#fff",
          //     borderRadius: "6px",
          //   }}
          // >
          //   <EditIcon />
          // </Button>
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
    data: allProjectMapping ?? [],

    // -------------------------
    // Pagination
    // -------------------------
    state: {
      pagination,
    },

    onPaginationChange: setPagination,

    manualPagination: true,

    rowCount: countProjectMappings,

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

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddMapping = () => {
    setEditMode(false);
    setIsModalOpen(true);
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
          <Text variant="h3">Project Configuration</Text>
        </Box>

        {/* Navigation Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* LEFT */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            sx={{
              minHeight: 46,

              "& .MuiTabs-flexContainer": {
                gap: "10px",
              },

              "& .MuiTab-root": {
                minHeight: 46,
                minWidth: 120,

                textTransform: "none",

                fontWeight: 600,

                fontSize: 14,

                borderRadius: "10px",

                color: "#7B7B7B",

                transition: ".25s",

                background: "transparent",

                px: 3,
              },

              "& .Mui-selected": {
                color: theme.foundation.primaryColor,

                background: theme.foundation.loginBackground,

                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
              },
            }}
          >
            <Tab label="Active Mappings" />

            <Tab label="Projects" />

            <Tab label="Softwares" />
          </Tabs>

          {/* RIGHT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
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
            </Box>
            {activeTab === 0 && (
              <Button
                onClick={handleAddMapping}
                style={{
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  boxShadow: `0 10px 24px ${theme.foundation.primaryColor}40`,
                }}
              >
                + Add Mapping
              </Button>
            )}
          </Box>
        </Box>
        {activeTab === 0 && (
          <>
            <MaterialReactTable table={table} />
            <AddMappingModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              editMode={editMode}
              setEditMode={setEditMode}
              selectedMappingObj={selectedMappingObj}
              setSelectedMappingObj={setSelectedMappingObj}
              setPagination={setPagination}
            />
          </>
        )}

        {activeTab === 1 && <ProjectTable />}

        {activeTab === 2 && <SoftwaresTable />}

        {/* <MaterialReactTable table={table} /> */}
      </Card>
    </ThemeProvider>
  );
}
