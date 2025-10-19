import { ThemeProvider } from "@/components/theme-provider";
import AuthLayout from "@/features/auth/layout";
import React from "react";

export default function layout(props: LayoutProps<"/">) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem
      forcedTheme="dark"
    >
      <AuthLayout {...props} />;
    </ThemeProvider>
  );
}
