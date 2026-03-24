"use client";

import AuthProvider from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
