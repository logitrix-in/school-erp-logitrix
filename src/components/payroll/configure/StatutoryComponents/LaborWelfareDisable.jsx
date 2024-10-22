import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LaborWelfareDisable = ({ open, close, setEnabled }) => {

  return (
    <Dialog
      fullWidth={false}
      PaperProps={{
        sx: {
          maxHeight: "90%",
          width: "50%",
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
          bgcolor={"secondary.main"}
          color={"white"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box />
          <Typography fontSize={"1.1rem"} textAlign={"center"}>
            Disable
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
          display="flex"
          flexDirection="column"
          gap={2}
          p={2}
          justifyContent="space-between"
          width={"95%"}
          margin="auto"
          alignItems="center"
        >
          <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>
            Are you sure you want to disable labor welfare fund?
          </Typography>

          <Box marginY={2} width={"100%"} display="flex" gap={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                close();
                setEnabled(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => {
                close();
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LaborWelfareDisable;
