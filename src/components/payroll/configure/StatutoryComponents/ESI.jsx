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
import ESIPopup from "./EPFPopup";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

const ESI = () => {
  const [esiPopup, setESIPopup] = useState("");

  return (
    <RevealCard>
      <Box p={2} display={"flex"} flexDirection={"column"} gap={3}>
        <Box display={'flex'} alignItems={'center'}>
          <Banner
            text={"Employees’ Provident Fund"}
            style={{ marginTop: "0px" }}
          />
          <Tooltip title="ESI deductions are applicable only if the employee’s monthly salary is less than  or equal to INR 21,000. If the employee gets a salary revision which increases  his/her monthly salary above INR 21,000 then they would have to continue with  the ESI contributions till the end of the contribution period in which the salary  was revised. (Period: April to September or October to March)">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>ESI Number :</Typography>
          <Typography fontWeight={"600"}>TN/BN/484234802</Typography>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>Deduction Cycle :</Typography>
          <Typography fontWeight={"600"}>Monthly</Typography>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>Employee&apos;s Contribution :</Typography>
          <Typography fontWeight={"600"}>
          0.75% of Gross Pay
          </Typography>
        </Box>

        <Box display={"flex"} gap={2}>
          <Typography>Employer&apos;s Contribution :</Typography>
          <Typography fontWeight={"600"}>
          0.75% of Gross Pay
          </Typography>
        </Box>
        
        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setESIPopup(true)}
          >
            Edit
          </Button>
        </Box>

        <ESIPopup open={esiPopup} close={() => setESIPopup(false)} />
      </Box>
    </RevealCard>
  );
};

export default ESI;
