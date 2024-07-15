import React from "react";
import Bbox from "../../components/UiComponents/Bbox";
import { Box } from "@mui/material";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Dashboard from "../../components/Library/information/Dashboard";
import Inventory from "../../components/Library/information/Inventory";
import QuickSearch from "../../components/Library/information/QuickSearch";
const LibraryInformation = () => {
	return (
		<Box display={'flex'} flexDirection={'column'} gap={2}>
			<Dashboard />
            <Inventory />
            <QuickSearch />
		</Box>
	);
};

export default LibraryInformation;
