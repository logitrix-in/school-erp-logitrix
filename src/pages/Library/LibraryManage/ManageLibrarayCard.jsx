import React from "react";
import MediaEntry from "../../../components/Library/Manage/Inventory/MediaEntry";
import PhaseOut from "../../../components/Library/Manage/Inventory/PhaseOut";
import { Box, Tab, Tabs } from "@mui/material";
import Section from "../../../components/Section";
import LibraryIndividual from "../../../components/Library/Manage/LibrarCard/LibraryIndividual";
import LibraryBulk from "../../../components/Library/Manage/LibrarCard/LibraryBulk";
import LibraryDesign from "../../../components/Library/Manage/LibrarCard/LibraryDesign";
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
				{value == 0 && <LibraryIndividual />}
				{value == 1 && <LibraryBulk />}
				{value == 2 && <LibraryDesign />}
			</Section>
		</Box>
	);
};

export default ManageLibrarayCard;
