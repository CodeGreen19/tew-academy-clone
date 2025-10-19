"use client";

import CustomFormField from "@/components/form/custom-form-field";
import FormSubmitButtons from "@/components/form/form-submit-buttons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { applyBranch } from "../action";
import {
  applyBranchSchema,
  ApplyBranchSchemaShape,
  ApplyBranchSchemaType,
} from "../schema";

export default function ApplyBranchForm() {
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const queryClient = getQueryClient();
  const form = useForm<ApplyBranchSchemaType>({
    resolver: zodResolver(applyBranchSchema),
    defaultValues: {
      name: "",
      institutionName: "",
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (inputs: ApplyBranchSchemaType) => applyBranch(inputs),
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["apply-branch"] });
      setAppliedSuccess(true);
    },
  });

  return appliedSuccess ? (
    <BranchAppliedSuccess />
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutate(v))}
        className="space-y-4"
      >
        <CustomFormField<ApplyBranchSchemaShape>
          form={form}
          input="text"
          name="name"
          title="Name"
          required
        />
        <CustomFormField<ApplyBranchSchemaShape>
          form={form}
          input="text"
          name="institutionName"
          title="Institution name"
          required
        />
        <CustomFormField<ApplyBranchSchemaShape>
          form={form}
          input="text"
          name="address"
          title="address"
        />

        <FormSubmitButtons onReset={() => form.reset()} isPending={isPending} />
      </form>
    </Form>
  );
}

function BranchAppliedSuccess() {
  return (
    <div className="w-full border-primary/50 min-h-52 border border-dashed rounded-lg flex items-center justify-center flex-col gap-2">
      <Button size={"lg"} variant={"ghost"} className="text-2xl">
        Success <CheckCircle className="text-primary size-6" />
      </Button>
      <h3 className="text-center text-pretty text-muted-foreground mx-5">
        Congratulations, your form has submitted and will be checked as well as
        you will be contacted soon.
      </h3>
    </div>
  );
}
