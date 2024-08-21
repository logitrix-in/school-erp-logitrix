import React from "react";
import Sms from "./widgets/Sms";
import Email from "./widgets/Email";
import Whatsapp from "./widgets/Whatsapp";
import {
  Box,
  Dialog,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import whatsappBg from "../../../../assets/wp.jpg";
import CloseIcon from "@mui/icons-material/Close";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ height: "100%", overflow: "hidden" }}
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box
          p={3}
          sx={{
            height: "70vh",
            overflowY: "scroll",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

const Notify = ({ open, close }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const widgets = [];

  return (
    <Dialog
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100%",
        },
      }}
      maxWidth="lg"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
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
            Manage Notification
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
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Email" />
          <Tab label="SMS" />
          <Tab label="Whatsapp" />
        </Tabs>
        <Divider />
        <Box>
          <CustomTabPanel value={value} index={0}>
            <Email />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Sms />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Whatsapp />
          </CustomTabPanel>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Notify;
