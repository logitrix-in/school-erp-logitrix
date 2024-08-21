import React, { useState } from "react";
import Section from "../../../Section";
import Flex from "../../../UiComponents/Flex";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Popup from "../../../UiComponents/Popup";

const RandomBarcode = () => {
	const [popupState, setpopupState] = useState("closed");
	return (
		<Section title={"Random Barcode Generator"}>
			<Flex gap={2}>
				<TextField
					label={"Enter no of Barcodes to be generated"}
					sx={{ width: "30rem" }}
					size="small"
				/>
				<Button
					variant="contained"
					onClick={() => setpopupState("generating")}
				>
					Generate
				</Button>
			</Flex>
			<Flex mt={3}>
				<Button variant="contained" disabled>
					Download
				</Button>
				<Button variant="contained" disabled>
					Print
				</Button>
			</Flex>

			<Popup
				title="Barcode"
				open={popupState != "closed"}
				close={() => {
					setpopupState("abort-confirmation");
				}}
				maxWidth="sm"
			>
				{popupState == "generating" && (
					<Flex height={"8rem"} justifyContent={"center"}>
						<Typography>Generating Barcode...</Typography>
					</Flex>
				)}

				{popupState == "abort-confirmation" && (
					<Stack
						height={"8rem"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={2}
					>
						<Typography>
							Are you sure you want to abort Barcode generation
						</Typography>
						<Flex>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => setpopupState("closed")}
							>
								Yes
							</Button>
							<Button
								variant="contained"
								onClick={() => setpopupState("generating")}
							>
								No
							</Button>
						</Flex>
					</Stack>
				)}
			</Popup>
		</Section>
	);
};

export default RandomBarcode;
