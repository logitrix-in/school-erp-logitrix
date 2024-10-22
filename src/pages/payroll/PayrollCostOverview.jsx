import { Box, Divider, Typography, Button } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import EmployeePopup from "@/components/employee/EmployeePopup";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import Chart from "react-apexcharts";

const PayrollCostOverview = () => {
    const [employeePopup, setEmployeePopup] = useState(false);

    // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isLarge = useMediaQuery("(min-width: 1920px)");

    const MultilineHeader = ({ colDef }) => {
      return (
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4', fontWeight: '600' }}>
              {colDef.headerName}
          </div>
      );
  };

    const columns = [
      {field: "space", headerName: " ", flex: 0.2},
      {
        field: "id",
        headerName: "Employee ID",
        flex: 1,
        renderCell: (params) => (
          <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setEmployeePopup(true)}>
            {params.value}
          </Typography>
        ),
      },
      {
        field: "name",
        headerName: "Employee Name",
        flex: 1,
      },
      {
        field: "grade",
        headerName: "Grade",
        flex: 0.5,
      },
      {
        field: "status",
        headerName: "Employee Status", flex: 0.7,
        renderCell: (params) => (
          <Box
            style={{
              backgroundColor:
                params.value === "Active"
                  ? "#C6F6D5"
                  : params.value === "Inactive"
                    ? "#FFCCCC"
                    : "transparent",
              borderRadius: "6px",
              display: "inline-block",
              width:
                params.value === "Active" || params.value === "Inactive"
                  ? "auto"
                  : "auto",
              paddingLeft:
                params.value === "Active"
                  ? "7px"
                  : params.value === "Inactive"
                    ? "7px"
                    : "0px",
              paddingRight:
                params.value === "Active"
                  ? "7px"
                  : params.value === "Inactive"
                    ? "7px"
                    : "0px",
            }}
          >
            {params.value}
          </Box>
        ),
      },
      {
        field: "pay_run_status",
        headerName: "Pay Run Status\nfor Current Month", flex: 0.7,
          renderHeader: (params) => <MultilineHeader colDef={params.colDef} />,
        renderCell: (params) => (
          <Box
            style={{
              backgroundColor:
                params.value === "Ready"
                  ? "#BEE3F8"
                  : params.value === "Not Ready"
                    ? "#FED7D7"
                    : params.value === "Eligible"
                    ? "#E2E8F0"
                    : params.value === "Successful"
                    ? "#C6F6D5"
                    : "transparent",
              width:
                params.value === "Ready"
                  ? "60px"
                  : params.value === "Not Ready"
                    ? "80px"
                    : params.value === "Eligible"
                    ? "60px"
                    : params.value === "Successful"
                    ? "80px"
                    : "transparent",
              textAlign: "center",
              borderRadius: "6px",
              display: "inline-block",
            }}
          >
            {params.value}
          </Box>
        ),
      },
    ];
  
    const rows = [
      {
        id: "AG240001",
        name: "Saurav Ray",
        grade: "C1",
        status: "Active",
        pay_run_status: "Ready",
      },
      {
        id: "AG240002",
        name: "Saurav Ray",
        grade: "C1",
        status: "Active",
        pay_run_status: "Not Ready",
      },
      {
        id: "AG240003",
        name: "Saurav Ray",
        grade: "C1",
        status: "Active",
        pay_run_status: "Eligible",
      },
      {
        id: "AG240004",
        name: "Saurav Ray",
        grade: "C1",
        status: "Active",
        pay_run_status: "Successful",
      },
    ];

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Overview
                </Typography>
            </Box>

            <Divider />
            <Box
                p={2}
                display={'flex'}
            >

