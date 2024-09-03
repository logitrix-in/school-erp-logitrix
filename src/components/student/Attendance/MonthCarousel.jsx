import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

const MonthCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const monthsToShow = 13;
  const monthsPerView = 4;

  const months = Array.from({ length: monthsToShow }, (_, i) => {
    return dayjs()
      .subtract(6 - i, "month")
      .toDate();
  });

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < months.length - monthsPerView
        ? prevIndex + 1
        : months.length - monthsPerView
    );
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <IconButton onClick={handlePrev} disabled={activeIndex === 0}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        display="flex"
        overflow="hidden"
        width="1000px"
        justifyContent="center"
        height="300px"
      >
        {months
          .slice(activeIndex, activeIndex + monthsPerView)
          .map((month, index) => (
            <Box key={index}  sx={{ width: "400px", height: "500px" }}>
              <Calendar
                value={month}
                view="month"
              />
            </Box>
          ))}
      </Box>
      <IconButton
        onClick={handleNext}
        disabled={activeIndex >= months.length - monthsPerView}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default MonthCarousel;
