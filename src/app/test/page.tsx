import { getQueryClient } from "@/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { getTasks } from "./action";
import Lists from "./lists";

export default async function page() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={"hey you..."}>
          <Lists />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
