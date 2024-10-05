import React, { useState, useRef } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Link,
} from "@mui/material";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@material-ui/core";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";
import { Editor } from "@tinymce/tinymce-react";
import CloseIcon from "@mui/icons-material/Close";

const ManageSystemRequest = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // states
  const [activeButton, setActiveButton] = useState("Eligible");
  const [activeButton2, setActiveButton2] = useState("Preference 1");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSendEmail(true);
  };

  // Function to filter selected students and generate Excel file
  const handleDownloadStudentList = () => {
    // Filter selected students from the original data
    const selectedStudentsData = rows.filter((student) =>
      selectedStudents.includes(student.id)
    );

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(selectedStudentsData);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Selected Students");
    // Convert the workbook to a binary string
    const wbBinary = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    // Convert the binary string to a buffer
    const wbBuffer = new ArrayBuffer(wbBinary.length);
    const view = new Uint8Array(wbBuffer);
    for (let i = 0; i < wbBinary.length; i++) {
      view[i] = wbBinary.charCodeAt(i) & 0xff;
    }
    // Create a blob from the buffer
    const wbBlob = new Blob([wbBuffer], { type: "application/octet-stream" });
    // Create a URL for the blob object
    const wbURL = URL.createObjectURL(wbBlob);
    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = wbURL;
    link.setAttribute("download", "selected_students.xlsx");
    // Simulate a click event to trigger the download
    document.body.appendChild(link);
    link.click();
    // Clean up
    document.body.removeChild(link);
  };

  // table columns
  const columns = [
    { field: "space", headerName: "", width: isLarge ? 80 : 50 },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop ? 200 : isLarge ? 300 : isTablet ? 150 : 250,
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      )
    },
    {
      field: "name",
      headerName: "Name",
      width: isLaptop ? 200 : isTablet ? 150 : 250,
    },
    {
      field: "marks",
      headerName: "Marks Secured (%)",
      width: isLaptop ? 200 : isLarge ? 300 : isTablet ? 190 : 250,
    },
    {
      field: "issuance",
      headerName: "Selection Letter Issuance Status",
      width: isLaptop ? 250 : isLarge ? 350 : isTablet ? 270 : 300,
    },
    {
      field: "confirmation",
      headerName: "Seat Confirmation Status",
      width: isLaptop ? 200 : isTablet ? 230 : 200,
    },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240004",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240005",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240006",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240007",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240008",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
    {
      id: "AG240009",
      name: "Saunav Ray",
      marks: "82%",
      issuance: "Issued",
      confirmation: "Not Confirmed",
    },
  ];

  const [recipentTo, setRecipentTo] = useState("all");

  const editorRef = useRef(null);

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width={"100%"}
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
        {/* linear gradient context box */}
        <Box
          mt={4}
          ml={3}
          mr={3}
          borderRadius={"8px"}
          height={"119px"}
          paddingTop={"28px"}
          sx={{
            background:
              "linear-gradient(90deg, #C2DFED 80.9%, rgba(194, 223, 237, 0.00) 132.65%);",
          }}
        >
          {/* first line text */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            paddingLeft={"2rem"}
            paddingRight={"2rem"}
          >
            {/* stream text */}
            <Typography fontSize={"16px"} fontWeight={"500"} color={"#3B98C4"}>
              Stream : Science
            </Typography>

            {/* flex row */}
            <Box display={"flex"}>
              {/* selection letter issued text */}
              <Typography
                fontSize={"16px"}
                fontWeight={"500"}
                color={"#3B98C4"}
              >
                Selection Letter issued : 72
              </Typography>

              {/* download icon */}
              <IconButton style={{ bottom: "6px" }}>
                <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
              </IconButton>
            </Box>
          </Box>

          {/* second line text */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            paddingLeft={"2rem"}
            paddingRight={"2rem"}
          >
            {/* seats available text */}
            <Typography fontSize={"16px"} fontWeight={"500"} color={"#3B98C4"}>
              Seats available : 100/100
            </Typography>

            {/* flex row */}
            <Box display={"flex"}>
              {/* seats confirmed text */}
              <Typography
                fontSize={"16px"}
                fontWeight={"500"}
                color={"#3B98C4"}
              >
                Seats Confirmed : 0/100
              </Typography>

              {/* download icon */}
              <IconButton style={{ bottom: "6px" }}>
                <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* top navigate buttons */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"#E5F3FB"}
          mt={4}
          p={1}
          borderRadius={"12px"}
          width={"550px"}
          marginLeft={
            isLaptop
              ? "25%"
              : isLarge
              ? "30%"
              : isTablet
              ? "25%"
              : isSmall
              ? "20%"
              : "28%"
          }
        >
          {/* eligible button */}
          <Button
            variant={activeButton === "Eligible" ? "contained" : "outlined"}
            color="primary"
            style={{
              width: "342px",
              border: "none",
              backgroundColor:
                activeButton === "Eligible" ? "white" : "transparent",
              color: "#646363",
              fontSize: "14px",
              fontWeight: "400",
            }}
            onClick={() => setActiveButton("Eligible")}
          >
            Eligible
          </Button>

          {/* non-eligible button */}
          <Button
            variant={activeButton === "Non-Eligible" ? "contained" : "outlined"}
            color="primary"
            style={{
              width: "342px",
              border: "none",
              backgroundColor:
                activeButton === "Non-Eligible" ? "white" : "transparent",
              color: "#646363",
              fontSize: "14px",
              fontWeight: "400",
              marginLeft: "10px",
            }}
            onClick={() => setActiveButton("Non-Eligible")}
          >
            Non-Eligible
          </Button>
        </Box>

        {/* left navigate buttons and mid text */}
        <Box style={{ display: "flex", flexDirection: "row" }}>
          {/* left navigate buttons */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"#E5F3FB"}
            mt={2}
            p={1}
            borderRadius={"12px"}
            width={"140px"}
            marginLeft={
              isLaptop
                ? "13%"
                : isLarge
                ? "21%"
                : isTablet
                ? "11%"
                : isSmall
                ? "4%"
                : "17%"
            }
          >
            {/* Preference 1 button */}
            <Button
              variant={
                activeButton2 === "Preference 1" ? "contained" : "outlined"
              }
              color="primary"
              style={{
                width: "120px",
                border: "none",
                backgroundColor:
                  activeButton2 === "Preference 1" ? "white" : "transparent",
                color: "#000",
                fontSize: "14px",
                fontWeight: "400",
              }}
              onClick={() => setActiveButton2("Preference 1")}
            >
              Preference 1
            </Button>

            {/* Preference 2 button */}
            <Button
              variant={
                activeButton2 === "Preference 2" ? "contained" : "outlined"
              }
              color="primary"
              style={{
                width: "120px",
                border: "none",
                backgroundColor:
                  activeButton2 === "Preference 2" ? "white" : "transparent",
                color: "#000",
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "10px",
              }}
              onClick={() => setActiveButton2("Preference 2")}
            >
              Preference 2
            </Button>

            {/* Preference 3 button */}
            <Button
              variant={
                activeButton2 === "Preference 3" ? "contained" : "outlined"
              }
              color="primary"
              style={{
                width: "120px",
                border: "none",
                backgroundColor:
                  activeButton2 === "Preference 3" ? "white" : "transparent",
                color: "#000",
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "10px",
              }}
              onClick={() => setActiveButton2("Preference 3")}
            >
              Preference 3
            </Button>
          </Box>

          {/* mid text */}
          <Box mt={4} ml={3}>
            {/* Eligibility Criteria */}
            <Typography fontSize={"14px"} fontWeight={"400"} ml={1}>
              Eligibility Criteria &gt;= 80%
            </Typography>

            {/* checkbox and text */}
            <Box
              mt={4}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* checkbox */}
              <Checkbox
                checked={isChecked}
                onChange={(event) => setIsChecked(event.target.checked)}
                color="primary"
                style={{ fontSize: 16 }}
              />

              {/* text */}
              <Typography fontSize={"14px"} fontWeight={"400"}>
                Only select students who have not confirmed their seats
              </Typography>
            </Box>

            <Box
              mt={2}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* checkbox */}
              <Checkbox
                checked={isChecked}
                onChange={(event) => setIsChecked(event.target.checked)}
                color="primary"
                style={{ fontSize: 16 }}
              />

              {/* text */}
              <Typography fontSize={"14px"} fontWeight={"400"}>
                Only select students who have not received their selection
                letter yet.
              </Typography>
            </Box>

            {/* min max % input and submit button */}
            <Box
              mt={3.6}
              ml={1}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* text */}
              <Typography fontSize={"14px"} fontWeight={"400"}>
                Select marks secured % range
              </Typography>

              {/* Min input */}
              <TextField
                variant="outlined"
                placeholder="Min"
                size="small"
                style={{ width: "60px" }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*", // accepts only numerical values
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // remove non-numeric characters
                }}
              />

              {/* Max input */}
              <TextField
                variant="outlined"
                placeholder="Max"
                size="small"
                style={{ width: "60px" }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*", // accepts only numerical values
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // remove non-numeric characters
                }}
              />

              {/* Submit button */}
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ marginLeft: "20px" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Total number of results found */}
        <Box
          mt={-2}
          mr={3}
          style={{
            backgroundColor: "#E1EEFB",
            border: "1px solid #3381A5",
            borderRadius: "16px",
            width: 107,
            height: 25,
            padding: "3.7px 14px",
            marginLeft: isLaptop
              ? "89%"
              : isLarge
              ? "91.9%"
              : isTablet
              ? "88%"
              : isSmall
              ? "85.8%"
              : "90.7%",
          }}
        >
          <Typography
            style={{
              fontSize: "10px",
              fontWeight: "400",
              color: "#3381A5",
            }}
          >
            {rows.length} Results found
          </Typography>
        </Box>

        {/* table */}
        <Box m={2} height="100%">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            checkboxSelection
          />
        </Box>

        {/* bottom buttons */}
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "1.8%",
            marginBottom: "40px",
            marginLeft: "1.8%",
          }}
        >
          <Button variant="outlined" onClick={handleOpenConfirmationDialog}>
            Issue Selection Letter
          </Button>

          <Button
            variant="outlined"
            style={{ marginLeft: "20px" }}
            onClick={handleDownloadStudentList}
          >
            Download Student List
          </Button>
        </Box>

        <Dialog
          open={openConfirmationDialog}
          onClose={handleCloseConfirmationDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box style={{ height: "10px", backgroundColor: "#2F7DA1" }}></Box>
          <DialogTitle id="alert-dialog-title">
            {
              "Are you sure you want to issue selection letter(s) for the selected candidate(s)?"
            }
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={handleCloseConfirmationDialog}
              sx={{
                color: "red",
                fontWeight: "400",
                "&:hover": {
                  backgroundColor: "#FFECEB",
                },
              }}
            >
              No
            </Button>

            <Button
              variant="contained"
              onClick={handleCloseConfirmationDialog}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={sendEmail}
          onClose={() => setSendEmail(false)}
          maxWidth="xl"
        >
          <DialogTitle
            sx={{
              color: "white",
              fontWeight: "600",
              backgroundColor: "#3b98c4",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Selection Letter
          </DialogTitle>
          <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setSendEmail(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent>
            <Box>
              <Box display={"flex"} gap={2} mt={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <FormControl size="small">
                    <InputLabel>CC</InputLabel>
                    <Select label="CC" onChange={() => {}} defaultValue={20}>
                      <MenuItem value={10}>Nil</MenuItem>
                      <MenuItem value={20}>parent</MenuItem>
                      <MenuItem value={30}>Candidates</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl size="small">
                    <InputLabel>BCC</InputLabel>
                    <Select label="BCC" onChange={() => {}} defaultValue={10}>
                      <MenuItem value={10}>Nil</MenuItem>
                      <MenuItem value={20}>parent</MenuItem>
                      <MenuItem value={30}>Candidates</MenuItem>
                    </Select>
                  </FormControl>

                  <Box flexGrow={1} width={"550px"} />

                  <Button variant="contained" color="primary">
                    Send
                  </Button>
                </Box>
              </Box>
              <Box height={20} />
              <TextField
                placeholder="Subject"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
              <Box>
                <Editor
                  apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="Welcome!"
                  init={{
                    branding: false,
                    height: 450,
                    menubar: false,
                    plugins: [
                      "lists",
                      "advlist",
                      "link",
                      "image",
                      "fullscreen",
                    ],
                    images_upload_handler: (blobInfo, progress) => {
                      const formData = new FormData();
                      formData.append("image", blobInfo.blob());
                      return new Promise((resolve, reject) => {
                        axios
                          .post("https://cdn.sociolinq.com/upload/", formData)
                          .then((res) => {
                            resolve(res.data.link);
                          })
                          .catch(() => {
                            reject(
                              "Some error occured. Please contact Rownak Mazumder."
                            );
                          });
                      });
                    },
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image link | fullscreen |",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, overflow:scroll}",
                  }}
                />
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Bbox>
    </RevealCard>
  );
};

export default ManageSystemRequest;
