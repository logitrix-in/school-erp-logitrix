import { Box, Divider, Grid, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import useEmployees from "../../../hooks/useEmployees";
import { Icon } from "@iconify/react";
import api from "../../../config/api";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from "@mui/material";

const Dashboard = () => {
	const { classes, sections, acYear, curYear, status } = useClasses();
	const { employeeType } = useEmployees();
	const [academicYear, setAcademicYear] = useState(curYear);
	const [selectedClasses, setSelectedClasses] = useState('');
	const [selectedSections, setSelectedSections] = useState('');
	const [selectedEmployeeTypes, setSelectedEmployeeTypes] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [dashboardData, setDashboardData] = useState(null);

	useEffect(() => {
		fetchDashboardData();
	}, []);

	useEffect(() => {
		fetchDashboardData();
	}, [academicYear, selectedClasses, selectedSections, selectedEmployeeTypes, selectedStatus]);

	const fetchDashboardData = async () => {
		try {
			const response = await api.post('/library/information/inventory-dashboard', {
				// academic_year: "2024-25",
				// class_name: selectedClasses,
				// section: selectedSections,
				// employee_type: selectedEmployeeTypes,
				// current_status: selectedStatus
			});
			console.log(response.data);
			setDashboardData(response.data);
		} catch (error) {
			console.error("Error fetching dashboard data:", error);
		}
	};

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Dashboard
				</Typography>
			</Box>

			<Divider />
			<Box
				p={2}
				display={"flex"}
				gap={1}
				flexDirection={{
					sm: "column",
					md: "row",
				}}
			>
				<Bbox
					width={"23rem"}
					p={2}
					borderRadius={1}
					display={"flex"}
					flexDirection={"column"}
					gap={2}
				>

					<FormControl>
						<InputLabel>Academic Year</InputLabel>
						<Select
							label="Academic Year"
							onChange={(e) =>
								setAcademicYear(e.target.value)
							}
							value={academicYear}

						>
							{acYear.map((year) => (
								<MenuItem key={year} value={year}>
									{year}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<ReignsSelect
						items={classes}
						multiple
						label="Class"
						defaultValues={classes}
						onChange={setSelectedClasses}
						value={selectedClasses}
					/>
					<ReignsSelect
						items={sections}
						multiple
						label="Section"
						defaultValues={sections}
						onChange={setSelectedSections}
						value={selectedSections}
					/>
					<ReignsSelect
						items={employeeType}
						multiple
						label="Employee Type"
						defaultValues={employeeType}
						onChange={setSelectedEmployeeTypes}
						value={selectedEmployeeTypes}
					/>
					<ReignsSelect
						items={status}
						multiple
						label="Status"
						defaultValues={status}
						onChange={setSelectedStatus}
						value={selectedStatus}
					/>
				</Bbox>
				<Grid container flex={2} spacing={1}>
					{dashboardData && (
						<>
							<DisplayCard
								bgColor={"#D9EBF4"}
								color={"#3B98C4"}
								header="Media in Circulation"
								value={`${dashboardData.media_in_circulation.media_circulation}/${dashboardData.media_inventory.total_media}`}
								data={[
									{ title: "Books", val: dashboardData.media_in_circulation.books },
									{ title: "Periodicals", val: dashboardData.media_in_circulation.periodicals },
									{ title: "Research Papers", val: dashboardData.media_in_circulation.research_papers },
								]}
							/>
							<DisplayCard
								bgColor={"#FAD2C0"}
								color={"#B34A19"}
								header="Borrowers"
								value={`${dashboardData.borrowers.total_borrowed}/${dashboardData.borrowers.total_library_cards}`}
								data={[
									{ title: "Students", val: dashboardData.borrowers.students },
									{ title: "Employees", val: dashboardData.borrowers.employees },
								]}
							/>
							<DisplayCard
								bgColor={"#FAD2C0"}
								color={"#B34A19"}
								header="Media Inventory"
								value={dashboardData.media_inventory.total_media.toString()}
								data={[
									{ title: "Books", val: dashboardData.media_inventory.total_books },
									{ title: "Periodicals", val: dashboardData.media_inventory.total_periodicals },
									{ title: "Research Papers", val: dashboardData.media_inventory.total_research_papers },
								]}
							/>
							<DisplayCard
								bgColor={"#D9EBF4"}
								color={"#3B98C4"}
								header="Current Defaulters (Library)"
								value={dashboardData.current_defaulters.total_defaulters.toString()}
								data={[
									{ title: "Students", val: dashboardData.current_defaulters.students },
									{ title: "Employees", val: dashboardData.current_defaulters.employees },
								]}
							/>
						</>
					)}
				</Grid>
			</Box>
		</Bbox>
	);
};

const DisplayCard = ({ bgColor, header = "", value = "", data, color }) => {
	return (
		<Grid item xs={12} md={6} position={"relative"}>
			<Box
				bgcolor={bgColor}
				height={"100%"}
				p={3}
				borderRadius={1}
				display={"flex"}
				flexDirection={"column"}
			>
				<Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
					{value}
				</Typography>
				<Typography
					mb={2}
					sx={{ fontSize: "0.9rem", fontWeight: "500", color: color }}
				>
					{header}
				</Typography>

				<Box display={"flex"} gap={1} mt={"auto"} flexWrap={"wrap"}>
					{data?.map((e, idx) => (
						<Box
							display={"flex"}
							key={idx}
							sx={{
								gap: 1,
							}}
						>
							<Box>
								<Typography sx={{ fontWeight: 700, mb: 0.3 }}>
									{e.val}
								</Typography>
								<Typography>{e.title}</Typography>
							</Box>
							{data.length - 1 != idx && (
								<Divider
									orientation="vertical"
									sx={{
										borderRightWidth: "1px",
										borderColor: "#00000059",
									}}
									flexItem
								/>
							)}
						</Box>
					))}
					<Box
						position={"absolute"}
						bottom={"0.2rem"}
						right={"0.5rem"}
					>
						<IconButton
							onClick={() =>
								download("total_application_recieved")
							}
						>
							<Icon
								icon={"ic:round-download"}
								fontSize={"1.4rem"}
							/>
						</IconButton>
					</Box>
				</Box>
			</Box>
		</Grid>
	);
};

export default Dashboard;
