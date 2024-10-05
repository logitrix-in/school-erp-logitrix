import {
	Box,
	Button,
	Divider,
	Stack,
	Typography,
	AppBar,
	Autocomplete,
	Dialog,
	TextField,
	IconButton,
	Toolbar,
	FormControl,
	Select,
	InputLabel,
	MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
import Popup from "@/components/UiComponents/Popup";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import api from '../../../config/api'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Inventory = ({ libraryCardNumbers }) => {
	const [returnState, setReturnState] = useState(false);
	const [issueState, setIssueState] = useState(false);
	const [selectedLibraryCard, setSelectedLibraryCard] = useState(null);
	const [employeeRows, setEmployeeRows] = useState([]);
	const [issuePopup, setIssuePopup] = useState(false)
	const [mediaId, setMediaId] = useState('');

	const navigate = useNavigate();

	const employeeColumns = [
		{
			field: "library_card_number",
			headerName: "Library Card #",
			flex: 0.8,
		},
		{
			field: "employee_id",
			headerName: "Employee ID",
			flex: 1,
		},
		{
			field: "employee_name",
			headerName: "Employee Name",
			flex: 1,
		},
		{
			field: "employee_type",
			headerName: "Employee Type",
			flex: 1,
		},
		{
			field: "department",
			headerName: "Department",
			flex: 1,
		},
		{
			field: "mediaID",
			headerName: "Media ID",
			flex: 1,
		},
		{
			field: "mediaName",
			headerName: "Media Name",
			flex: 1,
		},
		{
			field: "timeOfIssue",
			headerName: "Time of Issue",
			flex: 1,
		},
	];

	async function getLibraryCardDetail() {
		try {
			if (!selectedLibraryCard) return;

			const response = await api.get(`/library/library-cards/?card_number=${selectedLibraryCard}`);
			console.log(response.data);

			if (response.data.length > 0) {
				const cardData = response.data[0];
				const newRow = {
					id: cardData.id,
					library_card_number: cardData.card_number,
					employee_id: cardData.employee.employee_id,
					employee_name: cardData.employee.employee_id,
					employee_type: cardData.employee.employee_type,
					department: cardData.employee.department,
					current_borrowings: cardData.current_borrowings,
					issued_on: cardData.issued_on,
					valid_till: cardData.valid_till,
					is_active: cardData.is_active
				};

				console.log('New row:', newRow);
				setEmployeeRows([newRow]); // Set as an array with a single item
			} else {
				setEmployeeRows([]); // Set to empty array if no data returned
			}

		} catch (error) {
			console.log(error);
			toast.error('Error Loading Data.')
		}
	}

	useEffect(() => { getLibraryCardDetail() }, [selectedLibraryCard])

	async function handleReturn() {
		try {
			console.log(selectedLibraryCard);

			const response = await api.get(`/library/visitors-attendance/`, {
				"library_card": selectedLibraryCard
			});
			console.log(response.data);

			if (response.status === 201) {
				console.log(response.data);
				setReturnState("auth-success");
				toast.success("Attendance Recorded Successfully");
			}
			// if fine then
			// setReturnState("auth-delayed-return");
		} catch (err) {
			console.log(err);
			toast.error('Error Loading Data.')
		}
	}

	return (
		<Section title={"Issue Media (Visitors)"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<FormControl sx={{ width: '30%' }}>
						<InputLabel>Enter Library Card #</InputLabel>
						<Select
							label="Enter Library Card #"
							value={selectedLibraryCard}
							onChange={(e) => setSelectedLibraryCard(e.target.value)}
						>
							{
								libraryCardNumbers.map((item, index) => (
									<MenuItem key={index} value={item}>{item}</MenuItem>
								))
							}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						autoHeight
						rows={employeeRows}
						columns={employeeColumns}
						columnGroupingModel={[
							{
								groupId: "Current Borrowing (Same Day)",
								headerName: 'Current Borrowing (Same Day)',
								headerAlign: 'center',
								children: [
									{ field: "mediaName" },
									{ field: "mediaID" },
									{ field: "timeOfIssue" },
								],
							},
						]}
						experimentalFeatures={{
							columnGrouping: true,
						}}
						disableRowSelectionOnClick
					/>
				</Box>

				<Flex justifyContent={"flex-end"}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setIssueState("scan-auto")}
					>
						Issue
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setReturnState("scan-auto")}
					>
						Return
					</Button>
				</Flex>
			</Stack>

			<Popup
				open={issueState}
				title={"Scan Media"}
				maxWidth="sm"
				close={() => setIssueState(null)}
			>
				{issueState == "scan-auto" && (
					<>
						<Flex justifyContent={"center"}>
							<Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'auto'}>
								<Stack alignItems={"center"} gap={1} p={2}>
									<Icon icon="bx:qr-scan" fontSize="8rem" />
									<Typography>Scan media ID to Proceed...</Typography>
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
									onClick={() => setIssueState("scan-manual")}
								>
									Manual Entry
								</Button>
							</Box>
						</Flex>
					</>
				)}
				{issueState == "scan-manual" && (
					<>
						<Stack
							justifyContent={"center"}
							gap={2}
							height={"10rem"}
							mx={10}
						>
							<TextField label={"Media ID"} value={mediaId} onChange={(e) => setMediaId(e.target.value)} />
							<Button
								variant={"contained"}
								fullWidth
								onClick={() => {
									console.log('hii')
									setIssuePopup(true);
								}}
							>
								Submit
							</Button>
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

						<Stack alignItems={"center"} gap={1} p={2}>
							<Icon icon="bx:qr-scan" fontSize="8rem" />
							<Typography>Scan media ID to Authenticate...</Typography>
						</Stack>
					</>
				)}
			</Popup>

			<Popup
				open={returnState}
				title={"Authenticate"}
				maxWidth="sm"
				close={() => setReturnState(null)}
			>
				{returnState == "scan-auto" && (
					<>
						<Flex justifyContent={"center"}>
							<Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'auto'}>
								<Stack alignItems={"center"} gap={1} p={2}>
									<Icon icon="bx:qr-scan" fontSize="8rem" />
									<Typography>Scan media ID to Authenticate...</Typography>
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
									onClick={() => setReturnState("scan-manual")}
								>
									Manual Entry
								</Button>
							</Box>
						</Flex>
					</>
				)}
				{returnState == "scan-manual" && (
					<>
						<Stack
							justifyContent={"center"}
							gap={2}
							height={"10rem"}
							mx={10}
						>
							<TextField label={"Media ID"} />
							<Button
								variant={"contained"}
								fullWidth
								onClick={() => {
									handleReturn();
								}}
							>
								Submit
							</Button>
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

						<Stack alignItems={"center"} gap={1} p={2}>
							<Icon icon="bx:qr-scan" fontSize="8rem" />
							<Typography>Scan media ID to Authenticate...</Typography>
						</Stack>
					</>
				)}
				{returnState == "auth-success" && (
					<>
						<Stack
							justifyContent={"center"}
							alignItems={"center"}
							gap={1}
							mx={10}
							my={3}
						>
							<Icon
								icon="clarity:success-standard-solid"
								color="#0BCA08"
								height={34}
							/>
							<Typography
								fontSize={"1.1rem"}
								fontWeight={500}
								textAlign={"center"}
							>
								Authenticated and Returned Successfully
							</Typography>
							<Button
								variant={"contained"}
								onClick={() => {
									setReturnState(null);
								}}
							>
								Done
							</Button>
						</Stack>
					</>
				)}
				{returnState == "auth-delayed-return" && (
					<>
						<Stack
							justifyContent={"center"}
							alignItems={"center"}
							gap={1}
							mx={10}
							my={3}
						>
							<Icon
								icon="ic:round-error"
								color="#C4673B"
								height={34}
								className=""
							/>
							<Typography
								fontSize={"1.1rem"}
								fontWeight={600}
								textAlign={"center"}
							>
								Authenticated and Returned Successfully
							</Typography>
							<Typography
								fontSize={"0.9rem"}
								fontWeight={400}
								textAlign={"center"}
							>
								Return is delayed by 20 days( Due date : Mar 07,
								2024).
							</Typography>
							<Typography
								fontSize={"0.9rem"}
								fontWeight={400}
								textAlign={"center"}
							>
								Do you want to take any action?
							</Typography>
							<Flex gap={2} mt={2}>
								<Button
									sx={{
										width: "10rem",
									}}
									variant={"contained"}
									onClick={() => {
										setReturnState(null);
										navigate('/library/action/')
									}}
								>
									Yes
								</Button>
								<Button
									sx={{
										width: "10rem",
									}}
									variant={"outlined"}
									onClick={() => {
										setReturnState(null);
									}}
								>
									No
								</Button>
							</Flex>
						</Stack>
					</>
				)}
			</Popup>

			<IssuePage issuePopup={issuePopup} setIssuePopup={setIssuePopup} mediaId={mediaId} setIssueState={setIssueState} />
		</Section>
	);
};

