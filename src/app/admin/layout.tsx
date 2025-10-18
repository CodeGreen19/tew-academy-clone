import { ThemeProvider } from "@/components/theme-provider";
import AdminLayout from "@/features/admin/layout";
import React from "react";

export default function layout(props: LayoutProps<"/admin">) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <AdminLayout {...props} />
    </ThemeProvider>
  );
}
