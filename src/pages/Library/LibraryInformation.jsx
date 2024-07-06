import React from "react";
import Bbox from "../../components/UiComponents/Bbox";
import { Box } from "@mui/material";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Dashboard from "../../components/Library/Dashboard";
import Inventory from "../../components/Library/Inventory";
import QuickSearch from "../../components/Library/QuickSearch";
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
