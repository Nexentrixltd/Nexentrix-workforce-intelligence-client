import { Role } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
