import { useState } from "react";
import {
  Box,
} from "@mui/material";
import Bonus from "../../components/employee/claim&bonus/Bonus";
import Claims from "../../components/employee/claim&bonus/Claims";
import Navigator from "../../components/employee/claim&bonus/Navigator";

const ClaimsBonuses = () => {

  const navs = [
    {
      name: "Claims",
    },
    {
      name: "Bonuses",
    }
  ];

  const [active, setActive] = useState(0);


  return (
    <>
      <Navigator navs={navs} onChange={setActive} />

      <Box mb={2} />
      {active == 0 && <Claims />}
      {active == 1 && <Bonus />}
    </>
  )
};

export default ClaimsBonuses;
