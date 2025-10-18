import React from "react";
import Navbar from "./navbar";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
