"use client";

import { RoleGuard } from "@/components/providers/RoleProvider";

export default function TeamLeadDashboardPage() {
  return (
    <RoleGuard allowedRoles={["TEAM_LEAD"]}>
      <div>Team Lead Dashboard</div>
    </RoleGuard>
  );
}
