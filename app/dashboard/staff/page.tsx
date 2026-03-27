"use client";

import { RoleGuard } from "@/components/providers/RoleProvider";

export default function StaffDashboardPage() {
  return (
    <RoleGuard allowedRoles={["STAFF"]}>
      <div>Staff Dashboard</div>
    </RoleGuard>
  );
}