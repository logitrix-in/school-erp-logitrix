import React, { useState, useRef } from "react";
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
import axios from 'axios'
import { Editor } from "@tinymce/tinymce-react";

export function SetTemplate({ close }) {
    const editorRef = useRef(null);

    const formData = {
        schedule_after_days: 3,
        subject: "",
        content: "",
    };

    const [state, setState] = useState(formData);

    return (
        <Box border={"1px solid black"} borderRadius={1} p={2}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box />
                <Box display={'flex'} >
                    <FormControl sx={{ minWidth: '150px' }}>
                        <InputLabel shrink>CC</InputLabel>
                        <Select
                            size="small"
                            label="CC"
                        //   value={acYear}
                        //   onChange={(e) => setAcYear(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>A</MenuItem>
                            <MenuItem value={"2023-24"}>B</MenuItem>
                            <MenuItem value={"2024-25"}>C</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" sx={{ ml: '16px' }} fullWidth onClick={() => {
                        toast.success("Updated Successfully");
                        close();
                    }}>
                        Save
                    </Button>
                </Box>
            </Box>
            <TextField
                label="Subject"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                // onChange={handleChange}
                name="Subject"
                value={state.subject}
            />
            <Box mt={2}>
                <Editor
                    apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="Welcome!"
                    onChange={() => {
                        setState((prev) => ({
                            ...prev,
                            content: editorRef.current.getContent(),
                        }));
                    }}
                    init={{
                        branding: false,
                        height: 450,
                        menubar: false,
                        plugins: ["lists", "advlist", "link", "image", "fullscreen"],
                        images_upload_handler: (blobInfo, progress) => {
                            const formData = new FormData();
                            formData.append("image", blobInfo.blob());
                            return new Promise((resolve, reject) => {
                                axios
                                    .post("https://cdn.sociolinq.com/upload/", formData)
                                    .then((res) => {
                                        resolve(res.data.link);
                                    })
                                    .catch(() => {
                                        reject(
                                            "Some error occured. Please contact Rownak Mazumder."
                                        );
                                    });
                            });
                        },
                        toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | image link | fullscreen |",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, overflow:scroll}",
                    }}
                />
            </Box>
        </Box>
    )
}
