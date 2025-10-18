import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <div className="p-4">
        <Link href={"/"}>
          <Button variant={"secondary"}>
            <ChevronLeft /> Back
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
