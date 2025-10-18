import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const applyBranches = pgTable("apply_branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  institutionName: varchar("insititution_name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }),
});
