"use server";

import { db } from "@/drizzle/db";
import { applyBranches } from "@/drizzle/schema";
import { asc } from "drizzle-orm";

export async function getAllAppliedBranches() {
  return db.select().from(applyBranches).orderBy(asc(applyBranches.createdAt));
}
