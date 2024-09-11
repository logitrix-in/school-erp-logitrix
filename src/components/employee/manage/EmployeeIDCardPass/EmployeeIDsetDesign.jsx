import React, { useState } from "react";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import Flex from "../../../UiComponents/Flex";
import ReactFlipCard from "reactjs-flip-card";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";
import { ToastContainer, toast } from "react-toastify";

import EmployeeCard1Front from "../../../../assets/cards/emp/e1-f.png";
import EmployeeCard2Front from "../../../../assets/cards/emp/e2-f.png";
import EmployeeCard3Front from "../../../../assets/cards/emp/e3-f.png";
import EmployeeCard4Front from "../../../../assets/cards/emp/e4-f.png";
import EmployeeCard5Front from "../../../../assets/cards/emp/e5-f.png";
import EmployeeCard6Front from "../../../../assets/cards/emp/e6-f.png";

import EmployeeCard1Back from "../../../../assets/cards/emp/e1-f.png";
import EmployeeCard2Back from "../../../../assets/cards/emp/e2-f.png";
import EmployeeCard3Back from "../../../../assets/cards/emp/e3-f.png";
import EmployeeCard4Back from "../../../../assets/cards/emp/e4-f.png";
import EmployeeCard5Back from "../../../../assets/cards/emp/e5-f.png";
import EmployeeCard6Back from "../../../../assets/cards/emp/e6-f.png";

const formats = [
  {
    id: 1,
    front: EmployeeCard5Front,
    back: EmployeeCard5Back,
  },
  {
    id: 2,
    front: EmployeeCard1Front,
    back: EmployeeCard1Back,
  },
  {
    id: 3,
    front: EmployeeCard2Front,
    back: EmployeeCard2Back,
  },
  {
    id: 4,
    front: EmployeeCard3Front,
    back: EmployeeCard3Back,
  },
  {
    id: 5,
    front: EmployeeCard4Front,
    back: EmployeeCard4Back,
  },
];

const IDsetDesign = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Box pb={5}>
      <Flex justifyContent={"flex-end"} gap={2}>
        {formats.map((img, idx) => (
          <Box
            key={idx}
            height={"5rem"}
            position="relative" // Make sure the Box is relatively positioned
            sx={{
              aspectRatio: "406/641",
              cursor: "pointer",
              transition: "all 0.1s",
              boxShadow: selected == idx && "0 0 15px -5px #000",
              transform: selected == idx && "scale(1.1)",
              "&:hover": {
                transform: selected != idx && "scale(1.05)",
              },
            }}
            onClick={() => setSelected(idx)}
          >
            {selected == idx && (
              <Box
                position="absolute"
                top={-10}
                right={15}
                width="1.5rem"
                height="1.5rem"
                bgcolor="green"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%" // Make it a circle
                color="white"
                fontSize="1rem"
                fontWeight="bold"
              >
                ✓
              </Box>
            )}
            <img
              src={img.front}
              alt={`img-${img.id}`}
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}

      </Flex>

      <Stack alignItems={"center"} justifyContent={"center"} mt={2} gap={2}>
        <Flex width={"30rem"} gap={8}>
          <Flex flex={1} justifyContent={"flex-end"}>
            {selected != 0 && (
              <IconButton onClick={() => setSelected((p) => p - 1)}>
                <LeftIcon />
              </IconButton>
            )}
          </Flex>
          <ReactFlipCard
            flipTrigger="onClick"
            flipCardStyle={{
              boxShadow: "0 0 15px -3px #00000068",
            }}
            containerStyle={{
              height: "24rem",
              width: "15.2rem",
            }}
            frontComponent={
              <img src={formats[selected].front} alt="selected-img" />
            }
            backComponent={
              <img src={formats[selected].back} alt="selected-img" />
            }
          />
          <Box flex={1}>
            {selected < formats.length - 1 && (
              <IconButton onClick={() => setSelected((p) => p + 1)}>
                <RightIcon />
              </IconButton>
            )}
          </Box>
        </Flex>
        <Flex width={"fit-content"}>
          {formats.map((f, i) => (
            <Box
              height={8}
              key={i}
              width={8}
              bgcolor={selected == i ? "gray" : "divider"}
              borderRadius={"100%"}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setSelected(i)}
            />
          ))}
        </Flex>
      </Stack>
      <Flex justifyContent={"center"} mt={2}>
        <Button variant="contained" sx={{ width: "10rem" }} onClick={() => toast.success("Card Applied Successfully")}>
          Apply
        </Button>
      </Flex>
    </Box>
  );
};

export default IDsetDesign;