const IssuePage = ({ issuePopup, setIssuePopup, mediaId, setIssueState }) => {
	const [newIssueOpen, setNewIssueOpen] = useState(false);
	const [notes, setNotes] = useState('');
	const [returnDate, setReturnDate] = useState(null);

	const issue_columns = [
		{ field: "id", headerName: "Media ID", flex: 1 },
		{ field: "mediaType", headerName: "Media Type", flex: 1 },
		{ field: "studentName", headerName: "Media Name", flex: 1 },
		{ field: "author", headerName: "Author", flex: 1 },
		{ field: "note", headerName: "Section", flex: 1 },
		{ field: "mediaId", headerName: "Notes", flex: 2 },
	];

	return (
		<Dialog fullScreen open={issuePopup}>
			<AppBar position="static">
				<Toolbar>
					<Typography flex={1} fontSize={"1.2rem"}>
						Manage Issue
					</Typography>
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => { setIssuePopup(false); setIssueState(null) }}
						aria-label="close"
					>
						<CloseIcon
						/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box p={3}>
				<Section title={"New Issue"}>
					<Flex mb={2}>
						{/* <TextField value={mediaId} disabled></TextField> */}
						{/* <Autocomplete
							options={[]}
							size="small"
							multiple
							filterSelectedOptions
							freeSolo={false}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Media ID"
									variant="outlined"
									placeholder="Media ID"
								/>
							)}
							sx={{ width: "30%" }} 
						/>
						*/}
					</Flex>

					<DataGrid columns={issue_columns} rows={[]} autoHeight />
					<Typography textAlign={"right"} mt={2}>
						Copies Available: 12/100
					</Typography>
					<Flex justifyContent={"flex-end"} mt={3}>
						<Button
							variant="contained"
							onClick={() => setNewIssueOpen(true)}
						>
							Issue Media
						</Button>
					</Flex>
				</Section>
			</Box>

			<Popup
				close={() => setNewIssueOpen(false)}
				title={"New Issue - Confirmation"}
				open={newIssueOpen}
				maxWidth={"sm"}
			>
				<Stack p={3} gap={2} alignItems={"center"}>
					<TextField
						multiline
						label={"Note"}
						placeholder="Use this field to record issues specific to the media (Example wear and tear, spot marks, missing pages etc.)"
						fullWidth
						minRows={4}
						value={notes}
						onChange={(e) => setNotes(e.target.validity)}
					/>

					<Flex>
						<Typography>Return Date: </Typography>
						<DatePicker
							value={returnDate}
							onChange={(newValue) => setReturnDate(newValue)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</Flex>

					<Typography fontWeight={700} mt={2} fontSize={"1.1rem"}>
						Are you sure you want to proceed?
					</Typography>
					<Flex gap={2}>
						<Button variant="contained" sx={{ width: "8rem" }}
							onClick={() => setNewIssueOpen(false)}
						>
							Yes
						</Button>
						<Button
							variant="outlined"
							sx={{ width: "8rem" }}
							onClick={() => setNewIssueOpen(false)}
						>
							No
						</Button>
					</Flex>
				</Stack>
			</Popup>
		</Dialog>
	);
};

export default Inventory;
