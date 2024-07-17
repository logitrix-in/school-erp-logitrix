import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const Navigtor = ({ onChange, navs }) => {
	const [selectedNav, setSelectedNav] = useState(0);

	useEffect(() => {
		onChange(selectedNav);
	}, [selectedNav]);

	return (
		<>
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
						sx={{ cursor: "pointer", ":hover": {
                            fontWeight: 600
                        } }}
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
		</>
	);
};

export default Navigtor;
