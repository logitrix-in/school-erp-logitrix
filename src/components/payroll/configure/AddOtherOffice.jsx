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

const OtherOfficeEdit = ({ open, close }) => {
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
            Add New Office
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
            placeholder="Employee Count"
            label="Employee Count"
          />
          <TextField fullWidth placeholder="Address" label="Address" />

          <Box display={"flex"} gap={4} sx={{ width: "100%" }}>
            <TextField fullWidth placeholder="Country" label="Country" />
            <TextField fullWidth placeholder="State" label="State" />
          </Box>

          <Box display={"flex"} gap={4} sx={{ width: "100%" }}>
            <TextField fullWidth placeholder="City" label="City" />
            <TextField fullWidth placeholder="District" label="District" />
            <TextField fullWidth placeholder="Pincode" label="Pincode" />
          </Box>

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

export default OtherOfficeEdit;
