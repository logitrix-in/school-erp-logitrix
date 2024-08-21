import React from "react";
import Flex from "../../../UiComponents/Flex";
import { Button, InputAdornment, TextField, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "Library Card #", flex: 1 },
	{ field: "name", headerName: "Class", flex: 1 },
	{ field: "studentName", headerName: "Section", flex: 1 },
	{ field: "author", headerName: "Roll #", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "Last Issue Date", flex: 1 },
];

const LibraryIndividual = () => {
	return (
		<Box>
			<Flex mb={2}>
				<TextField
					size="small"
					placeholder="Search by Library ID or Student Name"
					sx={{ width: "25rem" }}
					variant="outlined"
					InputProps={{
						sx: {
							fontSize: "0.9rem",
						},
						endAdornment: (
							<InputAdornment position="end">
								<Search sx={{ fontSize: "1.3rem" }} />
							</InputAdornment>
						),
					}}
				/>
				<Button variant="contained" sx={{ mr: "auto" }}>
					Search
				</Button>
			</Flex>

			<Box mt={3}>
				<DataGrid columns={columns} rows={[]} autoHeight />
			</Box>

			<Flex justifyContent={"flex-end"} mt={4}>
				<Button variant="contained" color="secondary">Issue Library Card</Button>
				<Button variant="contained" color="secondary">Print</Button>
			</Flex>
		</Box>
	);
};

export default LibraryIndividual;
