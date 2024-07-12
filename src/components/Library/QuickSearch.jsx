import {
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	InputBase,
	Typography,
	Badge,
	Chip,
} from "@mui/material";

// quick search will render 3 different types of data set - student, employee, media
import React from "react";
import Bbox from "../UiComponents/Bbox";
import { Icon } from "@iconify/react";
import { DataGrid } from "@mui/x-data-grid";

const QuickSearch = () => {
	const columns = [
		{ field: "id", headerName: "Library Card", width: 140 },
		{
			field: "name",
			headerName: "Name",
			width: 150,
			editable: true,
		},
		{
			field: "category",
			headerName: "Category",
			flex: 1,
		},
		{
			field: "department",
			headerName: "Department",
			flex: 1,
		},
		{
			field: "currentBorrowing",
			headerName: "current Borrowing",
			renderCell: (params) => (
				<div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
					{params.value}
				</div>
			),
			flexWrap: true,
			flex: 2,
			sortable: true,
		},
		{
			field: "libraryCardStatus",
			headerName: "Library Card Status",
			flex: 1,
			renderCell: (params) => {
				console.log(params);
				return (
					<Box
						sx={{
							bgcolor: "#C6F6D5",
							borderRadius: 1,
							px: 2,
							py: 0.5,
						}}
					>
						{params.value}
					</Box>
				);
			},
		},
	];

	const rows = [
		{
			id: "CHN2401",
			name: "Arnab Chatterjee",
			category: "Teaching Staff",
			department: "Biology",
			currentBorrowing:
				"Alice's Adventure in the Wonderland, harry potter and the cursed child",
			libraryCardStatus: "Active",
		},
	];

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Quick Search - User / Media Details
				</Typography>
			</Box>

			<Divider />
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<SearchBox />
					<Button
						variant="contained"
						size="small"
						sx={{ px: 2, ml: 2 }}
					>
						Search
					</Button>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						disableRowSelectionOnClick
					/>
				</Box>
			</Stack>
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
				display: "flex",
				alignItems: "center",
			}}
		>
			<InputBase
				fullWidth
				placeholder="Search by Library Card # / Media ID"
			/>
			<Icon icon={"tabler:search"} fontSize={"1.2rem"} />
		</Box>
	);
};

export default QuickSearch;
