import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Dashboard from "../../components/Library/Visitors/Dashboard";
import Inventory from "../../components/Library/Visitors/Inventory";
import RecordAttendance from "../../components/Library/Visitors/RecordAttendance";
import api from '../../config/api'

const LibraryVisitors = () => {
	const [libraryCardNumbers, setLibraryCardNumbers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await api.get('/library/library-cards/');
			console.log(response.data);

			const cardNumbersArray = response.data.map(item => item.card_number);
			setLibraryCardNumbers(cardNumbersArray);
		}

		fetchData();
	}, []);

	return (
		<Box display={"flex"} flexDirection={"column"} gap={2}>
			<RevealCard>
				<Dashboard />
			</RevealCard>
			<RevealCard>
				<Inventory libraryCardNumbers={libraryCardNumbers} />
			</RevealCard>
			<RevealCard>
				<RecordAttendance libraryCardNumbers={libraryCardNumbers} />
			</RevealCard>
		</Box>
	);
};

export default LibraryVisitors;
