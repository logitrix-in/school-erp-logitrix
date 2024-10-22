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
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  DeleteOutlineOutlined as DeleteIcon,
  AddCircleOutlineOutlined as AddIcon,
} from "@mui/icons-material";

const ESIPopup = ({ open, close }) => {
  const [ranges, setRanges] = useState([
    { id: 1, min: 0, max: 10000, amount: 0 },
    { id: 2, min: 10001, max: 15000, amount: 110 },
    { id: 3, min: 15001, max: 25000, amount: 130 },
    { id: 4, min: 25001, max: 40000, amount: 150 },
    { id: 5, min: 40001, max: null, amount: 250 },
  ]);

  const deductionCycles = ["Monthly", "Quarterly", "Yearly"];

  const handleMinChange = (id, value) => {
    setRanges(
      ranges.map((range) =>
        range.id === id ? { ...range, min: value } : range
      )
    );
  };

  const handleMaxChange = (id, value) => {
    setRanges(
      ranges.map((range) =>
        range.id === id ? { ...range, max: value } : range
      )
    );
  };

  const handleAmountChange = (id, value) => {
    setRanges(
      ranges.map((range) =>
        range.id === id ? { ...range, amount: value } : range
      )
    );
  };

  const addNewRange = () => {
    const lastRange = ranges[ranges.length - 1];
    const newId = Math.max(...ranges.map((r) => r.id)) + 1;
    const newMin = lastRange.max ? lastRange.max + 1 : 0;
    setRanges([
      ...ranges,
      { id: newId, min: newMin, max: newMin + 10000, amount: 0 },
    ]);
  };

  const deleteRange = (id) => {
    if (ranges.length > 1) {
      setRanges(ranges.filter((range) => range.id !== id));
    }
  };

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


          <Box
            display={"flex"}
            gap={2}
            justifyContent={"left"}
            sx={{ width: "100%" }}
          >
            <Typography>Calculation :</Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            {ranges.map((range, index) => (
              <Box
                key={range.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Minimum"
                  type="number"
                  value={range.min}
                  onChange={(e) => handleMinChange(range.id, e.target.value)}
                  variant="outlined"
                  sx={{ width: "30%" }}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                />
                <Typography>to</Typography>
                <TextField
                  label="Maximum"
                  type="number"
                  value={range.max || ""}
                  onChange={(e) => handleMaxChange(range.id, e.target.value)}
                  variant="outlined"
                  sx={{ width: "30%" }}
                  placeholder={!range.max ? "and above" : ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                />
                <TextField
                  label="Payable Amount"
                  type="number"
                  value={range.amount}
                  onChange={(e) => handleAmountChange(range.id, e.target.value)}
                  variant="outlined"
                  sx={{ width: "25%" }}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                />
                <IconButton
                  color="error"
                  onClick={() => deleteRange(range.id)}
                  disabled={ranges.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Box
            display={"flex"}
            gap={2}
            marginBottom={2}
            justifyContent={"left"}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              onClick={addNewRange}
              startIcon={<AddIcon />}
            >
              Add New
            </Button>
          </Box>

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
