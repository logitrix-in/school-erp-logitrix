import { FC, useState } from "react";

import {
	TextField,
	Autocomplete,
	Box,
	Paper,
	Checkbox,
	FormControlLabel,
	Divider,
	Chip,
} from "@mui/material";

const allOptions = ["foo", "bar", "var", "let"];

export const AutocompleteWithAll = () => {
	const [columns, setColumns] = useState([]);
	const [selectAll, setSelectAll] = useState(false);

	const handleToggleSelectAll = () => {
		setSelectAll((prev) => {
			if (!prev) setColumns([...allOptions]);
			else setColumns([]);
			return !prev;
		});
	};

	return (
		<Autocomplete
			multiple
			options={allOptions}
			disableCloseOnSelect
			// filterSelectedOptions
			freeSolo={false}
			value={columns}
			onChange={(_e, value, reason) => {
				if (reason === "clear" || reason === "removeOption")
					setSelectAll(false);
				if (
					reason === "selectOption" &&
					value.length === allOptions.length
				)
					setSelectAll(true);
				setColumns(value);
			}}
			renderTags={(val, props, state) => {
				console.log(state);
				return val.length == allOptions.length ? "All" : val.join(", ");
			}}
			renderInput={(params) => (
				<TextField {...params} label={"Click me!"} />
			)}
			PaperComponent={(paperProps) => {
				const { children, ...restPaperProps } = paperProps;
				return (
					<Paper {...restPaperProps}>
						<Box
							onMouseDown={(e) => e.preventDefault()} // prevent blur
							pl={1.5}
							py={0.5}
						>
							<FormControlLabel
								onClick={(e) => {
									e.preventDefault(); // prevent blur
									handleToggleSelectAll();
								}}
								label="Select all"
								control={
									<Checkbox
										id="select-all-checkbox"
										checked={selectAll}
									/>
								}
							/>
						</Box>
						<Divider />
						{children}
					</Paper>
				);
			}}
		/>
	);
};

export default AutocompleteWithAll;
