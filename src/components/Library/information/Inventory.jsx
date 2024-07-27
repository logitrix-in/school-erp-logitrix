import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import Chart from "react-apexcharts";
import { Stack } from "@mui/system";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";

const Inventory = () => {
	const { days } = useClasses();
	const series = [
		{
			name: "Books In Circulation",
			data: [430, 320, 580, 450, 690, 1100, 1200],
			type: "column",
		},
		{
			name: "Periodicals In Circulation",
			data: [130, 350, 380, 250, 590, 100, 400],
			type: "column",
		},
		{
			name: "Research papers In Circulation",
			data: [130, 350, 380, 250, 590, 100, 400],
			type: "column",
		},
		{
			name: "Media Inventory",
			data: [1010, 970, 1050, 950, 810, 940, 1050],
			type: "line",
		},
	];	

	const options = {
		chart: {
			height: 250,
			type: "line",
			stacked: true,
			toolbar: false,
		},
		legend: {
			show: true,
			position: "top",
			horizontalAlign: "right",
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: "40px",
				borderRadius: 8,
			},
		},
		dataLabels: {
			enabled: false,
		},

		stroke: {
			width: [0, 0, 0, 2],
			colors: ["transparent", "transparent", "transparent", "#1D55E5"],
		},
		xaxis: {
			categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
		},
		yaxis: {
			// title: {
			// text: "($ thousands)",
			// },
		},
		fill: {
			opacity: 1,
		},
		colors: ["#EC7C30", "#F8A46B", "#D2CBC6", "#1D55E5"],
		tooltip: {
			y: {
				formatter: function (val) {
					return "$ " + val + " thousands";
				},
			},
		},
	};

	return (
		<Bbox borderRadius={2} overflow={"hidden"}>
			<Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
				<Typography fontWeight={"700"} fontSize={"1.1rem"}>
					Inventory Utilization - Media in Circulation Vs
					Media Inventorys
				</Typography>
			</Box>

			<Divider />
			<Box p={2}>
				<Stack flex={1}>
					<Box p={2} gap={2} display={"flex"}>
						<ReignsSelect
							items={["Books", "Periodicals", "Research Papers"]}
							label="Media Type"
							sx={{ width: "17rem" }}
							multiple
						/>
						<ReignsSelect
							items={[
								"Last 7 Days",
								"Last 15 Days",
								"Last 1 Month",
								"Last 6 month",
								"Last 1 Year",
							]}
							label="Time Frame"
							sx={{ width: "17rem" }}
						/>
					</Box>
					<Chart
						options={options}
						series={series}
						type="bar"
						height={350}
					/>
				</Stack>
			</Box>
		</Bbox>
	);
};

export default Inventory;
