import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Bbox = ({ sx, ...props }) => {
	return (
		<Box
			bgcolor={"white"}
			sx={{
				border: "1px solid",
				borderColor: "rgba(0,0,0,0.06)",
				boxShadow: "0 4px 14px -2px rgba(0,0,0,0.06)",
				...sx,
			}}
			{...props}
		>
			{props.children}
		</Box>
	);
};

export default Bbox;
