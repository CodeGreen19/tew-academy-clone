import { z } from "zod";
export const AddStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string(),
  phoneNumber: z
    .string()
    .min(11, "Phone number must be 11 char")
    .max(11, "Phone number must be 11 char"),
});

export type AddStudentSchemaType = z.infer<typeof AddStudentSchema>;
export type AddStudentSchemaShape = typeof AddStudentSchema.shape;
