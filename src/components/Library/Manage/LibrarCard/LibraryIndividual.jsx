import React, { useState } from "react";
import Flex from "../../../UiComponents/Flex";
import Preview from "./Preview";
import { Button, InputAdornment, TextField, Box, Autocomplete } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";

const columns = [
	{ field: "id", headerName: "Library Card #", flex: 1 },
	{ field: "name", headerName: "Class", flex: 1 },
	{ field: "studentName", headerName: "Section", flex: 1 },
	{ field: "author", headerName: "Roll #", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "Last Issue Date", flex: 1 },
];

const LibraryIndividual = () => {
	const names = [];
	const [preview, setPreview] = useState(false);

	return (
		<>

			<Box>
				<Flex mb={2}>

					<Autocomplete
						size="small"
						variant="outlined"
						options={names}
						filterSelectedOptions
						freeSolo={false}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search by Library ID or Student Name"
								placeholder="Search by Library ID or Student Name"
							/>
						)}
						sx={{ width: "30%" }}
					/>
				</Flex>

				<Box mt={3}>
					<DataGrid columns={columns} rows={[]} autoHeight />
				</Box>

				<Flex justifyContent={"flex-end"} mt={4}>
					<Button variant="contained" color="secondary" onClick={() => setPreview(true)}>Issue Library Card</Button>
					<Button variant="contained" color="secondary">Print</Button>
				</Flex>
			</Box>

			<ToastContainer />
			{
				preview && (
					<Preview open={preview} close={() => setPreview(false)} />
				)
			}
		</>
	);
};

export default LibraryIndividual;
