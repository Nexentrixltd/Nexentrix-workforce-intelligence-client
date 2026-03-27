"use client";

import { RoleGuard } from "@/components/providers/RoleProvider";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div>Admin Dashboard</div>
    </RoleGuard>
  );
}
