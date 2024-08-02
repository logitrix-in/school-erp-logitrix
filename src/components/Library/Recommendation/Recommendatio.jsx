import {
	Box,
	Button,
	Divider,
	Grid,
	Stack,
	InputBase,
	Typography,
	Badge,
	Chip,
	Dialog,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
} from "@mui/material";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
import { useState } from "react";

const columns = [
	{
		field: "id",
		headerName: "Req ID",
		flex: 1,
	},
	{
		field: "employeeName",
		headerName: "Employee Name",
		renderCell: (p) => (
			<Flex>
				<Avatar sx={{ width: 35, height: 35 }}>
					<img src={p.value.img} alt="" />
				</Avatar>
				<Stack>
					<Typography fontWeight={500} color="text.primary">
						{p.value.name}
					</Typography>
					<Typography
						fontSize={"0.7rem"}
						variant="body2"
						color="text.secondary"
					>
						{p.value.id}
					</Typography>
				</Stack>
			</Flex>
		),
		flex: 2,
	},
	{
		field: "Reqdate",
		headerName: "Req date",
		flex: 1,
	},
	{
		field: "Department",
		headerName: "Department",
		flex: 1,
	},
	{
		field: "Media Type",
		headerName: "Media Type",
		flex: 1,
	},
	{
		field: "Media Name",
		headerName: "Media Name",
		flex: 1,
	},
	{
		field: "Author",
		headerName: "Author",
		flex: 1,
	},
	{
		field: "Purpose",
		headerName: "Purpose",
		flex: 2,
	},
	{
		field: "Status",
		headerName: "Status",
		renderCell: (params) => {
			const [anchorEl, setAnchorEl] = useState(null);
			const [selected, setSelected] = useState(params.value);

			const open = Boolean(anchorEl);
			const handleClick = (event) => {
				setAnchorEl(event.currentTarget);
			};
			const handleClose = () => {
				setAnchorEl(null);
			};
			return (
				<Box>
					<Flex
						bgcolor={"#C6F6D5"}
						p={0.5}
						px={1.5}
						borderRadius={1}
						onClick={handleClick}
					>
						<Flex>
							{selected}
							<Icon
								icon={"teenyicons:down-solid"}
								fontSize={"0.7rem"}
							/>
						</Flex>
					</Flex>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						{["In Review", "Accept", "Reject", "Fullfill"].map(
							(opt, idx) => (
								<MenuItem
									onClick={() => {
										setSelected(opt);
										handleClose();
									}}
									sx={{ width: "10rem" }}
								>
									{opt}
								</MenuItem>
							)
						)}
					</Menu>
				</Box>
			);
		},
		flex: 1,
	},
	{
		field: "actions",
		headerName: "",
		width: 1,
		disableColumnMenu: true,
		sortable: false,
		renderCell: () => (
			<IconButton size="small">
				<Icon icon="tabler:dots-vertical" />
			</IconButton>
		),
	},
];
const rows = [
	{
		id: "RQ1234",
		employeeName: {
			name: "John Doe",
			id: "1234",
			img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?cs=srgb&dl=pexels-creationhill-1681010.jpg&fm=jpg",
		},
		Reqdate: "2020-01-01",
		Department: "Finance",
		"Media Type": "Video",
		"Media Name": "Video 1",
		Author: "John",
		Purpose: "Creative Exploration",
		Status: "open",
		actions: "Delete",
	},
];

const Recommendation = () => {
	const { acYear } = useClasses();

	return (
		<Section title={"Recommendation"}>
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1} alignItems={"center"}>
					<SearchBox />
					<Button variant="contained" sx={{ px: 2, ml: 2 }}>
						Search
					</Button>
					<ReignsSelect
						items={acYear}
						// onChange={(e) =>
						// 	setAcademicYear(e?.target.value ?? academicYear)
						// }
						label="Academic Year"
						sx={{
							width: "15rem",
							ml: "auto",
						}}
					/>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						autoHeight
						experimentalFeatures={{
							columnGrouping: true,
						}}
						rows={rows}
						columns={columns}
						columnGroupingModel={[
							{
								groupId: "Media Requirement",
								headerName: "Media Requirement",
								children: [
									{ field: "Media Type" },
									{ field: "Media Name" },
									{ field: "Author" },
								],
							},
						]}
						disableRowSelectionOnClick
					/>
				</Box>

				<Flex justifyContent={"flex-end"}>
					<Button variant="contained" color="primary">
						Proceed
					</Button>
					<Button variant="outlined" color="secondary">
						Download
					</Button>
				</Flex>
			</Stack>
		</Section>
	);
};
const SearchBox = () => {
	return (
		<Box
			sx={{
				border: "1px solid #28282836",
				p: 0.7,
				px: 3,
				borderRadius: 1,
				width: "20rem",
				display: "flex",
				alignItems: "center",
			}}
		>
			<InputBase fullWidth placeholder="Enter Library Card #" />
			<Icon icon={"tabler:search"} fontSize={"1.2rem"} />
		</Box>
	);
};
export default Recommendation;
