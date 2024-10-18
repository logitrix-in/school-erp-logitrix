import { createContext, useEffect, useState } from "react";
import api from "../config/api";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [quickTabs, setQuickTabs] = useState({});
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [roll, setRoll] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [status, setStatus] = useState([]);
  const [days, setDays] = useState([]);
  const [role, setRole] = useState([]);

  const [employeeRole, setEmployeeRole] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [employeeManagementDepartment, setEmployeeManagementDepartment] = useState([]);
  const [employeeTeachingDepartment, setEmployeeTeachingDepartment] = useState([]);
  const [employeeSupportStaffDepartment, setEmployeeSupportStaffDepartment] = useState([]);
  const [employeeGrade, setEmployeeGrade] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [employeeClaimRequestType, setEmployeeClaimRequestType] = useState([]);
  const [employeeStages, setEmployeeStages] = useState([]);
  const [employeeLeaveTypes, setEmployeeLeaveTypes] = useState([]);
  const [employeeCategories, setEmployeeCategories] = useState([]);
  const [employeeCreditCycle, setEmployeeCreditCycle] = useState([]);
  const [employeeClassScope, setEmployeeClassScope] = useState([]);
  const [employeeMedium, setEmployeeMedium] = useState([]);
  const [employeeBoard, setEmployeeBoard] = useState([]);
  const [employeeCasteCategory, setEmployeeCasteCategory] = useState([]);
  const [employeeUniversity, setEmployeeUniversity] = useState([]);
  const [employeeDegree, setEmployeeDegree] = useState([]);
  const [employeeSpecialisation, setEmployeeSpecialisation] = useState([]);

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
    return [
      "Principal",
      "Vice Principal",
      "Head of the Department",
      "Senior Teacher",
      "Junior Teacher",
      "Assistant Teacher",
      "Laboratory Assistant",
      "HR Manager",
      "Admin Lead",
      "Senior Admin",
      "Junior Admin",
      "Marketing Manager",
      "Coordinator",
      "Inventory Manager",
      "Senior Accountant",
      "Junior Accountant",
      "Caretaker"
    ];
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

  useEffect(() => {
    setEmployeeStages(generateEmployeeStages());
  }, []);

  const generateEmployeeStages = () => {
    return [
      "Self Assessment",
      "Supervisor Review",
      "Rationalization",
    ];
  };

  useEffect(() => {
    setEmployeeLeaveTypes(generateEmployeeLeaveTypes());
  }, []);

  const generateEmployeeLeaveTypes = () => {
    return [
      "Privilege Leave",
      "Casual Leave",
      "Sick Leave",
      "Maternity Leave",
      "Paternity Leave",
      "Optional Holiday",
      "Bereavement Leave",
      "Leave without Pay",
      "Loss of Pay",
      "Special Leave"
    ];
  };

  useEffect(() => {
    setEmployeeCategories(generateEmployeeCategories());
  }, []);

  const generateEmployeeCategories = () => {
    return [
      "Full-time Employee",
      "Probationer",
      "Contractual Employee",
      "Intern",
    ];
  };

  useEffect(() => {
    setEmployeeCreditCycle(generateEmployeeCreditCycle());
  }, []);

  const generateEmployeeCreditCycle = () => {
    return [
      "Monthly", "Quarterly", "Annually"
    ];
  };

  useEffect(() => {
    setEmployeeClassScope(generateEmployeeClassScope());
  }, []);

  const generateEmployeeClassScope = () => {
    return [
      "Pre-primary School",
      "Primary School",
      "High School"
    ];
  };

  useEffect(() => {
    setEmployeeMedium(generateEmployeeMedium());
  }, []);

  function generateEmployeeMedium() {
    return [
      "English",
      "Bengali",
      "Hindi",
      "Others"
    ];
  }

  useEffect(() => {
    setEmployeeBoard(generateEmployeeBoard());
  }, []);

  function generateEmployeeBoard() {
    return [
      "CBSE",
      "ICSE",
      "ISC",
      "WBBSE",
      "WBCHSE",
      "Other"
    ];
  }

  useEffect(() => {
    setEmployeeCasteCategory(generateEmployeeCasteCategory());
  }, []);

  function generateEmployeeCasteCategory() {
    return [
      "Unreserved",
      "OBC-A",
      "OBC-B",
      "SC",
      "ST",
      "EWS",
      "PwD"
    ];
  }

  useEffect(() => {
    setEmployeeUniversity(generateEmployeeUniversity());
  }, []);

  function generateEmployeeUniversity() {
    return [
      "Visva Bharati University",
      "University of Calcutta",
      "Jadavpur University",
      "Presidency University",
      "West Bengal State University",
      "University of North Bengal",
      "Jawaharlal Nehru University",
      "University of Delhi",
      "Banaras Hindu University",
      "Jamia Millia Islamia",
      "Aligarh Muslim University",
      "University of Hyderabad",
      "Pondicherry University",
      "Central University of Punjab",
      "University of Rajasthan",
      "Rajiv Gandhi University",
      "Others"
    ];
  }

  useEffect(() => {
    setEmployeeSpecialisation(generateEmployeeSpecialisation());
  }, []);

  function generateEmployeeSpecialisation() {
    return [
      "English",
      "Bengali",
      "Hindi",
      "Sanskrit",
      "History",
      "Geography",
      "Political Science",
      "Economics",
      "Music",
      "Psychology",
      "Sociology",
      "Education",
      "Physical Education",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Botany",
      "Zoology",
      "Physiology",
      "Computer Science",
      "Statistics",
      "Accountancy",
      "Business Studies",
      "Others"
    ];
  }

  useEffect(() => {
    setEmployeeDegree(generateEmployeeDegree());
  }, []);

  function generateEmployeeDegree() {
    return [
      "Diploma",
      "Bachelor of Arts",
      "Bachelor of Science",
      "Bachelor of Commerce",
      "Post Graduate Diploma",
      "Master of Science",
      "Master of Arts",
      "Master of Commerce",
      "Doctor of Philosophy",
      "Post-doctorate Degree",
      "Bachelor of Education",
      "Master of Education",
      "Master of Philosophy",
      "Bachelor of Business Administration",
      "Master of Business Administration",
      "Others"
    ];
  }

  // ? MEDIAS
  useEffect(() => {
    setMediaTypes(generateMediaTypes());
  }, []);

  function generateMediaTypes() {
    return ["Book", "Periodical", "Research Paper"];
  }

  useEffect(() => {
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

  // ? CLASSES
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

  const generateSections = () => {
    return ["A", "B", "C", "D"];
  };

  useEffect(() => {
    setSections(generateSections());
  }, []);

  const generateRoll = () => {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  };

  useEffect(() => {
    setSubjects(generateSubjects());
  }, []);

  const generateSubjects = () => {
    return ["English",
      "Bengali",
      "Hindi",
      "Sanskrit",
      "History",
      "Geography",
      "Political Science",
      "Economics",
      "Music",
      "Psychology",
      "Sociology",
      "Physical Education",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Computer Science",
      "Statistics",
      "Accountancy",
      "Business Studies"];
  };

  useEffect(() => {
    setRoll(generateRoll());
  }, []);

  useEffect(() => {
    setStatus(generateStatus());
  }, []);

  // days
  useEffect(() => {
    setDays(generateDays());
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

  // function to generate status values
  const generateStatus = () => {
    return ["Active", "Suspended", "Separated"];
  };

  // function to generate days values
  const generateDays = () => {
    return ["Today", "Last 7 days", "Last 15 days", "Last 30 days", "Last 60 days"];
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
    acYear,
    curAcademicYear,
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

    classes,
    setClasses,
    sections,
    setSections,
    subjects,
    setSubjects,

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
    employeeStages,
    setEmployeeStages,
    employeeLeaveTypes,
    setEmployeeLeaveTypes,
    employeeCategories,
    setEmployeeCategories,
    employeeCreditCycle,
    setEmployeeCreditCycle,
    employeeClassScope,
    setEmployeeClassScope,
    employeeMedium,
    setEmployeeMedium,
    employeeBoard,
    setEmployeeBoard,
    employeeCasteCategory,
    setEmployeeCasteCategory,
    employeeUniversity,
    setEmployeeUniversity,
    employeeDegree,
    setEmployeeDegree,
    employeeSpecialisation,
    setEmployeeSpecialisation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
