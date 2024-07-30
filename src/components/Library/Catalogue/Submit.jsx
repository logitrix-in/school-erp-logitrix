import {
	Autocomplete,
	Box,
	Button,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { Stack } from "@mui/system";
import { Icon } from "@iconify/react";
import { DataGrid } from "@mui/x-data-grid";
import AutocompleteWithAll from "../../UiComponents/AutocompleteWithAll";

const Submit = () => {
	const columns = [
		{
			field: "mediaType",
			headerName: "Media Type",
			width: 150,
		},
		{
			field: "category",
			headerName: "Category",
			flex: 1,
		},
		{
			field: "mediaName",
			headerName: "Media Name",
			flex: 2,
		},
		{
			field: "author",
			headerName: "Author",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
		{
			field: "publisher",
			headerName: "Publisher",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
		{
			field: "mediaLanguage",
			headerName: "Media Language",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
		{
			field: "copiesAvailable",
			headerName: "Copies Available",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
	];

	const rows = [
		{
			id: 1,
			copiesAvailable: "5",
			mediaLanguage: "English",
			publisher: "Neeraj Publication",
			author: "Florentino Ayson",
			mediaName: "Fundamentals of Political Science",
			category: "Political Science",
			mediaType: "Books",
		},
	];

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Search
				</Typography>
			</Box>

			<Divider />
			<Box p={2}>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button variant="outlined">Clear All</Button>
				</Box>
				<Grid container spacing={2} mt={1}>
					<Grid item xs={4}>
						<ReignsSelect
							full
							items={["Books", "Periodicals", "Research Papers"]}
							label="Media Type"
							multiple
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							multiple
							disableCloseOnSelect
							limitTags={2}
							renderTags={(val, props) => {
								return <Box {...props}>{val}</Box>;
							}}
							options={[
								"Bengali literature",
								"Hindi literature",
								"English literature",
								"Mathematics",
								"Physics",
								"Chemistry",
								"Biology",
								"Computer Science",
								"statistic",
								"History",
								"Geography",
								"Political Science",
								"Psychology",
								"Sociology",
								"Economics",
								"Accountancy",
								"Business Studies",
								"Fiction",
								"Non-fiction",
							]}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField
									fullWidth
									{...params}
									label="Select Category"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							multiple
							disableCloseOnSelect
							limitTags={2}
							options={["Bengali literature", "Hindi literature"]}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField
									fullWidth
									{...params}
									label="Select Name"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							multiple
							disableCloseOnSelect
							limitTags={2}
							options={["Bengali literature", "Hindi literature"]}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField
									fullWidth
									{...params}
									label="Select Author"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							multiple
							disableCloseOnSelect
							limitTags={2}
							options={["Bengali literature", "Hindi literature"]}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField
									fullWidth
									{...params}
									label="Select Publisher"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							multiple
							disableCloseOnSelect
							limitTags={2}
							options={[
								"English",
								"Bengali",
								"Hindi",
								"Sanskrit",
								"Tamil",
								"Telugu",
								"Kannada",
								"Malayalam",
							]}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField
									fullWidth
									{...params}
									label="Select Media Language"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll />
					</Grid>
				</Grid>

				<Box mt={2} display={"flex"} justifyContent={"center"}>
					<Button
						sx={{ width: "min(30rem,100%)" }}
						variant="contained"
					>
						Submit
					</Button>
				</Box>

				<DataGrid
					sx={{ mt: 5 }}
					rows={rows}
					columns={columns}
					hideFooter
				/>
			</Box>
		</Bbox>
	);
};

export default Submit;
