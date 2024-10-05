import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  ListItemIcon,
  SxProps,
  FormHelperText,
} from "@mui/material";

interface ReignsSelectProps {
  items: string[];
  label: string;
  sx?: SxProps;
  onChange?: (selected: any) => void;
  multiple?: boolean;
  full?: boolean;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string;
  defaultVal?: string;
  defaultValues?: string[];
  required?: boolean;
  value?: string | string[];
}

const ReignsSelect: React.FC<ReignsSelectProps> = ({
  items = ["item 1", "item 2", "item 3"],
  label,
  sx = {},
  defaultVal,
  defaultValues = [],
  onChange = () => {},
  multiple = false,
  full = true,
  size = "medium",
  error = false,
  helperText,
  value,
  required,
  ...rest
}) => {
  const [selected, setSelected] = useState<string[]>(
    multiple ? (value as string[] || defaultValues) : [value as string || defaultVal || '']
  );

  useEffect(() => {
    if (multiple) {
      setSelected(value as string[] || defaultValues);
    } else {
      setSelected([value as string || defaultVal || '']);
    }
  }, [multiple, value, defaultValues, defaultVal]);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value as string[];
    if (multiple) {
      if (newValue[newValue.length - 1] === "all") {
        const updatedSelection = selected.length === items.length ? [] : items;
        setSelected(updatedSelection);
        onChange(updatedSelection);
      } else {
        setSelected(newValue);
        onChange(newValue);
      }
    } else {
      setSelected([newValue[0]]);
      onChange(newValue[0]);
    }
  };

  return (
    <FormControl fullWidth={full} size={size} sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...rest}
        multiple={multiple}
        value={multiple ? selected : selected[0]}
        onChange={handleChange}
        input={<OutlinedInput required={required} label={label} />}
        renderValue={(selected) => 
          multiple
            ? (selected as string[]).length === items.length
              ? "All"
              : (selected as string[]).join(", ")
            : selected as string
        }
      >
        {multiple && (
          <MenuItem value="all">
            <ListItemIcon>
              <Checkbox
                checked={items.length > 0 && selected.length === items.length}
                indeterminate={selected.length > 0 && selected.length < items.length}
              />
            </ListItemIcon>
            <ListItemText primary="Select All" />
          </MenuItem>
        )}
        {items.map((name) => (
          <MenuItem key={name} value={name}>
            {multiple && <Checkbox size="small" checked={selected.indexOf(name) > -1} />}
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default ReignsSelect;