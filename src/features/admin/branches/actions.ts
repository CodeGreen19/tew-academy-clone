"use server";

import { db } from "@/drizzle/db";
import { applyBranches } from "@/drizzle/schema";
import { successMessage } from "@/lib/helpers";
import { eq } from "drizzle-orm";

export async function deleteApplyBranchRecord(id: string) {
  await db.delete(applyBranches).where(eq(applyBranches.id, id));
  return successMessage("Record deleted");
}
export async function applyBranchChangeStatus({
  status,
  id,
}: {
  status: (typeof applyBranches.status.enumValues)[number];
  id: string;
}) {
  await db
    .update(applyBranches)
    .set({ status })
    .where(eq(applyBranches.id, id));
  return successMessage("Status updated");
}
