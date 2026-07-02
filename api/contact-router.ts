import { z } from "zod";
import { eq, desc, sql, and } from "drizzle-orm";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contacts } from "@db/schema";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        companyName: z.string().optional(),
        businessCategory: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        companyName: input.companyName ?? null,
        businessCategory: input.businessCategory ?? null,
        message: input.message ?? null,
      });
      return result;
    }),

  list: adminQuery
    .input(
      z.object({
        status: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];
      if (input?.status) {
        conditions.push(eq(contacts.status, input.status as "new" | "read" | "replied" | "archived"));
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(contacts)
          .where(where)
          .limit(input?.limit ?? 50)
          .offset(input?.offset ?? 0)
          .orderBy(desc(contacts.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(contacts).where(where),
      ]);
      return {
        contacts: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(contacts).set({ status: input.status }).where(eq(contacts.id, input.id));
      return { success: true };
    }),
});
