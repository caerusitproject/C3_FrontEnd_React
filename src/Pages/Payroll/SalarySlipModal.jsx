import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useThemeContext } from "../../context/ThemeContext";

const SalarySlipModal = ({ open, onClose, salarySlip }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const { theme, global } = useThemeContext();

  if (!salarySlip) {
    return null;
  }

  const {
    salarySlipId,
    employeeId,
    payrollMonth,
    periodStart,
    periodEnd,
    grossSalary,
    lopAmount,
    adjustedGrossSalary,
    totalDeductions,
    netPayableSalary,
    status,
    generatedAt,
    components = [],
  } = salarySlip;

  /**
   * Theme colors
   */
  const colors = theme?.colors || {};

  const primaryColor = theme.foundation.primaryColor || "#6B8E23";
  const surfaceBackground = theme.foundation.surfaceBackground || "#FFFFFF";
  const layoutBackground = theme.foundation.surfaceBackground || "#F6F8F2";
  const textPrimary = theme.typography.bodyText || "#1F2937";

  const borderColor = theme.foundation.borderColor;

  /**
   * Format amount
   */
  const formatAmount = (value) => {
    if (value === null || value === undefined || value === "") {
      return "0.00";
    }

    return Number(value).toFixed(2);
  };

  /**
   * Format generated date
   */
  const formatGeneratedAt = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toISOString().replace("Z", "");
  };

  /**
   * Format component name
   *
   * BASIC_SALARY
   * ->
   * BASIC SALARY
   */
  const formatComponentName = (name) => {
    if (!name) return "";

    return name.replaceAll("_", " ");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 1.5,
          overflow: "hidden",
          backgroundColor: layoutBackground,
        },
      }}
    >
      {/* ================================
          MODAL HEADER
      ================================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.2,
          backgroundColor: primaryColor,
          color: "#FFFFFF",
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Salary Slip
        </Typography>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ================================
          CONTENT
      ================================= */}
      <DialogContent
        sx={{
          p: {
            xs: 1,
            sm: 2,
            md: 3,
          },
          backgroundColor: layoutBackground,
        }}
      >
        {/* ================================
            SALARY SLIP PAPER
        ================================= */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: "800px",
            mx: "auto",
            px: {
              xs: 2,
              sm: 4,
            },
            py: {
              xs: 3,
              sm: 4,
            },
            backgroundColor: surfaceBackground,
            color: textPrimary,
            border: `1px solid ${borderColor}`,
            borderRadius: 0,
          }}
        >
          {/* ================================
              TITLE
          ================================= */}
          <Typography
            align="center"
            sx={{
              fontSize: {
                xs: "1.45rem",
                sm: "1.75rem",
              },
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: primaryColor,
              mb: 2,
            }}
          >
            SALARY SLIP
          </Typography>

          {/* ================================
              BASIC INFORMATION
          ================================= */}
          <Box sx={{ mb: 3 }}>
            <InfoRow
              label="Payroll Month"
              value={payrollMonth}
              textColor={textPrimary}
            />

            <InfoRow
              label="Pay Period"
              value={`${periodStart} to ${periodEnd}`}
              textColor={textPrimary}
            />

            <InfoRow
              label="Employee ID"
              value={employeeId}
              textColor={textPrimary}
            />
          </Box>

          {/* ================================
              SALARY SUMMARY
          ================================= */}
          <TableContainer
            component={Box}
            sx={{
              border: `1px solid ${borderColor}`,
              mb: 4,
            }}
          >
            <Table
              size="small"
              sx={{
                tableLayout: "fixed",
              }}
            >
              <TableBody>
                <SummaryRow
                  label="Gross Salary"
                  value={grossSalary}
                  borderColor={borderColor}
                  textColor={textPrimary}
                />

                <SummaryRow
                  label="LOP Amount"
                  value={lopAmount}
                  borderColor={borderColor}
                  textColor={textPrimary}
                />

                <SummaryRow
                  label="Adjusted Gross Salary"
                  value={adjustedGrossSalary}
                  borderColor={borderColor}
                  textColor={textPrimary}
                />

                <SummaryRow
                  label="Total Deductions"
                  value={totalDeductions}
                  borderColor={borderColor}
                  textColor={textPrimary}
                />

                <SummaryRow
                  label="Net Payable Salary"
                  value={netPayableSalary}
                  borderColor={borderColor}
                  textColor={textPrimary}
                  highlight
                  primaryColor={primaryColor}
                />
              </TableBody>
            </Table>
          </TableContainer>

          {/* ================================
              SALARY COMPONENTS TITLE
          ================================= */}
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: primaryColor,
              mb: 1.5,
              letterSpacing: "0.3px",
            }}
          >
            SALARY COMPONENTS
          </Typography>

          {/* ================================
              COMPONENT TABLE
          ================================= */}
          <TableContainer
            component={Box}
            sx={{
              border: `1px solid ${borderColor}`,
              overflowX: "auto",
            }}
          >
            <Table
              size="small"
              sx={{
                minWidth: 650,
                tableLayout: "fixed",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      muiTheme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.025)",
                  }}
                >
                  <HeaderCell
                    width="30%"
                    borderColor={borderColor}
                    textColor={textPrimary}
                  >
                    Component
                  </HeaderCell>

                  <HeaderCell
                    width="25%"
                    borderColor={borderColor}
                    textColor={textPrimary}
                  >
                    Type
                  </HeaderCell>

                  <HeaderCell
                    width="22.5%"
                    borderColor={borderColor}
                    textColor={textPrimary}
                  >
                    Annual Amount
                  </HeaderCell>

                  <HeaderCell
                    width="22.5%"
                    borderColor={borderColor}
                    textColor={textPrimary}
                  >
                    Monthly Amount
                  </HeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {components.map((component, index) => {
                  const isDeduction = component.componentType === "DEDUCTION";

                  return (
                    <TableRow key={`${component.componentCode}-${index}`}>
                      <TableCell
                        sx={{
                          borderColor,
                          color: textPrimary,
                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.85rem",
                          },
                          fontWeight: 500,
                          wordBreak: "break-word",
                          verticalAlign: "middle",
                        }}
                      >
                        {formatComponentName(component.componentCode)}
                      </TableCell>

                      <TableCell
                        sx={{
                          borderColor,
                          color: isDeduction ? "#DC2626" : primaryColor,
                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.85rem",
                          },
                          fontWeight: 600,
                          verticalAlign: "middle",
                        }}
                      >
                        {component.componentType}
                      </TableCell>

                      <TableCell
                        sx={{
                          borderColor,
                          color: textPrimary,
                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.85rem",
                          },
                          verticalAlign: "middle",
                        }}
                      >
                        {formatAmount(component.annualAmount)}
                      </TableCell>

                      <TableCell
                        sx={{
                          borderColor,
                          color: textPrimary,
                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.85rem",
                          },
                          verticalAlign: "middle",
                        }}
                      >
                        {formatAmount(component.monthlyAmount)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ================================
              NET PAYABLE
          ================================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "0.95rem",
                  sm: "1.15rem",
                },
                fontWeight: 700,
                color: primaryColor,
                textAlign: "right",
              }}
            >
              NET PAYABLE SALARY: {formatAmount(netPayableSalary)}
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 1.5,
              borderColor,
            }}
          />

          {/* ================================
              FOOTER DETAILS
          ================================= */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: textPrimary,
                mb: 0.5,
              }}
            >
              Status:{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 600,
                  color: primaryColor,
                }}
              >
                {status}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: "0.9rem",
                color: textPrimary,
              }}
            >
              Generated At: {formatGeneratedAt(generatedAt)}
            </Typography>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

