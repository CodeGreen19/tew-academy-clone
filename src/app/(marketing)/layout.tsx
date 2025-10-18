import { ThemeProvider } from "@/components/theme-provider";
import MarketingLayout from "@/features/marketing/layout";
import React from "react";

export default function layout(props: LayoutProps<"/">) {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        enableSystem
        forcedTheme="dark"
      >
        <MarketingLayout {...props} />
      </ThemeProvider>
    </main>
  );
}
