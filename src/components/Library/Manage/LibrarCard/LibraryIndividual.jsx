import React, { useState, useEffect } from "react";
import Flex from "../../../UiComponents/Flex";
import Preview from "./Preview";
import { Button, TextField, Box, Radio, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import api from '../../../../config/api'

const LibraryIndividual = () => {
	const names = [];
	const [preview, setPreview] = useState(false);
	const [employeeRows, setEmployeeRows] = useState([]);
	const [libraryCardNumbers, setLibraryCardNumbers] = useState([]);
	const [selectedLibraryCard, setSelectedLibraryCard] = useState(null);

	const columns = [
		{ field: "id", headerName: "Library Card #", flex: 1 },
		{ field: "class", headerName: "Class", flex: 1 },
		{ field: "section", headerName: "Section", flex: 1 },
		{ field: "roll", headerName: "Roll #", flex: 1 },
		{ field: "section", headerName: "Section", flex: 1 },
		{ field: "last_issue_date", headerName: "Last Issue Date", flex: 1 },
	];

	const [selectedRow, setSelectedRow] = useState({ id: null, employeeId: null });

	const employeeColumns = [
		{
			field: "radioButtons",
			headerName: "",
			flex: 0.5,
			renderCell: (params) => (
				<Radio
					checked={selectedRow.id === params.row.id}
					onChange={() => {
						setSelectedRow({
							id: params.row.id,
							employeeId: params.row.employee_id
						});
						console.log("Selected:", {
							id: params.row.id,
							employeeId: params.row.employee_id
						});
					}}
					onClick={(event) => event.stopPropagation()}
				/>
			),
		},
		{ field: "library_card_number", headerName: "Library Card #", flex: 1 },
		{ field: "employee_id", headerName: "Employee ID", flex: 1 },
		{ field: "employee_type", headerName: "Employee Type", flex: 1 },
		{ field: "department", headerName: "Department", flex: 1 },
		{ field: "last_issue_date", headerName: "Last Issue Date", flex: 1 },
	];

	useEffect(() => {
		async function fetchData() {
			const response = await api.get('/library/library-cards/');
			console.log(response.data);

			const cardNumbersArray = response.data.map(item => item.card_number);
			setLibraryCardNumbers(cardNumbersArray);
		}

		fetchData();
	}, []);

	async function getLibraryCardDetail(e) {
		try {
			setEmployeeRows([]);
			setSelectedLibraryCard(e.target.value);
			const response = await api.get(`/library/library-cards/?card_number=${e.target.value}`);
			console.log(response.data);
			console.log(employeeRows);

			const newRowArray = response.data[0];

			const newRow = {
				id: newRowArray.card_number,
				library_card_number: newRowArray.card_number,
				employee_id: newRowArray.employee.employee_id,
				employee_type: newRowArray.employee.employee_type,
				department: newRowArray.employee.department,
				last_issue_date: newRowArray.issued_on
			}

			console.log(newRow);
			setEmployeeRows([newRow]);
			console.log(employeeRows);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleIssueCard() {
		try {
			console.log(selectedRow.employeeId)
			const response = await api.post('/library/library-cards/', {
				employee_id: selectedRow.employeeId,
				valid_till: "2025-07-26"
			});

			console.log(response.data);
			if (response.status === 201) {
				toast.success('Card Issued Successully')
			}
		} catch (err) {
			console.log(err);
			toast.error('Card Issuing Failed')
		}
	}


	return (
		<>

			<Box>
				<Flex mb={2}>

					<FormControl sx={{ width: '30%' }}>
						<InputLabel>Enter Library Card #</InputLabel>
						<Select
							label="Search by Library ID or Student Name"
							placeholder="Search by Library ID or Student Name"
							value={selectedLibraryCard}
							onChange={(e) => getLibraryCardDetail(e)}
						>
							{
								libraryCardNumbers.map((item, index) => (
									<MenuItem key={index} value={item}>{item}</MenuItem>
								))
							}
						</Select>
					</FormControl>
				</Flex>

				<Box mt={3}>
					<DataGrid columns={employeeColumns} rows={employeeRows} autoHeight />
				</Box>

				<Flex justifyContent={"flex-end"} mt={4}>
					<Button variant="contained" color="secondary" onClick={() => setPreview(true)}>Issue Library Card</Button>
					<Button variant="contained" color="secondary">Print</Button>
				</Flex>
			</Box>

			<ToastContainer />
			{
				preview && (
					<Preview open={preview} close={() => setPreview(false)} handleIssueCard={handleIssueCard} />
				)
			}
		</>
	);
};

export default LibraryIndividual;
