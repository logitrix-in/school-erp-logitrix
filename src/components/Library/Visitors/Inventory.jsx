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
	AppBar,
	Autocomplete,
	Dialog,
	InputAdornment,
	TextField,
	Toolbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import Section from "../../Section";
import { Icon } from "@iconify/react";
import Flex from "../../UiComponents/Flex";
import Popup from "@/components/UiComponents/Popup";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { DateField, DatePicker } from "@mui/x-date-pickers";

const columns = [
	{
		field: "id",
		headerName: "LibraryCard",
		width: 150,
	},
	{
		field: "studentID",
		headerName: "Student ID",
		flex: 1,
	},
	{
		field: "studentName",
		headerName: "Student Name",
		flex: 1,
	},
	{
		field: "class",
		headerName: "Class",
		flex: 1,
	},
	{
		field: "section",
		headerName: "Section",
		flex: 1,
	},
	{
		field: "roll",
		headerName: "Roll#",
		flex: 1,
	},
	{
		field: "mediaID",
		headerName: "Media ID",
		flex: 1,
	},
	{
		field: "mediaName",
		headerName: "Media Name",
		flex: 1,
	},
	{
		field: "timeOfIssue",
		headerName: "Time of Issue",
		flex: 1,
	},
];

const issue_columns = [
	{ field: "id", headerName: "Media ID", flex: 1 },
	{ field: "mediaType", headerName: "Media Type", flex: 1 },
	{ field: "studentName", headerName: "Media Name", flex: 1 },
	{ field: "author", headerName: "Author", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "Notes", flex: 3 },
];
const rows = [];
const names = [];

const Inventory = () => {
	const { days } = useClasses();
	const [returnState, setReturnState] = useState(false);
	const [issueState, setIssueState] = useState(false);
	const [renewOpen, setRenewOpen] = useState(false);

	useEffect(() => {
		if (issueState == "scan") {
			setTimeout(() => {
				setIssueState("open");
			}, 1000);
		}
	}, [issueState]);

	return (
		<Section title={"Issue Media (Visitors)"}>
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
						columnGroupingModel={[
							{
								groupId: "Current Borrowing (Same Day)",
								headerName: 'Current Borrowing (Same Day)',
								headerAlign: 'center',
								children: [
									{ field: "mediaName" },
									{ field: "mediaID" },
									{ field: "timeOfIssue" },
								],
							},
						]}
						experimentalFeatures={{
							columnGrouping: true,
						}}
					// disableRowSelectionOnClick
					/>
				</Box>

				<Flex justifyContent={"flex-end"}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setIssueState("scan")}
					>
						Issue
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setReturnState("scan-auto")}
					>
						Return
					</Button>
				</Flex>
			</Stack>

			{/* issue popup */}
			<Popup
				title={"Scan"}
				maxWidth="sm"
				open={issueState == "scan"}
				close={() => { }}
			>
				<Stack alignItems={"center"} gap={1} p={2}>
					<Icon icon="bx:qr-scan" fontSize="3rem" />
					<Typography>Scan media ID to proceed...</Typography>
				</Stack>
			</Popup>

			<Popup
				open={returnState}
				title={"Authenticate"}
				maxWidth="sm"
				close={() => setReturnState(null)}
			>
				{returnState == "scan-auto" && (
					<>
						<Flex justifyContent={"center"}>
							<Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'auto'}>
								<Stack alignItems={"center"} gap={1} p={2}>
									<Icon icon="bx:qr-scan" fontSize="8rem" />
									<Typography>Scan media ID to Authenticate...</Typography>
								</Stack>

								<Box my={2} display="flex" alignItems="center" width="100%">
									<Divider sx={{ flex: 1 }} />
									<Typography
										variant="body2"
										color="text.secondary"
										mx={2}
										sx={{
											display: 'flex',
											alignItems: 'center',
											'&::before, &::after': {
												content: '""',
												flex: '1',
												borderBottom: '1px solid',
												borderColor: 'text.secondary',
												marginX: 1,
											},
										}}
									>
										OR
									</Typography>
									<Divider sx={{ flex: 1 }} />
								</Box>

								<Button
									variant="outlined"
									onClick={() => setReturnState("scan-manual")}
								>
									Manual Entry
								</Button>
							</Box>
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

						<Box my={2} display="flex" alignItems="center" width="100%">
							<Divider sx={{ flex: 1 }} />
							<Typography
								variant="body2"
								color="text.secondary"
								mx={2}
								sx={{
									display: 'flex',
									alignItems: 'center',
									'&::before, &::after': {
										content: '""',
										flex: '1',
										borderBottom: '1px solid',
										borderColor: 'text.secondary',
										marginX: 1,
									},
								}}
							>
								OR
							</Typography>
							<Divider sx={{ flex: 1 }} />
						</Box>

						<Stack alignItems={"center"} gap={1} p={2}>
							<Icon icon="bx:qr-scan" fontSize="8rem" />
							<Typography>Scan media ID to Authenticate...</Typography>
						</Stack>
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
								Authenticated and Returned Successfully
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
								className=""
							/>
							<Typography
								fontSize={"1.1rem"}
								fontWeight={600}
								textAlign={"center"}
							>
								Authenticated and Returned Successfully
							</Typography>
							<Typography
								fontSize={"0.9rem"}
								fontWeight={400}
								textAlign={"center"}
							>
								Return is delayed by 20 days( Due date : Mar 07,
								2024).
							</Typography>
							<Typography
								fontSize={"0.9rem"}
								fontWeight={400}
								textAlign={"center"}
							>
								Do you want to take any action?
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

			<IssuePage issueState={issueState} setIssueState={setIssueState} />
			<Renew setRenewOpen={setRenewOpen} renewOpen={renewOpen} />
		</Section>
	);
};

