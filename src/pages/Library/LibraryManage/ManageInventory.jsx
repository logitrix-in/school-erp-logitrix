import React from "react";
import MediaEntry from "../../../components/Library/Manage/Inventory/MediaEntry";
import PhaseOut from "../../../components/Library/Manage/Inventory/PhaseOut";
import { Box, Tab, Tabs } from "@mui/material";

const ManageInventory = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Tabs sx={{ mb: 2 }} value={value} onChange={handleChange}>
				<Tab label="Media Entry" />
				<Tab label="Phase Out / Edit Media" />
			</Tabs>

			{value == 0 && <MediaEntry />}
			{value == 1 && <PhaseOut />}
		</Box>
	);
};

export default ManageInventory;
