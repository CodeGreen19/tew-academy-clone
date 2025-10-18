"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { getAllAppliedBranches } from "../queries";

export default function AppliedBranchesPreview({ id }: { id: string }) {
  const { data } = useSuspenseQuery({
    queryFn: () => getAllAppliedBranches(),
    queryKey: ["apply-branch"],
  });
  const previewData = data.find((item) => item.id === id);
  if (!previewData) return <div>No data found</div>;
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente officiis
      velit explicabo amet aspernatur expedita fugit numquam deserunt est! Dicta
      excepturi eum corporis laborum delectus ex autem nesciunt maiores non?
      <div>{previewData.name}</div>
      <div>{previewData.institutionName}</div>
      <div>{previewData.address}</div>
    </div>
  );
}
