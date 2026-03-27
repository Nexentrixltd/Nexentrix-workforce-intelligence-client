"use client";

import { RoleGuard } from "@/components/providers/RoleProvider";

export default function HRDashboardPage() {
  return (
    <RoleGuard allowedRoles={["HR"]}>
      <div>HR Dashboard</div>
    </RoleGuard>
  );
}