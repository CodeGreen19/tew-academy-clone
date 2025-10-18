"use server";

import { db } from "@/drizzle/db";
import { applyBranches } from "@/drizzle/schema";

export async function getAllAppliedBranches() {
  return db.select().from(applyBranches);
}
