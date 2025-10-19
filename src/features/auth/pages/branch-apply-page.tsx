import React from "react";
import ApplyBranchForm from "../components/branch-apply-form";

export default function BranchApplyPage() {
  return (
    <div className="p-4 max-w-xl m-auto">
      <h2 className="text-xl font-bold mb-5">Apply for branch</h2>
      <ApplyBranchForm />
    </div>
  );
}
