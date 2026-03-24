import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { roleRoutes } from "@/lib/utils";
import { Role } from "@/types/types";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const route = roleRoutes[user.role as Role];

  if (!route) redirect("/login");

  redirect(route);
}
