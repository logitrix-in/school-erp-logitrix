import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useClasses = () => {
  const context = useContext(AppContext);
  return {
    acYear: context.acYear,
    curYear: context.curAcademicYear,
    status: context.status ?? [],
    days: context.days,
    role: context.role,
    nonCompliance: context.nonCompliance,
    suspend: context.suspend,
    active: context.activeButton,
    setActiveButton: context.setActiveButton,

    classes: context.classes ?? [],
    sections: context.sections ?? [],
    roll: context.roll,
    subjects: context.subjects,

    employeeRole: context.employeeRole,
    employeeType: context.employeeType,
  };
};

export default useClasses;
