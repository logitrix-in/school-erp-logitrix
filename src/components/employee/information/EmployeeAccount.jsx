import { Box, Divider, Grid, Typography, IconButton, Dialog, Autocomplete, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { AppContext } from "../../../context/AppContext";
import useClasses from "../../../hooks/useClasses";
import { Icon } from "@iconify/react";
import { borderRadius, maxWidth, style } from "@mui/system";
import Chart from "react-google-charts";
import RevealCard from "../../AnimationComponents/RevealCard";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";

const EmployeeAccount = () => {
	const { days } = useClasses();

	const [notify, setNotify] = useState(false);

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


				<Notify open={notify} close={() => { setNotify(false) }} />
			</Box >
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
					minHeight: "30%",
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

				<Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto" alignItems="center">


					<Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Are you sure you want to send notification to inactive users?</Typography>

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
		</Dialog >
	);
};