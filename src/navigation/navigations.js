export const navigations = [
	{
		name: "Analytics",
		path: "dashboard/",
		icon: "bxs:dashboard",
	},
	{
		name: "admission",
		path: "admission/",
		dropdown: true,
		icon: "material-symbols:other-admission",
		subMenu: [
			{
				name: "Application",
				path: "admission/application/",
				icon: "mdi:application",
			},
			{
				name: "Screening",
				path: "admission/screening/",
				icon: "carbon:chart-evaluation",
			},
			{
				name: "Test Center",
				path: "admission/test-center/",
				icon: "ic:round-place",
			},
			{
				name: "Onboarding",
				path: "admission/onboarding/",
				icon: "material-symbols:other-admission",
			},
			{
				name: "Post Onboarding",
				path: "admission/post-onboarding/",
				icon: "material-symbols:other-admission",
			},
		],
	},
	{
		name: "Student",
		path: "student/",
		icon: "solar:library-bold-duotone",
		dropdown: true,
		subMenu: [
			{
				name: "Information",
				path: "student/information",
				icon: "mdi:information",
			},
			{
				name: "Manage",
				path: "student/manage/edit-information",
				icon: "mdi:folder-edit",
			},
			{
				name: "Action",
				path: "student/action/",
				icon: "mdi:gesture-tap-button",
			},
			{
				name: "Attendance",
				path: "student/attendance/",
				icon: "mdi:chart-box",
			},
		],
	},
	{
		name: "Library",
		path: "Library/",
		icon: "solar:library-bold-duotone",
		dropdown: true,
		subMenu: [
			{
				name: "Information",
				path: "library/information/",
				icon: "material-symbols:folder",
			},
			{
				name: "Catalogue",
				path: "library/catalogue/",
				icon: "material-symbols:folder",
			},
			{
				name: "Manage",
				path: "library/manage/",
				icon: "material-symbols:folder",
			},
			{
				name: "Action",
				path: "library/action/",
				icon: "material-symbols:folder",
			},
			{
				name: "Visitors",
				path: "library/visitors/",
				icon: "material-symbols:folder",
			},
			{
				name: "Recommendation",
				path: "library/recommendation/",
				icon: "material-symbols:folder",
			},
		],
	},
	{
		name: "Employee",
		path: "employee/",
		icon: "solar:library-bold-duotone",
		dropdown: true,
		subMenu: [
			{
				name: "Recruitment",
				path: "employee/recruitment/",
				icon: "material-symbols:folder",
			},
			{
				name: "Information",
				path: "employee/information/",
				icon: "material-symbols:folder",
			},
			{
				name: "Manage",
				path: "employee/manage/edit-information",
				icon: "material-symbols:folder",
			},
			{
				name: "Timetable",
				path: "employee/timetable/",
				icon: "material-symbols:folder",
			},
			{
				name: "Leave",
				path: "employee/leave/leave-management",
				icon: "material-symbols:folder",
			},
			{
				name: "Action",
				path: "employee/action/",
				icon: "material-symbols:folder",
			},
			{
				name: "Appraisal",
				path: "employee/appraisal/",
				icon: "material-symbols:folder",
			},
			{
				name: "Claims & Bonuses",
				path: "employee/claims&bonuses/claims",
				icon: "material-symbols:folder",
			},
		],
	},
	{
		name: "Examination \nManagement",
		path: "examination-management/",
		icon: "solar:library-bold-duotone",
		dropdown: true,
		subMenu: [
			{
				name: "Pre-Examination",
				path: "examination-management/pre-examination/",
				icon: "material-symbols:folder",
			},
			{
				name: "Post-Examination",
				path: "examination-management/post-examination/",
				icon: "material-symbols:folder",
			},
		],
	},
	{
		name: "Payroll",
		path: "payroll/",
		icon: "solar:library-bold-duotone",
		dropdown: true,
		subMenu: [
    {
        name: "Payroll Manager",
        path: "payroll/payroll-manager/",
        icon: "material-symbols:folder",
    },
    {
        name: "Configure",
        path: "payroll/configure/organization-profile",
        icon: "material-symbols:folder",
    },
    {
        name: "Compensation",
        path: "payroll/compensation/",
        icon: "material-symbols:folder",
    },
    {
        name: "Off Payroll Payout",
        path: "payroll/off-payroll-payout/",
        icon: "material-symbols:folder",
    },
    {
        name: "Investment Declaration",
        path: "payroll/investment-declaration/",
        icon: "material-symbols:folder",
    },
    {
        name: "Taxes",
        path: "payroll/taxes/",
        icon: "material-symbols:folder",
    },
    {
        name: "FFS & Arrers",
        path: "payroll/ffs-arrers/",
        icon: "material-symbols:folder",
    },
    {
        name: "Reports",
        path: "payroll/reports/",
        icon: "material-symbols:folder",
    },
]
	},
	{
		name: "Utilities",
		path: "utilities/",
		icon: "solar:document-bold",
	},
	{
		name: "Manage Access",
		path: "access-control/",
		icon: "ic:baseline-manage-accounts",
	},
	{
		name: "Feedback",
		path: "feedback/",
		icon: "material-symbols:feedback",
	},
];
