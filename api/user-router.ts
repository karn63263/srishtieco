import { z } from "zod";
import { eq, desc, like, or, and, sql } from "drizzle-orm";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, clients } from "@db/schema";

export const userRouter = createRouter({
  list: adminQuery
    .input(
      z.object({
        search: z.string().optional(),
        role: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];
      if (input?.search) {
        conditions.push(
          or(
            like(users.name, `%${input.search}%`),
            like(users.email, `%${input.search}%`)
          )
        );
      }
      if (input?.role) {
        conditions.push(eq(users.role, input.role as "user" | "admin"));
      }
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(users)
          .where(whereClause)
          .limit(input?.limit ?? 50)
          .offset(input?.offset ?? 0)
          .orderBy(desc(users.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(users).where(whereClause),
      ]);
      return {
        users: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  getById: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [user] = await db.select().from(users).where(eq(users.id, input.id)).limit(1);
      if (!user) return null;
      let clientData = null;
      if (user.role === "user") {
        const [c] = await db.select().from(clients).where(eq(clients.userId, user.id)).limit(1);
        clientData = c ?? null;
      }
      return { ...user, clientProfile: clientData };
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        role: z.enum(["user", "admin"]).default("user"),
        unionId: z.string().optional(),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(users).values({
        name: input.name,
        email: input.email,
        role: input.role,
        unionId: input.unionId ?? null,
        avatar: input.avatar ?? null,
      });
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        role: z.enum(["user", "admin"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(users).set(data).where(eq(users.id, id));
      return { success: true };
    }),

  updateRole: adminQuery
    .input(z.object({ id: z.number(), role: z.enum(["user", "admin"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(users).set({ role: input.role }).where(eq(users.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(users).where(eq(users.id, input.id));
      return { success: true };
    }),

  me: authedQuery.query(({ ctx }) => {
    return ctx.user;
  }),
});
