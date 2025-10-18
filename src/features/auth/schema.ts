import { z } from "zod";
export const applyBranchSchema = z.object({
  name: z.string().min(1, "Name is required"),
  institutionName: z.string().min(1, "Institution name is required"),
  address: z.string().optional(),
});

export type ApplyBranchSchemaType = z.infer<typeof applyBranchSchema>;
export type ApplyBranchSchemaShape = typeof applyBranchSchema.shape;
