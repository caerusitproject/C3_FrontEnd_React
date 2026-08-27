import React, { useMemo, useState } from "react";

import {
  AccountBalanceWalletOutlined,
  CalendarMonthOutlined,
  DownloadOutlined,
  HistoryOutlined,
  VisibilityOutlined,
  Remove,
} from "@mui/icons-material";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { useThemeContext } from "../../context/ThemeContext";

/* =========================================================
   SAMPLE DATA
   Replace this with API data later
========================================================= */

const earningsData = [
  {
    id: 1,
    name: "Basic Salary",
    amount: 398080,
  },
  {
    id: 2,
    name: "Dearness Allowance",
    amount: 195040,
  },
  {
    id: 3,
    name: "House Rent Allowance",
    amount: 95040,
  },
  {
    id: 4,
    name: "City Compensation Allowance",
    amount: 94760,
  },
  {
    id: 5,
    name: "Conveyance Allowance",
    amount: 5280,
  },
  {
    id: 6,
    name: "Medical Allowance",
    amount: 15000,
  },
  {
    id: 7,
    name: "Retention Bonus (Yearly)",
    amount: 582800,
  },
];

const deductionsData = [
  {
    id: 1,
    name: "Provident Fund (Employee PF)",
    amount: 47770,
  },
  {
    id: 2,
    name: "Professional Tax",
    amount: 2400,
  },
  {
    id: 3,
    name: "Income Tax (TDS)",
    amount: null,
  },
  {
    id: 4,
    name: "ESI",
    amount: null,
  },
  {
    id: 5,
    name: "Other Deductions",
    amount: null,
  },
];

