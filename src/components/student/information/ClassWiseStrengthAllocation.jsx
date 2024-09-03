import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import Chart from "react-apexcharts";
import { useMediaQuery } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import PlusImage from "../../../assets/icons/plus.png";
import MinusImage from "../../../assets/icons/minus.png";
import { Icon } from "@mdi/react";
import { mdiAccountGroup } from "@mdi/js";

const sectionsList = [
  "Nursery",
  "PP1",
  "PP2",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI Science",
  "XI Commerce",
  "XI Humanities",
  "XII Science",
  "XII Commerce",
  "XII Humanities",
];

const ClassWiseStrengthAllocation = () => {
  // Responsive breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // Define chart options
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        colors: {
          backgroundBarColors: ["#B5E0F3"],
        },
        borderRadius: 7,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories: [
        "Nursery",
        "PP1",
        "PP2",
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI Sc",
        "XI Comm",
        "XI Hum",
        "XII Sc",
        "XII Comm",
        "XII Hum",
      ],
      labels: {
        rotate: 0,
        show: true,
        style: {
          fontSize: isLaptop
            ? "12px"
            : isLarge
            ? "15px"
            : isTablet
            ? "10px"
            : isSmall
            ? "7.9px"
            : "14px",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 200,
      tickAmount: 10,
    },
    fill: {
      colors: ["#2F7DA1"],
    },
    dataLabels: {
      enabled: false,
    },
  };

  // State
  const [openDialog, setOpenDialog] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({
    width: "100%",
    height: 350,
  });

  const [sections, setSections] = useState(
    sectionsList.map((section, index) => ({
      id: index + 1,
      label: section,
      values: Array.from({ length: 3 }, (_, valueIndex) => ({
        id: valueIndex + 1,
        value: 0,
      })),
    }))
  );

  // Calculate chart dimensions
  useEffect(() => {
    const handleResize = () => {
      const maxWidth = document.getElementById("chart-container").offsetWidth;
      const maxHeight = window.innerHeight * 0.6;

      setChartDimensions({
        width: maxWidth,
        height: maxHeight,
      });
    };

    handleResize(); // Initial call to set dimensions

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Section handlers
  const handleAddSection = (sectionIndex) => {
    const newValues = [
      ...sections[sectionIndex].values,
      { id: Date.now(), value: 0 },
    ];
    const updatedSections = [...sections];
    updatedSections[sectionIndex].values = newValues;
    setSections(updatedSections);
  };

  const handleRemoveSection = (sectionIndex) => {
    if (sections[sectionIndex].values.length > 1) {
      const updatedValues = [...sections[sectionIndex].values];
      updatedValues.pop();
      const updatedSections = [...sections];
      updatedSections[sectionIndex].values = updatedValues;
      setSections(updatedSections);
    }
  };

  const handleInputChange = (sectionIndex, valueIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].values[valueIndex].value =
      parseInt(value) || 0;
    setSections(updatedSections);
  };

  // Dialog handlers
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <RevealCard>
      <Bbox width={"100%"} mt={4} borderRadius={2} overflow="hidden">
        {/* Title */}
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
            Class-wise Strength Allocation
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Column chart and button */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          pb={2}
          maxWidth={1500}
          id="chart-container"
          paddingLeft={isLarge ? "8%" : ""}
        >
          {/* Column chart */}
          <Chart
            options={chartOptions}
            series={[
              {
                name: "Students",
                data: [
                  45, 75, 60, 80, 55, 45, 75, 60, 80, 55, 45, 75, 60, 80, 55,
                  45, 75, 60, 70,
                ],
              },
            ]}
            type="bar"
            width={chartDimensions.width}
            height={chartDimensions.height}
          />

          {/* Button */}
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: "760px",
              height: 40,
              bgcolor: "#2F7DA1",
              marginTop: 3,
              marginBottom: 2,
            }}
            onClick={handleOpenDialog}
          >
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="16px"
              color="white"
            >
              Manage Strength Allocation
            </Typography>
          </Button>
        </Box>
      </Bbox>

      {/* Strength allocation management dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          maxHeight: isLaptop
            ? "616px"
            : isLarge
            ? "716px"
            : isTablet
            ? "685px"
            : isSmall
            ? "480px"
            : "692px",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            backgroundColor: "#2F7DA1",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>Manage Strength Allocation</Box>

          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ overflowX: "auto", paddingBottom: "30px" }}>
          <Box
            sx={{
              display: "grid",
              gridAutoFlow: "row",
              gap: "10px",
            }}
          >
            <Box
              position={"fixed"}
              zIndex={"9999"}
              width={"900px"}
              height={"62px"}
              borderRadius={1}
              backgroundColor={"white"}
              left={
                isLaptop
                  ? "318px"
                  : isLarge
                  ? "510px"
                  : isTablet
                  ? "234px"
                  : isSmall
                  ? "164.5px"
                  : "403.5px"
              }
              mt={
                isLaptop
                  ? 60
                  : isLarge
                  ? 72.5
                  : isTablet
                  ? 68.6
                  : isSmall
                  ? 43
                  : 69.5
              }
              display={"flex"}
              justifyContent={"center"}
              sx={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Button
                variant="contained"
                onClick={handleCloseDialog}
                sx={{ width: "600px", height: "40px", marginTop: "10px" }}
              >
                Submit
              </Button>
            </Box>

            {sections.map((section, sectionIndex) => (
              <Box
                key={section.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <BoxContainer
                  section={section}
                  sectionIndex={sectionIndex}
                  handleAddSection={handleAddSection}
                  handleRemoveSection={handleRemoveSection}
                  handleInputChange={handleInputChange}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </RevealCard>
  );
};

const BoxContainer = ({
  section,
  sectionIndex,
  handleAddSection,
  handleRemoveSection,
  handleInputChange,
}) => {
  const totalValue = section.values.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FEF7FF",
        borderRadius: "15px",
        margin: "10px 50px 0 50px",
        border: "1px solid #B2AFAF",
        alignItems: "center",
        overflowY: "hidden",
        overflowX: "auto",
        maxWidth: "calc(100vw - 10px)",
        padding: "30px 25px",
      }}
    >
      {/* Class name */}
      <Typography
        sx={{
          width: "100px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#585657",
        }}
      >
        {section.label}
      </Typography>

      {/* Section inputs */}
      {section.values.map((value, valueIndex) => (
        <Box
          key={value.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "auto",
          }}
        >
          <TextField
            label={`Section ${String.fromCharCode(65 + valueIndex)}`}
            variant="outlined"
            size="small"
            sx={{ width: "90px", marginRight: "5px" }}
            inputProps={{
              onChange: (e) =>
                handleInputChange(sectionIndex, valueIndex, e.target.value),
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            type="number"
          />

          {/* Remove section button */}
          {valueIndex === section.values.length - 1 && (
            <Button
              onClick={() => handleRemoveSection(sectionIndex)}
              disabled={section.values.length === 1}
            >
              <img
                src={MinusImage}
                alt="minus"
                style={{ width: "15px", height: "15px" }}
              />
            </Button>
          )}
        </Box>
      ))}

      {/* Add section button */}
      <Button
        variant="contained"
        sx={{
          width: "95px",
          height: "30px",
          backgroundColor: "#2F7DA1",
          margin: "10px 0",
          minWidth: "95px",
        }}
        onClick={() => handleAddSection(sectionIndex)}
      >
        <img
          src={PlusImage}
          alt="plus"
          style={{ width: "15px", height: "15px", marginRight: "5px" }}
        />
        <Typography sx={{ fontSize: 10, paddingTop: 0.3 }}>Add New</Typography>
      </Button>

      {/* Group icon and total value */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "auto",
          marginLeft: "60px",
        }}
      >
        {/* Group icon */}
        <Icon
          path={mdiAccountGroup}
          size={1}
          sx={{ marginLeft: "30px", marginRight: "5px", color: "#585657" }}
        />

        {/* Total value */}
        <Typography
          sx={{ marginTop: "3.5px", color: "#585657", marginLeft: "10px" }}
        >
          {totalValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClassWiseStrengthAllocation;
