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
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
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
		"Media Name": "Video 1",
		Author: "John",
		Status: "open",
		actions: "Delete",
	},
];

const names = [];

const Recommendation = () => {
	const { acYear, curYear } = useClasses();
	const [selected, setSelected] = useState("Marked as Open");
	const [academicYear, setAcademicYear] = useState(curYear);

	const columns = [
		{
			field: "id",
			headerName: "Req ID",
			flex: 0.6,
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
			flex: 1.5,
		},
		{
			field: "Reqdate",
			headerName: "Req date",
			flex: 1,
		},
		{
			field: "Department",
			headerName: "Department",
			flex: 1,
		},
		{
			field: "Media Type",
			headerName: "Media Type",
			flex: 0.8,
			renderCell: (params) => (
				<Flex
					sx={{
						width: '100%',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Icon icon={"emojione:books"} height={"70%"} />
				</Flex>
			),
		},
		{
			field: "Media Name",
			headerName: "Media Name",
			flex: 1,
		},
		{
			field: "Author",
			headerName: "Author",
			flex: 1,
		},
		{
			field: "Status",
			headerName: "Status",
			flex: 1,
			renderCell: (params) => (
				<Flex bgcolor={"#C6F6D5"} p={0.5} px={1.5} borderRadius={1}>
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
					"Mark as Open",
					"In Review",
					"Accept",
					"Reject",
					"Fulfill"
				];

				const statusMap = {
					"Mark as Open": "Marked as Open",
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
													setSelected(statusMap[opt]);
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
								label="Library Card"
								placeholder="Select Employee(s)"

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
					<Button variant="outlined" color="secondary">
						Download
					</Button>
				</Flex>
			</Stack>
		</Section>
	);
};

export default Recommendation;
