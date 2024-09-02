import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Divider,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Select,
    MenuItem,
    FormControl,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import Navigator from "../Navigator";
import { DatePicker } from "@mui/x-date-pickers";

export function IssueLetter({ close }) {
    const [value, setValue] = useState('');

    return (
        <>
            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Issuance of compensation letter  :</Typography>

            <FormControl fullWidth>
                <InputLabel>Stage</InputLabel>
                <Select
                    label="Stage"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                >
                    <MenuItem value={"manual"}>Manual</MenuItem>
                    <MenuItem value={"automatic"}>Automatic</MenuItem>
                </Select>
            </FormControl>

            {
                value === 'automatic' && (
                    <Box mt={4} fullWidth>
                        <DatePicker
                            label="Start the date for issuance"
                            format="DD MMM YYYY"
                            style={{ width: '100%' }}
                        />
                    </Box>
                )
            }

            <Box marginY={4} width={"100%"}>
                {
                    value === 'manual' ? (
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>
                            Send All
                        </Button>
                    ) : value === 'automatic' ? (
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>
                            Submit
                        </Button>
                    ) : <Button variant="contained" color="primary" fullWidth disabled>
                        Submit
                    </Button>
                }

            </Box>
        </>
    )
}