import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const clients = mysqlTable("clients", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).references(() => users.id).unique(),
  managerId: bigint("managerId", { mode: "number", unsigned: true }).references(() => users.id),
  status: mysqlEnum("status", ["active", "inactive", "pending"]).default("pending"),
  complianceScore: int("complianceScore").default(0),
  notes: text("notes"),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 10 }),
  phone: varchar("phone", { length: 20 }),
  companyName: varchar("companyName", { length: 255 }),
  businessCategory: varchar("businessCategory", { length: 100 }),
  eprPlastic: int("eprPlastic").default(0),
  eprBattery: int("eprBattery").default(0),
  eprTyre: int("eprTyre").default(0),
  eprOil: int("eprOil").default(0),
  eprPlasticFulfilled: int("eprPlasticFulfilled").default(0),
  eprBatteryFulfilled: int("eprBatteryFulfilled").default(0),
  eprTyreFulfilled: int("eprTyreFulfilled").default(0),
  eprOilFulfilled: int("eprOilFulfilled").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["pending", "in_progress", "review", "completed"]).default("pending"),
  priority: mysqlEnum("priority", ["low", "normal", "high", "urgent"]).default("normal"),
  assignedTo: bigint("assignedTo", { mode: "number", unsigned: true }).references(() => users.id),
  createdBy: bigint("createdBy", { mode: "number", unsigned: true }).references(() => users.id),
  clientId: bigint("clientId", { mode: "number", unsigned: true }).references(() => clients.id),
  dueDate: timestamp("dueDate"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const documents = mysqlTable("documents", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }),
  size: bigint("size", { mode: "number" }),
  url: varchar("url", { length: 500 }),
  category: mysqlEnum("category", ["compliance", "report", "contract", "invoice", "other"]).default("other"),
  clientId: bigint("clientId", { mode: "number", unsigned: true }).references(() => clients.id),
  uploadedBy: bigint("uploadedBy", { mode: "number", unsigned: true }).references(() => users.id),
  version: int("version").default(1),
  isApproved: boolean("isApproved").default(false),
  approvedBy: bigint("approvedBy", { mode: "number", unsigned: true }).references(() => users.id),
  approvedAt: timestamp("approvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const reports = mysqlTable("reports", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["monthly", "quarterly", "annual", "epr_compliance"]).notNull(),
  clientId: bigint("clientId", { mode: "number", unsigned: true }).references(() => clients.id),
  generatedBy: bigint("generatedBy", { mode: "number", unsigned: true }).references(() => users.id),
  url: varchar("url", { length: 500 }),
  status: mysqlEnum("status", ["draft", "generated", "approved"]).default("draft"),
  periodStart: timestamp("periodStart"),
  periodEnd: timestamp("periodEnd"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).references(() => users.id).notNull(),
  type: mysqlEnum("type", ["task", "document", "deadline", "system", "approval"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  isRead: boolean("isRead").default(false),
  link: varchar("link", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const auditLogs = mysqlTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entity: varchar("entity", { length: 100 }),
  entityId: bigint("entityId", { mode: "number", unsigned: true }),
  oldValue: text("oldValue"),
  newValue: text("newValue"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  companyName: varchar("companyName", { length: 255 }),
  businessCategory: varchar("businessCategory", { length: 100 }),
  message: text("message"),
  status: mysqlEnum("status", ["new", "read", "replied", "archived"]).default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const serviceRequests = mysqlTable("service_requests", {
  id: serial("id").primaryKey(),
  clientId: bigint("clientId", { mode: "number", unsigned: true }).references(() => clients.id),
  serviceType: mysqlEnum("serviceType", [
    "battery_epr",
    "plastic_epr",
    "tyre_epr",
    "used_oil_epr",
    "waste_collection",
    "epr_credit",
    "cpcb_registration",
    "annual_filing",
    "consulting",
  ]).notNull(),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "cancelled"]).default("pending"),
  description: text("description"),
  assignedTo: bigint("assignedTo", { mode: "number", unsigned: true }).references(() => users.id),
  requestedDate: timestamp("requestedDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
