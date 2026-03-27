"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { Spinner } from "@/components/ui/spinner";
import { Role } from "@/types/rbac";
import { roleRoutes } from "@/lib/utils";

type RoleGuardProps = {
  allowedRoles: Role[];
  children: React.ReactNode;
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const hasFetchedUser = useUserStore((state) => state.hasFetchedUser);

  useEffect(() => {
    if (!hasFetchedUser || isLoading || !user) return;

    if (!allowedRoles.includes(user.role)) {
      router.replace(roleRoutes[user.role as Role]);
    }
  }, [allowedRoles, hasFetchedUser, isLoading, user, router]);

  if (!hasFetchedUser || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
