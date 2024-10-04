import { Box, Divider, Typography, IconButton, Dialog, Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import useEmployees from "../../../hooks/useEmployees";
import Chart from "react-google-charts";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import EmployeePopup from '../EmployeePopup'
import { toast } from 'react-toastify';

const EmployeeAccount = () => {
	const { days } = useClasses();
	const [employeePopup, setEmployeePopup] = useState(false);
	const [notify, setNotify] = useState(false);

	const { employeeType, employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade } = useEmployees();
	const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedGrade, setSelectedGrade] = useState('');
	const [selectedDays, setSelectedDays] = useState('');
	const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

	const columns = [
		{ field: "space", headerName: " ", flex: 0.2 },
		{
			field: "id",
			headerName: "Employee ID",
			flex: 1,
			renderCell: (params) => (
				<Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => { console.log("hii"); setEmployeePopup(true) }}>
					{params.value}
				</Typography>
			),
		},
		{
			field: "name",
			headerName: "Name",
			flex: 1.2,
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
		{
			field: "last_activity",
			headerName: "Last Activity",
			flex: 1,
			renderCell: (params) => (
				<Box
					display="flex"
					flexDirection="column"
					gap={0}
				>
					<Typography>1 Jul 2024</Typography>
					<Typography style={{
						backgroundColor: "#E2E8F0",
						borderRadius: "16px",
						textAlign: "center",
						paddingLeft: "4px",
						paddingRight: "4px",
						paddingTop: "2px",
						paddingBottom: "2px",
						fontSize: "0.7rem",
						fontWeight: "600",
					}}>10:03 am</Typography>
				</Box>
			),
		}
	];

	const rows = [
		{
			id: "AG240001",
			name: "Saunav Ray",
			emp_type: "Teaching Staff",
			gender: "Male",
			department: "Chemistry",
			grade: "B2",
			status: "Active",
			last_activity: "1 Jul 2024",
		},
	];

	useEffect(() => {
		console.log(selectedEmployeeType);
		let departments = [];

		if (selectedEmployeeType === '') {
			return;
		}

		selectedEmployeeType.forEach(type => {
			switch (type) {
				case 'Management':
					departments = [...departments, ...employeeManagementDepartment];
					break;
				case 'Teaching Staff':
					departments = [...departments, ...employeeTeachingDepartment];
					break;
				case 'Support Staff':
					departments = [...departments, ...employeeSupportStaffDepartment];
					break;
				default:
					break;
			}
		});

		setEmployeeDepartment(departments);
	}, [selectedEmployeeType]);

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Employee Account
				</Typography>
			</Box>

			<Divider />
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1} sx={{ width: '30%' }}>
					<FormControl fullWidth>
						<InputLabel>Search by Employee Name or Employee ID</InputLabel>
						<Select
							label="Search by Employee Name or Employee ID"
							// value={selectedLibraryCard}
							required
						// onChange={(e) => setSelectedLibraryCard(e.target.value)}
						>
							{/* {
								libraryCardNumbers?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							} */}
						</Select>
					</FormControl>
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

				<Box
					display={"flex"}
					gap={1}
					flexDirection={{
						sm: "column",
						md: "row",
					}}
				>
					<Bbox
						// width={"23rem"}
						px={2}
						py={4}
						borderRadius={1}
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"space-between"}
						gap={2}
						sx={{ width: '70%' }}
					>

						<ReignsSelect
							items={employeeType}
							multiple
							label="Employee Type"
							defaultValues={employeeType}
							onChange={setSelectedEmployeeType}
							value={selectedEmployeeType}
						/>


						<ReignsSelect
							items={employeeDepartment}
							multiple
							defaultValues={employeeDepartment}
							onChange={setSelectedDepartment}
							value={selectedDepartment}
							label="Department"
						/>
						<ReignsSelect
							items={employeeGrade}
							multiple
							label="Grade"
							defaultValues={employeeGrade}
							onChange={setSelectedGrade}
							value={selectedGrade}
						/>

						<ReignsSelect
							items={days}
							multiple
							label="Days"
							defaultValues={days}
							onChange={setSelectedDays}
							value={selectedDays}
						/>
					</Bbox>

					<Bbox
						px={2}
						py={2}
						borderRadius={1}
						display={"flex"}
						flexDirection={"column"}
						gap={2}
						width={"100%"}
					>
						<Typography
							color="black"
							sx={{ fontSize: 16, fontWeight: 600 }}>Utilisation</Typography>

						<Chart
							width={"100%"}
							height={"250px"}
							chartType="PieChart"
							loader={<div>Loading Chart</div>}
							data={[
								["Status", "Percentage"],
								["Inactive Users", 20],
								["Active Users", 30],
							]}
							options={{
								chartArea: {
									left: 30,
									top: 35,
									width: "100%",
									height: "80%",
								},
								legend: {
									alignment: "top",
									position: "right",
								},
								is3D: true,
								colors: ["#0072DB", "#FFD81B"],
							}}
							rootProps={{ "data-testid": "1" }}
						/>
					</Bbox>

					<Box display="flex"
						px={4}
						sx={{ width: '100%' }}
					>
						<Box
							sx={{ width: '100%' }}
							display="flex"
							height={'50%'}
							flexDirection="column"
							alignItems="center"
							justifyContent={"space-evenly"}
							my={'auto'}
						>
							<Button
								variant="contained"
								fullWidth
							>
								Download
							</Button>


							<Button
								variant="outlined"
								color="primary"
								fullWidth
								onClick={() => setNotify(true)}
							>
								Notify Inactive Users
							</Button>
						</Box>
					</Box >

					<EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
					<Notify open={notify} close={() => { setNotify(false) }} />
				</Box >
			</Stack>
		</Bbox >
	);
};

export default EmployeeAccount;

const Notify = ({ open, close }) => {

	return (
		<Dialog
			fullWidth={false}
			PaperProps={{
				sx: {
					minHeight: "40%",
					maxHeight: "90%",
					width: "40%",
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
						Notify Inactive Users
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

				<Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="center" width={"90%"} height={"100%"} margin="auto" alignItems="center">

					<Box width={"90%"} height={"100%"} margin="auto">
						<Typography fontWeight={"medium"} textAlign={"center"} marginY={5}>Are you sure you want to send notification to inactive users?</Typography>

						<Box marginY={1} width={"100%"} display="flex" gap={2}>
							<Button variant="contained" color="primary" fullWidth onClick={() => {
								toast.success("Notified Successfully");
								close();
							}}>Yes</Button>
							<Button variant="outlined" color="primary" fullWidth onClick={() => {
								close();
							}}>No</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</Dialog >
	);
};