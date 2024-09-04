import { useEffect, useState } from "react";
import Section from "../../../Section";
import {
	AppBar,
	Button,
	Dialog,
	TextField,
	Toolbar,
	Divider,
	IconButton,
	Autocomplete,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Flex from "../../../UiComponents/Flex";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "../../../UiComponents/Popup";
import { Box, Stack } from "@mui/system";
import { Icon } from "@iconify/react";
import { DatePicker } from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";

const columns = [
	{ field: "id", headerName: "Library Card #", flex: 1 },
	{ field: "mediaType", headerName: "Student Id", flex: 1 },
	{ field: "studentName", headerName: "Student Name", flex: 2 },
	{ field: "author", headerName: "Class", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "media IISN / ISBN / ID", flex: 2 },
	{ field: "mediaName", headerName: "media Name", flex: 1 },
	{ field: "dueDate", headerName: "Due Date", flex: 1 },
	{ field: "penalty", headerName: "Penalty Due", flex: 1 },
];

const issue_columns = [
	{ field: "id", headerName: "Media ID", flex: 1 },
	{ field: "mediaType", headerName: "Media Type", flex: 1 },
	{ field: "studentName", headerName: "Media Name", flex: 1 },
	{ field: "author", headerName: "Author", flex: 1 },
	{ field: "note", headerName: "Section", flex: 1 },
	{ field: "mediaId", headerName: "Notes", flex: 3 },
];

const names = [];

const MediaCirculation = () => {
	const [returnState, setReturnState] = useState(false);
	const [issueState, setIssueState] = useState(false);
	const [renewOpen, setRenewOpen] = useState(false);
	const [showRule, setShowRule] = useState(false);

	useEffect(() => {
		if (issueState == "scan") {
			setTimeout(() => {
				setIssueState("open");
			}, 1000);
		}
	}, [issueState]);

	return (
		<Section title={"Media Circulation - Scan / Manual"}>
			<Flex mb={2} justifyContent={'space-between'}>
				<Autocomplete
					options={names}
					filterSelectedOptions
					freeSolo={false}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Enter Library Card #"
							placeholder="Library Card #"
						/>
					)}
					sx={{ width: "30%" }}
				/>

				<Button variant="contained" onClick={() => setShowRule(true)}>Set Rule</Button>
			</Flex>

			<DataGrid
				experimentalFeatures={{
					columnGrouping: true,
				}}
				columnGroupingModel={[
					{
						groupId: "media",
						headerName: 'Media',
						headerAlign: 'center',
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
				<Button
					variant="contained"
					onClick={() => setIssueState("scan")}
				>
					New Issue
				</Button>
				<Button variant="outlined" onClick={() => setRenewOpen(true)}>
					Renew
				</Button>
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
								height={34} className=""
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

			<IssuePage issueState={issueState} setIssueState={setIssueState} />
			<Renew setRenewOpen={setRenewOpen} renewOpen={renewOpen} />
			<SetRule open={showRule} close={() => setShowRule(false)} />
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
					<Typography>Revised Return Date: </Typography>
					<DatePicker />
				</Flex>

				<Typography fontWeight={700} mt={2} fontSize={"1.1rem"}>
					Are you sure you want to proceed?
				</Typography>
				<Flex gap={2}>
					<Button variant="contained" sx={{ width: "8rem" }}
						onClick={() => setRenewOpen(false)}
					>
						Yes
					</Button>
					<Button
						variant="outlined"
						sx={{ width: "8rem" }}
						onClick={() => setRenewOpen(false)}
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
					<IconButton
						edge="start"
						color="inherit"
						aria-label="close"
						onClick={() => setIssueState("close")}
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box p={3}>
				<Section title={"New Issue"}>
					<Flex mb={2}>
						<Autocomplete
							options={names}
							filterSelectedOptions
							freeSolo={false}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Media ID"
									placeholder="Media ID"
									size="small"
									variant="outlined"
								/>
							)}
							sx={{ width: "30%" }}
						/>

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
						<Button variant="contained" sx={{ width: "8rem" }}
							onClick={() => setNewIssueOpen(false)}
						>
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

const SetRule = ({ open, close }) => {

	return (
		<Dialog
			fullWidth={false}
			PaperProps={{
				sx: {
					maxHeight: "90%",
					width: "50%",
				},
			}}
			maxWidth="lg"
			open={open}
			onClose={() => close()}
			disableEnforceFocus={true}
		>
			<Box overflow={"hidden"}>
				<Box
					p={1}
					py={1}
					bgcolor={"primary.main"}
					color={"white"}
					display={"flex"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Box />
					<Typography fontSize={"1.1rem"} textAlign={"center"}>
						Set Rule
					</Typography>
					<IconButton
						edge="start"
						color="inherit"
						onClick={close}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto" alignItems="center">


					<Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} sx={{ width: "100%" }}>
						<Typography fontWeight={"medium"} fullWidth textAlign={"left"} marginY={1} marginRight={4}>Enter the media circulation period</Typography>

						<TextField
							label="No. of days"
							placeholder="No. of days"
							// value={comments}
							// onChange={(e) => setComments(e.target.value)}
							variant="outlined"
							sx={{ flexGrow: 1 }}
						/>
					</Box>

					<Box marginY={1} width={"100%"} display="flex" gap={2}>
						<Button variant="contained" color="primary" fullWidth onClick={() => {
							toast.success("Updated Successfully");
							close();
						}}>Submit</Button>
					</Box>
				</Box>
			</Box>
		</Dialog >
	);
};

export default MediaCirculation;
