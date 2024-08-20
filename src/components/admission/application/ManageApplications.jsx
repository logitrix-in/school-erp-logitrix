import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageTable from "./components/ManageTable";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import api from "../../../config/api";
import { LoadingButton } from "@mui/lab";
import EditManageApplication from "./popups/EditManageApplication";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";

const ManageApplications = () => {
  const [rows, setRows] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const [startLoading, setStartLoading] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);

  function fetchData() {
    api
      .get("/admission/application/manage-application/")
      .then((res) => {
        const data = res.data;
        setRows(
          data.map((d) => {
            return {
              id: d.id,
              startingDate: d.application_open,
              closingDate: d.application_close,
              class: d.class_name,
              applicationStatus: d.is_active.toString(),
            };
          })
        );
      })
      .catch((err) => { });
  }
  useEffect(() => {
    fetchData();
  }, []);

  // open all

  const [openDates, setOpenDates] = useState({
    start_date: new Date().toLocaleDateString("en-CA"),
    end_date: new Date(dayjs().add(7, "day")).toLocaleDateString("en-CA"),
  });

  useEffect(() => { }, [openDates]);

  // close all

  const [closeDate, setCloseDate] = useState(
    new Date(dayjs().add(1, "day")).toLocaleDateString("en-CA")
  );

  useEffect(() => { }, [closeDate]);

  return (
    <>
      <RevealCard>
        <Bbox mt={3} borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={1}
          >
            <Typography
              fontWeight={"700"}
              borderRadius={1}
              fontSize={"1.1rem"}
              mr={"auto"}
            >
              Manage Application
            </Typography>
          </Box>
          <Divider />

          <ToastContainer />

          <Box
            p={3}
            display={"flex"}
            alignItems={"center"}
            flexDirection={{ xs: "column", lg: "row" }}
            gap={2}
          >
            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignItems={{ xs: "stretch", lg: "center" }}
              gap={2}
            >
              <Bbox
                p={2}
                flex={1}
                display={"flex"}
                gap={2}
                flexDirection={"column"}
                borderRadius={1}
              >
                <DatePicker
                  label="Opening Date"
                  format="DD MMM YYYY"
                  defaultValue={new dayjs()}
                  minDate={new dayjs()}
                  maxDate={dayjs(new Date(openDates.end_date))}
                  onChange={(e) =>
                    setOpenDates((prev) => ({
                      ...prev,
                      start_date: new Date(e).toLocaleDateString("en-CA"),
                    }))
                  }
                />
                <DatePicker
                  label="Closing Date"
                  format="DD MMM YYYY"
                  minDate={dayjs(new Date(openDates.start_date))}
                  defaultValue={dayjs().add(7, "day")}
                  onChange={(e) =>
                    setOpenDates((prev) => ({
                      ...prev,
                      end_date: new Date(e).toLocaleDateString("en-CA"),
                    }))
                  }
                />

                <LoadingButton
                  loading={startLoading}
                  sx={{ px: 5 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setStartLoading(true);
                    api
                      .post("/admission/application/manage-application/", {
                        type: "all",
                        action: true,
                        start_date: openDates.start_date,
                        end_date: openDates.end_date,
                      })
                      .then((res) => {
                        toast.success("Updated Successfully");
                        fetchData();
                      })
                      .finally(() => setStartLoading(false));
                  }}
                >
                  Open All
                </LoadingButton>
              </Bbox>
              <Bbox
                p={2}
                flex={1}
                display={"flex"}
                gap={2}
                flexDirection={"column"}
                borderRadius={1}
              >
                <DatePicker
                  label="Closing Date"
                  format="DD MMM YYYY"
                  minDate={dayjs()}
                  defaultValue={dayjs().add(1, "day")}
                  onChange={(e) =>
                    setCloseDate((prev) =>
                      new Date(e).toLocaleDateString("en-CA")
                    )
                  }
                />

                <LoadingButton
                  fullWidth
                  loading={closeLoading}
                  sx={{ px: 5 }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCloseLoading(true);
                    api
                      .post("/admission/application/manage-application/", {
                        type: "all",
                        action: false,
                        end_date: closeDate,
                      })
                      .then((res) => {
                        toast.success("Updated Successfully");
                        fetchData();
                      })
                      .finally(() => setCloseLoading(false));
                  }}
                >
                  Close All
                </LoadingButton>
              </Bbox>
            </Box>
            <Bbox borderRadius={1} flex={2} width={"100%"}>
              <ManageTable rows={rows} />
              {showDialog && (
                <EditManageApplication
                  fetchData={fetchData}
                  open={showDialog}
                  close={() => setShowDialog(false)}
                />
              )}
            </Bbox>

            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignItems={{ xs: "stretch", lg: "center" }}
              gap={2}
            >
              <Button
                sx={{ px: 5 }}
                variant="contained"
                color="secondary"
                onClick={() => setShowDialog(true)}
              >
                Edit
              </Button>

              {/* Search button */}
              <Button variant="contained" sx={{ marginLeft: "20px" }}>
                Search
              </Button>
            </Box>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ManageApplications;
