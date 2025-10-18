import React from "react";
import { Spinner } from "./ui/spinner";

export default function GenericSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2 w-full text-primary">
      <Spinner />
      Refetching....
    </div>
  );
}
