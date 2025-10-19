import { AppPage } from "@/components/sidebar/app-page";
import React from "react";
const data = {
  navMain: [
    {
      title: "Overviews",

      items: [
        {
          title: "Analytics",
          url: "/admin/overviews/analytics",
        },
      ],
    },
    {
      title: "Branches",

      items: [
        {
          title: "Approved branches",
          url: "/admin/branches/approved-branches",
        },
        {
          title: "Applied branches",
          url: "/admin/branches/applied-branches",
        },
      ],
    },
  ],
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AppPage
      type="admin"
      institutionName="branch management system"
      data={data}
    >
      {children}
    </AppPage>
  );
}
