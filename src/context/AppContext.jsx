import { createContext, useEffect, useState } from "react";
import api from "../config/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quickTabs, setQuickTabs] = useState({});
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [status, setStatus] = useState([]);
  const [days, setDays] = useState([]);
  const [roll, setRoll] = useState([]);
  const [role, setRole] = useState([]);

  const [employeeRole, setEmployeeRole] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [employeeManagementDepartment, setEmployeeManagementDepartment] = useState([]);
  const [employeeTeachingDepartment, setEmployeeTeachingDepartment] = useState([]);
  const [employeeSupportStaffDepartment, setEmployeeSupportStaffDepartment] = useState([]);
  const [employeeGrade, setEmployeeGrade] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [employeeClaimRequestType, setEmployeeClaimRequestType] = useState([]);

  const [nonCompliance, setNonCompliance] = useState([]);
  const [suspend, setSuspend] = useState([]);
  const [activeButton, setActiveButton] = useState("New Incident");
  const [mediaTypes, setMediaTypes] = useState([]);
  const [mediaCategory, setMediaCategory] = useState([]);
  const [mediaLanguage, setMediaLanguage] = useState([]);


  // ? EMPLOYEES
  useEffect(() => {
    setEmployeeRole(generateEmployeeRoles());
  }, []);

  const generateEmployeeRoles = () => {
    return ["House Coordinator", "High School Coordinator", "Dance club supervisor", "No"];
  };

  useEffect(() => {
    setEmployeeType(generateEmployeeTypes());
  }, []);

  const generateEmployeeTypes = () => {
    return ["Management", "Teaching Staff", "Support Staff"];
  };

  useEffect(() => {
    setEmployeeManagementDepartment(generateEmployeeManagementDepartment());
  }, []);

  const generateEmployeeManagementDepartment = () => {
    return ["Management"];
  };

  useEffect(() => {
    setEmployeeTeachingDepartment(generateEmployeeTeachingDepartment());
  }, []);

  const generateEmployeeTeachingDepartment = () => {
    return ["English", "Bengali", "Hindi", "Sanskrit", "History", "Geography", "Political Science", "Economics", "Music", "Psychology", "Sociology", "Physical Education", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Statistics", "Accountancy", "Business Studies", "Environmental Studies"];
  };

  useEffect(() => {
    setEmployeeSupportStaffDepartment(generateEmployeeSupportStaffDepartment());
  }, []);

  const generateEmployeeSupportStaffDepartment = () => {
    return ["Administration", "Finance", "Human Resources", "Marketing", "Maintenance"];
  };

  useEffect(() => {
    setEmployeeGrade(generateEmployeeGrade());
  }, []);

  const generateEmployeeGrade = () => {
    return ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3", "E1", "E2", "E3", "CON1", "CON2", "CON3", "INT1", "INT2"];
  };

  useEffect(() => {
    setEmployeeStatus(generateEmployeeStatus());
  }, []);

  const generateEmployeeStatus = () => {
    return ["Active", "Serving Noice Period", "On Long Leave", "Suspended"];
  };

  useEffect(() => {
    setEmployeeClaimRequestType(generateEmployeeClaimRequestType());
  }, []);

  const generateEmployeeClaimRequestType = () => {
    return ["Travel Expenses",
      "Meal Expenses",
      "Internet Reimbursement",
      "Training and Development Claims",
      "Health and Wellness Claims",
      "Relocation Expenses",
      "Others"];
  };


  //? classes
  useEffect(() => {
    if (user != null)
      api
        .get("/admission/get-all-classes")
        .then((res) => {
          setClasses(res.data);
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    // Generate section values
    setMediaTypes(generateMediaTypes());
  }, []);

  function generateMediaTypes() {
    return ["Book", "Periodical", "Research Paper"];
  }

  useEffect(() => {
    // Generate section values
    setMediaLanguage(generateMediaLanguage());
  }, []);

  function generateMediaLanguage() {
    return [
      "English",
      "Bengali",
      "Hindi",
      "Sanskrit",
      "Tamil",
      "Telugu",
      "Kannada",
      "Malayalam",
      "Others"
    ];
  }

  useEffect(() => {
    // Generate section values
    setMediaCategory(generateMediaCategory());
  }, []);

  function generateMediaCategory() {
    return [
      "Bengali literature",
      "Hindi literature",
      "English literature",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer Science",
      "Statistics",
      "History",
      "Geography",
      "Political Science",
      "Psychology",
      "Sociology",
      "Economics",
      "Accountancy",
      "Business Studies",
      "Fiction",
      "Non-fiction",
      "Others"
    ];
  }

  // sections
  useEffect(() => {
    // Generate section values
    setSections(generateSections());
  }, []);

  // status
  useEffect(() => {
    // Generate section values
    setStatus(generateStatus());
  }, []);

  // days
  useEffect(() => {
    // Generate section values
    setDays(generateDays());
  }, []);

  // roll no
  useEffect(() => {
    setRoll(generateRoll());
  }, []);

  // assign role
  useEffect(() => {
    setRole(generateRoles());
  }, []);
  // non-compliance
  useEffect(() => {
    setNonCompliance(generateNonCompliance());
  }, []);

  // suspende access
  useEffect(() => {
    setSuspend(generateSuspendAccess());
  }, []);

  // function to generate section values
  const generateSections = () => {
    return ["A", "B", "C", "D"];
  };

  // function to generate status values
  const generateStatus = () => {
    return ["Active", "Suspended", "Separated"];
  };

  // function to generate days values
  const generateDays = () => {
    return ["Today", "Last 7 days", "Last 15 days", "Last 30 days", "Last 60 days"];
  };

  // function to generate roll no values
  const generateRoll = () => {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  };

  // academic year
  function generateAcademicYears() {
    const currentYear = new Date().getFullYear();
    const academicYears = [];

    for (let i = currentYear - 1; i <= currentYear + 1; i++) {
      const academicYear = `${i}-${(i + 1).toString().slice(2)}`;
      academicYears.push(academicYear);
    }

    return academicYears;
  }

  // function to generate roles values
  const generateRoles = () => {
    return ["House Captain", "House Prefect", "Sports Club Secretary", "No"];
  };

  // function to generate non-compliance values
  const generateNonCompliance = () => {
    return [
      "Loss/ Damage of Property",
      "Unethical Practices",
      "Low Attendance",
      "Harassment/ Unacceptable Behaviour",
      "Regular Defaulter in Fee Payment",
    ];
  };

  // function to generate non-compliance values
  const generateSuspendAccess = () => {
    return [
      "Student account",
      "Library",
      "Visitor Pass",
      "Event Pass",
      "Biometrics",
    ];
  };

  const curYear = new Date().getFullYear();
  const acYear = generateAcademicYears();
  const curAcademicYear = `${curYear}-${(curYear + 1).toString().slice(2)}`;

  const value = {
    user,
    setUser,
    setQuickTabs,
    quickTabs,
    classes,
    acYear,
    curAcademicYear,
    setClasses,
    sections,
    setSections,
    status,
    setStatus,
    days,
    setDays,
    roll,
    setRoll,
    role,
    setRole,
    nonCompliance,
    setNonCompliance,
    suspend,
    setSuspend,
    activeButton,
    setActiveButton,
    mediaTypes,
    setMediaTypes,
    mediaCategory,
    setMediaCategory,
    mediaLanguage,
    setMediaLanguage,

    employeeRole,
    setEmployeeRole,
    employeeType,
    setEmployeeType,
    employeeManagementDepartment,
    setEmployeeManagementDepartment,
    employeeTeachingDepartment,
    setEmployeeTeachingDepartment,
    employeeSupportStaffDepartment,
    setEmployeeSupportStaffDepartment,
    employeeGrade,
    setEmployeeGrade,
    employeeStatus,
    setEmployeeStatus,
    employeeClaimRequestType,
    setEmployeeClaimRequestType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
