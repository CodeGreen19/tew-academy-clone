"use client";

import CustomFormField from "@/components/form/custom-form-field";
import FormSubmitButtons from "@/components/form/form-submit-buttons";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createStudent } from "../actions";
import {
  AddStudentSchema,
  AddStudentSchemaShape,
  AddStudentSchemaType,
} from "../schema";
import { getQueryClient } from "@/tanstack-query/get-query-client";

export default function StudentAddForm() {
  const queryClient = getQueryClient();
  const form = useForm<AddStudentSchemaType>({
    resolver: zodResolver(AddStudentSchema),
    defaultValues: {
      name: "",
      fatherName: "father ahmed",
      phoneNumber: "01870425052",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (inputs: AddStudentSchemaType) => createStudent(inputs),
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((val) => mutate(val))}
        className="space-y-4"
      >
        <CustomFormField<AddStudentSchemaShape>
          form={form}
          input="text"
          name="name"
          title="Name"
          required
        />
        <CustomFormField<AddStudentSchemaShape>
          form={form}
          input="text"
          name="fatherName"
          title="Father name"
        />
        <CustomFormField<AddStudentSchemaShape>
          form={form}
          input="text"
          name="phoneNumber"
          title="Phone number"
          required
        />

        <FormSubmitButtons onReset={() => form.reset()} isPending={isPending} />
      </form>
    </Form>
  );
}
