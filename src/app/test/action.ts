"use server";

import { db } from "@/drizzle/db";
import { tasks } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { faker } from "@faker-js/faker";

const orgId = "mSJyPSezkAvpIuqsqfDuhNSMJQG1C1cy";
export async function createTask() {
  const newTask = {
    orgId,
    task: faker.hacker.phrase(),
  };
  await db.insert(tasks).values(newTask);
}

export async function getTasks() {
  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.orgId, orgId))
    .orderBy(desc(tasks.id));
  return result;
}

export async function deleteTask(id: string) {
  await db.delete(tasks).where(eq(tasks.id, id));
}
