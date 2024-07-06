import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Bbox from "../UiComponents/Bbox";

const Inventory = () => {
	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Inventory Utilization
				</Typography>
			</Box>

			<Divider />
			<Box p={2} display={"flex"} gap={1}>
				
			</Box>
		</Bbox>
	);
};


export default Inventory;
