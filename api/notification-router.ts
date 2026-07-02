import { z } from "zod";
import { eq, desc, sql, and } from "drizzle-orm";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { notifications } from "@db/schema";

export const notificationRouter = createRouter({
  list: authedQuery
    .input(
      z.object({
        isRead: z.boolean().optional(),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input, ctx }) => {
      const db = getDb();
      const conditions = [eq(notifications.userId, ctx.user.id)];
      if (input?.isRead !== undefined) {
        conditions.push(eq(notifications.isRead, input.isRead));
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(notifications)
          .where(where)
          .limit(input?.limit ?? 20)
          .offset(input?.offset ?? 0)
          .orderBy(desc(notifications.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(notifications).where(where),
      ]);
      return {
        notifications: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  create: authedQuery
    .input(
      z.object({
        userId: z.number(),
        type: z.enum(["task", "document", "deadline", "system", "approval"]),
        title: z.string().min(1),
        message: z.string().optional(),
        link: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(notifications).values({
        userId: input.userId,
        type: input.type,
        title: input.title,
        message: input.message ?? null,
        link: input.link ?? null,
      });
      return { success: true };
    }),

  markRead: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, input.id));
      return { success: true };
    }),

  markAllRead: authedQuery.mutation(async ({ ctx }) => {
    const db = getDb();
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, ctx.user.id));
    return { success: true };
  }),

  getUnreadCount: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(notifications)
      .where(and(eq(notifications.userId, ctx.user.id), eq(notifications.isRead, false)));
    return result[0]?.count ?? 0;
  }),
});
