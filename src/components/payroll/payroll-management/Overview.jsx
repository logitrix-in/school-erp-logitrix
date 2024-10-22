import { Box, Divider, Typography, Button } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import ViewAllPendingIssues from "./ViewAllPendingIssues";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useNavigate } from "react-router-dom";
import OTPVerificationPopup from "./OTPVerificationPopup";
import RunPayrollBatch from "./RunPayrollBatch";
import RunPayrollBatchWarning from "./RunPayrollBatchWarning";

const UpcomingExaminationSchedule = () => {
  const navigate = useNavigate();

  const [readyStatus, setReadyStatus] = useState(true);

  const [viewAllPendingIssuesPopup, setViewAllPendingIssuesPopup] =
    useState(false);
  const [otpVerificationPopup, setOTPVerificationPopup] = useState(false);
  const [runPayrollBatchPopup, setRunPayrollBatchPopup] = useState(false);
  const [runPayrollBatchWarningPopup, setRunPayrollBatchWarningPopup] =
    useState(false);

  return (
    <Bbox borderRadius={2} overflow={"hidden"}>
      <Box
        bgcolor={"white"}
        py={1.3}
        px={2}
        borderRadius={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontWeight={"700"} fontSize={"1.1rem"}>
          Overview
        </Typography>
      </Box>

      <Divider />
      <Box p={2} display={"flex"}>
        <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
          <Box
            flex={1}
            borderRadius={1}
            p={2}
            display={"flex"}
            alignItems={"center"}
            sx={{
              background: "linear-gradient(to right, #9BD9F4, #C2DFED)",
            }}
            position={"relative"}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "end",
                gap: 0.5,
              }}
            >
              <Typography
                sx={{ color: "#19469F", textDecoration: "underline" }}
                onClick={() => navigate("/payroll/payroll-manager/overview")}
              >
                Detailed View
              </Typography>
              <DescriptionOutlinedIcon />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              width={"100%"}
              py={2}
            >
              <Typography
                fontSize={"1.4rem"}
                fontWeight={500}
                color={"#515151"}
                lineHeight={1.2}
              >
                Eligible for June 2024 Payroll
              </Typography>
              <Typography
                fontSize={"1.5rem"}
                color={"#00494E"}
                fontWeight={600}
              >
                118/129
              </Typography>
            </Box>
          </Box>

          <Box
            flex={1}
            borderRadius={1}
            p={2}
            display={"flex"}
            alignItems={"center"}
            sx={{
              background: "linear-gradient(to right, #E59D7A, #FAD2C0)",
            }}
            position={"relative"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              width={"100%"}
              py={2}
            >
              <Typography
                fontSize={"1.4rem"}
                fontWeight={500}
                color={"#515151"}
                lineHeight={1.2}
              >
                Upcoming Payment Date
              </Typography>
              <Typography
                fontSize={"1.5rem"}
                color={"#C4673B"}
                fontWeight={600}
              >
                30 Jun 2024
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box width={"50%"} ml={2}>
          <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              alignItems={"center"}
              sx={{
                background: "#ECEDED",
              }}
              position={"relative"}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                width={"100%"}
                py={2}
              >
                <Typography
                  fontSize={"1.4rem"}
                  fontWeight={500}
                  color={"#515151"}
                  lineHeight={1.2}
                >
                  Pay Run for June 2024-
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOTPVerificationPopup(true)}
                >
                  Run Payroll Batch
                </Button>
              </Box>
            </Box>

            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              alignItems={"center"}
              sx={{
                border: "2px solid #DADADA",
              }}
              position={"relative"}
            >
              <Typography
                sx={{
                  color: "#19469F",
                  textDecoration: "underline",
                  position: "absolute",
                  top: 8,
                  right: 12,
                  cursor: "pointer",
                }}
                onClick={() => setViewAllPendingIssuesPopup(true)}
              >
                View All
              </Typography>

              <Box display={"flex"} flexDirection={"column"}>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li style={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "#19469F",
                        textDecoration: "underline",
                        mb: 0.8,
                        cursor: "pointer",
                      }}
                    >
                      5 Employees with No/incorrect Bank details.
                    </Typography>
                  </li>
                  <li style={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "#19469F",
                        textDecoration: "underline",
                        mb: 0.8,
                        cursor: "pointer",
                      }}
                    >
                      11 pending reimbursement requests.
                    </Typography>
                  </li>
                  <li style={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "#19469F",
                        textDecoration: "underline",
                        mb: 0.8,
                        cursor: "pointer",
                      }}
                    >
                      3 Employees with No/incorrect PAN Card.
                    </Typography>
                  </li>
                  <li style={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "#19469F",
                        textDecoration: "underline",
                        mb: 0.8,
                        cursor: "pointer",
                      }}
                    >
                      Professional Tax not set for West Bengal.
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box></Box>
        <ViewAllPendingIssues
          open={viewAllPendingIssuesPopup}
          close={() => setViewAllPendingIssuesPopup(false)}
        />

        <OTPVerificationPopup
          open={otpVerificationPopup}
          close={() => setOTPVerificationPopup(false)}
          readyStatus={readyStatus}
          setRunPayrollBatchPopup={setRunPayrollBatchPopup}
          setRunPayrollBatchWarningPopup={setRunPayrollBatchWarningPopup}
        />
        <RunPayrollBatch
          open={runPayrollBatchPopup}
          close={() => setRunPayrollBatchPopup(false)}
        />
        <RunPayrollBatchWarning
          open={runPayrollBatchWarningPopup}
          close={() => setRunPayrollBatchWarningPopup(false)}
        />
      </Box>
    </Bbox>
  );
};

export default UpcomingExaminationSchedule;