const Renew = ({ setRenewOpen, renewOpen }) => {
	return (
		<Popup
			close={() => setRenewOpen(false)}
			title={"Renew - Confirmation"}
			open={renewOpen}
			maxWidth={"sm"}
		>
			<Stack p={3} gap={2} alignItems={"center"}>
				<TextField
					multiline
					label={"Note"}
					fullWidth
					minRows={4}
					placeholder="Use this field to record issues specific to the media (Example wear and tear, spot marks, missing pages etc.)"
				></TextField>

				<Flex>
					<Typography>Return Date: </Typography>
					<DatePicker />
				</Flex>

				<Typography fontWeight={700} mt={2} fontSize={"1.1rem"}>
					Are you sure you want to proceed?
				</Typography>
				<Flex gap={2}>
					<Button variant="contained" sx={{ width: "8rem" }}>
						Yes
					</Button>
					<Button
						variant="outlined"
						sx={{ width: "8rem" }}
						onClick={() => setNewIssueOpen(false)}
					>
						No
					</Button>
				</Flex>
			</Stack>
		</Popup>
	);
};

const IssuePage = ({ issueState, setIssueState }) => {
	const [newIssueOpen, setNewIssueOpen] = useState(false);
	return (
		<Dialog fullScreen open={issueState == "open"}>
			<AppBar position="static">
				<Toolbar>
					<Typography flex={1} fontSize={"1.2rem"}>
						Manage Issue
					</Typography>
					<Button
						color="inherit"
						onClick={() => setIssueState("close")}
					>
						close
					</Button>
				</Toolbar>
			</AppBar>
			<Box p={3}>
				<Section title={"New Issue"}>
					<Flex mb={2}>
						<TextField
							size="small"
							placeholder="Media ID"
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
					</Flex>

					<DataGrid columns={issue_columns} rows={[]} autoHeight />
					<Typography textAlign={"right"} mt={2}>
						Copies Available: 12/100
					</Typography>
					<Flex justifyContent={"flex-end"} mt={3}>
						<Button
							variant="contained"
							onClick={() => setNewIssueOpen(true)}
						>
							Issue Media
						</Button>
					</Flex>
				</Section>
			</Box>

			<Popup
				close={() => setNewIssueOpen(false)}
				title={"New Issue - Confirmation"}
				open={newIssueOpen}
				maxWidth={"sm"}
			>
				<Stack p={3} gap={2} alignItems={"center"}>
					<TextField
						multiline
						label={"Note"}
						fullWidth
						minRows={4}
						placeholder="Use this field to record issues specific to the media (Example wear and tear, spot marks, missing pages etc.)"
					></TextField>

					<Flex>
						<Typography>Return Date: </Typography>
						<DatePicker />
					</Flex>

					<Typography fontWeight={700} mt={2} fontSize={"1.1rem"}>
						Are you sure you want to proceed?
					</Typography>
					<Flex gap={2}>
						<Button variant="contained" sx={{ width: "8rem" }}>
							Yes
						</Button>
						<Button
							variant="outlined"
							sx={{ width: "8rem" }}
							onClick={() => setNewIssueOpen(false)}
						>
							No
						</Button>
					</Flex>
				</Stack>
			</Popup>
		</Dialog>
	);
};

export default Inventory;
