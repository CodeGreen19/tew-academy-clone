import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const applyBranches = pgTable("apply_branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  institutionName: varchar("insititution_name", { length: 255 }).notNull(),
  status: varchar("status", {
    length: 30,
    enum: ["pending", "approved", "canceled"],
  })
    .notNull()
    .default("pending"),
  address: varchar("address", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
