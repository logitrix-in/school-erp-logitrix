import { Box, Divider, Typography, IconButton } from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useEmployees from "../../../hooks/useEmployees";
import { Icon } from "@iconify/react";
import Chart from "react-apexcharts";
import RevealCard from "../../AnimationComponents/RevealCard";
import { useState, useEffect } from "react";

const Dashboard = () => {
	const { employeeType, employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade, employeeStatus } = useEmployees();

	const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedGrade, setSelectedGrade] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

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
					px={2}
					py={10}
					borderRadius={1}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"space-between"}
					gap={2}
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
						items={employeeStatus}
						multiple
						label="Status"
						defaultValues={employeeStatus}
						onChange={setSelectedStatus}
						value={selectedStatus}
					/>
				</Bbox>

				<Box
					width={"100%"}
				>
					<Box
						bgcolor={"#D9EBF4"}
						p={1}
						width={"100%"}
						borderRadius={1}
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						alignItems={"center"}
						position={"relative"}
					>

						<Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
							Total Employees
						</Typography>
						<Typography sx={{ fontSize: "1.2rem", fontWeight: "700" }}>
							60
						</Typography>

						<Box
							position={"absolute"}
							bottom={"0.2rem"}
							right={"0.5rem"}
						>
							<IconButton>
								<Icon
									icon={"ic:round-download"}
									fontSize={"1.4rem"}
								/>
							</IconButton>
						</Box>
					</Box>
					<Box>
						<Box mt={2} gap={0.5} style={{
							display: 'flex', justifyContent: 'space-between',
						}}>
							<RevealCard style={{ width: '100%' }}>
								<Bbox borderRadius={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
									<Box display="flex" flexDirection={'column'} alignItems="center" height="100%" px={0} py={2}>
										<Box >
											<Typography fontWeight={"600"} fontSize={'20px'}>Employee Type</Typography>
										</Box>
										<Box width="100%" my={2}>
											<Chart
												options={{
													chart: {
														type: "donut",
														toolbar: {
															show: false,
														},
													},
													dataLabels: {
														enabled: false,
														style: {
															fontSize: '10px',
															fontWeight: '400' // Adjust the font size of the percentage labels
														},
													},
													plotOptions: {
														pie: {
															donut: {
																size: "70rem", // chart thickness
																labels: {
																	show: true,
																	name: {
																		show: true,
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: 20,
																	},
																	value: {
																		show: true,
																		fontSize: '24px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: -20,
																	},
																	total: {
																		show: true,
																		label: 'Total',
																		color: '#373d3f',
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 400,
																	}
																}
															},
														},
													},
													legend: {
														show: false,
													},
													colors: [
														"#85BB13",
														"#0072DB",
														"#FF6163",
													],
													labels: [
														"Teaching Staff",
														"Support Staff",
														"Management",
													],
													tooltip: {
														enabled: true, // Disable the on-hover tooltip
													},
												}}
												series={[44, 25, 10]}

												type="donut"
												width="200"
												height="300"
											/>
										</Box>

										{/* Custom label names */}
										<Box
											display="flex"
											flexDirection="column"
											gap={1}

										>
											{[
												{ color: "#85BB13", label: "Teaching Staff" },
												{ color: "#0072DB", label: "Support Staff" },
												{ color: "#FF6163", label: "Management" },
											].map(({ color, label }) => (
												<Box key={label} display="flex" alignItems="center">
													<Box
														width={10}
														height={10}
														borderRadius="2px"
														bgcolor={color}
														mr={1}
													/>
													<Typography fontSize={12} fontWeight={400}>
														{label}
													</Typography>
												</Box>
											))}
										</Box>
									</Box>
								</Bbox>
							</RevealCard>
							<RevealCard style={{ width: '100%' }}>
								<Bbox borderRadius={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
									<Box display="flex" flexDirection={'column'} alignItems="center" height="100%" px={0} py={2} >
										<Box >
											<Typography fontWeight={"600"} fontSize={'20px'}>Status</Typography>
										</Box>
										<Box width="100%" my={2}>
											<Chart
												options={{
													chart: {
														type: "donut",
														toolbar: {
															show: false,
														},
													},
													dataLabels: {
														enabled: false,
														style: {
															fontSize: '10px',
															fontWeight: '400' // Adjust the font size of the percentage labels
														},
													},
													plotOptions: {
														pie: {
															donut: {
																size: "70rem", // chart thickness
																labels: {
																	show: true,
																	name: {
																		show: true,
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: 20,
																	},
																	value: {
																		show: true,
																		fontSize: '24px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: -20,
																	},
																	total: {
																		show: true,
																		label: 'Total',
																		color: '#373d3f',
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 400,
																	}
																}
															},
														},
													},
													legend: {
														show: false,
													},
													colors: [
														"#85BB13",
														"#0072DB",
														"#FF6163",
														"#00E781",
													],
													labels: [
														"Active",
														"Serving Notice Period",
														"Long Leave",
														"Suspended",
													],
													tooltip: {
														enabled: true, // Disable the on-hover tooltip
													},
												}}
												series={[44, 5, 25, 10]}

												type="donut"
												width="200"
												height="300"
											/>
										</Box>

										{/* Custom label names */}
										<Box
											display="flex"
											flexDirection="column"
											gap={1}

										>
											{[
												{ color: "#85BB13", label: "Active" },
												{ color: "#0072DB", label: "Serving Notice Period" },
												{ color: "#FF6163", label: "Long Leave" },
												{ color: "#00E781", label: "Suspended" },
											].map(({ color, label }) => (
												<Box key={label} display="flex" alignItems="center">
													<Box
														width={10}
														height={10}
														borderRadius="2px"
														bgcolor={color}
														mr={1}
													/>
													<Typography fontSize={12} fontWeight={400}>
														{label}
													</Typography>
												</Box>
											))}
										</Box>
									</Box>
								</Bbox>
							</RevealCard>
							<RevealCard style={{ width: '100%' }}>
								<Bbox borderRadius={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
									<Box display="flex" flexDirection={'column'} alignItems="center" height="100%" px={0} py={2}>
										<Box>
											<Typography fontWeight={"600"} fontSize={'20px'} >Gender Distribution</Typography>
										</Box>
										<Box width="100%" my={2}>
											<Chart
												options={{
													chart: {
														type: "donut",
														toolbar: {
															show: false,
														},
													},
													dataLabels: {
														enabled: false,
														style: {
															fontSize: '10px',
															fontWeight: '400' // Adjust the font size of the percentage labels
														},
													},
													plotOptions: {
														pie: {
															donut: {
																size: "70rem", // chart thickness
																labels: {
																	show: true,
																	name: {
																		show: true,
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: 20,
																	},
																	value: {
																		show: true,
																		fontSize: '24px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: -20,
																	},
																	total: {
																		show: true,
																		label: 'Total',
																		color: '#373d3f',
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 400,
																	}
																}
															},
														},
													},
													legend: {
														show: false,
													},
													colors: [
														"#85BB13",
														"#0072DB",
														"#FF6163",
													],
													labels: [
														"Male",
														"Female",
														"Others",
													],
													tooltip: {
														enabled: true, // Disable the on-hover tooltip
													},
												}}
												series={[44, 25, 10]}

												type="donut"
												width="200"
												height="300"
											/>
										</Box>

										{/* Custom label names */}
										<Box
											display="flex"
											flexDirection="column"
											gap={1}
										>
											{[
												{ color: "#85BB13", label: "Male" },
												{ color: "#0072DB", label: "Female" },
												{ color: "#FF6163", label: "Others" },
											].map(({ color, label }) => (
												<Box key={label} display="flex" alignItems="center">
													<Box
														width={10}
														height={10}
														borderRadius="2px"
														bgcolor={color}
														mr={1}
													/>
													<Typography fontSize={12} fontWeight={400}>
														{label}
													</Typography>
												</Box>
											))}
										</Box>
									</Box>
								</Bbox>
							</RevealCard>
							<RevealCard style={{ width: '100%' }}>
								<Bbox borderRadius={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
									<Box display="flex" flexDirection={'column'} alignItems="center" height="100%" px={0} py={2}>
										<Box>
											<Typography fontWeight={"600"} fontSize={'20px'}>Cultural Diversity</Typography>
										</Box>
										<Box width="100%" my={2}>
											<Chart
												options={{
													chart: {
														type: "donut",
														toolbar: {
															show: false,
														},
													},
													dataLabels: {
														enabled: false,
														style: {
															fontSize: '10px',
															fontWeight: '400' // Adjust the font size of the percentage labels
														},
													},
													plotOptions: {
														pie: {
															donut: {
																size: "70rem", // chart thickness
																labels: {
																	show: true,
																	name: {
																		show: true,
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: 20,
																	},
																	value: {
																		show: true,
																		fontSize: '24px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 600,
																		color: '#373d3f',
																		offsetY: -20,
																	},
																	total: {
																		show: true,
																		label: 'Total',
																		color: '#373d3f',
																		fontSize: '16px',
																		fontFamily: 'Helvetica, Arial, sans-serif',
																		fontWeight: 400,
																	}
																}
															},
														},
													},
													legend: {
														show: false,
													},
													colors: [
														"#0072DB",
														"#85BB13",
														"#FF6163",
														"#A855F7",
														"#C0BFBF"
													],
													labels: [
														"Hinduism",
														"Islam",
														"Christianity",
														"Sikhism",
														"Others"
													],
													tooltip: {
														enabled: true, // Disable the on-hover tooltip
													},
												}}
												series={[44, 25, 10, 5, 8]}

												type="donut"
												width="200"
												height="300"
											/>
										</Box>

										{/* Custom label names */}
										<Box
											display="flex"
											flexDirection="column"
											gap={1}
										>
											{[
												{ color: "#0072DB", label: "Hinduism" },
												{ color: "#85BB13", label: "Islam" },
												{ color: "#FF6163", label: "Christianity" },
												{ color: "#A855F7", label: "Sikhism" },
												{ color: "#C0BFBF", label: "Others" },
											].map(({ color, label }) => (
												<Box key={label} display="flex" alignItems="center">
													<Box
														width={10}
														height={10}
														borderRadius="2px"
														bgcolor={color}
														mr={1}
													/>
													<Typography fontSize={12} fontWeight={400}>
														{label}
													</Typography>
												</Box>
											))}
										</Box>
									</Box>
								</Bbox>
							</RevealCard>
						</Box>
					</Box>
				</Box>
			</Box>
		</Bbox>
	);
};

export default Dashboard;
