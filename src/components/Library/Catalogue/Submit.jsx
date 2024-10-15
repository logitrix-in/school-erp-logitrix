import {
	Box,
	Button,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Bbox from "../../UiComponents/Bbox";
import { DataGrid } from "@mui/x-data-grid";
import AutocompleteWithAll from "../../UiComponents/AutocompleteWithAll";
import { toast } from "react-toastify";
import useMedia from "../../../hooks/useMedia";
import api from "../../../config/api";

const Submit = () => {
	const { mediaTypes, mediaCategories, mediaLanguages } = useMedia();
	const [mediaNames, setMediaNames] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [publishers, setPublishers] = useState([]);

	const [selectedMediaType, setSelectedMediaType] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selectedName, setSelectedName] = useState([]);
	const [selectedAuthor, setSelectedAuthor] = useState([]);
	const [selectedPublisher, setSelectedPublisher] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
	const [rows, setRows] = useState([]);

	const handleSubmit = async () => {
		const formData = {
			media_types: selectedMediaType,
			media_languages: selectedLanguage,
			categories: selectedCategory,
			media_names: selectedName,
			authors: selectedAuthor,
			publishers: selectedPublisher
		};
		console.log('Form data:', formData);

		try {
			const response = await api.post('/library/catalogue/', formData);
			console.log('API response:', response.data);

			setRows(response.data.map(item => ({
				...item,
				id: item.media_id
			})));

		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const columns = [
		{
			field: "media_type",
			headerName: "Media Type",
			width: 150,
		},
		{
			field: "category",
			headerName: "Category",
			flex: 1,
		},
		{
			field: "media_name",
			headerName: "Media Name",
			flex: 2,
		},
		{
			field: "author",
			headerName: "Author",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
		{
			field: "publisher",
			headerName: "Publisher",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
		{
			field: "media_language",
			headerName: "Media Language",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
		{
			field: "num_copies",
			headerName: "Copies Available",
			flexWrap: true,
			flex: 1,
			sortable: true,
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/library/catalogue/');
				console.log(response.data);

				setMediaNames(response.data.media_names);
				setAuthors(response.data.authors);
				setPublishers(response.data.publishers);
			} catch (error) {
				console.log(error);
				toast.error('Error fetching data');
			}
		};
		fetchData();
	}, [])

	const handleClearAll = () => {
		console.log('Clearing all fields');
		setSelectedMediaType([]);
		setSelectedCategory([]);
		setSelectedName([]);
		setSelectedAuthor([]);
		setSelectedPublisher([]);
		setSelectedLanguage([]);
		console.log(selectedMediaType, selectedCategory, selectedName, selectedAuthor, selectedPublisher, selectedLanguage);
	}

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Search
				</Typography>
			</Box>

			<Divider />
			<Box p={2}>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button variant="outlined" onClick={() => handleClearAll()}>Clear All</Button>
				</Box>
				<Grid container spacing={2} mt={1}>
					<Grid item xs={4}>
						<AutocompleteWithAll
							items={mediaTypes}
							title="Media Type"
							value={selectedMediaType}
							onChange={setSelectedMediaType}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={mediaNames}
							title="Select Name"
							value={selectedName}
							onChange={setSelectedName}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={mediaCategories}
							title="Select Category"
							value={selectedCategory}
							onChange={setSelectedCategory}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={authors}
							title="Select Author"
							value={selectedAuthor}
							onChange={setSelectedAuthor}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={publishers}
							title="Select Publisher"
							value={selectedPublisher}
							onChange={setSelectedPublisher}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							title="Language"
							limitTags={2}
							items={mediaLanguages}
							value={selectedLanguage}
							onChange={setSelectedLanguage}
						/>
					</Grid>
				</Grid>

				<Box mt={2} display="flex" justifyContent="center">
					<Button
						sx={{ width: "min(30rem,100%)" }}
						variant="contained"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Box>

				<DataGrid
					sx={{ mt: 5 }}
					rows={rows}
					columns={columns}
					hideFooter
				/>
			</Box>
		</Bbox>
	);
};

export default Submit;
