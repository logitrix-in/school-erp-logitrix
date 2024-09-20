import React, { useState } from "react";
import Section from "../../../Section";
import Flex from "../../../UiComponents/Flex";
import Popup from "../../../UiComponents/Popup";
import { Button, IconButton, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Icon } from "@iconify/react";
import Barcode from 'react-barcode';

const SpecificBarcode = () => {
	const [codes, setCodes] = useState([]);
	const [val, setVal] = useState("");
	const [generateBarcodePopup, setGenerateBarcodePopup] = useState(false);

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
			<Button variant="contained" onClick={() => setGenerateBarcodePopup(true)}>Generate</Button>
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
				open={generateBarcodePopup}
				close={() => {
					setGenerateBarcodePopup(false);
				}}
				maxWidth="md"
			>
				<BarcodeGenerator codes={codes} />
			</Popup>
		</Section>

	);
};

const BarcodeGenerator = ({ codes }) => {
	return (
		<div style={{ width: '210mm', minHeight: '297mm', margin: 'auto', backgroundColor: 'white', padding: '1rem' }}>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
				{codes.map((code, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '0.5rem',
							border: '1px solid #D1D5DB' // gray-300
						}}
					>
						<Barcode value={code} width={1.5} height={40} fontSize={12} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SpecificBarcode;
