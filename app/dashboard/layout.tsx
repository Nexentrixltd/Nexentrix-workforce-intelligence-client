"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Providers from "../providers";
import { useUserStore } from "@/store/userStore";
import { Spinner } from "@/components/ui/spinner";
import DashboardSidebar from "@/components/dashboard/Sidebar";

function DashboardGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const hasFetchedUser = useUserStore((state) => state.hasFetchedUser);

  useEffect(() => {
    if (hasFetchedUser && !isLoading && !user) {
      router.replace("/auth");
    }
  }, [hasFetchedUser, isLoading, user, router]);

  if (!hasFetchedUser || isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardGate>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </DashboardGate>
    </Providers>
  );
}
