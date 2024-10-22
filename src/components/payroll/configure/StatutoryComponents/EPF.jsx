import RevealCard from "@/components/AnimationComponents/RevealCard";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import Banner from "@/components/Banner";
import EPFPopup from "./EPFPopup";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

const EPF = () => {
  const [epfPopup, setEPFPopup] = useState("");

  return (
    <RevealCard>
      <Box p={2} display={"flex"} flexDirection={"column"} gap={3}>
        <Box display={'flex'} alignItems={'center'}>
          <Banner
            text={"Employees’ Provident Fund"}
            style={{ marginTop: "0px" }}
          />
          <Tooltip title="Delete">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>EPF Number :</Typography>
          <Typography fontWeight={"600"}>TN/BN/484234802</Typography>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>Deduction Cycle :</Typography>
          <Typography fontWeight={"600"}>Monthly</Typography>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>Employee Contribution Rate :</Typography>
          <Typography fontWeight={"600"}>
            Restrict contribution to 15000 of PF Wage
          </Typography>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>Employer Contribution Rate :</Typography>
          <Typography fontWeight={"600"}>
            Restrict contribution to 15000 of PF Wage
          </Typography>
        </Box>

        <Box
          display={"flex"}
          gap={0}
          bgcolor={"#ECEDED"}
          alignItems={"center"}
          borderRadius={1}
        >
          <Checkbox />
          <Typography>
            LOP - Consider all applicable salary components if PF Wage &lt;
            15000
          </Typography>
        </Box>

        <Box display={"flex"}>
          <Typography border={"1px solid #2F90B9"} p={1} borderRadius={1}>
            ABRY Eligibility
          </Typography>
        </Box>

        <Box display={"flex"} gap={0} alignItems={"center"} borderRadius={1}>
          <Checkbox />
          <Typography>Eligible for ABRY Scheme</Typography>
        </Box>

        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography>Contribution Type :</Typography>
          <Button variant="contained" color="primary">
            Only Employee
          </Button>
          <Button variant="outlined" color="primary">
            Both Employee and Employer
          </Button>
        </Box>

        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEPFPopup(true)}
          >
            Edit
          </Button>
        </Box>

        <EPFPopup open={epfPopup} close={() => setEPFPopup(false)} />
      </Box>
    </RevealCard>
  );
};

export default EPF;
