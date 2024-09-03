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
	IconButton,
	Menu,
	MenuItem,
	Autocomplete,
	TextField,
	Avatar,
} from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Tooltip from '@mui/material/Tooltip';
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
import AcceptPopup from './popup/Accept';
import RejectPopup from './popup/Reject';
import FulfillPopup from './popup/Fulfill';
import RequestDetails from './popup/RequestDetails';
import { useState } from "react";

const rows = [
	{
		id: "RQ1234",
		employeeName: {
			name: "John Doe",
			id: "1234",
			img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?cs=srgb&dl=pexels-creationhill-1681010.jpg&fm=jpg",
		},
		Reqdate: "2020-01-01",
		Department: "Finance",
		"Media Type": "Video",
		"Media Name": "Book 1",
		Author: "John",
		Status: "open",
		actions: "Delete",
	},
];

const names = [];

const Recommendation = () => {
	const { acYear, curYear } = useClasses();
	const [selected, setSelected] = useState("Open");
	const [academicYear, setAcademicYear] = useState(curYear);
	const [acceptPopup, setAcceptPopup] = useState(false);
	const [rejectPopup, setRejectPopup] = useState(false);
	const [fulfillPopup, setFulfillPopup] = useState(false);
	const [requestDetailsPopup, setRequestDetailsPopup] = useState(false);

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
					display={'flex'}
					sx={{
						width: '100%',
						height: '100%',
					}}
				>
					{/* <Icon icon={"emojione:books"} height={"70%"} />  */}
					<Tooltip title="Book">
						<MenuBookOutlinedIcon />
					</Tooltip>
					<Box display={'flex'} flexDirection={'column'} marginX={1}><Typography>Harry Potter and the Goblet ...</Typography><Typography color={'gray'}>D. S. C. Publication</Typography></Box>
					<Box ><Typography bgcolor={'#E2E8F0'} borderRadius={0.8} px={0.6} pY={0.3}>IV</Typography></Box>
				</Box>
			),
		},
		{
			field: "Author",
			headerName: "Author",
			flex: 0.7,
		},
		{
			field: "Status",
			headerName: "Status",
			flex: 0.7,
			renderCell: (params) => (
				<Flex bgcolor={
					selected === "In Review"
						? "#FEEBCB"
						: selected === "Accepted"
							? "#C6F6D5"
							: selected === "Rejected"
								? "#FED7D7"
								: selected === "Fulfilled"
									? "#BEE3F8"
									: selected === "Open"
										? "#E2E8F0"
										: "transparent"
				}
					color={
						selected === "In Review"
							? "#822727"
							: selected === "Accepted"
								? "#22543D"
								: selected === "Rejected"
									? "#822727"
									: selected === "Fulfilled"
										? "#2B6CB0"
										: selected === "Open"
											? "#4A5568"
											: "inherit"
					} p={0.4} px={1.2} borderRadius={1}>
					<Flex>{selected}</Flex>
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
					// "Mark as Open",
					"In Review",
					"Accept",
					"Reject",
					"Fulfill"
				];

				const statusMap = {
					// "Mark as Open": "Open",
					"In Review": "In Review",
					"Accept": "Accepted",
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
									if (selected !== statusMap[opt]) {
										return (
											<MenuItem
												key={idx}
												onClick={() => {

													if (opt === "Accept") {
														setAcceptPopup(true);
													} else if (opt === "Reject") {
														setRejectPopup(true);
													} else if (opt === "Fulfill") {
														setFulfillPopup(true);
													} else if (opt === "In Review") {
														setSelected("In Review");
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


						<AcceptPopup open={acceptPopup} close={() => setAcceptPopup(false)} setSelected={setSelected} />
						<RejectPopup open={rejectPopup} close={() => setRejectPopup(false)} setSelected={setSelected} />
						<FulfillPopup open={fulfillPopup} close={() => setFulfillPopup(false)} setSelected={setSelected} />
						<RequestDetails open={requestDetailsPopup} close={() => setRequestDetailsPopup(false)} />
					</>
				);
			},
		},
	];

	return (
		<Section title={"Recommendation"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1} alignItems={"center"}>
					<Autocomplete
						options={names}
						filterSelectedOptions
						freeSolo={false}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search by Library Card #"
								placeholder="Search by Library Card #"

							/>
						)}
						sx={{ width: "30%" }}
					/>
					<ReignsSelect
						items={acYear}
						onChange={(e) =>
							setAcademicYear(e?.target.value ?? academicYear)
						}
						value={academicYear}
						label="Academic Year"
						sx={{
							width: "15rem",
							ml: "auto",
						}}
					/>
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
									{ field: "Media Type" },
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
