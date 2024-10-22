import {
  Box,
  Button,
  Dialog,
  TextField,
  IconButton,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const LaborWelfareFundEdit = ({ open, close }) => {
  const deductionCycles = ["Monthly", "Quarterly", "Yearly"];

  return (
    <Dialog
      fullWidth={false}
      PaperProps={{
        sx: {
          maxHeight: "90%",
          width: "60%",
        },
      }}
      maxWidth="lg"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <Box>
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
            Edit Professional Tax
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
          <Box
            display={"flex"}
            gap={2}
            justifyContent={"left"}
            sx={{ width: "100%" }}
          >
            <Typography>State :</Typography>
            <Typography fontWeight={"600"}>West Bengal</Typography>
          </Box>

          {/* Deduction Cycle Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Deduction Cycle</InputLabel>
            <Select label="Deduction Cycle" defaultValue="">
              {deductionCycles.map((cycle) => (
                <MenuItem key={cycle} value={cycle}>
                  {cycle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display={"flex"} gap={2} sx={{width: '100%'}}>
            <TextField
              label="Employee Contribution"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Employer Contribution"
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box marginY={1} width={"100%"} display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                // Validate form here if needed
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

export default LaborWelfareFundEdit;
