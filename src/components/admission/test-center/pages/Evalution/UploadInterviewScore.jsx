import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import { FileUploader } from "react-drag-drop-files";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api, { exportAPI } from "../../../../../config/api";
import { ToastContainer, toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const UploadInterviewScore = () => {
  const [json, setJson] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [loadingJSON, setLoadingJSON] = useState(false);
  const [savedFile, setFile] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  const fileTypes = ["csv","xls","xlsx"];

  const csvToJson = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setFile(file);
    if (file) {
      // Send formData to the server using fetch or axios
      api
        .post(
          "/admission/test-center/evaluation/upload-interview-score/",
          formData
        )
        .then((res) => {
          console.log(res.data);
          setJson(res.data.data.map((data, id) => ({ ...data, id: id })));
          setLoadingJSON(false);
          toast.success("File Uploaded Successfuly");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("No file selected");
    }
  };

  useEffect(() => {
    console.log(json);
  }, [json]);

  const columns = [
    {
      field: "application_id",
      headerName: "Application Id",
      width: 200,
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "obtained_marks", headerName: "Marks", width: 200 },
    { field: "total_marks", headerName: "Marks", width: 200 },
  ];

  return (
    <Bbox p={2} borderRadius={1}>
      <ToastContainer />
      {json == null ? (
        loadingJSON ? (
          <Box
            height={"20rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={1}
          >
            <LinearProgress sx={{ width: "50%" }} />
            <Typography>Loading Data</Typography>
          </Box>
        ) : (
          <Box>
            <FileUploader
              onDraggingStateChange={(dragging) => setDragging(dragging)}
              hoverTitle=" "
              children={
                <Box
                  border={"2px dashed black"}
                  borderColor={"primary.main"}
                  borderRadius={2}
                  p={1}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"20rem"}
                  bgcolor={dragging ? "primary.lighter" : "white"}
                >
                  <Typography fontSize={"1.4rem"} color={"grey"}>
                    {!dragging
                      ? "Drag and Drop Interview Score Excel Here"
                      : "Drop Here"}
                  </Typography>
                </Box>
              }
              handleChange={(file) => {
                setLoadingJSON(true);
                csvToJson(file);
              }}
              name="file"
              types={fileTypes}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                exportAPI
                  .get("https://cdn.sociolinq.com/template/", {
                    params: {
                      name: "interview_score",
                    },
                  })
                  .then((res) => {
                    window.open(res.data.url, "_BLANK");
                  })
                  .catch((err) => console.log(err));
              }}
            
            >
              Download Template
            </Button>
          </Box>
        )
      ) : (
        <Box>
          <Box height="55vh">
            <DataGrid
              rows={json}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableRowSelectionOnClick
            />
          </Box>
          <ToastContainer />
          <Box sx={{ mt: 1 }} display={"flex"} alignItems={"center"}>
            <Button variant="contained" onClick={() => setJson(null)}>
              Re-upload
            </Button>
            <LoadingButton
              loading={loadingSave}
              sx={{ ml: 1 }}
              onClick={() => {
                const formData = new FormData();
                console.log(json);
                formData.append("file_data", JSON.stringify(json));
                formData.append("file", savedFile);
                setLoadingSave(true);
                api
                  .post(
                    "/admission/test-center/evaluation/upload-interview-score/save/",
                    formData
                  )
                  .then((res) => {
                    console.log(res.data.message);
                    toast.success(res.data.message);
                  })
                  .catch((error) => {
                    toast.error(error.response.message);
                  })
                  .finally(() => {
                    setLoadingSave(false);
                  });
              }}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Bbox>
  );
};

export default UploadInterviewScore;
