import { AppPage } from "@/components/sidebar/app-page";
import React from "react";
const data = {
  navMain: [
    {
      title: "Overviews",

      items: [
        {
          title: "analytics",
          url: "/dashboard/overviews/analytics",
        },
      ],
    },
    {
      title: "Students",

      items: [
        {
          title: "Add students",
          url: "/dashboard/students/add",
        },
        {
          title: "Students lists",
          url: "/dashboard/students/lists",
          isActive: true,
        },
        {
          title: "Payments histories",
          url: "/dashboard/students/payment-histories",
        },
      ],
    },
  ],
};

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <AppPage type="branch" institutionName="The earn way academy" data={data}>
      {children}
    </AppPage>
  );
}
