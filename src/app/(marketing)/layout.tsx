import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        enableSystem
        forcedTheme="dark"
      >
        {children}
      </ThemeProvider>
    </main>
  );
}
