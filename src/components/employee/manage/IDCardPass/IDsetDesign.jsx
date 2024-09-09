import React, { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import { Box, Select, MenuItem, Button, IconButton } from "@mui/material";

import IDCard1 from "../../../../assets/cards/id-1.png";
import IDCardBack1 from "../../../../assets/cards/idb-1.png";
import GuardianCard1 from "../../../../assets/cards/g-1.png";
import GuardianCardBack1 from "../../../../assets/cards/gb-1.png";
import LocalGuardianCard1 from "../../../../assets/cards/lg-1.png";
import LocalGuardianCardBack1 from "../../../../assets/cards/lgb-1.png";
import GuestPass1 from "../../../../assets/cards/gp-1.png";
import EventPass1 from "../../../../assets/cards/e-1.png";
import LibraryCard1 from "../../../../assets/cards/l-1.jpg";
import LibraryCardBack1 from "../../../../assets/cards/lb-1.jpg";

import IDCard2 from "../../../../assets/cards/id-2.png";
import IDCardBack2 from "../../../../assets/cards/idb-2.png";
import GuardianCard2 from "../../../../assets/cards/g-2.png";
import GuardianCardBack2 from "../../../../assets/cards/gb-2.png";
import LocalGuardianCard2 from "../../../../assets/cards/lg-2.png";
import LocalGuardianCardBack2 from "../../../../assets/cards/lgb-2.png";
import GuestPass2 from "../../../../assets/cards/gp-2.png";
import EventPass2 from "../../../../assets/cards/e-2.png";
import LibraryCard2 from "../../../../assets/cards/l-2.jpg";
import LibraryCardBack2 from "../../../../assets/cards/lb-2.jpg";

import IDCard3 from "../../../../assets/cards/id-3.png";
import IDCardBack3 from "../../../../assets/cards/idb-3.png";
import GuardianCard3 from "../../../../assets/cards/g-3.png";
import GuardianCardBack3 from "../../../../assets/cards/gb-3.png";
import LocalGuardianCard3 from "../../../../assets/cards/lg-3.png";
import LocalGuardianCardBack3 from "../../../../assets/cards/lgb-3.png";
import GuestPass3 from "../../../../assets/cards/gp-3.png";
import EventPass3 from "../../../../assets/cards/e-3.png";
import LibraryCard3 from "../../../../assets/cards/l-3.jpg";
import LibraryCardBack3 from "../../../../assets/cards/lb-3.jpg";

import IDCard4 from "../../../../assets/cards/id-4.png";
import IDCardBack4 from "../../../../assets/cards/idb-4.png";
import GuardianCard4 from "../../../../assets/cards/g-4.png";
import GuardianCardBack4 from "../../../../assets/cards/gb-4.png";
import LocalGuardianCard4 from "../../../../assets/cards/lg-4.png";
import LocalGuardianCardBack4 from "../../../../assets/cards/lgb-4.png";
import GuestPass4 from "../../../../assets/cards/gp-4.png";
import EventPass4 from "../../../../assets/cards/e-4.png";
import LibraryCard4 from "../../../../assets/cards/l-4.jpg";
import LibraryCardBack4 from "../../../../assets/cards/lb-4.jpg";

import IDCard5 from "../../../../assets/cards/id-5.png";
import IDCardBack5 from "../../../../assets/cards/idb-5.png";
import GuardianCard5 from "../../../../assets/cards/g-5.png";
import GuardianCardBack5 from "../../../../assets/cards/gb-5.png";
import LocalGuardianCard5 from "../../../../assets/cards/lg-5.png";
import LocalGuardianCardBack5 from "../../../../assets/cards/lgb-5.png";
import GuestPass5 from "../../../../assets/cards/gp-5.png";
import EventPass5 from "../../../../assets/cards/e-5.png";
import LibraryCard5 from "../../../../assets/cards/l-5.png";
import LibraryCardBack5 from "../../../../assets/cards/lb-5.png";

import IDCard6 from "../../../../assets/cards/id-6.png";
import IDCardBack6 from "../../../../assets/cards/idb-6.png";
import GuardianCard6 from "../../../../assets/cards/g-6.png";
import GuardianCardBack6 from "../../../../assets/cards/gb-6.png";
import LocalGuardianCard6 from "../../../../assets/cards/lg-6.png";
import LocalGuardianCardBack6 from "../../../../assets/cards/lgb-6.png";
import GuestPass6 from "../../../../assets/cards/gp-6.png";
import EventPass6 from "../../../../assets/cards/e-6.png";
import LibraryCard6 from "../../../../assets/cards/l-6.png";
import LibraryCardBack6 from "../../../../assets/cards/lb-6.png";
import { useMediaQuery } from "@material-ui/core";
import { ArrowBackIos } from "@mui/icons-material";
import { ArrowForwardIos } from "@material-ui/icons";

const IDsetDesign = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const [selectedValue, setSelectedValue] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [displayFrontImage, setDisplayFrontImage] = useState(true);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setActiveImageIndex(0);
  };

  const handleImageButtonClick = (index) => {
    setActiveImageIndex(index);

    // Check the selected value and set displayFrontImage accordingly
    switch (selectedValue) {
      case "ID Card":
        setDisplayFrontImage(true);
        break;
      case "Library Card":
        setDisplayFrontImage(true);
        break;
      case "Local Guardian's Card":
        setDisplayFrontImage(true);
        break;
      case "Event Pass":
        setDisplayFrontImage(true);
        break;
      case "Guest Pass":
        setDisplayFrontImage(true);
        break;
      default:
        setDisplayFrontImage(true);
    }
  };

  // Define card arrays based on dropdown selection
  const cardArraysFront = {
    "ID Card": [IDCard1, IDCard2, IDCard3, IDCard4, IDCard5, IDCard6],
    "Library Card": [
      LibraryCard1,
      LibraryCard2,
      LibraryCard3,
      LibraryCard4,
      LibraryCard5,
      LibraryCard6,
    ],
    "Event Pass": [
      EventPass1,
      EventPass2,
      EventPass3,
      EventPass4,
      EventPass5,
      EventPass6,
    ],
    "Guest Pass": [
      GuestPass1,
      GuestPass2,
      GuestPass3,
      GuestPass4,
      GuestPass5,
      GuestPass6,
    ],
    "Local Guardian's Card": [
      LocalGuardianCard1,
      LocalGuardianCard2,
      LocalGuardianCard3,
      LocalGuardianCard4,
      LocalGuardianCard5,
      LocalGuardianCard6,
    ],
    "Parent's Card": [
      GuardianCard1,
      GuardianCard2,
      GuardianCard3,
      GuardianCard4,
      GuardianCard5,
      GuardianCard6,
    ],
  };

  const cardArraysBack = {
    "ID Card": [
      IDCardBack1,
      IDCardBack2,
      IDCardBack3,
      IDCardBack4,
      IDCardBack5,
      IDCardBack6,
    ],
    "Library Card": [
      LibraryCardBack1,
      LibraryCardBack2,
      LibraryCardBack3,
      LibraryCardBack4,
      LibraryCardBack5,
      LibraryCardBack6,
    ],
    "Event Pass": [
      EventPass1,
      EventPass2,
      EventPass3,
      EventPass4,
      EventPass5,
      EventPass6,
    ],
    "Guest Pass": [
      GuestPass1,
      GuestPass2,
      GuestPass3,
      GuestPass4,
      GuestPass5,
      GuestPass6,
    ],
    "Local Guardian's Card": [
      LocalGuardianCardBack1,
      LocalGuardianCardBack2,
      LocalGuardianCardBack3,
      LocalGuardianCardBack4,
      LocalGuardianCardBack5,
      LocalGuardianCardBack6,
    ],
    "Parent's Card": [
      GuardianCardBack1,
      GuardianCardBack2,
      GuardianCardBack3,
      GuardianCardBack4,
      GuardianCardBack5,
      GuardianCardBack6,
    ],
  };

  // Get the active card array based on dropdown selection
  const activeCardArray = cardArraysFront[selectedValue] || [];
  const activeCardArrayBack = cardArraysBack[selectedValue] || [];

  const handlePrevClick = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? activeCardArray.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === activeCardArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <RevealCard>
      {/* Dropdown and image selection */}
      <Box
        mt={3}
        ml={3}
        mr={3}
        mb={7}
        display="flex"
        justifyContent="space-between"
      >
        {/* dropdown */}
        <Box width={isTablet ? "400px" : isSmall ? "300px" : "500px"}>
          <Select
            value={selectedValue}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Card Selection
            </MenuItem>
            <MenuItem value={"ID Card"}>ID Card</MenuItem>
            <MenuItem value={"Parent's Card"}>Parent's Card</MenuItem>
            <MenuItem value={"Local Guardian's Card"}>
              Local Guardian's Card
            </MenuItem>
            <MenuItem value={"Library Card"}>Library Card</MenuItem>
            <MenuItem value={"Event Pass"}>Event Pass</MenuItem>
            <MenuItem value={"Guest Pass"}>Guest Pass</MenuItem>
          </Select>
        </Box>

        {/* image selection buttons */}
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          {activeCardArray.map((_, index) => (
            <img
              src={activeCardArray[index]}
              alt="ID Card"
              onClick={() => handleImageButtonClick(index)}
              style={{
                width: activeImageIndex === index ? "77px" : "65px",
                height: activeImageIndex === index ? "52px" : "40px",
                marginX: "2px",
                marginRight: "10px",
                display: "block",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Render card images and Apply button only when a selection is made */}
      {selectedValue && (
        // Image Carousel
        <Box mb={5} position="relative">
          <Box sx={{ display: "flex" }}>
            <Box position={"absolute"} sx={{left: "200px", top: "150px"}}>
              <IconButton onClick={handlePrevClick}>
                <ArrowBackIos />
              </IconButton>
            </Box>
            {/* Display active image */}
            {displayFrontImage ? (
              <img
                src={activeCardArray[activeImageIndex]}
                alt="Card"
                style={{
                  width: "520px",
                  margin: "0 auto",
                  display: "block",
                }}
                onClick={() => setDisplayFrontImage(false)}
              />
            ) : (
              <img
                src={activeCardArrayBack[activeImageIndex]}
                alt="Card"
                style={{
                  width: "520px",
                  margin: "0 auto",
                  display: "block",
                }}
                onClick={() => setDisplayFrontImage(true)}
              />
            )}

            <Box position={"absolute"} sx={{right: "200px", top: "150px"}}>
              <IconButton onClick={handleNextClick}>
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Box>
          {/* Selection Dots */}
          <Box mt={2} display="flex" justifyContent="center">
            {activeCardArray.map((_, index) => (
              <Button
                key={index}
                onClick={() => handleImageButtonClick(index)}
                sx={{
                  bgcolor: activeImageIndex === index ? "#534E4E" : "#D9D9D9",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  marginX: 1,
                  padding: 0,
                  minWidth: 0,
                  minHeight: 0,
                }}
              />
            ))}
          </Box>

          {/* Apply button */}
          <Box mt={2} mr={3} display="flex" justifyContent="flex-end">
            <Button variant="contained">Apply</Button>
          </Box>
        </Box>
      )}
    </RevealCard>
  );
};

export default IDsetDesign;
