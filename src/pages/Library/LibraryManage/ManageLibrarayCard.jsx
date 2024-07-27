import React from "react";
import MediaEntry from "../../../components/Library/Manage/Inventory/MediaEntry";
import PhaseOut from "../../../components/Library/Manage/Inventory/PhaseOut";
import { Box, Tab, Tabs } from "@mui/material";
import Section from "../../../components/Section";
const ManageLibrarayCard = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Section
				comp={
					<Tabs value={value} onChange={handleChange}>
						<Tab label="Individual" />
						<Tab label="Bulk" />
						<Tab label="Set Design" />
					</Tabs>
				}
			>
				asd
			</Section>
		</Box>
	);
};

export default ManageLibrarayCard;
