import { Permission } from "@/types/rbac";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Icon } from "@tabler/icons-react";
import {
  IconLayoutDashboard,
  IconLayoutDashboardFilled,
  IconFilePlus,
  IconFilesFilled,
  IconHistory,
  IconHistoryToggle,
  IconFileText,
  IconFileTextFilled,
  IconClipboardCheck,
  IconClipboardCheckFilled,
  IconUsers,
  IconUsersGroup,
  IconBuilding,
  IconBuildingBank,
  IconFolders,
  IconFolderFilled,
  IconChartBar,
  IconChartAreaFilled,
  IconChartLine,
  IconActivity,
  IconActivityHeartbeat,
  IconDownload,
  IconDownloadFilled,
  IconBell,
  IconBellFilled,
  IconSettings,
  IconSettingsFilled,
} from "@tabler/icons-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const departments = [
  {
    id: "exec",
    name: "Executive / Management",
    code: "EXEC",
  },
  {
    id: "ops",
    name: "Operations",
    code: "OPS",
  },
  {
    id: "fin",
    name: "Finance & Accounting",
    code: "FIN",
  },
  {
    id: "hr",
    name: "Human Resources",
    code: "HR",
  },
  {
    id: "csm",
    name: "Customer Support / Marketing",
    code: "CSM",
  },
  {
    id: "legal",
    name: "Legal",
    code: "LEGAL",
  },
  {
    id: "crm",
    name: "Compliance & Risk Management",
    code: "CRM",
  },
];

export const roleRoutes: Record<Role, string> = {
  ADMIN: "/dashboard/admin",
  HR: "/dashboard/hr",
  TEAM_LEAD: "/dashboard/team-lead",
  STAFF: "/dashboard/staff",
};

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    "VIEW_ADMIN_DASHBOARD",
    "CREATE_USER",
    "EDIT_USER",
    "DELETE_USER",
    "VIEW_ALL_REPORTS",
    "EXPORT_REPORTS",
    "VIEW_ANALYTICS",
    "MANAGE_SETTINGS",
  ],
  HR: [
    "VIEW_HR_DASHBOARD",
    "VIEW_ALL_REPORTS",
    "EXPORT_REPORTS",
    "VIEW_ANALYTICS",
  ],
  STAFF: [
    "VIEW_STAFF_DASHBOARD",
    "VIEW_OWN_REPORTS",
    "SUBMIT_REPORT",
    "EDIT_OWN_REPORT",
  ],
  TEAM_LEAD: [
    "VIEW_TEAM_LEAD_DASHBOARD",
    "VIEW_TEAM_REPORTS",
    "APPROVE_REPORT",
    "VIEW_ANALYTICS",
  ],
};

export function hasPermission(role: Role, permission: Permission) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

type NavItem = {
  label: string;
  href: string;
  roles: Role[];
  icon: React.ElementType;
};
export type Role = "ADMIN" | "HR" | "STAFF" | "TEAM_LEAD";

export type DashboardNavItem = {
  label: string;
  href: string;
  iconOutline: Icon;
  iconFilled: Icon;
  roles: ("ADMIN" | "HR" | "STAFF" | "TEAM_LEAD")[];
};

export type DashboardNavSection = {
  label: string;
  items: DashboardNavItem[];
};

export const dashboardNav: DashboardNavSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        iconOutline: IconLayoutDashboard,
        iconFilled: IconLayoutDashboardFilled,
        roles: ["ADMIN", "HR", "STAFF", "TEAM_LEAD"],
      },
    ],
  },

  {
    label: "Reports",
    items: [
      {
        label: "Submit Report",
        href: "/reports/new",
        iconOutline: IconFilePlus,
        iconFilled: IconFilesFilled,
        roles: ["STAFF"],
      },
      {
        label: "My Reports",
        href: "/reports/history",
        iconOutline: IconHistory,
        iconFilled: IconHistoryToggle,
        roles: ["STAFF"],
      },
      {
        label: "Reports",
        href: "/dashboard/reports",
        iconOutline: IconFileText,
        iconFilled: IconFileTextFilled,
        roles: ["ADMIN", "HR", "TEAM_LEAD"],
      },
      {
        label: "Approvals",
        href: "/dashboard/approvals",
        iconOutline: IconClipboardCheck,
        iconFilled: IconClipboardCheckFilled,
        roles: ["TEAM_LEAD"],
      },
    ],
  },

  {
    label: "Management",
    items: [
      {
        label: "Users",
        href: "/dashboard/users",
        iconOutline: IconUsers,
        iconFilled: IconUsersGroup,
        roles: ["ADMIN"],
      },
      {
        label: "Departments",
        href: "/dashboard/departments",
        iconOutline: IconBuilding,
        iconFilled: IconBuildingBank,
        roles: ["ADMIN"],
      },
      {
        label: "Projects",
        href: "/dashboard/projects",
        iconOutline: IconFolders,
        iconFilled: IconFolderFilled,
        roles: ["ADMIN"],
      },
    ],
  },

  {
    label: "Analytics",
    items: [
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        iconOutline: IconChartBar,
        iconFilled: IconChartAreaFilled,
        roles: ["ADMIN", "HR", "TEAM_LEAD"],
      },
      {
        label: "Team Performance",
        href: "/dashboard/team-lead/performance",
        iconOutline: IconChartLine,
        iconFilled: IconChartAreaFilled,
        roles: ["TEAM_LEAD"],
      },
      {
        label: "Performance",
        href: "/dashboard/hr/perfomance",
        iconOutline: IconActivity,
        iconFilled: IconActivityHeartbeat,
        roles: ["HR"],
      },
      {
        label: "Consistency",
        href: "/dashboard/consistency",
        iconOutline: IconActivity,
        iconFilled: IconActivityHeartbeat,
        roles: ["HR"],
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        label: "Exports",
        href: "/dashboard/exports",
        iconOutline: IconDownload,
        iconFilled: IconDownloadFilled,
        roles: ["ADMIN", "HR"],
      },
      {
        label: "Notifications",
        href: "/dashboard/notifications",
        iconOutline: IconBell,
        iconFilled: IconBellFilled,
        roles: ["ADMIN"],
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        iconOutline: IconSettings,
        iconFilled: IconSettingsFilled,
        roles: ["ADMIN", "STAFF", "HR", "TEAM_LEAD"],
      },
    ],
  },
];
