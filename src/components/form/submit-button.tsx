import React, { ComponentProps } from "react";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";

export default function SubmitButton({
  children,
  isPending,
  ...props
}: ComponentProps<typeof Button> & { isPending?: boolean }) {
  return (
    <Button disabled={isPending} {...props}>
      <LoadingSwap isLoading={isPending ?? false}>{children}</LoadingSwap>
    </Button>
  );
}
