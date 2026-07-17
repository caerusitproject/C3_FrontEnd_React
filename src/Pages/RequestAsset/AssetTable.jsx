import React from "react";
import {
  Card,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  LinearProgress,
  Avatar,
} from "@mui/material";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import Button from "../../Components/ui/Button/Button";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const assets = [
  {
    id: 1,
    name: 'MacBook Pro\n16" M2',
    serial: "MBP-2023-X982",
    assigned: "Oct 12, 2023",
    status: "Active",
    life: 70,
    lifeText: "Expires in 14 months",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    serial: "SNY-HP-5521",
    assigned: "Dec 05, 2023",
    status: "Active",
    life: 85,
    lifeText: "Expires in 22 months",
  },
  {
    id: 3,
    name: 'Dell UltraSharp\n27"',
    serial: "DEL-MON-0042",
    assigned: "Jan 18, 2023",
    status: "Maintenance",
    life: 15,
    lifeText: "Action Required\nDue for service",
  },
];

export default function AssetTable() {
  const assetRequest = useSelector(
    (state) => state.assetRequest.assetRequestAll,
  );
  const totalAssets = useSelector((state) => state.assetRequest.countAsset);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchrequestAssetDashboard());
  }, [dispatch]);

  console.log("assetRequest_____", assetRequest);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        alignItems: "flex-start",
        padding: "35px",
        width: "100%",
      }}
    >
      {/* Left Card */}
      <Card
        elevation={0}
        sx={{
          width: 180,
          minWidth: 180,
          borderRadius: "14px",
          background: "#F8F9FB",
          border: "1px solid #F0F0F0",
          p: 3,
          minHeight: 165,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <LaptopMacOutlinedIcon
          sx={{
            color: "#FF914D",
            fontSize: 18,
            mb: 2,
          }}
        />

        <Typography
          sx={{
            color: "#777",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Total Assets
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 44,
            color: "#FF914D",
            mt: 1,
          }}
        >
          {String(totalAssets ? totalAssets : "").padStart(2, "0")}
        </Typography>
      </Card>

      {/* Right Card */}
      <Card
        elevation={0}
        sx={{
          flex: 1, // Takes remaining width
          width: 0, // Important for proper flex shrinking
          borderRadius: 4,
          p: 3,
          background: "#fff",
        }}
      >
        {/* Your complete table here */}
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 14px",
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "",
                "ASSET NAME",
                "ASSET ID / SERIAL",
                "DATE ASSIGNED",
                "STATUS",
                "AMC / ASSET LIFE",
              ].map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    border: 0,
                    color: "#9CA3AF",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: 1,
                    background: "transparent",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {assetRequest &&
              assetRequest.length > 0 &&
              assetRequest.map((asset) => (
                <TableRow key={asset.assetId}>
                  <TableCell
                    sx={{
                      border: 0,
                      background: "#F7F7F8",
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                      width: 70,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#fff",
                        color: "#C66B2D",
                        width: 34,
                        height: 34,
                      }}
                    >
                      💻
                    </Avatar>
                  </TableCell>

                  <TableCell
                    sx={{
                      border: 0,
                      background: "#F7F7F8",
                      fontWeight: 600,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {asset.assetName}
                  </TableCell>

                  <TableCell
                    sx={{
                      border: 0,
                      background: "#F7F7F8",
                      color: "#6B7280",
                    }}
                  >
                    {asset.serialNumber}
                  </TableCell>

                  <TableCell
                    sx={{
                      border: 0,
                      background: "#F7F7F8",
                      color: "#6B7280",
                    }}
                  >
                    {asset.allocatedDate}
                  </TableCell>

                  <TableCell
                    sx={{
                      border: 0,
                      background: "#F7F7F8",
                    }}
                  >
                    <Chip
                      size="small"
                      label={asset.allocationStatusCodeValueId}
                      sx={{
                        fontWeight: 600,
                        bgcolor:
                          asset.status === "Active" ? "#DDF8DD" : "#E8EEF8",
                        color:
                          asset.status === "Active" ? "#12823C" : "#5577AA",
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      border: 0,
                      background: "#F7F7F8",
                      borderTopRightRadius: 12,
                      borderBottomRightRadius: 12,
                      minWidth: 180,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color:
                          asset.status === "Maintenance" ? "#D14343" : "#444",
                        whiteSpace: "pre-line",
                        fontSize: 14,
                        mb: 1,
                      }}
                    >
                      {asset.amcExpiry}
                    </Typography>

                    {asset.status === "Active" && (
                      <LinearProgress
                        variant="determinate"
                        value={asset.life}
                        sx={{
                          height: 4,
                          borderRadius: 5,
                          backgroundColor: "#ECECEC",

                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#B46B2A",
                          },
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
