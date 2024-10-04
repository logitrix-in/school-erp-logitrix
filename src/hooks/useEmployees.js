import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useEmployees = () => {
    const context = useContext(AppContext);
    return {
        employeeRole: context.employeeRole,
        employeeType: context.employeeType,
        employeeManagementDepartment: context.employeeManagementDepartment,
        employeeTeachingDepartment: context.employeeTeachingDepartment,
        employeeSupportStaffDepartment: context.employeeSupportStaffDepartment,
        employeeGrade: context.employeeGrade,
        employeeStatus: context.employeeStatus,
        employeeClaimRequestType: context.employeeClaimRequestType,
        employeeStages: context.employeeStages,
    };
};

export default useEmployees;
