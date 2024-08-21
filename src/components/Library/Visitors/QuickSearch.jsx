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
	Dialog,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";

const columns = [
	{
		field: "name",
		headerName: "Name",
		width: 150,
	},
	{
		field: "category",
		headerName: "Category",
		flex: 1,
	},
];
const rows = [];

const QuickSearch = () => {
	const { days } = useClasses();

	return (
		<Section title={"Record Attendance - Manually"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<SearchBox />
					<Button
						variant="contained"
						size="small"
						sx={{ px: 2, ml: 2 }}
					>
						Submit
					</Button>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						autoHeight
						rows={rows}
						columns={columns}
						// disableRowSelectionOnClick
					/>
				</Box>

				<Flex justifyContent={"flex-end"}>
					<Button variant="contained" color="primary">
						Check - in
					</Button>
					
				</Flex>
			</Stack>
		</Section>
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
				placeholder="Enter Library Card #"
			/>
			<Icon icon={"tabler:search"} fontSize={"1.2rem"} />
		</Box>
	);
};
export default QuickSearch;
