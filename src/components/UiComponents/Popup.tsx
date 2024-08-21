import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Dialog,
	DialogProps,
	IconButton,
	Typography,
} from "@mui/material";

interface Props extends DialogProps {
	close: () => void;
}

const Popup = ({ open, children, close, title, ...rest }: Props) => {
	return (
		<Dialog
			fullWidth
			PaperProps={{
				sx: {
					maxHeight: "100%",
				},
			}}
			maxWidth="md"
			open={open}
			onClose={() => close()}
			disableEnforceFocus={true}
			{...rest}
		>
			<Box overflow={"hidden"}>
				<Box
					p={1}
					py={1}
					bgcolor={"primary.main"}
					color={"white"}
					display={"flex"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Box />
					<Typography fontSize={"1.1rem"} textAlign={"center"}>
						{title}
					</Typography>
					<IconButton
						edge="start"
						color="inherit"
						onClick={close}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box p={2}>{children}</Box>
			</Box>
		</Dialog>
	);
};

export default Popup;
