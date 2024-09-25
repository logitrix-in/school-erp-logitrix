import { Box } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState, lazy, Suspense } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
	BrowserRouter as Router,
} from "react-router-dom";
import "./App.scss";
import "./assets/scss/scrollbar.scss";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ApplicationView from "./components/admission/application/ApplicationView";
import ReviewScreening from "./components/admission/screening/ReviewScreening";
import ScreeningRuleEdit from "./components/admission/screening/ScreeningRuleEdit";
import { config } from "./config";
import { AppContext } from "./context/AppContext";
import useAuth from "./hooks/useAuth";
import _404 from "./pages/404Page";
import Dashboard from "./pages/Dashboard";
const AdmissionApplication = lazy(() =>
	import("./pages/admission/AdmissionApplication")
);
const AdmissionOnboarding = lazy(() =>
	import("./pages/admission/AdmissionOnboarding")
);
const AdmissionScreening = lazy(() =>
	import("./pages/admission/AdmissionScreening")
);
const AdmissionTestCenter = lazy(() =>
	import("./pages/admission/AdmissionTestCenter")
);

const AdmissionPostOnboarding = lazy(() =>
	import("./pages/admission/AdmissionPostOnboarding")
);
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import IssueAdmitCard from "./components/admission/test-center/pages/ManageList/IssueAdmitCard";
import BulkManage from "./components/admission/test-center/pages/ManageList/BulkManage";
import UploadOfflineScore from "./components/admission/test-center/pages/Evalution/UploadOfflineScore";
import UploadInterviewScore from "./components/admission/test-center/pages/Evalution/UploadInterviewScore";
import SetMeritListRule from "./components/admission/test-center/pages/MeritList/SetMeritListRule";
import GenerateMeritList from "./components/admission/test-center/pages/MeritList/GenerateMeritList";
import ManageOnboarding from "./components/admission/onboarding/pages/ManageOnboarding";
import OnboardingMeritList from "./components/admission/onboarding/pages/OnboardingMeritList";
import OnboardingWaitingList from "./components/admission/onboarding/pages/OnboardingWaitingList";
import OnboardingForm from "./pages/OnboardingForm";
import ManageTickets from "./components/admission/post onboarding/ManageTickets";
import DetailedView from "./components/admission/application/DetailedView";
import OnboardingApproval from "./components/admission/onboarding/pages/OnboardingApproval";
import Test from "./pages/Test";
import dayjs from "dayjs";
import Information from "./pages/student/Information";
import Manage from "./pages/student/Manage";
import OnBoardingEdit from "./components/student/manage/EditInformation/OnBoardingEdit";
import ManageStreamRequest from "./components/student/manage/SectionAllotment/ManageStreamRequest";
import ManageSystemRequest from "./components/student/manage/SectionAllotment/ManageSystemRequest";
import ReviewPromotion from "./components/student/manage/SectionAllotment/ReviewPromotion";
import Action from "./pages/student/Action";
import Attendance from "./components/student/Attendance/Attendance";
import StudentAccount from "./components/student/manage/StudentAccount/StudentAccount";
import IDCardPass from "./components/student/manage/IDCardPass/IDCardPass";
import SectionAllotment from "./components/student/manage/SectionAllotment/SectionAllotment";
import Promotion from "./components/student/manage/Promotion/Promotion";
import ClassView from "./components/student/Attendance/ClassView";
import StudentView from "./components/student/Attendance/StudentView";
import LongLeaveRequest from "./components/student/Attendance/LongLeaveRequest";
import LibraryInformation from "./pages/Library/LibraryInformation";
import LibraryAction from "./pages/Library/LibraryAction";
import OnBoardingDetails from "./components/student/manage/EditInformation/OnBoardingDetails";
import ActionSuspend from "./components/student/action/ActionSuspend";
import LibraryActionSuspend from "./components/Library/action/ActionSuspend";

import ClaimsBonuses from "./pages/employee/Claims&Bonuses";
import Appraisal from "./pages/employee/Appraisal";
import EmployeeAction from "./pages/employee/EmployeeAction";
import EmployeeInformation from "./pages/employee/EmployeeInformation";
import EmployeeLeave from "./pages/employee/EmployeeLeave";
import EmployeeManage from "./pages/employee/EmployeeManage";
import EmployeeRecruitment from "./pages/employee/EmployeeRecruitment";

