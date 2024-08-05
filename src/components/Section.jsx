import React from "react";
import Bbox from "./UiComponents/Bbox";
import { Typography, Box, Divider } from "@mui/material";

const Section = ({ title, children, comp, sx }) => {
	return (
		<Bbox borderRadius={2} overflow={"hidden"} sx={sx}>
			{title && (
				<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
					<Typography fontWeight={"700"} fontSize={"1.1rem"}>
						{title}
					</Typography>
				</Box>
			)}
			{comp}

			<Divider />
			<Box p={2}>{children}</Box>
		</Bbox>
	);
};

export default Section;
