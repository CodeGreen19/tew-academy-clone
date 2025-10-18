"use server";

import { db } from "@/drizzle/db";
import { students } from "@/drizzle/schema";
import { successMessage } from "@/lib/helpers";
import { eq } from "drizzle-orm";
import { AddStudentSchemaType } from "./schema";

export async function createStudent(input: AddStudentSchemaType) {
  await db.insert(students).values(input);
  return successMessage("New student saved");
}
export async function deleteStudent(studentId: string) {
  await db.delete(students).where(eq(students.id, studentId));
  return successMessage("Student deleted");
}
