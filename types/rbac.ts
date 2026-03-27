export type Role = "ADMIN" | "HR" | "STAFF" | "TEAM_LEAD";

export type Permission =
  | "VIEW_ADMIN_DASHBOARD"
  | "VIEW_HR_DASHBOARD"
  | "VIEW_STAFF_DASHBOARD"
  | "VIEW_TEAM_LEAD_DASHBOARD"
  | "CREATE_USER"
  | "EDIT_USER"
  | "DELETE_USER"
  | "VIEW_ALL_REPORTS"
  | "VIEW_TEAM_REPORTS"
  | "VIEW_OWN_REPORTS"
  | "SUBMIT_REPORT"
  | "EDIT_OWN_REPORT"
  | "APPROVE_REPORT"
  | "EXPORT_REPORTS"
  | "VIEW_ANALYTICS"
  | "MANAGE_SETTINGS";

export const ROUTE_ACCESS: Record<string, Role[]> = {
  "/dashboard": ["ADMIN", "HR", "STAFF", "TEAM_LEAD"],

  "/dashboard/admin": ["ADMIN"],
  "/dashboard/hr": ["HR"],
  "/dashboard/staff": ["STAFF"],
  "/dashboard/team-lead": ["TEAM_LEAD"],

  "/dashboard/reports": ["ADMIN", "HR", "TEAM_LEAD"],
  "/dashboard/users": ["ADMIN"],
  "/dashboard/settings": ["ADMIN"],
  "/dashboard/approvals": ["TEAM_LEAD"],
};
