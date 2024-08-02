import { Box, Divider, Grid, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { AppContext } from "../../../context/AppContext";
import useClasses from "../../../hooks/useClasses";
import { Icon } from "@iconify/react";

const Dashboard = () => {
	const ctx = useContext(AppContext);
	const { classes, sections, acYear, curYear, status, days } = useClasses();
	const [academicYear, setAcademicYear] = useState(curYear);

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
					flex={0.8}
					p={2}
					borderRadius={1}
					display={"flex"}
					flexDirection={"column"}
					gap={2}
				>
					<ReignsSelect
						items={acYear}
						onChange={(e) =>
							setAcademicYear(e?.target.value ?? academicYear)
						}
						label="Academic Year"
					/>
					<ReignsSelect items={classes} multiple label="Class" />
					<ReignsSelect items={sections} multiple label="Section" />
					<ReignsSelect
						items={[
							"Management",
							"Teaching Staff",
							"Support Staff",
						]}
						multiple
						label="Employee Type"
					/>
					<ReignsSelect items={days} multiple label="Days" />
				</Bbox>
				<Grid container flex={2} spacing={1}>
					<DisplayCard
						bgColor={"#D9EBF4"}
						color={"#3B98C4"}
						header="Footfalls"
						value="3100/39000"
						data={[
							{
								title: "Books",
								val: 2700,
							},
							{
								title: "Periodicals",
								val: 200,
							},
							{
								title: "Research Papers",
								val: 200,
							},
						]}
					/>
					<DisplayCard
						bgColor={"#FAD2C0"}
						color={"#B34A19"}
						header="Media Inventory"
						value="32/2900"
						data={[
							{
								title: "Books",
								val: 2700,
							},
							{
								title: "Periodicals",
								val: 200,
							},
							{
								title: "Research Papers",
								val: 200,
							},
						]}
					/>
					<DisplayCard
						bgColor={"#FAD2C0"}
						color={"#B34A19"}
						header="Media Issued (Visitors)"
						value="39000"
						data={[
							{
								title: "Books",
								val: 27000,
							},
							{
								title: "Periodicals",
								val: 7000,
							},
							{
								title: "Research Papers",
								val: 5000,
							},
						]}
					/>
					<DisplayCard
						bgColor={"#D9EBF4"}
						color={"#3B98C4"}
						header="Current Defaulters (Visitors)"
						value="2900"
						data={[
							{
								title: "Students",
								val: 8,
							},
							{
								title: "Employees",
								val: 24,
							},
						]}
					/>
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
