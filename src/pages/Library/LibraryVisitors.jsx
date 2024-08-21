import React from "react";
import Bbox from "../../components/UiComponents/Bbox";
import { Box } from "@mui/material";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Dashboard from "../../components/Library/Visitors/Dashboard";
import Inventory from "../../components/Library/Visitors/Inventory";
import QuickSearch from "../../components/Library/Visitors/QuickSearch";

const LibraryVisitors = () => {
	return (
		<Box display={"flex"} flexDirection={"column"} gap={2}>
			<RevealCard>
				<Dashboard />
			</RevealCard>
			<RevealCard>
				<Inventory />
			</RevealCard>
			<RevealCard>
				<QuickSearch />
			</RevealCard>
		</Box>
	);
};

export default LibraryVisitors;
