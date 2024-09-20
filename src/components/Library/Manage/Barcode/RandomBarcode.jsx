import React, { useState } from "react";
import Section from "../../../Section";
import Flex from "../../../UiComponents/Flex";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Barcode from 'react-barcode';
import Popup from "../../../UiComponents/Popup";
import api from "../../../../config/api";

const RandomBarcode = () => {
	const [numberOfBarcodes, setNumberOfBarcodes] = useState('');
	const [mediaIds, setMediaIds] = useState([]);
	const [generateBarcodePopup, setGenerateBarcodePopup] = useState(false);

	async function getBarcodes() {
		try {
			const response = await api.get(`/library/generate-media-id/?num_ids=${numberOfBarcodes}`);

			if (response.status == 200) {
				setMediaIds(response.data.media_ids);
				setGenerateBarcodePopup(true);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Section title={"Random Barcode Generator"}>
			<Flex gap={2}>
				<TextField
					label={"Enter no of Barcodes to be generated"}
					sx={{ width: "30rem" }}
					size="small"
					value={numberOfBarcodes}
					onChange={(e) => setNumberOfBarcodes(e.target.value)}
				/>
				<Button
					variant="contained"
					onClick={() => getBarcodes()}
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
				open={generateBarcodePopup}
				close={() => {
					setGenerateBarcodePopup(false);
				}}
				maxWidth="md"
			>
				<BarcodeGenerator mediaIds={mediaIds} />
			</Popup>
		</Section>
	);
};

const BarcodeGenerator = ({ mediaIds }) => {
	return (
		<div style={{ width: '210mm', minHeight: '297mm', margin: 'auto', backgroundColor: 'white', padding: '1rem' }}>
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
				{mediaIds.map((code, index) => (
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

export default RandomBarcode;
