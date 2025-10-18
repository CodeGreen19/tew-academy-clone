"use server";
import { db } from "@/drizzle/db";
import { students } from "@/drizzle/schema";

export async function getStudentLists() {
  return db.select().from(students);
}