<Box width={'60%'}>
           <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              flexDirection={'column'}
              alignItems={"center"}
              sx={{
                background: "linear-gradient(to right, #9BD9F4, #C2DFED)",
              }}
              position={"relative"}
            >
            
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={'100%'} py={2}>
              <Typography fontSize={"1.5rem"} color={"#00494E"} fontWeight={600} >
                  129
                </Typography>
                <Typography
                fontSize={"1.4rem"}
                  fontWeight={500}
                  color={"#515151"}
                  lineHeight={1.2}
                >
                  Total Employees
                </Typography>
              </Box>

            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} my={2}>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={'100%'} py={2} borderRight={"2px solid #999898"} >
              <Typography fontSize={"1.2rem"} color={"#00494E"} fontWeight={600}>
                  118
                </Typography>
                <Typography
                  fontWeight={500}
                  color={"#515151"}
                  lineHeight={1.2}
                  textAlign={'center'}
                >
                  Full Time Employee
                </Typography>
              </Box>

              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={'100%'} py={2} borderRight={"2px solid #999898"}>
              <Typography fontSize={"1.2rem"} color={"#00494E"} fontWeight={600}>
                  4
                </Typography>
                <Typography
                  fontWeight={500}
                  color={"#515151"}
                  lineHeight={1.2}
                >
                  Under FFS Settlement
                </Typography>
              </Box>

              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={'100%'} py={2} borderRight={"2px solid #999898"}>
              <Typography fontSize={"1.2rem"} color={"#00494E"} fontWeight={600}>
                  5
                </Typography>
                <Typography
                  fontWeight={500}
                  color={"#515151"}
                  lineHeight={1.2}
                >
                Contractual
                </Typography>
              </Box>

              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={'100%'} py={2}>
              <Typography fontSize={"1.2rem"} color={"#00494E"} fontWeight={600}>
                  2
                </Typography>
                <Typography
                  fontWeight={500}
                  color={"#515151"}
                  lineHeight={1.2}
                >
                Intern
                </Typography>
              </Box>
              </Box>
            </Box>
          </Box>
          </Box>

            <Box width={'40%'} ml={2} height={'100%'}>
            <div style={{ width: "100%", overflow: "hidden" }}>
                <Bbox
                  borderRadius={1}
                  px={0}
                  py={0}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  position={"relative"}
                >
                  {/* Title above the chart */}
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    color={"black"}
                    textAlign={'center'}
                    style={{
                      marginBottom: "0.5rem",
                      marginLeft: "1.5rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    Total Employees
                  </Typography>

                  {/* chart */}
                  <div style={{ padding: "20px 0px", paddingRight: isSmall ? "91px" : "90px" }}>
                    <Chart
                      options={{
                        chart: {
                          type: "donut",
                          toolbar: {
                            show: false,
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        plotOptions: {
                          pie: {
                            donut: {
                              size: "70rem", // chart thickness
                              labels: {
                                show: false,
                              },
                            },
                          },
                        },
                        legend: {
                          show: false,
                        },
                        colors: [
                          "#0072DB",
                          "#C6CA00",
                          "#FF6163",
                          "#00E781",
                          "#817E7E",
                        ],
                        labels: [
                          "Hinduism",
                          "Islam",
                          "Christianity",
                          "Sikhism",
                          "Others",
                        ],
                      }}
                      series={[40, 30, 15, 10, 5]} // religious data
                      type="donut"
                      width="100%"
                      height="200"
                    />
                  </div>

                  {/* total number in the middle of the chart */}
                  <div
                    style={{
                      position: "absolute",
                      top: "5.8rem",
                      left: isLaptop
                        ? "5.8rem"
                        : isTablet
                        ? "4.1rem"
                        : isLarge
                        ? "39%"
                        : isSmall
                        ? "38%"
                        : "37%",
                      transform: "translate(185%, 35%)",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    <span style={{ paddingLeft: "40%" }}>100</span>
                    <br />
                    <span style={{ paddingLeft: "20%" }}>Total</span>
                  </div>

                  {/* Custom label names */}
                  <Box
                    style={{
                      position: "absolute",
                      marginTop: 48,
                      marginLeft: isTablet ? "63%" : "64%",
                      gap: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* hinduism */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#0072DB",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                      Full Time Employee
                      </Typography>
                    </div>

                    {/* islam */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#C6CA00",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                      FFS
                      </Typography>
                    </div>

                    {/* christianity */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#FF6163",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                      Contractual
                      </Typography>
                    </div>

                    {/* sikhism */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#00E781",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                      Intern
                      </Typography>
                    </div>

                  </Box>
                </Bbox>
              </div>

            </Box>
            </Box >

            <Box style={{ height: "100%" }} px={2} mb={4}>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>

        <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
        </Bbox >
    );
};

export default PayrollCostOverview;
