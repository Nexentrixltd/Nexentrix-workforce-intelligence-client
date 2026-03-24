import { QueryProvider } from "@/components/providers/QueryProvider";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