import EmployeeTimetable from "./pages/employee/EmployeeTimetable";
import SmartTimetable from "./components/employee/timetable/SmartTimetable/SmartTimetable";
import ManualTimetable from "./components/employee/timetable/ManualTimetable/ManualTimetable";

import EmployeeApplications from "./components/employee/recruitment/Applications/Applications";
import OfflineApplicationFormEmployee from "./components/employee/recruitment/Applications/OfflineApplicationForm";

import EmployeeScreening from "./components/employee/recruitment/Screening/Screening";
import EmployeeSelection from "./components/employee/recruitment/Selection/Selection";
import EmployeeOffer from "./components/employee/recruitment/Offer/Offer";
import EmployeeOnboarding from "./components/employee/recruitment/Onboarding/Onboarding";

import OfflineOnboardingFormEmployee from "./components/employee/recruitment/Onboarding/OfflineOnboardingForm";
import OfflineOnboardingFormEmployeeView from "./components/employee/recruitment/Onboarding/OfflineOnboardingFormView";

import OnBoardingEditEmployee from "./components/employee/manage/EditInformation/OnBoardingEdit";
import OnBoardingDetailsEmployee from "./components/employee/manage/EditInformation/OnBoardingDetails";
import EmployeeAccount from "./components/employee/manage/EmployeeAccount/EmployeeAccount";
import EmployeeIDCardPass from "./components/employee/manage/EmployeeIDCardPass/EmployeeIDCardPass";
import EmployeeDepartment from "./components/employee/manage/Department/Department";
import EmployeeProbation from "./components/employee/manage/Probation/Probation";
import EmployeePromotion from "./components/employee/manage/Promotion/Promotion";
import PromotionLetterIssuance from "./components/employee/manage/Promotion/PromotionLetterIssuance";

const LibraryCatalogue = lazy(() => import("./pages/Library/LibraryCatalogue"));
const LibraryManage = lazy(() => import("./pages/Library/LibraryManage"));
const LibraryVisitors = lazy(() => import("./pages/Library/LibraryVisitors"));
const LibraryRecommandation = lazy(() =>
	import("./pages/Library/LibraryRecommandation")
);

dayjs.locale("en-in");

