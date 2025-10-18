"use client";

import { useMutation } from "@tanstack/react-query";
import { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LoadingSwap } from "./ui/loading-swap";
import { getQueryClient } from "@/tanstack-query/get-query-client";

type MutationButtonType = {
  action: () => Promise<{
    success: boolean;
    message: string;
  }>;
  children: ReactNode;
  invalidateKeys?: string[];
  className?: string;
  onSuccess?: () => void;
};
export default function MutationButton({
  action,
  invalidateKeys,
  children,
  className,
  onSuccess,
}: MutationButtonType) {
  const queryClient = getQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: action,
    onSuccess: ({ success, message }) => {
      if (success) toast.success(message);
      if (!success) toast.success(message);

      if (onSuccess) onSuccess();
      if (invalidateKeys) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }
    },
  });
  return (
    <Button className={className} disabled={isPending} onClick={() => mutate()}>
      <LoadingSwap isLoading={isPending}>{children}</LoadingSwap>
    </Button>
  );
}
