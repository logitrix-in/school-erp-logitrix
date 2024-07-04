import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Editor } from "@tinymce/tinymce-react";
import { Delete } from "@mui/icons-material";
import api from "../../../../config/api";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import ReignsPopup from "../../../UiComponents/ReignsPopup";
import axios from "axios";

const Engage = ({ close, open }) => {
  const [lineups, setLineups] = useState([]);

  function fetchData() {
    api
      .get("/admission/application/smart-management/application-engagement/")
      .then((res) => setLineups(res.data))
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
  }, []);

  const editorRef = useRef(null);

  const formData = {
    schedule_after_days: 3,
    subject: "",
    content: "",
  };

  const [state, setState] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submit = () => {
    if (!state.subject) return toast.error("Enter a subject");
    setLoading(true);
    api
      .post(
        "/admission/application/smart-management/application-engagement/",
        state
      )
      .then((res) => {
        fetchData();
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const [loading, setLoading] = useState(false);
  const [reignsOpen, setReignsOpen] = useState(false);
  const [selectedEngage, setSelectedEngage] = useState(null);

  function acceptDelete(id) {
    api
      .delete(
        "/admission/application/smart-management/application-engagement/",
        {
          data: {
            id,
          },
        }
      )
      .then((res) => {
        fetchData();
      })
      .catch((err) => {})
      .finally(() => setReignsOpen(false));
  }

  return (
    <Dialog
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100%",
        },
      }}
      maxWidth="md"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <ToastContainer autoClose={1000} />
      <Box overflow={"hidden"}>
        <Box
          p={1}
          py={1}
          bgcolor={"primary.main"}
          color={"white"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box />
          <Typography fontSize={"1.1rem"} textAlign={"center"}>
            Engage
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          p={2}
          height={"80vh"}
          position={"relative"}
          sx={{ overflowY: "scroll" }}
        >
          <Typography fontWeight={600} bgcolor={"primary.light"} p={1}>
            Current Lineups
          </Typography>

          <Box>
            {lineups.map((lineup, i) => (
              <Box key={i}>
                <Box
                  display={"flex"}
                  width={"100%"}
                  p={1}
                  mt={0.3}
                  alignItems={"center"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "#f2f2f294",
                    },
                  }}
                  onClick={() => {
                    editorRef && editorRef.current.setContent(lineup.content);
                    setState((prev) => ({
                      content: lineup.content,
                      subject: lineup.subject,
                      schedule_after_days: lineup.schedule_after_days,
                    }));
                  }}
                >
                  <Typography flex={1}>{lineup.subject}</Typography>
                  <Typography variant="caption">
                    Day {lineup.schedule_after_days}
                  </Typography>

                  {/* delete */}

                  {selectedEngage == i && (
                    <ReignsPopup
                      title="Are you sure you want to delete?"
                      desc={`(${lineup.subject}) will be deleted parmanently`}
                      onAccept={() => acceptDelete(lineup.id)}
                      onCancel={() => setReignsOpen(false)}
                      open={reignsOpen}
                    />
                  )}

                  <IconButton
                    size="small"
                    sx={{
                      ml: 2,
                      ":hover svg": {
                        color: "error.dark",
                      },
                    }}
                    onClick={() => {
                      setSelectedEngage(i);
                      setReignsOpen(true);
                    }}
                  >
                    <Delete
                      sx={{
                        fontSize: 20,
                      }}
                    />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          <Typography
            fontWeight={600}
            mt={2}
            mb={2}
            bgcolor={"primary.light"}
            p={1}
          >
            Set Up
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography>Schedule after </Typography>

            <TextField
              type="number"
              onChange={(e) => {
                if (e.target.value.length > 3) return;
                handleChange(e);
              }}
              name="schedule_after_days"
              size="small"
              value={state.schedule_after_days}
              inputProps={{ min: 0, style: { textAlign: "center" } }}
              sx={{ width: "1.65rem" }}
              variant="standard"
            />

            <Typography>days from application</Typography>
          </Box>
          <TextField
            label="subject"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleChange}
            name="subject"
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
          <Box display={"flex"} justifyContent={"flex-end"}>
            <LoadingButton
              loading={loading}
              sx={{ mt: 1 }}
              variant="contained"
              onClick={submit}
            >
              Add
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Engage;
