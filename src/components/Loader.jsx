import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <Box
      p={3}
      position={"absolute"}
      height={"100vh"}
      width={"100%"}
      zIndex={99}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      bgcolor={"#f8f8f8"}
    >
      <HashLoader color={"#00A76F"} loading={true} size={40} />
      <Typography color={'text.secondary'} fontSize={'1rem'} mt={4}>Plan, Enroll, Thrive, Excel, Succeed</Typography>
    </Box>
  );
};

export default Loader;
