import { z } from "zod";
import { eq, desc, sql, and } from "drizzle-orm";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { documents } from "@db/schema";

export const docRouter = createRouter({
  list: adminQuery
    .input(
      z.object({
        clientId: z.number().optional(),
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];
      if (input?.clientId) {
        conditions.push(eq(documents.clientId, input.clientId));
      }
      if (input?.category) {
        conditions.push(eq(documents.category, input.category as "compliance" | "report" | "contract" | "invoice" | "other"));
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(documents)
          .where(where)
          .limit(input?.limit ?? 50)
          .offset(input?.offset ?? 0)
          .orderBy(desc(documents.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(documents).where(where),
      ]);
      return {
        documents: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  getById: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [doc] = await db.select().from(documents).where(eq(documents.id, input.id)).limit(1);
      return doc ?? null;
    }),

  upload: authedQuery
    .input(
      z.object({
        name: z.string().min(1),
        type: z.string().optional(),
        size: z.number().optional(),
        url: z.string().optional(),
        category: z.enum(["compliance", "report", "contract", "invoice", "other"]).default("other"),
        clientId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(documents).values({
        name: input.name,
        type: input.type ?? null,
        size: input.size ?? null,
        url: input.url ?? null,
        category: input.category,
        clientId: input.clientId ?? null,
        uploadedBy: ctx.user.id,
      });
      return result;
    }),

  approve: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      await db
        .update(documents)
        .set({
          isApproved: true,
          approvedBy: ctx.user.id,
          approvedAt: new Date(),
        })
        .where(eq(documents.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(documents).where(eq(documents.id, input.id));
      return { success: true };
    }),
});
