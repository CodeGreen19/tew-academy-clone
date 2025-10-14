import { ThemeProvider } from "@/components/theme-provider";
import DashboardLayout from "@/features/dashboard/layou";
import React from "react";

export default function layout(props: LayoutProps<"/dashboard">) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <DashboardLayout {...props} />
    </ThemeProvider>
  );
}
