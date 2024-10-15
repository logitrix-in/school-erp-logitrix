import Catelogue from "../../components/Library/Catalogue/Catelogue";
import Submit from "../../components/Library/Catalogue/Submit";
import { Box } from "@mui/system";

const LibraryCatalogue = () => {
	return (
		<Box display={"flex"} flexDirection={"column"} gap={2}>
			<Catelogue />
			<Submit />
		</Box>
	);
};

export default LibraryCatalogue;