const salarySlipsData = [
  {
    id: 1,
    month: "February 2026",
    processedDate: "Jan 30, 2026",
    fileName: "salary-slip-february-2026.pdf",
  },
  {
    id: 2,
    month: "January 2026",
    processedDate: "Dec 30, 2025",
    fileName: "salary-slip-january-2026.pdf",
  },
  {
    id: 3,
    month: "December 2025",
    processedDate: "Nov 30, 2025",
    fileName: "salary-slip-december-2025.pdf",
  },
  {
    id: 4,
    month: "November 2025",
    processedDate: "Oct 30, 2025",
    fileName: "salary-slip-november-2025.pdf",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const formatAmount = (amount) => {
  if (amount === null || amount === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN").format(amount);
};

/* =========================================================
   COMPONENT
========================================================= */

const Payroll = () => {
  const { theme } = useThemeContext();

  const [selectedYear, setSelectedYear] = useState("2026");

  /* =========================================================
     THEME COLORS
  ========================================================= */

  console.log("themes__", theme.foundation);

  const colors = useMemo(
    () => ({
      primary:
        theme?.foundation?.primaryColor || "var(--color-primary, #F97316)",

      layoutBackground:
        theme?.foundation.profilePanelBackground ||
        "var(--color-layout-background, #FFF7ED)",

      surfaceBackground:
        theme?.foundation?.surfaceBackground ||
        "var(--color-surface-background, #FFFFFF)",

      sidebarBackground:
        theme?.colors?.sidebarBackground ||
        "var(--color-sidebar-background, #FFEFD5)",

      headerBackground:
        theme?.colors?.headerBackground ||
        "var(--color-header-background, #FFF1E6)",

      textPrimary:
        theme?.foundation?.primaryColor || "var(--color-text-primary, #1F2937)",
    }),
    [theme],
  );

  /* =========================================================
     DATA
  ========================================================= */

  const filteredSlips = salarySlipsData.filter((slip) =>
    slip.month.includes(selectedYear),
  );

  const totalEarnings = earningsData.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const totalDeductions = deductionsData.reduce(
    (total, item) => total + (item.amount || 0),
    0,
  );

  const ctc = totalEarnings;

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleDownload = (slip) => {
    /*
      Replace this with your API/download logic.

      Example:

      window.open(
        `/api/payroll/salary-slip/${slip.id}/download`,
        "_blank"
      );
    */

    console.log("Downloading:", slip.fileName);
  };

  const handleView = (slip) => {
    /*
      Replace this with your PDF viewer/navigation logic.
    */

    console.log("Viewing:", slip.fileName);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
        p: {
          xs: 1.5,
          sm: 2,
          md: 2.5,
        },
        backgroundColor: colors.layoutBackground,
        color: colors.textPrimary,
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {/* =====================================================
          PAYROLL STRUCTURE
      ====================================================== */}

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          backgroundColor: colors.surfaceBackground,
          border: "1px solid rgba(148, 163, 184, 0.22)",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow:
            "0 1px 2px rgba(15, 23, 42, 0.03), 0 4px 12px rgba(15, 23, 42, 0.03)",
        }}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <Box
          sx={{
            minHeight: 62,
            display: "flex",
            alignItems: "center",
            px: {
              xs: 1.75,
              sm: 2.5,
            },
            borderBottom: "1px solid rgba(148, 163, 184, 0.18)",
            backgroundColor: colors.surfaceBackground,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <Box
              sx={{
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "7px",
                backgroundColor: `${colors.primary}12`,
                color: colors.primary,
                flexShrink: 0,

                "& svg": {
                  fontSize: 17,
                },
              }}
            >
              <AccountBalanceWalletOutlined />
            </Box>

            <Typography
              component="h2"
              sx={{
                m: 0,
                fontSize: 17,
                fontWeight: 700,
                color: colors.textPrimary,
                letterSpacing: "-0.2px",
              }}
            >
              Payroll Structure
            </Typography>
          </Stack>
        </Box>

        {/* =====================================================
            PAYROLL TABLE
        ====================================================== */}

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
          }}
        >
          {/* ================= EARNINGS ================= */}

          <Box
            sx={{
              minWidth: 0,
              borderRight: {
                xs: "none",
                md: "1px solid rgba(148, 163, 184, 0.18)",
              },
              borderBottom: {
                xs: "1px solid rgba(148, 163, 184, 0.18)",
                md: "none",
              },
            }}
          >
            {/* Column Header */}

            <Box
              sx={{
                minHeight: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.75,
                backgroundColor: `${colors.primary}0D`,
                borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.125}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    backgroundColor: "#DCFCE7",
                    color: "#16A34A",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  −
                </Box>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: colors.primary,
                    letterSpacing: "0.2px",
                  }}
                >
                  EARNINGS
                </Typography>
              </Stack>

              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: 9,
                  lineHeight: "12px",
                  fontWeight: 700,
                  color: "#64748B",
                }}
              >
                AMOUNT
                <br />
                (INR)
              </Typography>
            </Box>

            {/* Column Body */}

            <Box sx={{ width: "100%" }}>
              {earningsData.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    minHeight: 41,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "minmax(0, 1fr) 100px",
                      sm: "minmax(0, 1fr) 120px",
                    },
                    alignItems: "center",
                    px: {
                      xs: 1.25,
                      sm: 1.75,
                    },
                    borderBottom: "1px solid rgba(148, 163, 184, 0.13)",

                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: 13,
                      fontWeight: 500,
                      color: colors.textPrimary,
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    sx={{
                      textAlign: "right",
                      fontSize: 13,
                      fontWeight: 500,
                      color: colors.textPrimary,
                    }}
                  >
                    {formatAmount(item.amount)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* ================= DEDUCTIONS ================= */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            {/* Column Header */}

            <Box
              sx={{
                minHeight: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.75,
                backgroundColor: `${colors.primary}0D`,
                borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.125}>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    backgroundColor: `${colors.primary}18`,
                    color: colors.primary,

                    "& svg": {
                      fontSize: 15,
                    },
                  }}
                >
                  <Remove />
                </Box>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: colors.primary,
                    letterSpacing: "0.2px",
                  }}
                >
                  DEDUCTIONS
                </Typography>
              </Stack>

              <Typography
                sx={{
                  textAlign: "right",
                  fontSize: 9,
                  lineHeight: "12px",
                  fontWeight: 700,
                  color: "#64748B",
                }}
              >
                AMOUNT
                <br />
                (INR)
              </Typography>
            </Box>

            {/* Column Body */}

            <Box sx={{ width: "100%" }}>
              {deductionsData.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    minHeight: 41,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "minmax(0, 1fr) 100px",
                      sm: "minmax(0, 1fr) 120px",
                    },
                    alignItems: "center",
                    px: {
                      xs: 1.25,
                      sm: 1.75,
                    },
                    borderBottom: "1px solid rgba(148, 163, 184, 0.13)",

                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: 13,
                      fontWeight: 500,
                      color: item.amount ? colors.textPrimary : "#64748B",
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    sx={{
                      textAlign: "right",
                      fontSize: 13,
                      fontWeight: 500,
                      color: item.amount ? colors.textPrimary : "#94A3B8",
                    }}
                  >
                    {formatAmount(item.amount)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* =====================================================
            CTC
        ====================================================== */}

        <Box
          sx={{
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.75,
            backgroundColor: `${colors.primary}0A`,
            borderTop: "1px solid rgba(148, 163, 184, 0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#57534E",
            }}
          >
            COST TO THE COMPANY (CTC)
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 800,
              color: colors.primary,
            }}
          >
            ₹{formatAmount(ctc)}
          </Typography>
        </Box>
      </Paper>

      {/* =====================================================
          SALARY SLIPS
      ====================================================== */}

      <Box
        component="section"
        sx={{
          width: "100%",
          mt: 2.5,
        }}
      >
        {/* =====================================================
            SALARY HEADER
        ====================================================== */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,

            "@media (max-width:600px)": {
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 1.5,
            },
          }}
        >
          {/* Title */}

          <Stack direction="row" alignItems="center" spacing={1.125}>
            <Box
              sx={{
                width: 29,
                height: 29,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "7px",
                backgroundColor: `${colors.primary}12`,
                color: colors.primary,

                "& svg": {
                  fontSize: 17,
                },
              }}
            >
              <HistoryOutlined />
            </Box>

            <Typography
              component="h2"
              sx={{
                m: 0,
                fontSize: 17,
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              Salary Slips
            </Typography>
          </Stack>

          {/* Year Filter */}

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              sx={{
                fontSize: 13,
                color: "#64748B",
              }}
            >
              Filter by Year:
            </Typography>

            <FormControl
              size="small"
              sx={{
                minWidth: 92,

                "& .MuiOutlinedInput-root": {
                  height: 34,
                  borderRadius: "7px",
                  backgroundColor: colors.surfaceBackground,
                  color: colors.textPrimary,
                  fontSize: 13,
                  fontWeight: 500,

                  "& fieldset": {
                    borderColor: "rgba(148, 163, 184, 0.35)",
                  },

                  "&:hover fieldset": {
                    borderColor: colors.primary,
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: colors.primary,
                    borderWidth: "1px",
                  },
                },

                "& .MuiSelect-select": {
                  py: 0,
                  display: "flex",
                  alignItems: "center",
                  height: "34px",
                  boxSizing: "border-box",
                },
              }}
            >
              <Select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
              >
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* =====================================================
            SALARY SLIP LIST
        ====================================================== */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.25,

            /*
              Approximately two salary slips visible at once.
              User can vertically scroll for more.
            */
            maxHeight: 150,
            overflowY: "auto",
            pr: 0.25,

            scrollbarWidth: "thin",

            "&::-webkit-scrollbar": {
              width: 5,
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: 10,
              backgroundColor: "rgba(100, 116, 139, 0.3)",
            },
          }}
        >
          {filteredSlips.length > 0 ? (
            filteredSlips.map((slip) => (
              <Paper
                key={slip.id}
                elevation={0}
                sx={{
                  minHeight: 66,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.625,
                  py: 1.25,
                  backgroundColor: colors.surfaceBackground,
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "9px",
                  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.03)",
                  transition:
                    "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",

                  "&:hover": {
                    borderColor: `${colors.primary}45`,
                    boxShadow: "0 3px 10px rgba(15, 23, 42, 0.05)",
                  },

                  "@media (max-width:550px)": {
                    alignItems: "flex-start",
                    gap: 1.5,
                  },
                }}
              >
                {/* Left */}

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    minWidth: 0,
                  }}
                >
                  {/* Rupee Icon */}

                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9px",
                      backgroundColor: `${colors.primary}DD`,
                      color: "#FFFFFF",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    ₹
                  </Box>

                  {/* Information */}

                  <Box
                    sx={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.25,
                    }}
                  >
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontSize: 13,
                        fontWeight: 700,
                        color: colors.textPrimary,
                      }}
                    >
                      {slip.month}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 10,
                        color: "#94A3B8",
                      }}
                    >
                      Processed on {slip.processedDate}
                    </Typography>
                  </Box>
                </Stack>

                {/* Actions */}

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    flexShrink: 0,

                    "@media (max-width:450px)": {
                      gap: 0.625,
                    },
                  }}
                >
                  {/* View */}

                  <IconButton
                    type="button"
                    onClick={() => handleView(slip)}
                    title="View salary slip"
                    size="small"
                    sx={{
                      width: 34,
                      height: 32,
                      border: "1px solid rgba(148, 163, 184, 0.18)",
                      borderRadius: "7px",
                      backgroundColor: colors.surfaceBackground,
                      color: "#64748B",
                      transition: "all 0.2s ease",

                      "& svg": {
                        fontSize: 17,
                      },

                      "&:hover": {
                        color: colors.primary,
                        borderColor: `${colors.primary}55`,
                        backgroundColor: `${colors.primary}08`,
                      },
                    }}
                  >
                    <VisibilityOutlined />
                  </IconButton>

                  {/* Download */}

                  <Button
                    type="button"
                    onClick={() => handleDownload(slip)}
                    variant="outlined"
                    startIcon={<DownloadOutlined />}
                    sx={{
                      height: 32,
                      minWidth: "auto",
                      px: 1.375,
                      border: `1px solid ${colors.primary}88`,
                      borderRadius: "7px",
                      backgroundColor: colors.surfaceBackground,
                      color: colors.primary,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "none",
                      transition: "all 0.2s ease",

                      "& .MuiButton-startIcon": {
                        margin: 0,
                        mr: 0.625,
                      },

                      "& svg": {
                        fontSize: 16,
                      },

                      "&:hover": {
                        color: "#FFFFFF",
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        boxShadow: "none",
                      },

                      "&:active": {
                        transform: "translateY(1px)",
                      },

                      "@media (max-width:450px)": {
                        px: 1,

                        "& .MuiButton-startIcon": {
                          margin: 0,
                        },

                        "& .MuiButton-startIcon + span": {
                          display: "none",
                        },
                      },
                    }}
                  >
                    Download
                  </Button>
                </Stack>
              </Paper>
            ))
          ) : (
            <Box
              sx={{
                minHeight: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                backgroundColor: colors.surfaceBackground,
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "9px",
                color: "#94A3B8",
                fontSize: 13,

                "& svg": {
                  fontSize: 19,
                },
              }}
            >
              <CalendarMonthOutlined />

              <Typography
                component="span"
                sx={{
                  fontSize: 13,
                  color: "#94A3B8",
                }}
              >
                No salary slips available for {selectedYear}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Payroll;
