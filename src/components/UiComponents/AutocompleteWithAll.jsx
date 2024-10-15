import React, { useEffect } from "react";
import {
	TextField,
	Autocomplete,
	Box,
	Paper,
	Checkbox,
	FormControlLabel,
	Divider,
} from "@mui/material";

export const AutocompleteWithAll = ({
	title,
	items,
	onChange = () => { },
	value,
	limitTags,
}) => {
	const allOptions = [...(items ?? [])];
	const selectAll = value.length === allOptions.length;

	const handleToggleSelectAll = () => {
		onChange(selectAll ? [] : [...allOptions]);
	};

	return (
		<Autocomplete
			multiple
			options={allOptions}
			disableCloseOnSelect
			limitTags={limitTags}
			freeSolo={false}
			value={value}
			onChange={(_e, newValue, reason) => {
				if (reason === "selectOption" && newValue.length === allOptions.length) {
					onChange([...allOptions]);
				} else {
					onChange(newValue);
				}
			}}
			renderTags={(val, props, state) => {
				return val.length === allOptions.length
					? "All"
					: val.length > limitTags
						? val.slice(0, limitTags).join(", ") +
						` +${val.length - limitTags}`
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