import { Box } from "@mui/material";
import Dashboard from "../../components/employee/information/Dashboard";
import EmployeeDocuments from "../../components/employee/information/EmployeeDocuments";
import EmployeeAccount from "../../components/employee/information/EmployeeAccount";

const EmployeeInformation = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Dashboard />
            <EmployeeDocuments />
            <EmployeeAccount />
        </Box>
    );
};

export default EmployeeInformation;
