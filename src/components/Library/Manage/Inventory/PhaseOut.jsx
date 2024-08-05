import React, { useState } from "react";
import Section from "../../../Section";
import { toast, ToastContainer } from "react-toastify";
import {
	Box,
	Button,
	Dialog,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Flex from "../../../UiComponents/Flex";
import Popup from "../../../UiComponents/Popup";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "id", headerName: "Media ID", flex: 1 },
	{ field: "mediaType", headerName: "Media Type", flex: 1 },
	{ field: "mediaName", headerName: "Media Name", flex: 2 },
	{ field: "author", headerName: "Author", flex: 1 },
	{ field: "note", headerName: "Note", flex: 2 },
];

const PhaseOut = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const close = () => setDialogOpen(false);
	const closeEdit = () => setEditOpen(false);

	const [scanType, setScanType] = useState("manual");

	const [addToTable, setAddToTable] = useState(false);

	return (
		<Section title={"Phase Out / Edit Media"}>
			<ToastContainer autoClose={1000} />

			{addToTable && (
				<Box my={2}>
					<DataGrid
						autoHeight
						hideFooter
						slots={{
							noRowsOverlay: () => (
								<Flex height={"100%"} justifyContent={"center"}>
									No Data
								</Flex>
							),
						}}
						sx={{ "--DataGrid-overlayHeight": "100px" }}
						rows={[]}
						columns={columns}
					/>
				</Box>
			)}
			<Flex>
				<Button
					variant="contained"
					onClick={() => {
						toast.info("Barcode Enabled");
					}}
				>
					Enable Barcode Scan
				</Button>
				<Button
					variant="outlined"
					onClick={() => {
						setScanType("manual");
						setDialogOpen(true);
					}}
				>
					Manual
				</Button>

				{addToTable && (
					<>
						<Button sx={{ ml: "auto" }} variant="contained">
							Add All Copies
						</Button>
						<Button variant="contained" color="secondary">
							Delete From Inventory
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => setEditOpen(true)}
						>
							Edit
						</Button>
					</>
				)}
			</Flex>

			{/* add to table popup */}
			<Popup
				title={"Media ID - Manual"}
				open={dialogOpen}
				close={close}
				dialogProps={{ maxWidth: "sm" }}
			>
				<Box px={4} py={2} component={"form"} overflow={"auto"}>
					<Stack gap={1}>
						<TextField
							multiline
							minRows={5}
							label={"Media ID"}
							placeholder="Enter Media ID (s) - Example ABCDE00000000, EFGHI1111111..."
						/>
					</Stack>
					<Button
						variant={"contained"}
						fullWidth
						sx={{ mt: 4 }}
						onClick={() => {
							close();
							setAddToTable(true);
						}}
					>
						Add To Table
					</Button>
				</Box>
			</Popup>

			{/* edit and update popupp */}
			<Popup title={"Media Details"} open={editOpen} close={closeEdit}>
				<Box p={5} component={"form"} height={"80vh"} overflow={"auto"}>
					<Stack gap={1}>
						<Typography mb={2}>Media ID: </Typography>
						<ReignsSelect
							required
							options={[]}
							label="Enter Media Type"
						/>
						<ReignsSelect
							required
							options={[]}
							label="Enter Media Name"
						/>
						<ReignsSelect
							required
							options={[]}
							label="Enter Media Category"
						/>
						<TextField required label="Enter Author" />
						<TextField required label="Publisher" />
						<ReignsSelect
							required
							options={[]}
							label="Enter Media Language"
						/>
						<TextField required label="Enter Edition" />
						<TextField
							multilineF
							minRows={5}
							label={"Note"}
							placeholder="Use this field to record issues specific to the media (Example wear and tear, spot
 marks, missing pages etc.)"
						/>

						<FormControl>
							<FormLabel sx={{ display: "inline" }}>
								Do you want more copies of the same media?
							</FormLabel>
							<RadioGroup row sx={{ display: "inline" }}>
								<FormControlLabel
									value="yes"
									control={<Radio />}
									label="Yes"
								/>
								<FormControlLabel
									value="no"
									control={<Radio />}
									label="No"
								/>
							</RadioGroup>
						</FormControl>
					</Stack>
					<Button
						variant={"contained"}
						fullWidth
						sx={{ mt: 4 }}
						onClick={() => {
							closeEdit();
						}}
					>
						Update
					</Button>
				</Box>
			</Popup>
		</Section>
	);
};

export default PhaseOut;
