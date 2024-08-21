import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import { Icon } from "@iconify/react";
import axios from "axios";

const Notification = ({ close }) => {
  const [recipentTo, setRecipentTo] = useState("all");

  const editorRef = useRef(null);

  return (
    <Box overflow={"hidden"}>
      <Box
        p={1}
        px={2}
        bgcolor={"primary.main"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontSize={"1.1rem"} color={"white"}>
          Notification
        </Typography>
        <IconButton onClick={close}>
          <Icon icon="iconamoon:close-fill" color="white" />
        </IconButton>
      </Box>
      <Box p={2} py={3} sx={{ overflowY: "auto" }} height={"80vh"}>
        <Box display={"flex"} gap={2}>
          <FormControl size="small">
            <InputLabel>Recipent</InputLabel>
            <Select label="Recipent" onChange={() => {}} defaultValue={30}>
              <MenuItem value={10}>Nil</MenuItem>
              <MenuItem value={20}>parent</MenuItem>
              <MenuItem value={30}>Candidates</MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            size="small"
            color="secondary"
            value={recipentTo}
            exclusive
            sx={{ mr: "auto" }}
            onChange={(e, val) => val != null && setRecipentTo(val)}
          >
            <ToggleButton value="all">{"all(491)"}</ToggleButton>
            <ToggleButton value="custom">custom</ToggleButton>
          </ToggleButtonGroup>

          <FormControl size="small">
            <InputLabel>CC</InputLabel>
            <Select label="CC" onChange={() => {}} defaultValue={20}>
              <MenuItem value={10}>Nil</MenuItem>
              <MenuItem value={20}>parent</MenuItem>
              <MenuItem value={30}>Candidates</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small">
            <InputLabel>BCC</InputLabel>
            <Select label="BCC" onChange={() => {}} defaultValue={10}>
              <MenuItem value={10}>Nil</MenuItem>
              <MenuItem value={20}>parent</MenuItem>
              <MenuItem value={30}>Candidates</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="secondary">
            Templates
          </Button>
        </Box>
        <Box height={20} />
        <TextField
          placeholder="Subject"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <Box>
          <Editor
            apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="Welcome!"
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
        <Box display={"flex"} justifyContent={"flex-start"} gap={2} mt={2}>
          <Button variant="contained">Save Template</Button>
          <Button variant="contained" sx={{ mr: "auto" }}>
            Schedule
          </Button>
          <Button variant="contained">Send</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
