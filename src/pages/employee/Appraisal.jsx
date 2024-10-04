import Dashboard from "../../components/employee/appraisal/Dashboard";
import AppraisalDetails from "../../components/employee/appraisal/AppraisalDetails";
import Manage from "../../components/employee/appraisal/Manage";
export default function Appraisal() {
    return (
        <>
            <Dashboard />
            <AppraisalDetails />
            <Manage />
        </>
    );
}