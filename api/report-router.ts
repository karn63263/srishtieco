import { z } from "zod";
import { eq, desc, sql, and } from "drizzle-orm";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reports } from "@db/schema";

export const reportRouter = createRouter({
  list: adminQuery
    .input(
      z.object({
        type: z.string().optional(),
        clientId: z.number().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];
      if (input?.type) {
        conditions.push(eq(reports.type, input.type as "monthly" | "quarterly" | "annual" | "epr_compliance"));
      }
      if (input?.clientId) {
        conditions.push(eq(reports.clientId, input.clientId));
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(reports)
          .where(where)
          .limit(input?.limit ?? 50)
          .offset(input?.offset ?? 0)
          .orderBy(desc(reports.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(reports).where(where),
      ]);
      return {
        reports: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  generate: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        type: z.enum(["monthly", "quarterly", "annual", "epr_compliance"]),
        clientId: z.number().optional(),
        periodStart: z.string().optional(),
        periodEnd: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(reports).values({
        title: input.title,
        type: input.type,
        clientId: input.clientId ?? null,
        generatedBy: ctx.user.id,
        periodStart: input.periodStart ? new Date(input.periodStart) : null,
        periodEnd: input.periodEnd ? new Date(input.periodEnd) : null,
        status: "generated",
      });
      return result;
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["draft", "generated", "approved"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(reports).set({ status: input.status }).where(eq(reports.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(reports).where(eq(reports.id, input.id));
      return { success: true };
    }),
});
