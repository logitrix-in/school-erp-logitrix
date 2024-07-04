import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Bbox from "../../components/UiComponents/Bbox";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Notify from "../../components/admission/post onboarding/popup/Notify";
import Engage from "../../components/admission/post onboarding/popup/Engage";

const AdmissionPostOnboarding = () => {
  const [acYear, setAcYear] = useState("2023-24");

  const [series, setSeries] = useState([88, 12]);

  const options = {
    labels: ["Installed ", "Not Installed"],
    colors: ["#00A76F", "#FF5630"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "14px",
      itemMargin: {
        horizontal: 10,
        vertical: 20,
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 1000,
        },
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 10,
        opacity: 0.1,
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: false,
              label: [
                `${series?.[0]}/${series?.reduce(
                  (accumulator, currentValue) => {
                    return accumulator + currentValue;
                  },
                  0
                )}`,
                "Installed",
                "Successfully",
              ],
              color: "#00000",
              fontWeight: "500",
            },
            value: {
              offsetY: 0,
            },
          },
        },
      },
    },
  };

  const [notifyOpen, setNotpen] = useState(false);
  const [engageOpen, setEngageOpen] = useState(false);
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Bbox borderRadius={1}>
        <Typography
          py={1.3}
          px={3}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          Notificaton Center
        </Typography>
        <Divider />
        <Box p={3} display={"flex"} gap={1}>
          <Button fullWidth variant="contained" onClick={() => setNotpen(true)}>
            Notify
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setEngageOpen(true)}
          >
            Engage
          </Button>
        </Box>
      </Bbox>

      <Notify open={notifyOpen} close={() => setNotpen(false)} />
      <Engage open={engageOpen} close={() => setEngageOpen(false)} />

      <Bbox borderRadius={1}>
        <Typography
          py={1.3}
          px={3}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          App Installation Compliance
        </Typography>
        <Divider />
        <Box p={2}>
          <FormControl sx={{ width: "13rem" }}>
            <InputLabel>Academic Year</InputLabel>
            <Select
              label="Academic Year"
              value={acYear}
              onChange={(e) => setAcYear(e.target.value)}
            >
              <MenuItem value={"2021-22"}>2021-22</MenuItem>
              <MenuItem value={"2023-24"}>2023-24</MenuItem>
              <MenuItem value={"2024-25"}>2024-25</MenuItem>
              <MenuItem value={"2025-26"}>2025-26</MenuItem>
            </Select>
          </FormControl>

          <Box display={"flex"} mt={3} justifyContent={"center"} gap={2}>
            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Bbox borderRadius={1}>
                <Typography p={2} fontWeight={500}>
                  Student App Installation Compliance
                </Typography>
                <Divider />
                <Box>
                  <Chart
                    options={options}
                    series={series}
                    type="donut"
                    height={400}
                  />
                </Box>
              </Bbox>
            </Box>

            <Box display={"flex"} flex={1}>
              <Bbox borderRadius={1}>
                <Typography p={2} fontWeight={500}>
                  Parent App Installation Compliance
                </Typography>
                <Divider />
                <Chart
                  options={options}
                  series={series}
                  type="donut"
                  height={400}
                />
              </Bbox>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button fullWidth variant="contained">
                Send Reminder
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined">
                Download Report
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Bbox>

      <Bbox borderRadius={1}>
        <Typography
          py={1.3}
          px={3}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          Ticket Log
        </Typography>
        <Divider />
        <Box
          p={3}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <FormControl sx={{ width: "13rem" }}>
            <InputLabel>Academic Year</InputLabel>
            <Select
              label="Academic Year"
              value={acYear}
              onChange={(e) => setAcYear(e.target.value)}
            >
              <MenuItem value={"2021-22"}>2021-22</MenuItem>
              <MenuItem value={"2023-24"}>2023-24</MenuItem>
              <MenuItem value={"2024-25"}>2024-25</MenuItem>
              <MenuItem value={"2025-26"}>2025-26</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="secondary">
            Set Rule
          </Button>
        </Box>
        <Box mx={3} mb={2} display={"flex"} gap={2}>
          <Button
            fullWidth
            variant="contained"
            LinkComponent={Link}
            to={"manage-ticket/"}
          >
            Open Tickets (122)
          </Button>
          <Button fullWidth variant="contained">
            Close Tickets (432)
          </Button>
        </Box>
      </Bbox>
    </Box>
  );
};

export default AdmissionPostOnboarding;
