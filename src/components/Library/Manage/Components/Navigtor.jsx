import React, { useEffect, useState } from "react";
import {
	Box,
	FormControl,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";
import Flex from "../../../UiComponents/Flex";

const Navigtor = ({ onChange, navs }) => {
	const [selectedNav, setSelectedNav] = useState(0);

	useEffect(() => {
		onChange(selectedNav);
	}, [selectedNav]);

	return (
		<>
			<Flex>
				<Box
					display={"flex"}
					p={"0.5rem"}
					borderRadius={1}
					bgcolor={"primary.light"}
					width={"fit-content"}
					position={"relative"}
					gap={"0.5rem"}
				>
					{navs.map((n, i) => (
						<Box
							key={i}
							zIndex={2}
							width={"7rem"}
							textAlign={"center"}
							sx={{
								cursor: "pointer",
								":hover": {
									fontWeight: 600,
								},
							}}
							p={1}
							fontWeight={500}
							onClick={() => {
								setSelectedNav(i);
							}}
						>
							{n.name}
						</Box>
					))}
					<Box
						bgcolor={"white"}
						borderRadius={1}
						sx={{
							transition: "0.2s ease-out",
							boxShadow: "0 0 10px -3px #0000002a",
						}}
						left={`${selectedNav * 7.5 + 0.5}rem`}
						height={"70%"}
						position={"absolute"}
						width={"7rem"}
					></Box>
				</Box>

				{selectedNav == 1 && (
					<Box ml={"auto"}>
						<FormControlLabel
							control={<Switch />}
							label="Enable Barcode Scan"
						/>
					</Box>
				)}
			</Flex>
		</>
	);
};

export default Navigtor;
