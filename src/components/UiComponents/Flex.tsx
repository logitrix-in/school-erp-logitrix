import { Box, BoxProps } from "@mui/material";
import React, { ReactElement } from "react";

interface FlexProps extends BoxProps {
	children: ReactElement;
}

const Flex = ({ children, ...rest }: FlexProps) => {
	return (
		<Box display={"flex"} gap={1} alignItems={"center"} {...rest}>
			{children}
		</Box>
	);
};

export default Flex;
