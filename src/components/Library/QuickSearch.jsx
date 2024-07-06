import { Box, Button, Divider, Grid, InputBase, Typography } from "@mui/material";
import React from "react";
import Bbox from "../UiComponents/Bbox";
import { Icon } from '@iconify/react';

const QuickSearch = () => {
	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Quick Search - User / Media Details
				</Typography>
			</Box>

			<Divider />
			<Box p={2} display={"flex"} gap={1}>
				<SearchBox />
				<Button variant="contained" size="small" sx={{px: 2, ml: 2}}>Search</Button>
			</Box>
		</Bbox>
	);
};

const SearchBox = () => {
	return (
		<Box
			sx={{
				border: "1px solid #28282836",
				p: 0.7,
				px: 3,
				borderRadius: 1,
				width: "30rem",
				display: 'flex',
				alignItems: 'center'
			}}
		>
			<InputBase fullWidth placeholder="Search by Library Card # / Media ID" />
			<Icon icon={'tabler:search'} fontSize={'1.2rem'}/>
		</Box>
	);
};

export default QuickSearch;
