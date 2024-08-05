import React, { useState } from "react";
import { Box, Button, Chip, IconButton, Stack } from "@mui/material";
import Flex from "../../../UiComponents/Flex";
import ReactFlipCard from "reactjs-flip-card";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import RightIcon from "@mui/icons-material/ChevronRight";

import LibraryCard1Front from "@/assets/cards/LibraryCard.png";
import LibraryCard1Back from "@/assets/cards/LibraryCardBack.png";

const formats = [
	{
		id: 1,
		front: LibraryCard1Front,
		back: LibraryCard1Back,
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
							aspectRatio: "406/641",
							cursor: "pointer",
							transition: "all 0.1s",
							boxShadow: selected == idx && "0 0 15px -5px #000",
							transform: selected == idx && "scale(1.1)",
							"&:hover": {
								transform: selected != idx && "scale(1.05)",
							},
						}}
						onClick={() => setSelected(idx)}
					>
						<img
							src={img.front}
							alt={`img-${img.id}`}
							style={{ objectFit: "cover" }}
						/>
					</Box>
				))}
			</Flex>

			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				mt={2}
				gap={2}
			>
				<Flex width={"30rem"} gap={8}>
					<Flex flex={1} justifyContent={"flex-end"}>
						{selected != 0 && (
							<IconButton
								onClick={() => setSelected((p) => p - 1)}
							>
								<LeftIcon />
							</IconButton>
						)}
					</Flex>
					<ReactFlipCard
						flipTrigger="onClick"
						flipCardStyle={{
							boxShadow: "0 0 15px -3px #00000068",
						}}
						containerStyle={{
							height: "24rem",
							width: "15.2rem",
						}}
						frontComponent={
							<img
								src={formats[selected].front}
								alt="selected-img"
							/>
						}
						backComponent={
							<img
								src={formats[selected].back}
								alt="selected-img"
							/>
						}
					/>
					<Box flex={1}>
						{selected < formats.length - 1 && (
							<IconButton
								onClick={() => setSelected((p) => p + 1)}
							>
								<RightIcon />
							</IconButton>
						)}
					</Box>
				</Flex>
				<Flex width={"fit-content"}>
					{formats.map((f, i) => (
						<Box
							height={8}
							key={i}
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
			<Flex justifyContent={"center"} mt={2}>
				<Button variant="contained" sx={{ width: "10rem" }}>
					Apply
				</Button>
			</Flex>
		</Box>
	);
};

export default LibraryDesign;
