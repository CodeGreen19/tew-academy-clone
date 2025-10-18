import { getQueryClient } from "@/tanstack-query/get-query-client";
import React, { Suspense } from "react";
import { getAllAppliedBranches } from "../queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import AppliedBranchesTable from "../components/applied-branches-table";
import GenericError from "@/components/generic-error";
import GenericLoading from "@/components/generic-loading";

export default async function AppliedBranchesPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryFn: () => getAllAppliedBranches(),
    queryKey: ["apply-branch"],
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<GenericError />}>
          <Suspense fallback={<GenericLoading />}>
            <AppliedBranchesTable />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
