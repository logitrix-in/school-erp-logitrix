import { useState } from "react";
import Section from "../../../Section";
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Divider,
	Stack,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import Flex from "../../../UiComponents/Flex";
import Popup from "../../../UiComponents/Popup";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import useMedia from "../../../../hooks/useMedia";
import api from "../../../../config/api"
import { toast } from "react-toastify";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Delete } from "@mui/icons-material";

const columns = [
	{ field: "id", headerName: "Media ID", flex: 1 },
	{ field: "media_type", headerName: "Media Type", flex: 1 },
	{ field: "media_name", headerName: "Media Name", flex: 2 },
	{ field: "author", headerName: "Author", flex: 1 },
	{ field: "note", headerName: "Note", flex: 2 },
];

const MediaEntry = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const close = () => setDialogOpen(false);
	const [scanType, setScanType] = useState("manual");
	const [addToTable, setAddToTable] = useState(false);
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
	const [addMoreCopies, setAddMoreCopies] = useState('no');
	const [showAddMoreCopiesPopup, setShowAddMoreCopiesPopup] = useState(false);
	const [showAddNumberPopup, setShowAddNumberPopup] = useState(false);
	const [addMoreCopiesNumber, setAddMoreCopiesNumber] = useState('');
	const [copiesInputValues, setCopiesInputValues] = useState([]);

	const [row, setRow] = useState([]);

	const [rows, setRows] = useState([
		{ id: 1, grade: 10, increment: '' },
		{ id: 2, grade: 10, increment: '' },
	]);

	const handleAddToTable = () => {

		if (
			mediaType.trim() === '' ||
			mediaName.trim() === '' ||
			mediaCategory.trim() === '' ||
			author.trim() === '' ||
			publisher.trim() === '' ||
			mediaLanguage.trim() === ''
		) {
			toast.error("Please fill all the required fields to proceed");
			return false; // Validation failed, return early
		}

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
			addMoreCopies: addMoreCopies, // Whether more copies of the media are added ('yes'/'no')
		};

		console.log(newRow);

		setRow((prevRows) => [...prevRows, newRow])
		close();

		if (addMoreCopies === 'no') {
			setAddToTable(true);
		} else {
			setShowAddMoreCopiesPopup(true);
			setShowAddNumberPopup(true);
		}
	}
	const handleInputChange = (index, value) => {
		const updatedValues = [...copiesInputValues];
		updatedValues[index] = value;
		setCopiesInputValues(updatedValues);
	};

	const handleAddMoreCopies = () => {
		console.log(copiesInputValues);
		const emptyFields = copiesInputValues.some(value => value.trim() === '');

		if (emptyFields) {
			toast.error("Please fill all the required fields to proceed");
			return false;
		}

		const newRows = copiesInputValues.map((mediaId) => ({
			id: mediaId, // Each media ID from the dynamic input
			media_id: mediaId, // Each media ID from the dynamic input
			media_type: mediaType, // Same media type for all
			media_name: mediaName, // Same media name for all
			category: mediaCategory, // Same media category for all
			author: author, // Same author name for all
			publisher: publisher, // Same publisher for all
			media_language: mediaLanguage, // Same media language for all
			edition: edition, // Same edition for all
			note: note, // Same note for all
			addMoreCopies: addMoreCopies, // Whether more copies are added
		}));

		// Update the row state by adding the new rows
		setRow((prevRows) => [...prevRows, ...newRows]);

		console.log(newRows);

		setShowAddMoreCopiesPopup(false);
		setAddToTable(true);
	}

	const sendData = async () => {
		try {
			const response = await api.post("/library/bulk-media/", {
				media_list: selectedRows
			});
			console.log(response.data);

			if (response.status === 201) {
				toast.success("Data submitted successfully");
			}
		} catch (error) {
			console.error(error.response.data.error);
			toast.error(error.response.data.error);
		}
	}

	const [selectedRows, setSelectedRows] = useState([]);

	const handleSelectionChange = (newSelectionModel) => {
		const selectedIDs = new Set(newSelectionModel);
		const selectedRowData = row.filter((row) =>
			selectedIDs.has(row.id)
		);
		setSelectedRows(selectedRowData);
		console.log('Selected rows:', selectedRowData);
	};

	const handleDeleteRow = (id) => {
		const newInputValues = copiesInputValues.filter((_, index) => index !== id);
		setCopiesInputValues(newInputValues);
		setAddMoreCopiesNumber(prevNumber => String(Number(prevNumber) - 1));
	};

	const handleAddRow = () => {
		setAddMoreCopiesNumber(prevNumber => String(Number(prevNumber) + 1));
		setCopiesInputValues([...copiesInputValues, '']);
	};

	const handleDeleteChecked = () => {
		const newRows = row.filter((row) => !selectedRows.includes(row));
		setRow(newRows);
	};

	const clearStates = () => {
		setMediaId('');
		setMediaType('');
		setMediaName('');
		setAuthor('');
		setPublisher('');
		setMediaCategory('');
		setMediaLanguage('');
		setEdition('');
		setNote('');
		setAddMoreCopiesNumber('');
		setAddMoreCopies('no');
		setCopiesInputValues([]);
	};

	return (
		<Section title={"Media Entry"}>
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
						rows={row}
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
									clearStates();
								}}
							>
								Manual
							</Button>
						</Box>
					)
				}


				{addToTable && (
					<>
						<Button sx={{ ml: "auto" }} variant="outlined" onClick={() => {
							setScanType("manual");
							setDialogOpen(true);
							clearStates();
						}}>
							Add Manual
						</Button>
						<Button variant="contained" onClick={() => { sendData() }}>
							Submit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => { handleDeleteChecked() }}
						>
							Delete
						</Button>
					</>
				)}
			</Flex>

			<Popup maxWidth="sm" title={"Add More Copies"} open={showAddMoreCopiesPopup} close={() => setShowAddMoreCopiesPopup(false)}>
				{
					showAddNumberPopup === true ? <Box p={5} component={"form"} height={"25vh"} overflow={"auto"}>
						<Stack gap={1}>
							<FormControl fullWidth>
								<TextField label="Enter Number of Copies" value={addMoreCopiesNumber}
									onChange={(e) => {
										setAddMoreCopiesNumber(e.target.value);
										setCopiesInputValues(Array(Number(e.target.value)).fill("")); // Initialize with empty values
									}} />
							</FormControl>
						</Stack>
						<Button
							variant={"contained"}
							fullWidth
							sx={{ mt: 4 }}
							onClick={() => {
								if (addMoreCopiesNumber.trim() === '') {
									toast.error("Please fill all the required fields to proceed");
									return false; // Validation failed, return early
								}
								setShowAddNumberPopup(false)
							}}
						>
							Proceed
						</Button>
					</Box> :
						<Box p={4} component={"form"} height={"70vh"} overflow={"auto"}>
							{[...Array(Number(addMoreCopiesNumber))].map((_, index) => (
								<Box key={row.id} display="flex" alignItems="center" gap={4} mt={4}>
									<TextField
										label={`Media ID ${index + 1}`}
										value={copiesInputValues[index] || ""}
										onChange={(e) => handleInputChange(index, e.target.value)}
										fullWidth
									/>
									<Delete color="error" onClick={() => handleDeleteRow(row.id)} sx={{ cursor: 'pointer' }} />
								</Box>
							))}

							<Button
								variant="contained"
								color="primary"
								sx={{ mt: 2 }}
								onClick={handleAddRow}
							>
								<AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
								Add New
							</Button>
							<Button
								variant={"contained"}
								fullWidth
								sx={{ mt: 4 }}
								onClick={() => {
									handleAddMoreCopies();
								}}
							>
								Add to Table
							</Button>
						</Box>
				}

			</Popup>

			<Popup title={"Media Details"} open={dialogOpen} close={close}>
				<Box p={5} component={"form"} height={"80vh"} overflow={"auto"}>
					<Stack gap={1}>
						{scanType == "manual" ? (
							<TextField required label="Enter Media ID" value={mediaId}
								onChange={(e) => setMediaId(e.target.value)} />
						) : (
							<Typography mb={2}>Media ID: {mediaId}</Typography>
						)}
						<FormControl fullWidth>
							<InputLabel>Enter Media Type</InputLabel>
							<Select
								label="Enter Media Type"
								value={mediaType}
								required
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
								required
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
								required
								onChange={(e) => setMediaLanguage(e.target.value)}
							>
								{
									mediaLanguages.map((type) => (
										<MenuItem key={type} value={type}>{type}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<TextField label="Enter Edition" value={edition}
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

						<FormControl>
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
						</FormControl>
					</Stack>
					<Button
						variant={"contained"}
						fullWidth
						sx={{ mt: 4 }}
						onClick={() => {
							handleAddToTable()
						}}
					>
						Add To Table
					</Button>
				</Box>
			</Popup>
		</Section >
	);
};

export default MediaEntry;
