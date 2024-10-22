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
import { useState } from "react";

const ESIPopup = ({ open, close }) => {
  const [epfNumber, setEpfNumber] = useState({
    tn: "",
    bn: "",
    number: "",
  });

  // Handle EPF number changes
  const handleEpfChange = (part, value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Apply max length restrictions
    let finalValue = numericValue;
    if (part === "tn" || part === "bn") {
      finalValue = numericValue.slice(0, 2);
    } else if (part === "number") {
      finalValue = numericValue.slice(0, 8);
    }

    setEpfNumber((prev) => ({
      ...prev,
      [part]: finalValue,
    }));
  };

  // Options for dropdowns
  const deductionCycles = ["Monthly", "Quarterly", "Yearly"];
  const contributionRates = ["Restrict contribution to 15000 of PF Wage"];

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
            Edit Employees&apos; State Insurance
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
          <Typography variant="subtitle1" alignSelf="flex-start">
            Enter New ESI Number :
          </Typography>

          {/* EPF Number Input Group */}
          <Box display="flex" gap={1} width="100%" alignItems="center">
            <TextField
              value={epfNumber.tn}
              onChange={(e) => handleEpfChange("tn", e.target.value)}
              placeholder="TN"
              sx={{ width: "60px" }}
              inputProps={{ maxLength: 2 }}
            />
            <Typography>/</Typography>
            <TextField
              value={epfNumber.bn}
              onChange={(e) => handleEpfChange("bn", e.target.value)}
              placeholder="BN"
              sx={{ width: "60px" }}
              inputProps={{ maxLength: 2 }}
            />
            <Typography>/</Typography>
            <TextField
              value={epfNumber.number}
              onChange={(e) => handleEpfChange("number", e.target.value)}
              placeholder="48423402"
              sx={{ flex: 1 }}
              inputProps={{ maxLength: 8 }}
            />
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

          {/* Employee Contribution Rate */}
          <FormControl fullWidth>
            <InputLabel>Employee Contribution</InputLabel>
            <Select label="Employee Contribution Rate" defaultValue="">
              {contributionRates.map((rate) => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Employer Contribution Rate */}
          <FormControl fullWidth>
            <InputLabel>Employer Contribution</InputLabel>
            <Select label="Employer Contribution Rate" defaultValue="">
              {contributionRates.map((rate) => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Submit Button */}
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

export default ESIPopup;
