import GenericSkeleton from "@/components/generic-skeleton";
import { Suspense } from "react";
import { StudentListsTable } from "../components/student-lists-table";
import { getStudentLists } from "../queries";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

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
