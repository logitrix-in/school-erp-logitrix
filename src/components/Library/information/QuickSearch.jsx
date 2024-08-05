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
} from "@mui/material";

// quick search will render 3 different types of data set - student, employee, media
import React, { useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import { Icon } from "@iconify/react";
import { DataGrid } from "@mui/x-data-grid";
import Section from "../../Section";
import Flex from "../../UiComponents/Flex";
import ReignsSelect from "../../UiComponents/ReignsSelect";

const QuickSearch = () => {
	const activityColumn = [
		{
			field: "activityDate",
			headerName: "Activity Date",
			type: "date",
			flex: 1,
		},
		{
			field: "activityType",
			headerName: "Activity Type",
			flex: 1,
		},
		{
			field: "mediaId",
			headerName: "Media ID",
			flex: 1,
		},
		{
			field: "mediaName",
			headerName: "Media Name",
			flex: 1,
		},
		{
			field: "actionedBy",
			headerName: "Actioned By",
			flex: 1,
		},
		{
			field: "comments",
			headerName: "Comments",
			flex: 2,
		},
	];

	const columns = [
		{
			field: "id",
			headerName: "Library Card",
			width: 140,
			renderCell: (params) => {
				return (
					<Typography
						color={"#19469F"}
						sx={{
							cursor: "pointer",
							":hover": { textDecoration: "underline" },
						}}
						onClick={() => handleLibIdClick(params.value)}
					>
						{params.value}
					</Typography>
				);
			},
		},
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
		{
			field: "department",
			headerName: "Department",
			flex: 1,
		},
		{
			field: "currentBorrowing",
			headerName: "current Borrowing",
			renderCell: (params) => (
				<div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
					{params.value}
				</div>
			),
			flexWrap: true,
			flex: 2,
			sortable: true,
		},
		{
			field: "libraryCardStatus",
			headerName: "Library Card Status",
			flex: 1,
			renderCell: (params) => {
				console.log(params);
				return (
					<Box
						sx={{
							bgcolor: "#C6F6D5",
							borderRadius: 1,
							px: 2,
							py: 0.5,
						}}
					>
						{params.value}
					</Box>
				);
			},
		},
	];

	const rows = [
		{
			id: "CHN2401",
			name: "Arnab Chatterjee",
			category: "Teaching Staff",
			department: "Biology",
			currentBorrowing:
				"Alice's Adventure in the Wonderland, harry potter and the cursed child",
			libraryCardStatus: "Active",
		},
	];

	const [modalVisible, setModalVisible] = useState(false);
	const [activeLibId, setActiveLibId] = useState(null);

	const handleLibIdClick = (libId) => {
		setActiveLibId(libId);
		setModalVisible(true);
	};

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Quick Search - User / Media Details
				</Typography>
			</Box>

			<Divider />
			<Stack p={2} gap={2}>
				<Box display={"flex"} gap={1}>
					<SearchBox />
					<Button
						variant="contained"
						size="small"
						sx={{ px: 2, ml: 2 }}
					>
						Search
					</Button>
				</Box>
				<Box sx={{ width: "100%" }}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						disableRowSelectionOnClick
					/>
				</Box>
			</Stack>

			{/* modal */}

			<Dialog
				color="transparent"
				open={modalVisible}
				maxWidth={"lg"}
				fullWidth
			>
				<Stack height={"90vh"} overflow={"hidden"}>
					<Box
						p={2}
						bgcolor={"#2F7DA1"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<Typography color="white">User Details</Typography>
						<Icon
							icon={"ic:twotone-close"}
							style={{ position: "absolute", right: "1rem" }}
							fontSize={"1.4rem"}
							color="white"
							cursor={"pointer"}
							onClick={() => setModalVisible(false)}
						/>
					</Box>

					<Box sx={{ p: 2 }} overflow={"auto"}>
						<Bbox
							position={"relative"}
							zIndex={1}
							borderRadius={1}
							// overflow={"hidden"}
							p={4}
						>
							<Box
								zIndex={-1}
								borderRadius={1}
								position={"absolute"}
								sx={{
									clipPath:
										"polygon(0 0, 54% 0, 20% 100%, 0% 100%)",
									bgcolor: "#2F7DA1",
									height: "100%",
									aspectRatio: 1,
									top: 0,
									left: 0,
								}}
							></Box>
							<Box display={"flex"} gap={3} position={"relative"}>
								<Stack gap={1} mr={2}>
									<Box
										borderRadius={1}
										overflow={"hidden"}
										width={"7rem"}
										bgcolor={"red"}
										sx={{
											aspectRatio: 1,
										}}
									>
										<img
											src={
												"https://www.parentmap.com/images/article/7877/BOY_feature_credit_will_austin_848x1200.jpg"
											}
											alt=""
											height={"100%"}
											width={"100%"}
											style={{ objectFit: "cover" }}
										/>
									</Box>
									<Box
										borderRadius={1}
										width={"100%"}
										p={1}
										bgcolor={"#C6F6D5"}
										textAlign={"center"}
									>
										Active
									</Box>
								</Stack>
								<Stack gap={2} pt={2}>
									<Entries
										w={"7rem"}
										title={"Employee Name"}
										val={"Jay Shaw"}
									/>
									<Entries
										w={"7rem"}
										title={"Library Card #"}
										val={activeLibId}
									/>
									<Entries
										title={"Employee Id"}
										w={"7rem"}
										val={"EMP2201"}
									/>
								</Stack>
								<Divider flexItem orientation="vertical" />
								<Stack gap={2} pt={2}>
									<Entries
										title={"Category"}
										val={"Jay Shaw"}
										w={"8rem"}
									/>
									<Entries
										title={"Department"}
										val={activeLibId}
										w={"8rem"}
									/>
									<Entries
										title={"Current Borrowing"}
										val={"EMP2201"}
										w={"8rem"}
									/>
								</Stack>
								<Divider flexItem orientation="vertical" />
								<Stack gap={2} pt={2}>
									<Entries
										title={"Penalty Due as on date"}
										val={"₹ 2344"}
										w={"10rem"}
									/>
									<Typography>
										<Typography
											display={"inline-block"}
											width={"10rem"}
										>
											{"Open Incident(s)"}
										</Typography>

										<Box mx={1} display={"inline-block"}>
											:
										</Box>
										<Box display={"inline-flex"} gap={1}>
											<Incident
												incident={{
													title: "12343",
												}}
											/>
											<Incident
												incident={{
													title: "877656",
												}}
											/>
										</Box>
									</Typography>
								</Stack>
								<Box position={"absolute"} bottom={0} right={0}>
									<Box
										display={"flex"}
										justifyContent={"right"}
										alignItems={"center"}
										gap={1}
									>
										<Icon icon="tdesign:call" />
										<Typography>9988445533</Typography>
									</Box>
									<Box
										display={"flex"}
										justifyContent={"right"}
										alignItems={"center"}
										gap={1}
									>
										<Icon icon="octicon:mail-24" />
										<Typography>
											alma.lawson@example.com
										</Typography>
									</Box>
								</Box>
							</Box>
						</Bbox>
						<Box mt={2} />
						<Section
							comp={
								<Flex
									bgcolor={"white"}
									py={1.3}
									px={2}
									borderRadius={2}
									justifyContent={"space-between"}
								>
									<Typography
										fontWeight={"700"}
										fontSize={"1rem"}
									>
										Activity Details
									</Typography>
									<ReignsSelect
										sx={{ width: "14rem" }}
										defaultVal="Current Academic Year"
										size="small"
										items={[
											"Last 1 month",
											"Last 3 month",
											"Last 6 month",
											"Current Academic Year",
											"Previous Academic Year",
										]}
									/>
								</Flex>
							}
						>
							<DataGrid
								sx={{ height: "25rem" }}
								columns={activityColumn}
								rows={[
									{
										id: 1,
										activityType: "Media Issued",
										activityDate: new Date(),
										mediaName:
											"Fundamentals of Political Science",
										mediaId: "123AC12B",
										actionedBy: "EMP3543543443",
										comments:
											"Lorem ipsum dolor sit amet consectetur",
									},
								]}
							/>
						</Section>
					</Box>
				</Stack>
			</Dialog>
		</Bbox>
	);
};

const Incident = ({ incident }) => {
	return (
		<Box
			bgcolor={"#E8DEF8"}
			p={0.8}
			px={1.4}
			fontSize={"0.8rem"}
			borderRadius={1}
			fontWeight={700}
			position={"relative"}
			sx={{
				":hover": {
					boxShadow: "0 0 10px -3px #00000039",
				},
				":hover .hmenu": {
					visibility: "visible",
				},
			}}
		>
			# {incident.title}
			<Box
				right={0}
				top={"120%"}
				className={"hmenu"}
				visibility={"hidden"}
				position={"absolute"}
				width={"25rem"}
				height={"20rem"}
				bgcolor={"white"}
				p={2}
				border={"1px solid red"}
				zIndex={999}
				borderRadius={1}
			>
				Incident : #{incident.title}
			</Box>
		</Box>
	);
};

const Entries = ({ title, val, w }) => {
	return (
		<Typography>
			<Typography width={w} display={"inline-block"}>
				{title}
			</Typography>
			<Box mx={1} display={"inline-block"}>
				:
			</Box>
			<Typography display={"inline-block"} fontWeight={600}>
				{val}
			</Typography>
		</Typography>
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
				width: "30rem",
				display: "flex",
				alignItems: "center",
			}}
		>
			<InputBase
				fullWidth
				placeholder="Search by Library Card # / Media ID"
			/>
			<Icon icon={"tabler:search"} fontSize={"1.2rem"} />
		</Box>
	);
};

export default QuickSearch;
