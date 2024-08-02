import React, { useState } from "react";
import Section from "../../components/Section";
import { Box } from "@mui/material";
import Navigtor from "../../components/Library/Manage/Components/Navigtor";
import ManageInventory from "./LibraryManage/ManageInventory";
import ManageCirculation from "./LibraryManage/ManageCirculation";
import ManageLibrarayCard from "./LibraryManage/ManageLibrarayCard";
import ManageBarcode from "./LibraryManage/ManageBarcode";

const navs = [
	{
		name: "Inventory",
	},
	{
		name: "Circulation",
	},
	{
		name: "Library Card",
	},
	{
		name: "Barcode",
	},
];

const LibraryManage = () => {
	const [active, setActive] = useState(0);

	return (
		<>
			<Navigtor navs={navs} onChange={setActive} />
			<Box mb={2} />
			{active == 0 && <ManageInventory />}
			{active == 1 && <ManageCirculation />}
			{active == 2 && <ManageLibrarayCard />}
			{active == 3 && <ManageBarcode />}
		</>
	);
};

export default LibraryManage;
