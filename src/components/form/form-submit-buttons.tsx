import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import SubmitButton from "./submit-button";

export default function FormSubmitButtons({
  onReset,
  submitText,
  isPending,
}: {
  submitText?: string;
  onReset?: () => void;
  isPending?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1">
      <Button
        onClick={() => onReset && onReset()}
        type="button"
        variant={"ghost"}
      >
        Reset <RefreshCcw />
      </Button>
      <SubmitButton isPending={isPending} disabled={isPending} type="submit">
        {submitText ?? "Submit"}
      </SubmitButton>
    </div>
  );
}
