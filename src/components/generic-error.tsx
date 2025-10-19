import { AlertCircle } from "lucide-react";

export default function GenericError() {
  return (
    <div className="flex items-center justify-center gap-2 w-full text-red-500">
      <AlertCircle className="size-4" />
      Error occurs
    </div>
  );
}
