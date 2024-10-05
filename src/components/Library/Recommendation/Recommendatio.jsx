import {
	Box,
	Button,
	Stack,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Avatar,
} from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, selectedGridRowsCountSelector } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
import AcceptPopup from './popup/Accept';
import RejectPopup from './popup/Reject';
import FulfillPopup from './popup/Fulfill';
import RequestDetails from './popup/RequestDetails';
import { useState, useEffect } from "react";
import api from "../../../config/api";
import { toast } from 'react-toastify'

const Recommendation = () => {
	const { acYear, curYear } = useClasses();
	const [acceptPopup, setAcceptPopup] = useState(false);
	const [rejectPopup, setRejectPopup] = useState(false);
	const [fulfillPopup, setFulfillPopup] = useState(false);
	const [requestDetailsPopup, setRequestDetailsPopup] = useState(false);
	const [libraryCardNumbers, setLibraryCardNumbers] = useState([]);
	const [academicYear, setAcademicYear] = useState(curYear);
	const [selectedLibraryCard, setSelectedLibraryCard] = useState('');
	const [rows, setRows] = useState([])
	const [selectedRow, setSelectedRow] = useState('');
	const [bookDetails, setBookDetails] = useState({})

	useEffect(() => {
		async function getLibraryCardDetails() {
			try {
				const response = await api.get('/library/library-cards/?display_type=list_view');
				console.log(response.data);

				setLibraryCardNumbers(response.data.library_cards);
			} catch (err) {
				console.log(err);
				toast.error('Error Occured!');
			}
		}
		getLibraryCardDetails();
	}, []);

	async function handleGetDetails() {
		try {
			const response = await api.get(`/library/recommendation/?library_card=${selectedLibraryCard}`);
			console.log(response.data);

			const transformedRows = transformApiData(response.data);

			setRows(transformedRows);
		} catch (err) {
			console.log(err);
			toast.error('Error Occured!');
		}
	}

	function transformApiData(apiData) {
		return apiData.map(item => ({
			id: item.request_id,
			employeeName: {
				name: `${item.employee_profile.employee_id}`,
				id: item.employee_profile.employee_id,
				img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?cs=srgb&dl=pexels-creationhill-1681010.jpg&fm=jpg",
			},
			Reqdate: item.request_date,
			Department: item.department,
			"Media Type": item.media_type,
			"Media Name": item.media_name,
			Author: item.author,
			Status: capitalizeEachWord(item.status),
			actions: "Actions", // This field is now used for rendering the actions column
		}));
	}

	function capitalizeEachWord(string) {
		return string.split(' ').map(word =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		).join(' ');
	}

	async function handleReview(reqId) {
		try {
			console.log(reqId);

			const response = await api.post(`/library/recommendation/`, {
				"request_id": reqId,
				"status": "In Review",
			});

			if (response.status === 200) {
				toast.success('Recommendation Updated!');
				handleGetDetails();
			}
		} catch (err) {
			console.log(err);
			toast.error(err.response.data);
		}
	}

	const getStatusText = (value) => {
		switch (value) {
			case "In Review":
				return "In Review";
			case "Accept":
				return "Accepted";
			case "Reject":
				return "Rejected";
			case "Fulfill":
				return "Fulfilled";
			case "Open":
				return "Open";
			default:
				return value;
		}
	};

	const columns = [
		{
			field: "id",
			headerName: "Req ID",
			flex: 0.6,
			renderCell: (params) => (
				<Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setRequestDetailsPopup(true)}>
					{params.value}
				</Typography>
			),
		},
		{
			field: "employeeName",
			headerName: "Employee Name",
			renderCell: (p) => (
				<Flex>
					<Avatar sx={{ width: 35, height: 35 }}>
						<img src={p.value.img} alt="" />
					</Avatar>
					<Stack>
						<Typography fontWeight={500} color="text.primary">
							{p.value.name}
						</Typography>
						<Typography
							fontSize={"0.7rem"}
							variant="body2"
							color="text.secondary"
						>
							{p.value.id}
						</Typography>
					</Stack>
				</Flex>
			),
			flex: 1.2,
		},
		{
			field: "Reqdate",
			headerName: "Req date",
			flex: 0.7,
		},
		{
			field: "Department",
			headerName: "Department",
			flex: 0.7,
		},
		{
			field: "Media Name",
			headerName: "Media Name",
			flex: 2,
			renderCell: (params) => (
				<Box
					display="flex"
					alignItems="center"
					sx={{
						width: '100%',
						height: '100%',
						padding: '0px',
						backgroundColor: '#f9f9f9',
						borderRadius: '8px',
					}}
				>
					<Tooltip title="Book">
						<MenuBookOutlinedIcon sx={{ color: '#3b98c4' }} />
					</Tooltip>
					<Box display="flex" flexDirection="column" marginX={1}>
						<Tooltip title="Harry Potter and the Goblet of Fire">
							<Typography variant="subtitle1" fontWeight="semibold">
								Harry Potter and the Goblet ...
							</Typography>
						</Tooltip>
						<Tooltip title="D. S. C. Publication">
							<Typography variant="body2" color="textSecondary">
								D. S. C. Publication
							</Typography>
						</Tooltip>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						bgcolor="#E2E8F0"
						borderRadius={1}
						px={1}
						py={0.5}
					>
						<Typography variant="body2" fontWeight="bold">
							IV
						</Typography>
					</Box>
				</Box>
			),
		},
		{
			field: "Author",
			headerName: "Author",
			flex: 0.7,
		}, {
			field: "Status",
			headerName: "Status",
			flex: 0.7,
			renderCell: (params) => (
				<Flex bgcolor={
					params.value === "In Review"
						? "#FEEBCB"
						: params.value === "Accept"
							? "#C6F6D5"
							: params.value === "Reject"
								? "#FED7D7"
								: params.value === "Fulfill"
									? "#BEE3F8"
									: params.value === "Open"
										? "#E2E8F0"
										: "transparent"
				}
					color={
						params.value === "In Review"
							? "#822727"
							: params.value === "Accept"
								? "#22543D"
								: params.value === "Reject"
									? "#822727"
									: params.value === "Fulfill"
										? "#2B6CB0"
										: params.value === "Open"
											? "#4A5568"
											: "inherit"
					} p={0.4} px={1.2} borderRadius={1}>
					<Flex>{getStatusText(params.value)}</Flex>
				</Flex>
			),
		},
		{
			field: "actions",
			headerName: "",
			width: 1,
			disableColumnMenu: true,
			sortable: false,
			renderCell: (params) => {
				const [anchorEl, setAnchorEl] = useState(null);

				const open = Boolean(anchorEl);
				const handleClick = (event) => {
					setAnchorEl(event.currentTarget);
				};
				const handleClose = () => {
					setAnchorEl(null);
				};

				const options = [
					"Open",
					"In Review",
					"Accept",
					"Reject",
					"Fulfill"
				];

				const statusMap = {
					"Open": "Open",
					"In Review": "In Review",
					"Accept": "Accept",
					"Reject": "Rejected",
					"Fulfill": "Fulfilled"
				};

				return (
					<>
						<IconButton size="small" onClick={handleClick}>
							<Icon icon="tabler:dots-vertical" />
						</IconButton>
						<Box>
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
							>
								{options.map((opt, idx) => {
									if (params.row.Status !== statusMap[opt]) {
										return (
											<MenuItem
												key={idx}
												onClick={() => {

													if (opt === "Accept") {
														setSelectedRow(params.id);
														setAcceptPopup(true);
													} else if (opt === "Reject") {
														setSelectedRow(params.id);
														setRejectPopup(true);
													} else if (opt === "Fulfill") {
														setSelectedRow(params.id);
														setFulfillPopup(true);
													} else if (opt === "In Review") {
														setSelectedRow(params.id);
														handleReview(params.id)
													}

													handleClose();
												}}
												sx={{ width: "10rem" }}
											>
												{opt}
											</MenuItem>
										);
									}
									return null;
								})}
							</Menu>
						</Box>


						<AcceptPopup open={acceptPopup} close={() => setAcceptPopup(false)} handleGetDetails={handleGetDetails} selectedRow={selectedRow} />
						<RejectPopup open={rejectPopup} close={() => setRejectPopup(false)} handleGetDetails={handleGetDetails} selectedRow={selectedRow} />
						<FulfillPopup open={fulfillPopup} close={() => setFulfillPopup(false)} handleGetDetails={handleGetDetails} selectedRow={selectedRow} bookDetails={bookDetails} />
						<RequestDetails open={requestDetailsPopup} close={() => setRequestDetailsPopup(false)} handleGetDetails={handleGetDetails} selectedRow={selectedRow} />
					</>
				);
			},
		},
	];

	return (
		<Section title={"Recommendation"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1} alignItems={"center"} justifyContent={'space-between'}>

					<FormControl sx={{ width: '25%' }}>
						<InputLabel>Search by Library Card #</InputLabel>
						<Select
							required
							label="Search by Library Card #"
							value={selectedLibraryCard}
							onChange={(e) => setSelectedLibraryCard(e.target.value)}
						>
							{
								libraryCardNumbers?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							}
						</Select>
					</FormControl>

					<FormControl sx={{ width: '25%' }}>
						<InputLabel>Enter Academic Year</InputLabel>
						<Select
							label="Enter Academic Year"
							value={academicYear}
							required
							onChange={(e) => setAcademicYear(e.target.value)}
							onBlur={handleGetDetails}
						>
							{
								acYear?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						autoHeight
						experimentalFeatures={{
							columnGrouping: true,
						}}
						rows={rows}
						columns={columns}
						columnGroupingModel={[
							{
								groupId: "Media Requirement",
								headerName: "Media Requirement",
								headerAlign: 'center',
								children: [
									{ field: "Media Name" },
									{ field: "Author" },
								],
							},
						]}
						disableRowSelectionOnClick
					/>
				</Box>

				<Flex justifyContent={"flex-end"}>
					<Button variant="outlined" color="primary">
						Download
					</Button>
				</Flex>
			</Stack>
		</Section>
	);
};

export default Recommendation;
