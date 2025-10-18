import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  fatherName: varchar("father_name", { length: 255 }),
  phoneNumber: varchar("phone_number", { length: 11 }).notNull(),
});
