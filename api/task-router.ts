import { z } from "zod";
import { eq, desc, sql, and } from "drizzle-orm";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { tasks } from "@db/schema";

export const taskRouter = createRouter({
  list: authedQuery
    .input(
      z.object({
        status: z.string().optional(),
        clientId: z.number().optional(),
        assignedTo: z.number().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];
      if (input?.status) {
        conditions.push(eq(tasks.status, input.status as "pending" | "in_progress" | "review" | "completed"));
      }
      if (input?.clientId) {
        conditions.push(eq(tasks.clientId, input.clientId));
      }
      if (input?.assignedTo) {
        conditions.push(eq(tasks.assignedTo, input.assignedTo));
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(tasks)
          .where(where)
          .limit(input?.limit ?? 50)
          .offset(input?.offset ?? 0)
          .orderBy(desc(tasks.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(tasks).where(where),
      ]);
      return {
        tasks: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  getById: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [task] = await db.select().from(tasks).where(eq(tasks.id, input.id)).limit(1);
      return task ?? null;
    }),

  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        status: z.enum(["pending", "in_progress", "review", "completed"]).default("pending"),
        priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
        assignedTo: z.number().optional(),
        clientId: z.number().optional(),
        dueDate: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(tasks).values({
        title: input.title,
        description: input.description ?? null,
        status: input.status,
        priority: input.priority,
        assignedTo: input.assignedTo ?? null,
        createdBy: ctx.user.id,
        clientId: input.clientId ?? null,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
      });
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        priority: z.enum(["low", "normal", "high", "urgent"]).optional(),
        assignedTo: z.number().optional().nullable(),
        clientId: z.number().optional().nullable(),
        dueDate: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          if (key === "dueDate" && value) {
            updateData[key] = new Date(value as string);
          } else {
            updateData[key] = value;
          }
        }
      }
      await db.update(tasks).set(updateData).where(eq(tasks.id, id));
      return { success: true };
    }),

  updateStatus: authedQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "in_progress", "review", "completed"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const updateData: Record<string, unknown> = { status: input.status };
      if (input.status === "completed") {
        updateData.completedAt = new Date();
      }
      await db.update(tasks).set(updateData).where(eq(tasks.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(tasks).where(eq(tasks.id, input.id));
      return { success: true };
    }),

  getKanban: adminQuery.query(async () => {
    const db = getDb();
    const allTasks = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
    return {
      pending: allTasks.filter((t: any) => t.status === "pending"),
      in_progress: allTasks.filter((t: any) => t.status === "in_progress"),
      review: allTasks.filter((t: any) => t.status === "review"),
      completed: allTasks.filter((t: any) => t.status === "completed"),
    };
  }),

  getStats: adminQuery.query(async () => {
    const db = getDb();
    const [total, pending, inProgress, review, completed] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(tasks),
      db.select({ count: sql<number>`count(*)` }).from(tasks).where(eq(tasks.status, "pending")),
      db.select({ count: sql<number>`count(*)` }).from(tasks).where(eq(tasks.status, "in_progress")),
      db.select({ count: sql<number>`count(*)` }).from(tasks).where(eq(tasks.status, "review")),
      db.select({ count: sql<number>`count(*)` }).from(tasks).where(eq(tasks.status, "completed")),
    ]);
    return {
      total: total[0]?.count ?? 0,
      pending: pending[0]?.count ?? 0,
      inProgress: inProgress[0]?.count ?? 0,
      review: review[0]?.count ?? 0,
      completed: completed[0]?.count ?? 0,
    };
  }),
});
