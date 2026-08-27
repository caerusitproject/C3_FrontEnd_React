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
import AddRequestAsset from "./AddRequestAsset";

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

export default function RequestAssetTable() {
  const assetRequest = useSelector(
    (state) => state.assetRequest.assetRequestAll,
  );
  const totalAssets = useSelector((state) => state.assetRequest.countAsset);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0,
  //   pageSize: 5,
  // });

  React.useEffect(() => {
    dispatch(actions.fetchrequestAssetDashboard());
  }, [dispatch]);

  console.log("assetRequest_____", assetRequest);

  return (
    <>
      <Box
        sx={{
          p: 4,
          width: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              Request Asset
            </Typography>

            <Typography
              sx={{
                color: "#6B7280",
                mt: 0.5,
              }}
            >
              Manage and monitor your professional workspace equipment.
            </Typography>
          </Box>

          <Button onClick={() => setOpen(true)}>Request Asset</Button>
        </Box>

        {/* Body */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          {/* Total Assets Card */}
          <Card
            elevation={0}
            sx={{
              width: 170,
              minWidth: 170,
              borderRadius: 3,
              p: 3,
              bgcolor: "#F8F9FB",
              border: "1px solid #ECECEC",
              alignSelf: "flex-start",
            }}
          >
            <LaptopMacOutlinedIcon
              sx={{
                color: "#FF914D",
                fontSize: 20,
                mb: 2,
              }}
            />

            <Typography
              sx={{
                color: "#8A8A8A",
                fontSize: 13,
              }}
            >
              Total Assets
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 42,
                fontWeight: 700,
                color: "#FF914D",
              }}
            >
              {String(totalAssets || 0).padStart(2, "0")}
            </Typography>
          </Card>

          {/* Table Card */}
          <Card
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 3,
              p: 3,
              border: "1px solid #ECECEC",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 700,
              }}
            >
              My Assigned Assets
            </Typography>

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
                              asset.status === "Maintenance"
                                ? "#D14343"
                                : "#444",
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
      </Box>

      <AddRequestAsset open={open} setOpen={setOpen} />
    </>
  );
}
