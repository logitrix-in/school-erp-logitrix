import {
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	InputBase,
	Typography,
	Badge,
	Autocomplete,
	TextField,
	Chip,
	Dialog,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
import Popup from "../../UiComponents/Popup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const columns = [
	{
		field: "name",
		headerName: "Name",
		width: 150,
	},
	{
		field: "category",
		headerName: "Category",
		flex: 1,
	},
];
const rows = [];
const names = [];

const QuickSearch = () => {
	const { days } = useClasses();
	const [showPopup, setShowPopup] = useState(false);

	return (
		<Section title={"Record Attendance"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<Autocomplete
						options={names}
						filterSelectedOptions
						freeSolo={false}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Library Card"
								placeholder="Enter Library Card #"
							/>
						)}
						sx={{ width: "30%" }}
					/>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						autoHeight
						rows={rows}
						columns={columns}
					// disableRowSelectionOnClick
					/>
				</Box>

				<ToastContainer />

				{
					showPopup &&
					<Popup
						title="Confirmation"
						open={showPopup}
						close={() => {
							setShowPopup(false);
						}}
						maxWidth="sm"
					>
						<Stack
							justifyContent={"center"}
							alignItems={"center"}
							gap={1}
							mx={10}
							my={3}
						>
							<Typography
								fontSize={"1.1rem"}
								fontWeight={500}
								textAlign={"center"}
							>
								Are you sure you want to check in?
							</Typography>
							<Box display={'flex'} width={'50%'} justifyContent={'space-around'} mt={2}>
								<Button
									variant={"contained"}
									onClick={() => {
										toast.success("Attendance Recorded Successfully");
										setShowPopup(false)
									}}
								>
									Yes
								</Button>
								<Button
									variant={"outlined"}
									onClick={() => {
										setShowPopup(false)
									}}
								>
									No
								</Button>
							</Box>
						</Stack>
					</Popup>
				}

				<Flex justifyContent={"flex-end"}>
					<Button variant="contained" color="primary" onClick={() => setShowPopup(true)}>
						Check - in
					</Button>

				</Flex>
			</Stack>
		</Section>
	);
};

export default QuickSearch;