const NavLayout = () => {
	const [loading, setLoading] = useState(true);
	const ux = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const currentRoute = location.pathname;

	useEffect(() => {
		axios
			.get("https://server.sociolinq.com/api/login/current/", {
				headers: {
					"x-api-key": "a8518942-17ea-44a6-b4e1-a974189a9a90",
				},
				withCredentials: true,
			})
			.then((res) => {
				ux.setUser(res.data);
				if (currentRoute == "/") navigate("/dashboard/");
			})
			.catch((er) => {
				ux.setUser(null);
				navigate("/login");
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<Box
						display={"flex"}
						width={"100vw"}
						position={"fixed"}
						top={0}
						zIndex={100}
						sx={{ pointerEvents: "none" }}
						overflow={"hidden"}
						height={"100vh"}
					>
						<Sidebar />
						<Navbar />
					</Box>

					<Box
						flex={1}
						bgcolor={"#ffffff"}
						pt={2}
						px={3}
						sx={{ borderRadius: 2 }}
						paddingTop={"7rem"}
						ml={config.NAVBAR_WIDTH}
					>
						<Breadcrumb />
						<Suspense fallback={<>loading..</>}>
							<Outlet />
						</Suspense>
						<Footer />
					</Box>
				</>
			)}
		</>
	);
};

function App() {
	const context = useContext(AppContext);

	return (
		<>
			<Routes>
				<Route path="/" element={<NavLayout />}>
					<Route path="dashboard/" element={<Dashboard />} />

					{/* application Routes */}
					<Route
						path="admission/application/"
						element={<AdmissionApplication />}
					/>
					<Route
						path="admission/application/view"
						element={<ApplicationView />}
					/>

					<Route
						path="admission/application/view/:id/"
						element={<DetailedView />}
					/>

					{/* screening */}
					<Route
						path="admission/screening/"
						element={<AdmissionScreening />}
					/>
					<Route
						path="admission/screening/edit/"
						element={<ScreeningRuleEdit />}
					/>

					<Route
						path="admission/screening/review/"
						element={<ReviewScreening />}
					/>

					{/* Test Center */}

					{/* -- Manage Test / Interview */}
					<Route
						path="admission/test-center/"
						element={<AdmissionTestCenter />}
					/>
					<Route
						path="admission/test-center/admit-card/"
						element={<IssueAdmitCard />}
					/>
					<Route
						path="admission/test-center/admit-card/bulk-manage/"
						element={<BulkManage />}
					/>

					{/* -- Evalution */}

					<Route
						path="admission/test-center/upload-offline-test-score/"
						element={<UploadOfflineScore />}
					/>
					<Route
						path="admission/test-center/upload-interview-score/"
						element={<UploadInterviewScore />}
					/>

					{/* -- Merit List */}

					<Route
						path="admission/test-center/set-rule/"
						element={<SetMeritListRule />}
					/>

					<Route
						path="admission/test-center/generate-merit-list/"
						element={<GenerateMeritList />}
					/>

					{/* Onboarding */}

					<Route
						path="admission/onboarding/"
						element={<AdmissionOnboarding />}
					/>

					{/* -- Manage */}

					<Route
						path="admission/onboarding/manage/"
						element={<ManageOnboarding />}
					/>

					{/* -- Merit List */}
					<Route
						path="admission/onboarding/manage/merit-list/"
						element={<OnboardingMeritList />}
					/>

					{/* -- Waiting List */}
					<Route
						path="admission/onboarding/manage/waiting-list/"
						element={<OnboardingWaitingList />}
					/>

					{/* -- Approval */}

					<Route
						path="admission/onboarding/:id"
						element={<OnboardingApproval />}
					/>

					{/* Post Onboarding */}

					<Route
						path={"admission/post-onboarding/"}
						element={<AdmissionPostOnboarding />}
					/>

					{/* -- Ticket */}
					<Route
						path={"admission/post-onboarding/manage-ticket/"}
						element={<ManageTickets />}
					/>

					{/* student-information */}
					<Route
						path={"student/information/"}
						element={<Information />}
					/>

					{/* student > manage */}
					{/* student-manage (edit information) */}
					<Route path={"/student/manage/edit-information"} element={<Manage />} />
					{/* student-manage (student account) */}
					<Route
						path="/student/manage/student-account/"
						element={StudentAccount}
					/>
					{/* student-manage (id card / pass) */}
					<Route
						path="/student/manage/id-card-pass/"
						element={IDCardPass}
					/>
					{/* student-manage (section allotment) */}
					<Route
						path="/student/manage/section-allotment/"
						element={SectionAllotment}
					/>
					{/* student-manage (promotion) */}
					<Route
						path="/student/manage/promotion/"
						element={Promotion}
					/>

					{/* manage stream request */}
					<Route
						path={
							"/student/manage/section-allotment/manage-stream-request"
						}
						element={<ManageStreamRequest />}
					/>
					{/* manage system request */}
					<Route
						path={
							"/student/manage/section-allotment/manage-stream-request/rationalise"
						}
						element={<ManageSystemRequest />}
					/>
					{/* review promotion */}
					<Route
						path="/student/manage/promotion/review"
						element={<ReviewPromotion />}
					/>

					{/* student-action */}
					<Route path={"student/action/"} element={<Action />} />

					<Route path={"/student/action/deliver/"} element={<ActionSuspend />} />

					{/* student-attendance */}
					<Route
						path={"student/attendance/"}
						element={<Attendance />}
					/>
					{/* class view */}
					<Route
						path={"/student/attendance/class-view"}
						element={<ClassView />}
					/>
					{/* student view */}
					<Route
						path={"/student/attendance/student-view"}
						element={<StudentView />}
					/>
					{/* Long Leave Request */}
					<Route
						path={"/student/attendance/long-leave-request"}
						element={<LongLeaveRequest />}
					/>

					<Route
						path={"library/Information/"}
						element={<LibraryInformation />}
					/>
					<Route
						path={"library/catalogue/"}
						element={<LibraryCatalogue />}
					/>

					<Route
						path={"library/manage/"}
						element={<LibraryManage />}
					/>

					<Route
						path={"library/action/"}
						element={<LibraryAction />}
					/>

					<Route path={"/library/action/new incident/"} element={<LibraryActionSuspend />} />


					<Route
						path={"library/visitors/"}
						element={<LibraryVisitors />}
					/>
					<Route
						path={"library/recommendation/"}
						element={<LibraryRecommandation />}
					/>


					{/* EMPLOYEE */}
					<Route
						path={"employee/recruitment/"}
						element={<EmployeeRecruitment />}
					/>
					<Route
						path="/employee/recruitment/applications/"
						element={EmployeeApplications}
					/>
					<Route
						path="/employee/recruitment/screening/"
						element={EmployeeScreening}
					/>
					<Route
						path="/employee/recruitment/selection/"
						element={EmployeeSelection}
					/>
					<Route
						path="/employee/recruitment/offer/"
						element={EmployeeOffer}
					/>
					<Route
						path="/employee/recruitment/onboarding/"
						element={EmployeeOnboarding}
					/>

					<Route
						path={"employee/information/"}
						element={<EmployeeInformation />}
					/>
					<Route
						path={"employee/manage/"}
						element={<EmployeeManage />}
					/>

					<Route
						path="/employee/manage/employee-account/"
						element={EmployeeAccount}
					/>
					<Route
						path="/employee/manage/id-card-pass/"
						element={EmployeeIDCardPass}
					/>
					<Route
						path="/employee/manage/department/"
						element={EmployeeDepartment}
					/>
					<Route
						path="/employee/manage/promotion/"
						element={EmployeePromotion}
					/>
					<Route
						path="/employee/manage/probation/"
						element={EmployeeProbation}
					/>
					<Route
						path="/employee/manage/probation/promotion-letter-issuance/"
						element={PromotionLetterIssuance}
					/>

					<Route
						path={"employee/timetable/"}
						element={<EmployeeTimetable />}
					/>
					<Route
						path={"employee/timetable/smarttable"}
						element={SmartTimetable}
					/>
					<Route
						path={"employee/timetable/manualtable"}
						element={ManualTimetable}
					/>

					<Route
						path={"employee/leave/"}
						element={<EmployeeLeave />}
					/>
					<Route
						path={"employee/action/"}
						element={<EmployeeAction />}
					/>
					<Route
						path={"employee/appraisal/"}
						element={<Appraisal />}
					/>
					<Route
						path={"employee/claims&bonuses/"}
						element={<ClaimsBonuses />}
					/>


					<Route path="*" element={<_404 />} />
				</Route>

				<Route
					path="admission/onboarding-form/"
					element={<OnboardingForm />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/test" element={<Test />} />

				{/* student>manage - on boarding edit */}
				<Route
					path={"/student/manage/OnBoardingEdit"}
					element={<OnBoardingEdit />}
				/>
				<Route
					path={"/student/manage/OnBoardingDetails"}
					element={<OnBoardingDetails />}
				/>

				<Route
					path={"/employee/manage/OnBoardingEdit"}
					element={<OnBoardingEditEmployee />}
				/>
				<Route
					path={"/employee/manage/OnBoardingDetails"}
					element={<OnBoardingDetailsEmployee />}
				/>

				<Route
					path={"/employee/recruitment/applications/OfflineApplicationFormEdit"}
					element={<OfflineApplicationFormEmployee />}
				/>
				<Route
					path={"/employee/recruitment/applications/OfflineApplicationFormView"}
					element={<OfflineApplicationFormEmployee />}
				/>

				<Route
					path={"/employee/recruitment/onboarding/OfflineOnboardingFormEdit"}
					element={<OfflineOnboardingFormEmployee />}
				/>
				<Route
					path={"/employee/recruitment/onboarding/OfflineOnboardingFormView"}
					element={<OfflineOnboardingFormEmployeeView />}
				/>
			</Routes>
		</>
	);
}

export default App;
