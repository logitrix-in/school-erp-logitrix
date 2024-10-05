import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useClasses = () => {
  const context = useContext(AppContext);
  return {
    classes: context.classes ?? [],
    acYear: context.acYear,
    curYear: context.curAcademicYear,
    sections: context.sections ?? [],
    status: context.status ?? [],
    days: context.days,
    roll: context.roll,
    role: context.role,
    nonCompliance: context.nonCompliance,
    suspend: context.suspend,
    active: context.activeButton,
    setActiveButton: context.setActiveButton,
    employeeRole: context.employeeRole,
    employeeType: context.employeeType,
  };
};

export default useClasses;
