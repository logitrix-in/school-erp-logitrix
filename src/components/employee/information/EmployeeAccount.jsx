import { Box, Divider, Grid, Typography, IconButton, Autocomplete, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { AppContext } from "../../../context/AppContext";
import useClasses from "../../../hooks/useClasses";
import { Icon } from "@iconify/react";
import { borderRadius, maxWidth, style } from "@mui/system";
import Chart from "react-google-charts";
import RevealCard from "../../AnimationComponents/RevealCard";

const EmployeeAccount = () => {
	const ctx = useContext(AppContext);
	const { classes, sections, acYear, curYear, status, days } = useClasses();

	const [academicYear, setAcademicYear] = useState(curYear);
	console.log(classes);

	const items = ['A', 'B', 'C', 'D'];

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Employee Account
				</Typography>
			</Box>

			<Divider />
			<Box display={"flex"} gap={1} px={2} pt={2}>
				<Autocomplete
					options={[]}
					filterSelectedOptions
					sx={{ width: "30%" }}
					freeSolo={false}
					// inputValue={inputValue}
					// onInputChange={(event, newInputValue) => {
					// setInputValue(newInputValue);
					// }}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search by Employee Name or Employee ID"
							placeholder="Search by Employee Name or Employee ID"
						/>
					)}
				/>
			</Box>
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
						items={[
							"Management",
							"Teaching Staff",
							"Support Staff",
						]}
						multiple
						label="Employee Type"
						defaultValues={["Management", "Teaching Staff", "Support Staff"]}
					/>
					<ReignsSelect
						items={items}
						multiple
						label="Department"
						defaultValues={items}
					/>
					<ReignsSelect
						items={items}
						multiple
						label="Grade"
						defaultValues={items}
					/>

					<ReignsSelect items={days} label="Days" defaultValues={days} />
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

						{/* <ToastContainer /> */}

						<Button
							variant="outlined"
							color="primary"
							fullWidth
						// onClick={handleOpenPrompt}
						>
							Notify Inactive Users
						</Button>
					</Box>
				</Box>
			</Box>
		</Bbox>
	);
};

export default EmployeeAccount;
