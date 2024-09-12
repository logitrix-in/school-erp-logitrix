import React, { useState } from "react";
import Section from "../../../Section";
import { toast, ToastContainer } from "react-toastify";
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	Select,
	Radio,
	RadioGroup,
	Stack,
	MenuItem,
	TextField,
	Typography,
	Divider
} from "@mui/material";
import Flex from "../../../UiComponents/Flex";
import Popup from "../../../UiComponents/Popup";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import api from '../../../../config/api';
import useMedia from "../../../../hooks/useMedia";

const columns = [
	{ field: "id", headerName: "Media ID", flex: 1, },
	{ field: "media_type", headerName: "Media Type", flex: 1 },
	{ field: "media_name", headerName: "Media Name", flex: 2 },
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
	const [rows, setRows] = useState([]);
	const [mediaIDs, setMediaIDs] = useState("");
	const { mediaTypes, mediaCategories, mediaLanguages } = useMedia();
	const [mediaId, setMediaId] = useState('');
	const [mediaType, setMediaType] = useState('');
	const [mediaName, setMediaName] = useState('');
	const [author, setAuthor] = useState('');
	const [publisher, setPublisher] = useState('');
	const [mediaCategory, setMediaCategory] = useState('');
	const [mediaLanguage, setMediaLanguage] = useState('');
	const [edition, setEdition] = useState('');
	const [note, setNote] = useState('');
	// MEDIA8, MEDIA9, MEDIA10

	async function getMediaDetails() {
		try {
			const response = await api.post("/library/get-bulk-media/", {
				media_list: mediaIDs.split(",").map((id) => id.trim()),
			})
			console.log(response);

			if (response.status === 200) {
				setRows(response.data.map(row => ({ ...row, id: row.media_id })));
				toast.success("Media added to table");
			} else {
				toast.error("Media not found");
			}
		} catch (error) {
			console.log(error);
			toast.error("Media not found");
		} finally {
			close();
			setAddToTable(true);
		}
	}

	const [selectedRows, setSelectedRows] = useState([]);

	const handleSelectionChange = (newSelectionModel) => {
		const selectedIDs = new Set(newSelectionModel);
		const selectedRowData = rows.filter((row) =>
			selectedIDs.has(row.id)
		);
		setSelectedRows(selectedRowData);
		console.log('Selected rows:', selectedRowData);
	};

	const handleDelete = async () => {
		try {
			console.log(selectedRows);
			const mediaIds = selectedRows.map(row => row.media_id);
			console.log(mediaIds);

			const response = await api.delete("/library/bulk-media", {
				media_list: mediaIds
			});

			if (response.status === 200) {
				console.log(response.data);
				setRows(rows.filter(row => !selectedRows.includes(row)));
				toast.success("Media deleted successfully");
			} else {
				toast.error("Failed to delete media");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditButtonClick = () => {
		setEditOpen(true);
		setMediaId(selectedRows[0].media_id);
		setMediaType(selectedRows[0].media_type);
		setMediaName(selectedRows[0].media_name);
		setMediaCategory(selectedRows[0].category);
		setAuthor(selectedRows[0].author);
		setPublisher(selectedRows[0].publisher);
		setMediaLanguage(selectedRows[0].media_language);
		setEdition(selectedRows[0].edition);
		setNote(selectedRows[0].note);
	};

	const handleUpdate = async () => {
		try {
			const newRow = {
				id: mediaId, // Media ID from the form
				media_id: mediaId, // Media ID from the form
				media_type: mediaType, // Selected media type from the form
				media_name: mediaName, // Entered media name
				category: mediaCategory, // Selected media category
				author: author, // Entered author name
				publisher: publisher, // Entered publisher
				media_language: mediaLanguage, // Selected media language
				edition: edition, // Entered edition
				note: note, // Entered note (additional information)
			};

			console.log(newRow);

			const response = await api.patch("/library/media/",
				newRow
			);

			console.log(response.data)

			if (response.status === 200) {
				console.log(response.data);
				toast.success("Media updated successfully");

				setMediaId(response.data.media_id);
				setMediaType(response.data.media_type);
				setMediaName(response.data.media_name);
				setMediaCategory(response.data.category);
				setAuthor(response.data.author);
				setPublisher(response.data.publisher);
				setMediaLanguage(response.data.media_language);
				setEdition(response.data.edition);
				setNote(response.data.note);

				// handleSelectionChange();
				const resp = await api.post("/library/get-bulk-media/", {
					media_list: mediaIDs.split(",").map((id) => id.trim()),
				})
				console.log(resp);

				if (resp.status === 200) {
					setRows(resp.data.map(row => ({ ...row, id: row.media_id })));
				}
			} else {
				toast.error("Failed to update media");
			}
		} catch (error) {
			console.log(error);
		} finally {
			closeEdit();
		}
	}

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
						rows={rows}
						columns={columns}
						checkboxSelection
						onRowSelectionModelChange={handleSelectionChange}
					/>
				</Box>
			)}
			<Flex>

				{
					!addToTable && (

						<Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'auto'}>
							<Stack alignItems={"center"} gap={1} p={2}>
								<Icon icon="bx:qr-scan" fontSize="8rem" />
								<Typography>Scan media ID to proceed...</Typography>
							</Stack>

							<Box my={2} display="flex" alignItems="center" width="100%">
								<Divider sx={{ flex: 1 }} />
								<Typography
									variant="body2"
									color="text.secondary"
									mx={2}
									sx={{
										display: 'flex',
										alignItems: 'center',
										'&::before, &::after': {
											content: '""',
											flex: '1',
											borderBottom: '1px solid',
											borderColor: 'text.secondary',
											marginX: 1,
										},
									}}
								>
									OR
								</Typography>
								<Divider sx={{ flex: 1 }} />
							</Box>

							<Button
								variant="outlined"
								onClick={() => {
									setScanType("manual");
									setDialogOpen(true);
								}}
							>
								Manual
							</Button>
						</Box>
					)
				}

				{addToTable && (
					<>
						<Button sx={{ ml: "auto" }} variant="contained" disabled={selectedRows.length !== 1}>
							Add All Copies
						</Button>
						<Button variant="contained" color="secondary" disabled={selectedRows.length === 0} onClick={() => handleDelete()}>
							Delete From Inventory
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => handleEditButtonClick()}
							disabled={selectedRows.length !== 1}
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
							value={mediaIDs}
							onChange={(e) => setMediaIDs(e.target.value)}
						/>
					</Stack>
					<Button
						variant={"contained"}
						fullWidth
						sx={{ mt: 4 }}
						onClick={() => {
							getMediaDetails();
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
						<Typography mb={2}>Media ID: {mediaId}</Typography>
						<FormControl fullWidth>
							<InputLabel>Enter Media Type</InputLabel>
							<Select
								label="Enter Media Type"
								value={mediaType}
								onChange={(e) => setMediaType(e.target.value)}
							>
								{
									mediaTypes.map((type) => (
										<MenuItem key={type} value={type}>{type}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<TextField required label="Enter Media Name" value={mediaName}
							onChange={(e) => setMediaName(e.target.value)} />
						<FormControl fullWidth>
							<InputLabel>Enter Media Category</InputLabel>
							<Select
								label="Enter Media Category"
								value={mediaCategory}
								onChange={(e) => setMediaCategory(e.target.value)}
							>
								{
									mediaCategories.map((type) => (
										<MenuItem key={type} value={type}>{type}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<TextField required label="Enter Author" value={author}
							onChange={(e) => setAuthor(e.target.value)} />
						<TextField required label="Publisher" value={publisher}
							onChange={(e) => setPublisher(e.target.value)} />
						<FormControl fullWidth>
							<InputLabel>Enter Media Language</InputLabel>
							<Select
								label="Enter Media Language"
								value={mediaLanguage}
								onChange={(e) => setMediaLanguage(e.target.value)}
							>
								{
									mediaLanguages.map((type) => (
										<MenuItem key={type} value={type}>{type}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<TextField required label="Enter Edition" value={edition}
							onChange={(e) => setEdition(e.target.value)} />
						<TextField
							multiline
							minRows={5}
							label={"Note"}
							placeholder="Use this field to record issues specific to the media (Example wear and tear, spotmarks, missing pages etc.)"
							items={note}
							onChange={(e) => {
								setNote(e.target.value);
							}}
						/>

						{/* <FormControl>
							<FormLabel sx={{ display: "inline" }}>
								Do you want to add more copies of the same
								media?
							</FormLabel>
							<RadioGroup row sx={{ display: "inline" }} value={addMoreCopies} onChange={(e) => setAddMoreCopies(e.target.value)}>
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
						</FormControl> */}
					</Stack>
					<Button
						variant={"contained"}
						fullWidth
						sx={{ mt: 4 }}
						onClick={() => {
							handleUpdate();
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
