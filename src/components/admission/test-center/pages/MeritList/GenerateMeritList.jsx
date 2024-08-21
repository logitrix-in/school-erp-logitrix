import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import api, { exportAPI } from "../../../../../config/api";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import ReignsPopup from "../../../../UiComponents/ReignsPopup";

const GenerateMeritList = () => {
  const initPayload = {
    applyingFor: "III",
    "Candidate Name": false,
    "Applicant No": true,
    "Test Score": true,
    Interview: false,
    "Test + Interview": false,
    Gender: false,
    Caste: false,
    orderBy: "Candidate Name",
  };

  const [payload, setPayload] = useState(initPayload);
  const [classes, setClasses] = useState([]);

  const [data, setData] = useState(null);

  const handleChange = (name, value) => {
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    api
      .get("/admission/get-all-classes/")
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    api.get("/admission/test-center/evaluation/merit-list/").then((res) => {
      console.log(res.data);
      setPayload(
        res.data?.criteria.find((cl) => cl.applyingFor == payload.applyingFor)
      );
    });
  }, []);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  const [generateLoading, setGenerateLoading] = useState(false);

  const [publishLoading, setPublishLoading] = useState(false);

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbar />
    </GridToolbarContainer>
  );

  const [popup, setPopup] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  return (
    <Bbox borderRadius={1}>
      <Typography fontSize={"1rem"} fontWeight={500} p={2}>
        Generate Merit List
      </Typography>
      <Divider />
      <Box p={2}>
        <FormControl sx={{ width: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            label="Class"
            onChange={(e) => {
              setData(null);
              handleChange("applyingFor", e.target.value);
              api
                .get("/admission/test-center/evaluation/merit-list/")
                .then((res) => {
                  console.log(res.data);
                  setPayload(
                    res.data?.criteria.find(
                      (cl) => cl.applyingFor == e.target.value
                    ) ?? { ...initPayload, applyingFor: e.target.value }
                  );
                });
            }}
            value={payload.applyingFor}
          >
            {classes.map((cl, idx) => (
              <MenuItem key={idx} value={cl}>
                {cl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={4}>
          <Typography fontSize={"1rem"} fontWeight={500}>
            Select Fields to display
          </Typography>

          {[
            "Candidate Name",
            "Applicant No",
            "Test Score",
            "Interview",
            "Test + Interview",
            "Gender",
            "Caste",
          ].map((e, i) => (
            <FormControlLabel
              key={i}
              control={<Checkbox checked={payload[e]} />}
              onChange={(_, v) => {
                handleChange(e, v);
              }}
              checked={payload[e]}
              label={e}
            />
          ))}
        </Box>
        <Box mt={3}>
          <Typography fontSize={"1rem"} fontWeight={500}>
            Order Merit List By
          </Typography>

          <RadioGroup
            onChange={(_, v) => handleChange("orderBy", v)}
            value={payload.orderBy}
          >
            {["Assessment Score", "Applicant No", "Candidate Name"].map(
              (e, i) => (
                <FormControlLabel
                  key={i}
                  value={e}
                  control={<Radio />}
                  label={e}
                />
              )
            )}
          </RadioGroup>
        </Box>
        <LoadingButton
          loading={generateLoading}
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => {
            setGenerateLoading(true);
            api
              .post("/admission/test-center/evaluation/merit-list/", payload)
              .then((res) => {
                console.log(res.data);
                if (res.data.data.length <= 0) {
                  console.log("hi");
                  toast.error("No Candidates in Merit List");
                }
                setData(res.data.data);
              })
              .catch((err) => toast.error(err.message))
              .finally(() => setGenerateLoading(false));
          }}
        >
          Generate Merit List
        </LoadingButton>

        <Box mt={3}>
          {data != null && data.length > 0 && (
            <Box>
              <DataGrid
                slots={{ toolbar: CustomToolbar }}
                rows={data.map((e, i) => ({ ...e, id: i }))}
                columns={Object.keys(data[0]).map((e, i) => ({
                  field: e,
                  headerName: e.replaceAll("_", " "),
                  flex: 1,
                }))}
              />
              <Box display={"flex"} gap={1}>
                <LoadingButton
                  loading={publishLoading}
                  variant="contained"
                  sx={{ width: "15rem", mt: 2 }}
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Publish
                </LoadingButton>

                <LoadingButton
                  loading={downloadLoading}
                  variant="outlined"
                  sx={{ width: "15rem", mt: 2 }}
                  onClick={() => {
                    setDownloadLoading(true);
                    exportAPI
                      .get("", {
                        params: {
                          name: "generate-merit-list",
                          Class: payload.applyingFor,
                        },
                      })
                      .then((res) => {
                        console.log(res.data);
                        window.open(res.data.url, "_BLANK");
                      })
                      .catch((err) => {
                        toast.error(err.response.data.message);
                      })
                      .finally(() => {
                        setDownloadLoading(false);
                      });
                  }}
                >
                  Download
                </LoadingButton>
              </Box>

              <ReignsPopup
                open={popup}
                desc="Once published, you will not be able to revert back."
                title="Are You Sure You Want To Publish?"
                onCancel={() => setPopup(false)}
                close={() => setPopup(false)}
                onAccept={() => {
                  setPublishLoading(true);
                  api
                    .post(
                      "/admission/test-center/evaluation/merit-list/publish/",
                      { applyingFor: payload.applyingFor }
                    )
                    .then((res) => {
                      toast.success(res.data.message);
                      console.log(res.data);
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setPublishLoading(false));
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </Bbox>
  );
};

export default GenerateMeritList;
