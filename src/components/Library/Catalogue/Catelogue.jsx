import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { Stack } from "@mui/system";
import { Icon } from "@iconify/react";

const Catelogue = () => {
	return (
		<>
			<Bbox borderRadius={2} overflow={"hidden"}>
				<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
					<Typography fontWeight={"700"} fontSize={"1.1rem"}>
						Catelogue
					</Typography>
				</Box>

				<Divider />
				<Box p={2}>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Card
							title={"Books"}
							val={1400}
							bgColor={"#FAD2C0"}
							col={"#FFA57C"}
							img={"emojione:books"}
							tcol={"#B34A19"}
						/>
						<Card
							title={"Periodicals"}
							val={2900}
							bgColor={"#D5E9F3"}
							col={"#A2E0FE"}
							img={"fluent-emoji-flat:books"}
							tcol={"#3B98C4"}
						/>
						<Card
							title={"Research papers"}
							val={200}
							bgColor={"#FAD2C0"}
							col={"#FFA57C"}
							img={"noto-v1:rolled-up-newspaper"}
							tcol={"#B34A19"}
						/>
					</Box>
				</Box>
			</Bbox>
		</>
	);
};

const Card = ({ img, col, bgColor, title, val, tcol }) => {
	return (
		<Box
			p={2}
			display={"flex"}
			alignItems={"center"}
			flex={1}
			gap={1}
			bgcolor={bgColor}
			borderRadius={1}
		>
			<Box p={1} height={"4rem"} bgcolor={col} sx={{ aspectRatio: 1 }}>
				<Icon icon={img} height={"100%"} />
			</Box>

			<Stack>
				<Typography fontSize={"1.2rem"} fontWeight={700}>
					{val}
				</Typography>
				<Typography color={tcol} fontWeight={500}>
					{title}
				</Typography>
			</Stack>
		</Box>
	);
};
export default Catelogue;
