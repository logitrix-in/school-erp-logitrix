import React, { useState } from "react";
import Section from "../../../Section";
import Flex from "../../../UiComponents/Flex";
import { Button, IconButton, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Icon } from "@iconify/react";

const SpecificBarcode = () => {
	const [codes, setCodes] = useState([]);
	const [val, setVal] = useState("");

	return (
		<Section title={"Specific Barcode Generator"}>
			<Flex gap={2}>
				<Stack>
					<TextField
						label={"Enter Media ID to generate Barcode"}
						sx={{ width: "30rem" }}
						onChange={(e) => setVal(e.target.value)}
						value={val}
						onKeyDown={(e) => {
							if (e.key == "Enter" && val.length > 0) {
								setCodes((prev) => [...prev, val]);
								setVal("");
							}
						}}
						size="small"
					/>
				</Stack>
				<Button
					variant="contained"
					onClick={() => {
						if (val.length > 0) {
							setCodes((prev) => [...prev, val]);
							setVal("");
						}
					}}
				>
					Enter
				</Button>
			</Flex>
			<Flex my={2} width={"30rem"} flexWrap={"wrap"}>
				{codes.map((c, i) => (
					<Box
						borderRadius={1}
						fontSize={"0.8rem"}
						key={i}
						p={1}
						py={0.7}
						bgcolor={"divider"}
					>
						<Flex>
							{c}
							<Icon
								style={{ cursor: "pointer" }}
								onClick={() =>
									setCodes((prev) =>
										prev.filter((p, idx) => idx != i)
									)
								}
								icon="iconamoon:close-bold"
							/>
						</Flex>
					</Box>
				))}
			</Flex>
			<Button variant="contained">Generate</Button>
			<Flex mt={3}>
				<Button variant="contained" disabled>
					Download
				</Button>
				<Button variant="contained" disabled>
					Print
				</Button>
			</Flex>
		</Section>
	);
};

export default SpecificBarcode;
