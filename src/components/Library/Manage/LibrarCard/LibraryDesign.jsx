import React, { useState } from "react";
import { Box, Button, Chip, Stack } from "@mui/material";
import Flex from "../../../UiComponents/Flex";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import useClasses from "../../../../hooks/useClasses";
import { DataGrid } from "@mui/x-data-grid";

const formats = [
	{
		id: 1,
		img: "https://marketplace.canva.com/EAFsRMmBIMI/1/0/941w/canva-blue-modern-business-id-card-UHRf_NCyJ7c.jpg",
	},
	{
		id: 2,
		img: "https://marketplace.canva.com/EAFl_lEB6yk/1/0/941w/canva-black-and-red-modern-corporate-business-id-card-IDsI-atpEDI.jpg",
	},
	{
		id: 3,
		img: "https://marketplace.canva.com/EAFxbILw0pI/1/0/941w/canva-green-simple-medical-id-card-GkLGby9PwCs.jpg",
	},
];



const LibraryDesign = () => {
	const [selected, setSelected] = useState(0);
	return (
		<Box pb={5}>
			<Flex justifyContent={"flex-end"} gap={2}>
				{formats.map((img, idx) => (
					<Box
						key={idx}
						height={"5rem"}
						sx={{
							aspectRatio: "9/16",
							cursor: "pointer",
							transition: "all 0.1s",
							"&:hover": {
								transform: "scale(1.05)",
							},
						}}
						onClick={() => setSelected(idx)}
					>
						<img
							src={img.img}
							alt={`img-${img.id}`}
							style={{ objectFit: "cover" }}
						/>
					</Box>
				))}
			</Flex>

			<Stack alignItems={"center"} justifyContent={"center"} mt={2}>
				<Box height={"24rem"} sx={{ aspectRatio: "9/16" }}>
					<img
						src={formats[selected].img}
						style={{ objectFit: "cover" }}
						alt="selected-img"
					/>
				</Box>
				<Flex width={"fit-content"}>
					{formats.map((f, i) => (
						<Box
							height={8}
							width={8}
							bgcolor={selected == i ? "gray" : "divider"}
							borderRadius={"100%"}
							sx={{
								cursor: "pointer",
							}}
							onClick={() => setSelected(i)}
						/>
					))}
				</Flex>
			</Stack>
			<Flex justifyContent={"center"}>
				<Flex width={"30rem"} justifyContent={"flex-end"}>
					<Button variant="contained">Apply</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default LibraryDesign;
