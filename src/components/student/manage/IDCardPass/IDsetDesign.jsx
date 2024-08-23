import React, { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import { Box, Select, MenuItem, Button } from "@mui/material";
import IDCard from "../../../../assets/cards/IDCard.png";
import IDCardBack from "../../../../assets/cards/IDCardBack.png";
import EventPass from "../../../../assets/cards/EventPass.png";
import GuardianCard from "../../../../assets/cards/GuardianCard.png";
import GuardianCardBack from "../../../../assets/cards/GuardianCardBack.png";
import GuestPass from "../../../../assets/cards/GuestPass.png";
import LibraryCard from "../../../../assets/cards/LibraryCard.png";
import LibraryCardBack from "../../../../assets/cards/LibraryCardBack.png";
import { useMediaQuery } from "@material-ui/core";

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
        setDisplayFrontImage(false);
        break;
      case "Library Card":
        setDisplayFrontImage(false);
        break;
      case "Local Guardian's Card":
        setDisplayFrontImage(false);
        break;
      case "Event Pass":
        setDisplayFrontImage(false);
        break;
      case "Guest Pass":
        setDisplayFrontImage(false);
        break;
      default:
        setDisplayFrontImage(true);
    }
  };

  // Define card arrays based on dropdown selection
  const cardArrays = {
    "ID Card": [IDCard, IDCard, IDCard, IDCard, IDCard, IDCard],
    "Library Card": [
      LibraryCard,
      LibraryCard,
      LibraryCard,
      LibraryCard,
      LibraryCard,
      LibraryCard,
    ],
    "Event Pass": [
      EventPass,
      EventPass,
      EventPass,
      EventPass,
      EventPass,
      EventPass,
    ],
    "Guest Pass": [
      GuestPass,
      GuestPass,
      GuestPass,
      GuestPass,
      GuestPass,
      GuestPass,
    ],
    "Local Guardian's Card": [
      GuardianCard,
      GuardianCard,
      GuardianCard,
      GuardianCard,
      GuardianCard,
      GuardianCard,
    ],
    "Parent's Card": [
      GuardianCard,
      GuardianCard,
      GuardianCard,
      GuardianCard,
      GuardianCard,
      GuardianCard,
    ],
  };

  // Get the active card array based on dropdown selection
  const activeCardArray = cardArrays[selectedValue] || [];

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
          {/* Display active image */}
          {displayFrontImage ? (
            <img
              src={activeCardArray[activeImageIndex]}
              alt="ID Card"
              style={{
                width: "520px",
                height: "300px",
                margin: "0 auto",
                display: "block",
              }}
              onClick={() => setDisplayFrontImage(false)}
            />
          ) : (
            // display back card image
            <Box>
              {/* ID Card back image */}
              {selectedValue === "ID Card" && (
                <img
                  src={IDCardBack}
                  alt="ID Card"
                  style={{
                    width: "520px",
                    height: "300px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  onClick={() => setDisplayFrontImage(true)}
                />
              )}

              {/* Library Card back image */}
              {selectedValue === "Library Card" && (
                <img
                  src={LibraryCardBack}
                  alt="Library Card"
                  style={{
                    width: "520px",
                    height: "700px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  onClick={() => setDisplayFrontImage(true)}
                />
              )}

              {/* Local Guardian's Card back image */}
              {selectedValue === "Local Guardian's Card" && (
                <img
                  src={GuardianCardBack}
                  alt="Guardian Card"
                  style={{
                    width: "520px",
                    height: "300px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  onClick={() => setDisplayFrontImage(true)}
                />
              )}

              {/* Event Pass back image */}
              {selectedValue === "Event Pass" && (
                <img
                  src={EventPass}
                  alt="Event Pass"
                  style={{
                    width: "520px",
                    height: "300px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  onClick={() => setDisplayFrontImage(true)}
                />
              )}

              {/* Guest Pass back image */}
              {selectedValue === "Guest Pass" && (
                <img
                  src={GuestPass}
                  alt="Guest Pass"
                  style={{
                    width: "520px",
                    height: "300px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  onClick={() => setDisplayFrontImage(true)}
                />
              )}

              {/* Parent's Card back image */}
              {selectedValue === "Parent's Card" && (
                <img
                  src={GuardianCardBack}
                  alt="Guardian Card"
                  style={{
                    width: "520px",
                    height: "300px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  onClick={() => setDisplayFrontImage(true)}
                />
              )}
            </Box>
          )}

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
