import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { Stack } from "@mui/system";
import { Icon } from "@iconify/react";
import api from '../../../config/api'
import { toast } from 'react-toastify'

const Catelogue = () => {
	const [catalogueDetails, setCatalogueDetails] = useState({ books: 0, periodicals: 0, research_papers: 0 })

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await api.get('/library/catalogue-count/');
				console.log(response.data)

				setCatalogueDetails(response.data)
			} catch (error) {
				console.log(error);
				toast.error('Error fetching data')
			}
		}

		fetchData();
	}, []);

	return (
		<>
			<Bbox borderRadius={2} overflow={"hidden"}>
				<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
					<Typography fontWeight={"700"} fontSize={"1.1rem"}>
						Catalogue
					</Typography>
				</Box>

				<Divider />
				<Box p={2}>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Card
							title={"Books"}
							val={catalogueDetails.books}
							bgColor={"#FAD2C0"}
							col={"#FFA57C"}
							img={"emojione:books"}
							tcol={"#B34A19"}
						/>
						<Card
							title={"Periodicals"}
							val={catalogueDetails.periodicals}
							bgColor={"#D5E9F3"}
							col={"#A2E0FE"}
							img={"fluent-emoji-flat:books"}
							tcol={"#3B98C4"}
						/>
						<Card
							title={"Research papers"}
							val={catalogueDetails.research_papers}
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
