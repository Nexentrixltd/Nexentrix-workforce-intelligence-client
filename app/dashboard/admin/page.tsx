"use client";

import { useUserStore } from "@/store/userStore";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const Page = () => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const isLoggingOut = useUserStore((state) => state.isLoggingOut);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading || isLoggingOut || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-2 p-6">
      <p>Admin Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>

      <button
        onClick={handleLogout}
        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Page;