import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  OutlinedInput,
  ListItemIcon,
  SxProps,
  FormHelperText,
} from "@mui/material";
import { error, val } from "jodit/types/core/helpers";

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
  defaultVal: string;
  defaultValues: string[];
  required?: boolean;
  value?: string;
}

const ReignsSelect: React.FC<ReignsSelectProps> = ({
  items = ["item 1", "item 2", "item 3"],
  label,
  sx = {},
  defaultVal,
  defaultValues = items,
  onChange = () => {},
  multiple,
  full = true,
  size = "medium",
  error = false,
  helperText,
  value: v,
  required,
  ...rest
}) => {
  // handle multiselect
  const [selected, setSelected] = useState<string[]>(
    [defaultVal] || defaultValues
  );

  useEffect(() => {
    if (multiple) {
      setSelected(defaultValues);
    } else {
      setSelected([defaultVal]);
    }
  }, [multiple, defaultValues]);

  const handleMultiChange = (e: ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string[];
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === items.length ? [] : items);
    } else {
      setSelected(value);
    }
    onChange(value);
  };

  //   handle single select
  const [value, setValue] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  useEffect(() => {
    multiple ? onChange(selected) : onChange(value);
  }, [selected, value]);

  return multiple ? (
    <FormControl fullWidth={full} size={size} sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...rest}
        multiple
        value={selected}
        onChange={handleMultiChange}
        input={<OutlinedInput required={required} label={label} />}
        renderValue={(selected) =>
          selected.length == items.length ? "All" : selected.join(", ")
        }
      >
        <MenuItem value="all">
          <ListItemIcon>
            <Checkbox
              checked={items.length > 0 && selected.length === items.length}
              indeterminate={
                selected.length > 0 && selected.length < items.length
              }
            />
          </ListItemIcon>
          <ListItemText primary="Select All" />
        </MenuItem>
        {items.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox size="small" checked={selected.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <FormControl required={required} size={size} sx={sx} fullWidth={full}>
      <InputLabel>{label}</InputLabel>
      <Select
        required={required}
        label={label}
        onChange={onChange}
        error={error}
        defaultValue={defaultVal}
        value={v}
        {...rest}
      >
        {items.map((name, idx) => (
          <MenuItem key={idx} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default ReignsSelect;
