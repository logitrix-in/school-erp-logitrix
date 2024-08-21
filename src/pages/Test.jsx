import React, { useState } from "react";
import ReignsSelect from "../components/UiComponents/ReignsSelect.tsx";
import { Box } from "@mui/material";

const Test = () => {
  const items = [1, 2, 3, 4];
  const [value, setValue] = useState([1, 2]);
  return (
    <Box p={2}>
      <ReignsSelect
        multiple
        sx={{ width: "10rem" }}
        items={[1, 2, 3]}
        label="Select"
        onChange={(e) => console.log(e)}
      />
    </Box>
  );
};

export default Test;
