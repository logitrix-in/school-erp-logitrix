import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const Sms = () => {
  const [recipentTo, setRecipentTo] = useState("all");
  const editorRef = useRef(null);
  return (
    <Box>
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <FormControl>
          <InputLabel>Recipent</InputLabel>
          <Select label="Recipent" onChange={() => {}} defaultValue={20}>
            <MenuItem value={10}>Nill</MenuItem>
            <MenuItem value={20}>parent</MenuItem>
            <MenuItem value={30}>Candidates</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          sx={{ mr: "auto" }}
          color="secondary"
          value={recipentTo}
          exclusive
          onChange={(e, val) => val != null && setRecipentTo(val)}
        >
          <ToggleButton value="all">{"all(491)"}</ToggleButton>
          <ToggleButton value="custom">custom</ToggleButton>
        </ToggleButtonGroup>

        <Button variant="contained" color="secondary">
          Templates
        </Button>
      </Box>

      <Typography mt={2} variant="body2">
        982 Text messages to be sent out. Cost Per SMS: INR 0.5. Total Cost INR
        491
      </Typography>
      <Box mt={3}>
        <Editor
          apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="Welcome!"
          init={{
            branding: false,
            height: 450,
            menubar: false,
            plugins: ["lists", "advlist", "link", "image", "fullscreen"],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | image link | fullscreen |",
            images_upload_handler: (blobInfo, progress) => {
              const formData = new FormData();
              formData.append("image", blobInfo.blob());
              return new Promise((resolve, reject) => {
                axios
                  .post("https://cdn.sociolinq.com/upload/", formData)
                  .then((res) => {
                    resolve(res.data.link);
                  })
                  .catch((err) => {
                    console.log(err);
                    reject(
                      "Some error occured. Please contact Rownak Mazumder."
                    );
                  });
              });
            },
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
  );
};

export default Sms;
