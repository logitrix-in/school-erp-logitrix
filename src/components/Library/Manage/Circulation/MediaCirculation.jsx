import { useEffect, useState } from "react";
import Section from "../../../Section";
import {
	AppBar,
	Button,
	Dialog,
	TextField,
	Toolbar,
	Divider,
	IconButton,
	Autocomplete,
	Typography,
	FormControl,
	InputLabel,
	Select,
	Radio,
	MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Flex from "../../../UiComponents/Flex";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "../../../UiComponents/Popup";
import { Box, Stack } from "@mui/system";
import { Icon } from "@iconify/react";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import api from '../../../../config/api'

const names = [];

const issue_columns = [
	{ field: "id", headerName: "Media ID", flex: 1 },
	{ field: "mediaType", headerName: "Media Type", flex: 1 },
	{ field: "studentName", headerName: "Media Name", flex: 1 },
	{ field: "author", headerName: "Author", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "Notes", flex: 3 },
];

const MediaCirculation = () => {
	const [returnState, setReturnState] = useState(false);
	const [issueState, setIssueState] = useState(false);
	const [renewOpen, setRenewOpen] = useState(false);
	const [showRule, setShowRule] = useState(false);
	const [libraryCardNumbers, setLibraryCardNumbers] = useState([]);
	const [selectedLibraryCard, setSelectedLibraryCard] = useState(null);
	const [issueMediaID, setIssueMediaID] = useState(null);
	const [revisedData, setRevisedData] = useState({
		note: null,
		revisedReturnDate: null,
	});
	const [employeeRows, setEmployeeRows] = useState([]);


	// const studentColumns = [
	// 	{ field: "id", headerName: "Library Card #", flex: 1 },
	// 	{ field: "student_id", headerName: "Student ID", flex: 1 },
	// 	// { field: "student_name", headerName: "Student Name", flex: 2 }, return hona chahiye
	// 	{ field: "class", headerName: "Class", flex: 1 },
	// 	{ field: "section", headerName: "Section", flex: 1 },
	// 	{ field: "media_id", headerName: "media IISN / ISBN / ID", flex: 2 },
	// 	// { field: "media_name", headerName: "media Name", flex: 1 }, return hona chahiye
	// 	{ field: "penalty_due_date", headerName: "Due Date", flex: 1 },
	// 	{ field: "penalty_due", headerName: "Penalty Due", flex: 1 },
	// ];

	const [selectedRow, setSelectedRow] = useState(null);

	const employeeColumns = [
		{
			field: "radioButtons",
			headerName: "",
			flex: 0.5,
			renderCell: (params) => (
				<Radio
					checked={params.row.id === selectedRow}
					color="primary"
					sx={{
						transform: "scale(0.6)",
					}}
					inputProps={{ "aria-label": params.row.id }}
					onChange={() => { setSelectedRow(params.row.id); console.log(selectedRow) }}
					onClick={(event) => event.stopPropagation()}
				/>
			),
		},
		{ field: "library_card_number", headerName: "Library Card #", flex: 1 },
		{ field: "employee_id", headerName: "Employee ID", flex: 1 },
		// { field: "employee_name", headerName: "Employee Name", flex: 2 },
		{ field: "employee_type", headerName: "Employee Type", flex: 1 },
		{ field: "department", headerName: "Department", flex: 1 },
		{ field: "media_id", headerName: "media IISN / ISBN / ID", flex: 2 },
		{ field: "media_name", headerName: "media Name", flex: 1 },
		{ field: "penalty_due_date", headerName: "Due Date", flex: 1 },
		{ field: "penalty_due", headerName: "Penalty Due", flex: 1 },
	];

	useEffect(() => {
		async function fetchData() {
			const response = await api.get('/library/library-cards/');
			console.log(response.data);

			const cardNumbersArray = response.data.map(item => item.card_number);
			setLibraryCardNumbers(cardNumbersArray);
		}

		fetchData();
	}, []);

	async function getLibraryCardDetail(e) {
		try {
			setEmployeeRows([]);
			setSelectedLibraryCard(e.target.value);
			const response = await api.get(`/library/media-issue/?card_number=${e.target.value}`);
			console.log(response.data);
			console.log(employeeRows);

			const newRows = response.data.map(media => ({
				id: media.media_id,
				library_card_number: e.target.value,
				employee_id: media.current_borrower.issued_by,
				employee_type: media.current_borrower.employee.employee_type,
				department: media.current_borrower.employee.department,
				media_id: media.media_id,
				media_name: media.media_name,
				penalty_due_date: media.current_borrower.penalty_due_date === null ? 'null' : media.current_borrower.penalty_due_date,
				penalty_due: media.current_borrower.penalty_due
			}));

			console.log(newRows);
			setEmployeeRows(newRows);
			console.log(employeeRows);

		} catch (error) {
			console.log(error);
		}
	}

	async function handleIssue() {
		try {
			const response = await api.post('/library/media-issue/', {
				card_number: selectedLibraryCard,
				media_id: issueMediaID,
				submission_date: getTodaysDate(),
				action: "issue"
			});

			console.log(response.data);
			if (response.status === 200) {
				setIssueState(false);
				toast.success("Media Issued Successfully");

				setEmployeeRows([]);
				const response = await api.get(`/library/media-issue/?card_number=${selectedLibraryCard}`);
				console.log(response.data);
				console.log(employeeRows);

				const newRows = response.data.map(media => ({
					id: media.media_id,
					library_card_number: selectedLibraryCard,
					employee_id: media.current_borrower.issued_by,
					employee_type: media.current_borrower.employee.employee_type,
					department: media.current_borrower.employee.department,
					media_id: media.media_id,
					media_name: media.media_name,
					penalty_due_date: media.current_borrower.penalty_due_date === null ? 'null' : media.current_borrower.penalty_due_date,
					penalty_due: media.current_borrower.penalty_due
				}));

				console.log(newRows);
				setEmployeeRows(newRows);
				console.log(employeeRows);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to Issue Media");
		}
	}

	async function handleRenew() {
		try {
			const response = await api.post('/library/media-issue/', {
				card_number: selectedLibraryCard,
				media_id: selectedRow,
				submission_date: getTodaysDate(),
				action: "renew"
			});

			console.log(response.data);
			if (response.status === 200) {
				toast.success("Media Renewed Successfully");
				setRenewOpen(false)
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to Renew Media");
		}
	}

	async function handleReturn() {
		try {
			const response = await api.post('/library/media-issue/', {
				card_number: selectedLibraryCard,
				media_id: selectedRow,
				action: "return"
			});

			console.log(response.data);
			if (response.status === 200) {
				setReturnState("auth-success");
				setRenewOpen(false)

				setEmployeeRows([]);
				const response = await api.get(`/library/media-issue/?card_number=${selectedLibraryCard}`);
				console.log(response.data);
				console.log(employeeRows);

				const newRows = response.data.map(media => ({
					id: media.media_id,
					library_card_number: selectedLibraryCard,
					employee_id: media.current_borrower.issued_by,
					employee_type: media.current_borrower.employee.employee_type,
					department: media.current_borrower.employee.department,
					media_id: media.media_id,
					media_name: media.media_name,
					penalty_due_date: media.current_borrower.penalty_due_date === null ? 'null' : media.current_borrower.penalty_due_date,
					penalty_due: media.current_borrower.penalty_due
				}));

				console.log(newRows);
				setEmployeeRows(newRows);
				console.log(employeeRows);
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to Return Media");
		}
	}

	function getTodaysDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	return (
		<Section title={"Media Circulation - Scan / Manual"}>
			<Flex mb={2} justifyContent={'space-between'}>

				<FormControl sx={{ width: '30%' }}>
					<InputLabel>Enter Library Card #</InputLabel>
					<Select
						label="Enter Library Card #"
						value={selectedLibraryCard}
						onChange={(e) => getLibraryCardDetail(e)}
					>
						{
							libraryCardNumbers.map((item, index) => (
								<MenuItem key={index} value={item}>{item}</MenuItem>
							))
						}
					</Select>
				</FormControl>

				<Button variant="contained" onClick={() => setShowRule(true)}>Set Rule</Button>
			</Flex>

			<DataGrid
				experimentalFeatures={{
					columnGrouping: true,
				}}
				columnGroupingModel={[
					{
						groupId: "media",
						headerName: 'Media',
						headerAlign: 'center',
						children: [
							{ field: "mediaName" },
							{ field: "mediaId" },
						],
					},
				]}
				autoHeight
				rows={employeeRows}
				columns={employeeColumns}
				disableRowSelectionOnClick
				disableColumnSelector
				isRowSelectable={() => false}
			/>

			<Flex justifyContent={"flex-end"} my={2}>
				<Button
					variant="contained"
					onClick={() => setIssueState("scan-auto")}
					disabled={!selectedLibraryCard}
				>
					New Issue
				</Button>
				<Button variant="outlined" onClick={() => setRenewOpen(true)
				}
					disabled={!selectedLibraryCard || !selectedRow}
				>
					Renew
				</Button>
				<Button
					variant="contained"
					color={"secondary"}
					onClick={() => handleReturn()}
					disabled={!selectedLibraryCard}
				>
					Return
				</Button>
			</Flex>

			<Popup
				open={returnState}
				title={"Authenticate"}
				maxWidth="sm"
				close={() => setReturnState(null)}
			>
				{/* {returnState == "scan-auto" && (
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
				)} */}
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
									setReturnState(false);
									// setReturnState("auth-delayed-return");
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
								height={34} className=""
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
										setReturnState("auth-success");
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

			{/* issue popup */}
			<Popup
				open={issueState}
				title={"Scan"}
				maxWidth="sm"
				close={() => { setIssueState(null) }}
			>
				{issueState == "scan-auto" && (
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
							<TextField label={"Media ID"} value={issueMediaID} onChange={(e) => setIssueMediaID(e.target.value)} />

							<Button
								variant={"contained"}
								fullWidth
								onClick={() => {
									handleIssue();
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

			<IssuePage issueState={issueState} setIssueState={setIssueState} />
			<Renew setRenewOpen={setRenewOpen} renewOpen={renewOpen} revisedData={revisedData} setRevisedData={setRevisedData} handleRenew={handleRenew} />
			<SetRule open={showRule} close={() => setShowRule(false)} />
		</Section>
	);
};

const Renew = ({ setRenewOpen, renewOpen, revisedData, setRevisedData, handleRenew }) => {

	const handleDateChange = (date) => {
		if (date) {
			const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
			setRevisedData(prevData => ({
				...prevData,
				revisedReturnDate: formattedDate,
			}));
		} else {
			setRevisedData(prevData => ({
				...prevData,
				revisedReturnDate: null,
			}));
		}
	};

	return (
		<Popup
			close={() => setRenewOpen(false)}
			title={"Renew - Confirmation"}
			open={renewOpen}
			maxWidth={"sm"}
		>
			<Stack p={3} gap={2} alignItems={"center"}>
				<TextField
					multiline
					label={"Note"}
					fullWidth
					minRows={4}
					placeholder="Use this field to record issues specific to the media (Example wear and tear, spot marks, missing pages etc.)"
					value={revisedData.note}
					onChange={(e) => setRevisedData({ ...revisedData, note: e.target.value })}
				></TextField>

				<Flex>
					<Typography>Revised Return Date: </Typography>
					<DatePicker selected={revisedData.revisedReturnDate ? new Date(revisedData.revisedReturnDate) : null}
						onChange={handleDateChange}
						dateFormat="yyyy-MM-dd" />
				</Flex>

				<Typography fontWeight={700} mt={2} fontSize={"1.1rem"}>
					Are you sure you want to proceed?
				</Typography>
				<Flex gap={2}>
					<Button variant="contained" sx={{ width: "8rem" }}
						onClick={() => handleRenew()}
					>
						Yes
					</Button>
					<Button
						variant="outlined"
						sx={{ width: "8rem" }}
						onClick={() => setRenewOpen(false)}
					>
						No
					</Button>
				</Flex>
			</Stack>
		</Popup>
	);
};

const IssuePage = ({ issueState, setIssueState }) => {
	const [newIssueOpen, setNewIssueOpen] = useState(false);
	return (
		<Dialog fullScreen open={issueState == "open"}>
			<AppBar position="static">
				<Toolbar>
					<Typography flex={1} fontSize={"1.2rem"}>
						Manage Issue
					</Typography>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="close"
						onClick={() => setIssueState("close")}
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box p={3}>
				<Section title={"New Issue"}>
					<Flex mb={2}>
						<Autocomplete
							options={names}
							filterSelectedOptions
							freeSolo={false}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Media ID"
									placeholder="Media ID"
									size="small"
									variant="outlined"
								/>
							)}
							sx={{ width: "30%" }}
						/>

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
						fullWidth
						minRows={4}
						placeholder="Use this field to record issues specific to the media (Example wear and tear, spot marks, missing pages etc.)"
					></TextField>

					<Flex>
						<Typography>Return Date: </Typography>
						<DatePicker />
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

const SetRule = ({ open, close }) => {

	return (
		<Dialog
			fullWidth={false}
			PaperProps={{
				sx: {
					maxHeight: "90%",
					width: "50%",
				},
			}}
			maxWidth="lg"
			open={open}
			onClose={() => close()}
			disableEnforceFocus={true}
		>
			<Box overflow={"hidden"}>
				<Box
					p={1}
					py={1}
					bgcolor={"primary.main"}
					color={"white"}
					display={"flex"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Box />
					<Typography fontSize={"1.1rem"} textAlign={"center"}>
						Set Rule
					</Typography>
					<IconButton
						edge="start"
						color="inherit"
						onClick={close}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto" alignItems="center">


					<Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} sx={{ width: "100%" }}>
						<Typography fontWeight={"medium"} fullWidth textAlign={"left"} marginY={1} marginRight={4}>Enter the media circulation period</Typography>

						<TextField
							label="No. of days"
							placeholder="No. of days"
							// value={comments}
							// onChange={(e) => setComments(e.target.value)}
							variant="outlined"
							sx={{ flexGrow: 1 }}
						/>
					</Box>

					<Box marginY={1} width={"100%"} display="flex" gap={2}>
						<Button variant="contained" color="primary" fullWidth onClick={() => {
							toast.success("Updated Successfully");
							close();
						}}>Submit</Button>
					</Box>
				</Box>
			</Box>
		</Dialog >
	);
};

export default MediaCirculation;
