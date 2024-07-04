import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import api from "../../../../config/api";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";

const MultipleApplication = ({ close, open }) => {
  const [applications, setApplications] = useState({
    single_candidate_same_class: "Accept the last application",
    single_application_multiple_class: "Accept All Applications",
  });
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    api
      .get("/admission/application/smart-management/mutiple-application/")
      .then((res) => setApplications(res.data))
      .catch((err) =>{} );
  }, []);

  useEffect(() => {
    ;
  }, [applications]);

  function submit() {
    setLoading(true);
    api
      .post(
        "/admission/application/smart-management/mutiple-application/",
        applications
      )
      .then((res) => {
        ;
        setLoading(false);
        setIsSaved(true);
      })
      .catch((err) =>{} );
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
      <Box overflow={"hidden"}>
        <Box display={"flex"} bgcolor={"primary.main"} alignItems={"center"}>
          {isSaved && (
            <Box ml={1} fontSize={'1.3rem'} display={'flex'} alignItems={'center'}>
              <Icon
                icon={"mdi:tick-circle"}
                color="#3dea3d"
              />
            </Box>
          )}

          <Typography
            p={1}
            py={1.5}
            flex={1}
            color={"white"}
            fontSize={"1rem"}
            textAlign={"center"}
          >
            Multiple Application
          </Typography>

          <IconButton
            aria-label="delete"
            sx={{ mr: 1 }}
            onClick={() => close()}
          >
            <Icon icon={"ep:close-bold"} color="white" fontSize={"1.3rem"} />
          </IconButton>
        </Box>

        <Box p={2}>
          <FormControl fullWidth>
            <FormLabel>
              Multiple Application from Single Candidate for same Class
            </FormLabel>
            <RadioGroup
              value={applications.single_candidate_same_class}
              onChange={(e, val) => {
                setIsSaved(false)
                setApplications((prev) => ({
                  ...prev,
                  single_candidate_same_class: val,
                }));
              }}
            >
              <FormControlLabel
                value="Accept the last application"
                control={<Radio />}
                label="Accept the last application"
              />
              <FormControlLabel
                value="Accept the first application"
                control={<Radio />}
                label="Accept the first application"
              />
              <FormControlLabel
                value="Reject All applications"
                control={<Radio />}
                label="Reject All applications"
              />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>
              Multiple Application from Single Candidate for multiple Class
            </FormLabel>
            <RadioGroup
              value={applications.single_application_multiple_class}
              onChange={(e, val) => {
                setIsSaved(false)
                setApplications((prev) => ({
                  ...prev,
                  single_application_multiple_class: val,
                }));
              }}
            >
              <FormControlLabel
                value="Accept All Applications"
                control={<Radio />}
                label="Accept All Applications"
              />
              <FormControlLabel
                value="Accept application for the highest class"
                control={<Radio />}
                label="Accept application for the highest class"
              />
              <FormControlLabel
                value="Accept application for the lowest class"
                control={<Radio />}
                label="Accept application for the lowest class"
              />
              <FormControlLabel
                value="Reject all applications"
                control={<Radio />}
                label="Reject all applications"
              />
            </RadioGroup>
          </FormControl>
          <Divider sx={{ my: 2 }} />
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={() => submit()}
            loading={loading}
          >
            Apply
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MultipleApplication;
