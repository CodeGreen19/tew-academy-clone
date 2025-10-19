import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="h-20 flex items-center justify-between border-b px-4">
      <h2>Logo</h2>
      <div className="space-x-2">
        <Link href={"/branch-apply"}>
          <Button variant={"outline"}>Branch Apply</Button>
        </Link>
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      </div>
    </div>
  );
}
