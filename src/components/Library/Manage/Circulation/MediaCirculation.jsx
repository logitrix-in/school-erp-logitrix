import React, { useState } from "react";
import Section from "../../../Section";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import Flex from "../../../UiComponents/Flex";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "../../../UiComponents/Popup";
import { Box, Stack } from "@mui/system";
import { Icon } from "@iconify/react";

const columns = [
	{ field: "id", headerName: "Library Card #", flex: 1 },
	{ field: "mediaType", headerName: "Student Id", flex: 1 },
	{ field: "studentName", headerName: "Student Name", flex: 2 },
	{ field: "author", headerName: "Class", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "media IISN / ISBN / ID", flex: 1 },
	{ field: "mediaName", headerName: "media Name", flex: 1 },
	{ field: "dueDate", headerName: "Due Date", flex: 1 },
	{ field: "penalty", headerName: "Penalty Due", flex: 1 },
];

const MediaCirculation = () => {
	const [returnState, setReturnState] = useState(null);
	return (
		<Section title={"Media Circulation - Scan / Manual"}>
			<Flex mb={2}>
				<TextField
					size="small"
					placeholder="Enter Library Card #"
					sx={{ width: "22rem" }}
					variant="outlined"
					InputProps={{
						sx: {
							fontSize: "0.9rem",
						},
						endAdornment: (
							<InputAdornment position="end">
								<Search sx={{ fontSize: "1.3rem" }} />
							</InputAdornment>
						),
					}}
				/>
				<Button variant="contained" sx={{ mr: "auto" }}>
					Submit
				</Button>
				<Button variant="contained">Set Rule</Button>
			</Flex>

			<DataGrid
				columnGroupingModel={[
					{
						groupId: "media",
						children: [
							{ field: "mediaName" },
							{ field: "mediaId" },
							{ field: "dueDate" },
						],
					},
				]}
				autoHeight
				rows={[]}
				columns={columns}
			/>

			<Flex justifyContent={"flex-end"} my={2}>
				<Button variant="contained">New Issue</Button>
				<Button variant="outlined">Renew</Button>
				<Button
					variant="contained"
					color={"secondary"}
					onClick={() => setReturnState("scan-auto")}
				>
					Return
				</Button>
			</Flex>

			<Popup
				open={returnState}
				title={"Authenticate"}
				maxWidth="sm"
				close={() => setReturnState(null)}
			>
				{returnState == "scan-auto" && (
					<>
						<Flex justifyContent={"center"} height={"10rem"}>
							<Typography>
								Scan Media ID to Authenticate...
							</Typography>
						</Flex>
						<Flex justifyContent={"flex-end"}>
							<Typography
								onClick={() => setReturnState("scan-manual")}
								color={"primary"}
								fontWeight={500}
								sx={{
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								Manual Entry
							</Typography>
						</Flex>
					</>
				)}
				{returnState == "scan-manual" && (
					<>
						<Stack
							justifyContent={"center"}
							gap={2}
							height={"10rem"}
							mx={10}
						>
							<TextField label={"Media ID"} />
							<Button
								variant={"contained"}
								fullWidth
								onClick={() => {
									setReturnState("auth-success");
								}}
							>
								Submit
							</Button>
						</Stack>
						<Flex justifyContent={"flex-end"}>
							<Typography
								onClick={() => setReturnState("scan-auto")}
								color={"primary"}
								fontWeight={500}
								sx={{
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								Scan Media ID
							</Typography>
						</Flex>
					</>
				)}
				{returnState == "auth-success" && (
					<>
						<Stack
							justifyContent={"center"}
							alignItems={"center"}
							gap={1}
							mx={10}
							my={3}
						>
							<Icon
								icon="clarity:success-standard-solid"
								color="#0BCA08"
								height={34}
							/>
							<Typography
								fontSize={"1.1rem"}
								fontWeight={500}
								textAlign={"center"}
							>
								Authenticated and Return Successfully
							</Typography>
							<Button
								variant={"contained"}
								onClick={() => {
									setReturnState("auth-delayed-return");
								}}
							>
								Done
							</Button>
						</Stack>
					</>
				)}
				{returnState == "auth-delayed-return" && (
					<>
						<Stack
							justifyContent={"center"}
							alignItems={"center"}
							gap={1}
							mx={10}
							my={3}
						>
							<Icon
								icon="ic:round-error"
								color="#C4673B"
								height={34}
							/>
							<Typography
								fontSize={"1.1rem"}
								fontWeight={600}
								textAlign={"center"}
							>
								Authenticated and Return Successfully
							</Typography>
							<Typography
								fontSize={"0.9rem"}
								fontWeight={400}
								textAlign={"center"}
							>
								Return is delayed by 20 days( Due date : Mar 07,
								2024). Do you want to take any action?
							</Typography>
							<Flex gap={2} mt={2}>
								<Button
									sx={{
										width: "10rem",
									}}
									variant={"contained"}
									onClick={() => {
										setReturnState("auth-success");
									}}
								>
									Yes
								</Button>
								<Button
									sx={{
										width: "10rem",
									}}
									variant={"outlined"}
									onClick={() => {
										setReturnState(null);
									}}
								>
									No
								</Button>
							</Flex>
						</Stack>
					</>
				)}
			</Popup>
		</Section>
	);
};

export default MediaCirculation;
