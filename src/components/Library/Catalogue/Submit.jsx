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

	const [mediaType, setMediaType] = useState([]);
	const [category, setCategory] = useState([]);
	const [name, setName] = useState([]);
	const [author, setAuthor] = useState([]);
	const [publisher, setPublisher] = useState([]);
	const [language, setLanguage] = useState([]);
	const [rows, setRows] = useState([]);

	const handleSubmit = async () => {
		const formData = {
			media_types: mediaType,
			media_languages: language,
			categories: category,
			media_names: name,
			authors: author,
			publishers: publisher
		};
		console.log('Form data:', formData);

		try {
			const response = await api.post('/library/catalogue/', formData);
			console.log('API response:', response.data);

			setRows(response.data.map(item => ({
				...item,
				id: item.media_id
			})));

			setMediaType([]);
			setCategory([]);
			setName([]);
			setAuthor([]);
			setPublisher([]);
			setLanguage([]);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	const columns = [
		{ field: 'media_id', headerName: 'Media ID', width: 100 },
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

				// Extract and set the required data
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
					<Button variant="outlined">Clear All</Button>
				</Box>
				<Grid container spacing={2} mt={1}>
					<Grid item xs={4}>
						<AutocompleteWithAll
							items={mediaTypes}
							title="Media Type"
							value={mediaType}
							onChange={setMediaType}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={mediaCategories}
							title="Select Category"
							value={category}
							onChange={setCategory}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={mediaNames}
							title="Select Name"
							value={name}
							onChange={setName}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={authors}
							title="Select Author"
							value={author}
							onChange={setAuthor}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							limitTags={2}
							items={publishers}
							title="Select Publisher"
							value={publisher}
							onChange={setPublisher}
						/>
					</Grid>
					<Grid item xs={4}>
						<AutocompleteWithAll
							title="Language"
							limitTags={2}
							items={mediaLanguages}
							value={language}
							onChange={setLanguage}
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
