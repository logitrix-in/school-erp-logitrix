import { Stack } from "@mui/material";
import React from "react";
import RandomBarcode from "../../../components/Library/Manage/Barcode/RandomBarcode";
import SpecificBarcode from "../../../components/Library/Manage/Barcode/SpecificBarcode";

const ManageBarcode = () => {
	return (
		<Stack gap={1}>
			<RandomBarcode />
			<SpecificBarcode />
		</Stack>
	);
};

export default ManageBarcode;
