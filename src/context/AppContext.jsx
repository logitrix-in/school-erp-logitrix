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
  const [nonCompliance, setNonCompliance] = useState([]);
  const [suspend, setSuspend] = useState([]);
  const [activeButton, setActiveButton] = useState("New Incident");
  const [mediaTypes, setMediaTypes] = useState([]);
  const [mediaCategory, setMediaCategory] = useState([]);
  const [mediaLanguage, setMediaLanguage] = useState([]);

  // classes
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

  // assign Employee role
  useEffect(() => {
    setEmployeeRole(generateEmployeeRoles());
  }, []);

  useEffect(() => {
    setEmployeeType(generateEmployeeTypes());
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

  const generateEmployeeRoles = () => {
    return ["House Coordinator", "High School Coordinator", "Dance club supervisor", "No"];
  };

  const generateEmployeeTypes = () => {
    return ["Management", "Teaching Staff", "Support Staff"];
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
    setEmployeeType
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
