import { relations } from "drizzle-orm";
import { users, clients, tasks, documents, reports, notifications, auditLogs, serviceRequests } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  clientProfile: many(clients, { relationName: "userToClient" }),
  assignedTasks: many(tasks, { relationName: "userAssignedTasks" }),
  createdTasks: many(tasks, { relationName: "userCreatedTasks" }),
  uploadedDocuments: many(documents, { relationName: "userUploadedDocs" }),
  generatedReports: many(reports, { relationName: "userGeneratedReports" }),
  notifications: many(notifications),
  auditLogs: many(auditLogs),
  managedClients: many(clients, { relationName: "managerToClients" }),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, { fields: [clients.userId], references: [users.id], relationName: "userToClient" }),
  manager: one(users, { fields: [clients.managerId], references: [users.id], relationName: "managerToClients" }),
  tasks: many(tasks),
  documents: many(documents),
  reports: many(reports),
  serviceRequests: many(serviceRequests),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  assignee: one(users, { fields: [tasks.assignedTo], references: [users.id], relationName: "userAssignedTasks" }),
  creator: one(users, { fields: [tasks.createdBy], references: [users.id], relationName: "userCreatedTasks" }),
  client: one(clients, { fields: [tasks.clientId], references: [clients.id] }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  client: one(clients, { fields: [documents.clientId], references: [clients.id] }),
  uploader: one(users, { fields: [documents.uploadedBy], references: [users.id], relationName: "userUploadedDocs" }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  client: one(clients, { fields: [reports.clientId], references: [clients.id] }),
  generator: one(users, { fields: [reports.generatedBy], references: [users.id], relationName: "userGeneratedReports" }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, { fields: [auditLogs.userId], references: [users.id] }),
}));

export const serviceRequestsRelations = relations(serviceRequests, ({ one }) => ({
  client: one(clients, { fields: [serviceRequests.clientId], references: [clients.id] }),
  assignee: one(users, { fields: [serviceRequests.assignedTo], references: [users.id] }),
}));
