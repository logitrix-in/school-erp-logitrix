export const navigations = [
  {
    name: "Anaytics",
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
        path: "student/information/",
        icon: "mdi:information",
      },
      {
        name: "Manage",
        path: "student/manage/",
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
        path: "library/Information/",
        icon: "material-symbols:folder",
      }
    ],
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
