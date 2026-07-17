import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Box,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Card } from "../../Components/ui/Card/Card";
import { Text } from "../../Components/ui";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../Components/ui/Button/Button";
import AddSoftware from "./AddSoftware";

export default function SoftwaresTable() {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSoftwareObj, setSelectedSoftwareObj] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();
  const allSoftwares = useSelector(
    (state) => state.projectMapping.allSoftwares,
  );
  const countSoftwareList = useSelector(
    (state) => state.projectMapping.countSoftwareList,
  );

  // const paginatedProjects = React.useMemo(() => {
  //   return allSoftwares.slice(
  //     pagination.pageIndex * pagination.pageSize,
  //     pagination.pageIndex * pagination.pageSize + pagination.pageSize,
  //   );
  // }, [allSoftwares, pagination]);

  React.useEffect(() => {
    dispatch(
      actions.showAllSoftware(pagination.pageIndex, pagination.pageSize),
    );
  }, [dispatch, pagination.pageIndex, pagination.pageSize]);

  const isDark = theme.mode === "dark";

  // Theme Based Colors
  const tableBackground = isDark ? theme.foundation.base : "#FFFFFF";

  const headerBackground = isDark ? "#111111" : "#FFFFFF";

  const alternateRow = isDark ? "#111111" : "#FAFAFA";

  const hoverBackground = `${theme.foundation.primaryColor}12`;

  const borderColor = `${theme.foundation.primaryColor}20`;

  console.log("softwares all ______", allSoftwares);

  const handleEdit = (row) => {
    console.log(row);
    setEditMode(true);
    let selectedSoftware = allSoftwares.find(
      (software) => software.softwareName === row?.softwareName,
    );
    setSelectedSoftwareObj(selectedSoftware ? selectedSoftware : {});
    setIsModalOpen(true);
  };

  const handleAddMapping = () => {
    setIsModalOpen(true);
  };

  return (
    <Card style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          variant="h3"
          style={{
            marginBottom: 20,
          }}
        >
          Softwares
        </Text>

        <Button
          onClick={handleAddMapping}
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            fontWeight: 700,
            boxShadow: `0 10px 24px ${theme.foundation.primaryColor}40`,
          }}
        >
          + Add Software
        </Button>
      </div>

      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          borderRadius: "14px",
          backgroundColor: tableBackground,
          border: `1px solid ${borderColor}`,
        }}
      >
        <Table
          sx={{
            backgroundColor: headerBackground,
          }}
        >
          {/* HEADER */}

          <TableHead>
            <TableRow
              sx={{
                backgroundColor: headerBackground,
              }}
            >
              {[
                "Software Name",
                "Software Version",
                "Software Type",
                "Software Status",
                "Actions",
              ].map((item) => (
                <TableCell
                  key={item}
                  align={item === "Actions" ? "center" : "left"}
                  sx={{
                    backgroundColor: headerBackground,
                    color: theme.typography.bodyText,
                    fontWeight: 700,
                    fontSize: 14,
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}

          <TableBody>
            {allSoftwares?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{
                    py: 5,
                    color: theme.typography.helperText,
                    backgroundColor: headerBackground,
                  }}
                >
                  No Software Found
                </TableCell>
              </TableRow>
            ) : (
              allSoftwares &&
              allSoftwares.length > 0 &&
              allSoftwares?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? headerBackground : alternateRow,

                    transition: ".25s",

                    "&:hover": {
                      backgroundColor: hoverBackground,
                    },

                    "& td": {
                      backgroundColor: "inherit",
                      color: theme.typography.bodyText,
                      borderBottom: `1px solid ${borderColor}`,
                    },
                  }}
                >
                  <TableCell>{row?.softwareName}</TableCell>

                  <TableCell>{row?.softwareVersion}</TableCell>

                  <TableCell>{row?.softwareType?.code}</TableCell>

                  <TableCell>{row?.softwareStatus?.code}</TableCell>

                  {/* <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        borderRadius: "18px",
                        fontWeight: 700,

                        backgroundColor:
                          row.status === "Active"
                            ? isDark
                              ? "#204A31"
                              : "#DFF8E4"
                            : row.status === "Maintenance"
                              ? isDark
                                ? "#5A4816"
                                : "#FFF4D6"
                              : isDark
                                ? "#582626"
                                : "#FCE8E8",

                        color:
                          row.status === "Active"
                            ? isDark
                              ? "#54E28C"
                              : "#2E7D32"
                            : row.status === "Maintenance"
                              ? isDark
                                ? "#FFC857"
                                : "#D48806"
                              : isDark
                                ? "#FF8787"
                                : "#C62828",
                      }}
                    />
                  </TableCell> */}

                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(row)}
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
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={countSoftwareList}
          page={pagination.pageIndex}
          rowsPerPage={pagination.pageSize}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onPageChange={(event, newPage) => {
            setPagination((prev) => ({
              ...prev,
              pageIndex: newPage,
            }));
          }}
          onRowsPerPageChange={(event) => {
            setPagination({
              pageIndex: 0,
              pageSize: parseInt(event.target.value, 10),
            });
          }}
          sx={{
            borderTop: `1px solid ${borderColor}`,
            backgroundColor: tableBackground,
            color: theme.typography.bodyText,

            "& .MuiTablePagination-selectLabel": {
              color: theme.typography.bodyText,
            },

            "& .MuiTablePagination-displayedRows": {
              color: theme.typography.bodyText,
            },

            "& .MuiSelect-select": {
              color: theme.typography.bodyText,
            },

            "& .MuiSvgIcon-root": {
              color: theme.foundation.primaryColor,
            },

            "& .MuiIconButton-root": {
              color: theme.foundation.primaryColor,
            },

            "& .Mui-disabled": {
              opacity: 0.4,
            },
          }}
        />
      </Paper>
      <AddSoftware
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editMode={editMode}
        setEditMode={setEditMode}
        selectedSoftwareObj={selectedSoftwareObj}
        setSelectedSoftwareObj={setSelectedSoftwareObj}
        setPagination={setPagination}
      />
    </Card>
  );
}
