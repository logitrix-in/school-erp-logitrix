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
        employeeLeaveTypes: context.employeeLeaveTypes,
        employeeCategories: context.employeeCategories,
        employeeCreditCycle: context.employeeCreditCycle,
        employeeClassScope: context.employeeClassScope,
        employeeClassType: context.employeeClassType,
        employeeMedium: context.employeeMedium,
        employeeBoard: context.employeeBoard,
        employeeCasteCategory: context.employeeCasteCategory,
        employeeUniversity: context.employeeUniversity,
        employeeDegree: context.employeeDegree,
        employeeSpecialisation: context.employeeSpecialisation,
    };
};

export default useEmployees;
