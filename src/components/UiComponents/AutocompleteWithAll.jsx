import { FC, useEffect, useState } from "react";

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

export const AutocompleteWithAll = ({
	title,
	items,
	onChange = () => {},
	value,
	limitTags,
}) => {
	const [columns, setColumns] = useState([...(value ?? [])]);
	const [selectAll, setSelectAll] = useState(false);

	const handleToggleSelectAll = () => {
		setSelectAll((prev) => {
			if (!prev) setColumns([...allOptions]);
			else setColumns([]);
			return !prev;
		});
	};
	const allOptions = [...(items ?? [])];

	useEffect(() => {
		onChange(columns);
	}, [columns, selectAll]);

	return (
		<Autocomplete
			multiple
			options={allOptions}
			disableCloseOnSelect
			limitTags={limitTags}
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
				return val.length == allOptions.length
					? "All"
					: columns.length > limitTags
					? val.slice(0, limitTags).join(", ") +
					  ` +${columns.length - limitTags}`
					: val.join(", ");
			}}
			renderInput={(params) => <TextField {...params} label={title} />}
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
