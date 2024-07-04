import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import Bbox from "../components/UiComponents/Bbox";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useAuth();

  return (
    <Bbox p={2} borderRadius={2}>
      <Typography fontSize={20} fontWeight={500} mb={2}>
        Hello {user?.user.first_name} {user?.user.last_name}
      </Typography>

      <Button variant="contained" LinkComponent={Link} to="/admission/onboarding/manage/merit-list/offline-onboarding/?appid=ACS24020002">Current Workplace</Button>
    </Bbox>
  );
};

export default Dashboard;
