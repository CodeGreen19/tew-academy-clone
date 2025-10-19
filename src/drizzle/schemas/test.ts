import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { organization } from "./auth";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  task: varchar("task", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  orgId: text("org_id")
    .notNull()
    .references(() => organization.id),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  org: one(organization, {
    fields: [tasks.orgId],
    references: [organization.id],
  }),
}));
