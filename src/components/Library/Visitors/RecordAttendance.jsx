import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Stack,
	Typography,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Section from "../../Section";
import Flex from "../../UiComponents/Flex";
import Popup from "../../UiComponents/Popup";
import { ToastContainer, toast } from "react-toastify";
import api from '../../../config/api'

const employeeColumns = [
	{
		field: "library_card_number",
		headerName: "Library Card #",
		flex: 0.5,
	},
	{
		field: "employee_id",
		headerName: "Employee ID",
		flex: 0.5,
	},
	{
		field: "employee_name",
		headerName: "Employee Name",
		flex: 1,
	},
	{
		field: "employee_type",
		headerName: "Employee Type",
		flex: 1,
	},
	{
		field: "department",
		headerName: "Department",
		flex: 1,
	},
];

const studentColumns = [
	{
		field: "library_card_number",
		headerName: "Library Card #",
		flex: 0.5,
	},
	{
		field: "student_id",
		headerName: "Student ID",
		flex: 1,
	},
	{
		field: "student_name",
		headerName: "Student Name",
		flex: 1,
	},
	{
		field: "section",
		headerName: "Section",
		flex: 1,
	},
	{
		field: "roll",
		headerName: "Roll #",
		flex: 1,
	},
];

const QuickSearch = ({ libraryCardNumbers }) => {
	const [showPopup, setShowPopup] = useState(false);
	const [selectedLibraryCard, setSelectedLibraryCard] = useState(null);
	const [rows, setRows] = useState([]);

	async function getLibraryCardDetail() {
		try {
			if (!selectedLibraryCard) return;

			const response = await api.get(`/library/library-cards/?card_number=${selectedLibraryCard}`);
			console.log(response.data);

			if (response.data.length > 0) {
				const cardData = response.data[0];
				const newRow = {
					id: cardData.id,
					library_card_number: cardData.card_number,
					employee_id: cardData.employee.employee_id,
					employee_name: cardData.employee.employee_id,
					employee_type: cardData.employee.employee_type,
					department: cardData.employee.department,
					current_borrowings: cardData.current_borrowings,
					issued_on: cardData.issued_on,
					valid_till: cardData.valid_till,
					is_active: cardData.is_active
				};

				console.log('New row:', newRow);
				setRows([newRow]); // Set as an array with a single item
			} else {
				setRows([]); // Set to empty array if no data returned
			}

		} catch (error) {
			console.log(error);
			toast.error('Error Loading Data.')
		}
	}

	useEffect(() => { getLibraryCardDetail() }, [selectedLibraryCard])

	async function handleCheckIn() {
		try {
			console.log(selectedLibraryCard);

			const response = await api.post(`/library/visitors-attendance/`, {
				"library_card": selectedLibraryCard
			});
			console.log(response.data);

			if (response.status === 201) {
				console.log(response.data);
				toast.success("Attendance Recorded Successfully");
				setShowPopup(false)
			}
		} catch (err) {
			console.log(err);
			toast.error('Error Loading Data.')
		}
	}

	return (
		<Section title={"Record Attendance"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<FormControl sx={{ width: '30%' }}>
						<InputLabel>Enter Library Card #</InputLabel>
						<Select
							label="Enter Library Card #"
							value={selectedLibraryCard}
							onChange={(e) => setSelectedLibraryCard(e.target.value)}
						>
							{
								libraryCardNumbers?.map((item, index) => (
									<MenuItem key={index} value={item}>{item}</MenuItem>
								))
							}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ width: "100%" }}>
					{
						selectedLibraryCard?.startsWith('LIB18') ?
							<DataGrid
								autoHeight
								rows={rows}
								columns={employeeColumns}
								disableRowSelectionOnClick
							/> : <DataGrid
								autoHeight
								rows={rows}
								columns={studentColumns}
								disableRowSelectionOnClick
							/>
					}

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
								Are you sure you want to record attendance for the selected visitor(s)?
							</Typography>
							<Box display={'flex'} width={'50%'} justifyContent={'space-around'} mt={2}>
								<Button
									variant={"contained"}
									onClick={() => {
										handleCheckIn()
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