/**
 * ==========================================
 * INFO ROW
 * ==========================================
 */
const InfoRow = ({ label, value, textColor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        mb: 0.6,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: {
            xs: "0.82rem",
            sm: "0.95rem",
          },
          color: textColor,
          minWidth: {
            xs: "105px",
            sm: "125px",
          },
        }}
      >
        {label}:
      </Typography>

      <Typography
        component="span"
        sx={{
          fontSize: {
            xs: "0.82rem",
            sm: "0.95rem",
          },
          color: textColor,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

/**
 * ==========================================
 * SUMMARY ROW
 * ==========================================
 */
const SummaryRow = ({
  label,
  value,
  borderColor,
  textColor,
  highlight = false,
  primaryColor,
}) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          width: "50%",
          borderColor,
          color: textColor,
          py: 0.35,
          px: 0.5,
          fontSize: {
            xs: "0.78rem",
            sm: "0.9rem",
          },
          fontWeight: highlight ? 700 : 400,
        }}
      >
        {label}
      </TableCell>

      <TableCell
        sx={{
          width: "50%",
          borderColor,
          color: highlight ? primaryColor : textColor,
          py: 0.35,
          px: 0.5,
          fontSize: {
            xs: "0.78rem",
            sm: "0.9rem",
          },
          fontWeight: highlight ? 700 : 400,
        }}
      >
        {Number(value || 0).toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

/**
 * ==========================================
 * HEADER CELL
 * ==========================================
 */
const HeaderCell = ({ children, width, borderColor, textColor }) => {
  return (
    <TableCell
      sx={{
        width,
        borderColor,
        color: textColor,
        textAlign: "center",
        fontSize: {
          xs: "0.72rem",
          sm: "0.9rem",
        },
        fontWeight: 500,
        py: 0.55,
        px: 0.5,
      }}
    >
      {children}
    </TableCell>
  );
};

export default SalarySlipModal;
