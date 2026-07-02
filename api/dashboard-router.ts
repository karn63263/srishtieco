import { sql, desc } from "drizzle-orm";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, clients, tasks, documents, reports, contacts } from "@db/schema";

export const dashboardRouter = createRouter({
  getStats: adminQuery.query(async () => {
    const db = getDb();
    const [
      userCount,
      clientCount,
      activeClientCount,
      taskCount,
      pendingTaskCount,
      documentCount,
      reportCount,
      contactCount,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(clients),
      db.select({ count: sql<number>`count(*)` }).from(clients).where(sql`status = 'active'`),
      db.select({ count: sql<number>`count(*)` }).from(tasks),
      db.select({ count: sql<number>`count(*)` }).from(tasks).where(sql`status = 'pending'`),
      db.select({ count: sql<number>`count(*)` }).from(documents),
      db.select({ count: sql<number>`count(*)` }).from(reports),
      db.select({ count: sql<number>`count(*)` }).from(contacts).where(sql`status = 'new'`),
    ]);

    return {
      totalUsers: userCount[0]?.count ?? 0,
      totalClients: clientCount[0]?.count ?? 0,
      activeClients: activeClientCount[0]?.count ?? 0,
      totalTasks: taskCount[0]?.count ?? 0,
      pendingTasks: pendingTaskCount[0]?.count ?? 0,
      totalDocuments: documentCount[0]?.count ?? 0,
      totalReports: reportCount[0]?.count ?? 0,
      newContacts: contactCount[0]?.count ?? 0,
    };
  }),

  getAnalytics: adminQuery.query(async () => {
    const db = getDb();
    const [taskStatus, clientStatus, recentTasks, complianceScores] = await Promise.all([
      db.select({
        status: tasks.status,
        count: sql<number>`count(*)`,
      }).from(tasks).groupBy(tasks.status),
      db.select({
        status: clients.status,
        count: sql<number>`count(*)`,
      }).from(clients).groupBy(clients.status),
      db.select().from(tasks).orderBy(desc(tasks.createdAt)).limit(10),
      db.select({
        companyName: clients.companyName,
        score: clients.complianceScore,
      }).from(clients).orderBy(desc(clients.complianceScore)).limit(10),
    ]);

    return {
      taskStatus,
      clientStatus,
      recentTasks,
      complianceScores,
    };
  }),

  getRecentActivity: adminQuery.query(async () => {
    const db = getDb();
    const [recentClients, recentTasks, recentContacts] = await Promise.all([
      db.select().from(clients).orderBy(desc(clients.createdAt)).limit(5),
      db.select().from(tasks).orderBy(desc(tasks.createdAt)).limit(5),
      db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(5),
    ]);

    const activity = [
      ...recentClients.map((c: any) => ({
        type: "client" as const,
        title: `New client: ${c.companyName}`,
        date: c.createdAt,
        status: c.status,
      })),
      ...recentTasks.map((t: any) => ({
        type: "task" as const,
        title: `Task: ${t.title}`,
        date: t.createdAt,
        status: t.status,
      })),
      ...recentContacts.map((c: any) => ({
        type: "contact" as const,
        title: `Contact from: ${c.name}`,
        date: c.createdAt,
        status: c.status,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 15);

    return activity;
  }),
});
