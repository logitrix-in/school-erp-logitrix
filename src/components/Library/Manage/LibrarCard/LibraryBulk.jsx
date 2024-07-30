import { Box, Button, Chip } from "@mui/material";
import React from "react";
import Flex from "../../../UiComponents/Flex";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import useClasses from "../../../../hooks/useClasses";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "Library Card #", flex: 1 },
	{ field: "name", headerName: "Class", flex: 1 },
	{ field: "studentName", headerName: "Section", flex: 1 },
	{ field: "author", headerName: "Roll #", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "Last Issue Date", flex: 1 },
];

const LibraryBulk = () => {
	const c = useClasses();

	return (
		<Box>
			<Flex>
				<ReignsSelect items={c.acYear} label="Academic Year" />
				<ReignsSelect items={c.classes} label="Class" />
				<ReignsSelect items={c.sections} label="Section" />
				<ReignsSelect items={c.roll} label="Roll #" />
			</Flex>
			<Flex justifyContent={"center"} mt={2}>
				<Button sx={{ width: "30rem" }} variant="contained">
					Submit
				</Button>
			</Flex>
			<Box mt={3}>
				<Flex justifyContent={"flex-end"} my={1} mt={3}>
					<Chip label="80 Results Found" />
				</Flex>
				<DataGrid
					checkboxSelection
					columns={columns}
					rows={[]}
					autoHeight
				/>
			</Box>
			<Flex justifyContent={"flex-end"} mt={4}>
				<Button variant="contained" color="secondary">
					Issue Library Card
				</Button>
				<Button variant="contained" color="secondary">
					Print
				</Button>
			</Flex>
		</Box>
	);
};

export default LibraryBulk;
