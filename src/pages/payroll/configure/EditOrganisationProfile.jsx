import { Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Dialog,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState } from "react";

const EditOrganisationProfile = ({ open, close }) => {
  return (
    <Dialog
      fullWidth={false}
      PaperProps={{
        sx: {
          maxHeight: "90%",
          width: "50%",
        },
      }}
      maxWidth="lg"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <Box overflow={"hidden"}>
        <Box
          p={1}
          py={1}
          bgcolor={"primary.main"}
          color={"white"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box />
          <Typography fontSize={"1.1rem"} textAlign={"center"}>
            Edit Organization Profile
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          p={2}
          py={4}
          justifyContent="space-between"
          width={"80%"}
          margin="auto"
          alignItems="center"
        >
          <TextField
            fullWidth
            placeholder="Enter New Name"
            label="Enter New Name"
          />
          <TextField fullWidth placeholder="Industry" label="Industry" />
          <TextField
            fullWidth
            placeholder="Company Email ID"
            label="Company Email ID"
          />

          <Box flex={"flex"} justifyContent={"start"} width={"100%"}>
            <Typography textAlign={"left"}>Upload New Logo :</Typography>
          </Box>

          <FileUpload
            onFileSelect={(file) => {
              console.log("Selected file:", file);
            }}
          />

          <Box marginY={1} width={"100%"} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                toast.success("Updated successfully!");
                close();
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EditOrganisationProfile;

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setFile(droppedFile);
      onFileSelect?.(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileSelect?.(null);
  };

  return (
    <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          border: "2px dashed",
          borderColor: dragActive ? "primary.main" : "grey.300",
          backgroundColor: dragActive ? "action.hover" : "background.paper",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          position: "relative",
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>{file.name}</Typography>
            <IconButton size="small" onClick={handleRemoveFile}>
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="body1" align="center">
              Drag and Drop File
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Maximum Recommended size 10 MB
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              OR
            </Typography>
            <Button variant="outlined" component="label" size="small">
              Browse
              <input
                type="file"
                hidden
                onChange={handleFileSelect}
                accept="image/*"
              />
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
