import GenericSkeleton from "@/components/generic-loading";
import { Suspense } from "react";
import { StudentListsTable } from "../components/student-lists-table";
import { getStudentLists } from "../queries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient } from "@/tanstack-query/get-query-client";

export default async function StudentListsPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryFn: () => getStudentLists(),
    queryKey: ["students"],
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<GenericSkeleton />}>
            <StudentListsTable />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
