"use server";

import { errorMessage, successMessage } from "@/lib/helpers";
import { applyBranchSchema, ApplyBranchSchemaType } from "./schema";
import { db } from "@/drizzle/db";
import { applyBranches } from "@/drizzle/schema";

export async function applyBranch(input: ApplyBranchSchemaType) {
  const data = applyBranchSchema.safeParse(input);
  if (!data.success) {
    return errorMessage("Invalid data !");
  }
  await db.insert(applyBranches).values(input);
  return successMessage("Applied for branch successfully");
}
