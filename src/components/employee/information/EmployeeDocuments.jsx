import {
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	InputBase,
	Typography,
	TextField,
	Badge,
	Chip,
	Autocomplete,
	Dialog,
} from "@mui/material";

// quick search will render 3 different types of data set - student, employee, media
import React, { useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import { Icon } from "@iconify/react";
import { DataGrid } from "@mui/x-data-grid";
import Section from "../../Section";
import Flex from "../../UiComponents/Flex";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const EmployeeDocuments = () => {
	const columns = [
		{ field: "space", headerName: " ", flex: 0.2 },
		{
			field: "id",
			headerName: "Employee ID",
			flex: 1,
		},
		{
			field: "name",
			headerName: "Name",
			flex: 1.5,
		},
		{
			field: "emp_type",
			headerName: "Employee Type",
			flex: 1,
		},
		{
			field: "gender",
			headerName: "Gender",
			flex: 1,
		},
		{
			field: "department",
			headerName: "Department",
			flex: 1,
		},
		{
			field: "grade",
			headerName: "Grade",
			flex: 1,
		},
		{
			field: "role",
			headerName: "Role",
			flex: 1,
		},
		{
			field: "status",
			headerName: "Status",
			flex: 1,
			renderCell: (params) => (
				<Box
					style={{
						backgroundColor:
							params.value === "Active"
								? "#C6F6D5"
								: params.value === "Inactive"
									? "#FFCCCC"
									: "transparent",
						borderRadius: "6px",
						display: "inline-block",
						width:
							params.value === "Active" || params.value === "Inactive"
								? "60px"
								: "auto",
						paddingLeft:
							params.value === "Active"
								? "11px"
								: params.value === "Inactive"
									? "7px"
									: "0px",
					}}
				>
					{params.value}
				</Box>
			),
		},
	];

	const rows = [
		{
			id: "AG240001",
			name: "Saunav Ray",
			emp_type: "Teaching Staff",
			gender: "Male",
			department: "Chemistry",
			grade: "B2",
			role: "Senior Faculty",
			status: "Active",
		},
	];

	const [modalVisible, setModalVisible] = useState(false);
	const [activeLibId, setActiveLibId] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const options = ["lib123", "lib124", "lib125", "med123", "med124", "med125"];

	const handleLibIdClick = (libId) => {
		setActiveLibId(libId);
		setModalVisible(true);
	};

	return (
		<Bbox borderRadius={2} overflow={"hidden"} sx={{ paddingBottom: '40px' }}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Employee Documents
				</Typography>
			</Box>

			<Divider />
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<Autocomplete
						options={inputValue.length > 0 ? options : []}
						filterSelectedOptions
						sx={{ width: "30%" }}
						freeSolo={false}
						inputValue={inputValue}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search by Employee Name or Employee ID"
								placeholder="Search by Employee Name or Employee ID"
							/>
						)}
					/>
				</Box>

				<Box display="flex" justifyContent="flex-end">
					<Button variant="outlined" sx={{ borderRadius: 16 }}>
						1 Result Found
					</Button>
				</Box>

				<Box sx={{ width: "100%" }}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						disableRowSelectionOnClick
					/>
				</Box>

				<Box display="flex" justifyContent="space-between">
					<Grid container spacing={6}>
						<Grid item xs={3}>
							<Box>
								<Box display="flex" justifyContent="space-between" mb={4}>
									<Typography >Offer Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
								<Box display="flex" justifyContent="space-between">
									<Typography>Relieving Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box>
								<Box display="flex" justifyContent="space-between" mb={4}>
									<Typography>Joining Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
								<Box display="flex" justifyContent="space-between">
									<Typography>Full & Final Settlement Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box>
								<Box display="flex" justifyContent="space-between" mb={4}>
									<Typography>Last Annual Compensation Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
								<Box display="flex" justifyContent="space-between">
									<Typography>Experience Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box>
								<Box display="flex" justifyContent="space-between" mb={4}>
									<Typography>Last Promotion Letter</Typography>
									<DescriptionOutlinedIcon />
								</Box>
								<Box display="flex" justifyContent="space-between">
									<Typography>Payslip</Typography>
									<DescriptionOutlinedIcon />
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Stack>
		</Bbox>
	);
};

export default EmployeeDocuments;
