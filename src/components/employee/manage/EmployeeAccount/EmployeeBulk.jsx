import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../../../UiComponents/Popup";

const StudentBulk = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUndoButton, setShowUndoButton] = useState(false);

  const [showUploadArea, setShowUploadArea] = useState(true);

  // Function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle the dropped files here
    console.log(files);
    // Set isUploaded to true when files are dropped
    setIsUploaded(true);
  };

  // Function to handle the confirmation of submission
  const handleConfirmation = () => {
    try {
      console.log("Submitted Successfully");
      toast.success("Submitted Successfully");
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    setShowModal(false);
    setShowUploadArea(false);
  };

  // Function to handle the undo action
  const handleUndo = () => {
    setShowUndoButton(false);
    // Reset isUploaded state when undo action is performed
    setIsUploaded(false);
  };

  return (
    <RevealCard>
      <Bbox
        mt={3}
        width="100%"
        height="100%"
        borderRadius={2}
        overflow="hidden"
      >
        <Box
          bgcolor="white"
          py={1.3}
          px={3}
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize="1.1rem">
            Bulk Manage
          </Typography>

          {showUndoButton && (
            <Button variant="outlined" onClick={handleUndo}>
              Undo
            </Button>
          )}
        </Box>

        <Divider />

        <Box style={{ marginLeft: "1%", marginBottom: "2%" }}>
          {!showUploadArea ? (
            <>
              <Button variant="contained">
                Download Template
              </Button>

              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowUploadArea(true)}
              >
                Upload
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" disabled={!isUploaded}>
                Re-Upload
              </Button>

              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowModal(true)}
              >
                Submit
              </Button>

              <ConfirmationModal showModal={showModal} setShowModal={setShowModal} handleConfirmation={handleConfirmation} />
              <UploadArea
                setShowUploadArea={setShowUploadArea}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              />

            </>
          )}
        </Box>
      </Bbox>
    </RevealCard>
  );
};

// Upload area component
const UploadArea = ({ setShowUploadArea, onDrop, onDragOver }) => {
  return (
    <Box
      border="1px dashed #ccc"
      borderRadius="7px"
      width="80%"
      height="300px"
      marginLeft="10%"
      marginTop="4%"
      marginBottom="2%"
      p={3}
      textAlign="center"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Typography
        style={{
          color: "#7C7A7A",
          fontSize: "30px",
          fontWeight: "500",
          paddingTop: "90px",
        }}
      >
        Click / Drag & Drop to upload Excel
      </Typography>
      <Box display={'flex'} justifyContent={'center'} mt={2} gap={4}>
        <Button color="primary" variant="contained">Browse</Button>
        <Button color="primary" variant="outlined" onClick={() => setShowUploadArea(false)}>Cancel</Button>
      </Box>
    </Box>
  );
};

const ConfirmationModal = ({ showModal, setShowModal, handleConfirmation }) => {
  return (
    <Popup title={"Confirmation"} open={showModal} close={() => setShowModal(false)}>
      <Box p={5} component={"form"} height={"20vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Typography style={{ fontSize: "20px", fontWeight: "500" }}>
          Are you sure you want to submit?
        </Typography>

        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: 16 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConfirmation()}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
        </Box>
      </Box>
    </Popup >
  );
};

export default StudentBulk;
