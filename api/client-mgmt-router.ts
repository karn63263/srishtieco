import { z } from "zod";
import { eq, desc, sql, and } from "drizzle-orm";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { clients, users } from "@db/schema";

export const clientMgmtRouter = createRouter({
  list: adminQuery
    .input(
      z.object({
        status: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];
      if (input?.status) {
        conditions.push(eq(clients.status, input.status as "active" | "inactive" | "pending"));
      }
      if (input?.search) {
        conditions.push(sql`${clients.companyName} LIKE ${`%${input.search}%`}`);
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const [data, countResult] = await Promise.all([
        db
          .select({
            id: clients.id,
            companyName: clients.companyName,
            status: clients.status,
            complianceScore: clients.complianceScore,
            city: clients.city,
            state: clients.state,
            phone: clients.phone,
            businessCategory: clients.businessCategory,
            managerId: clients.managerId,
            createdAt: clients.createdAt,
            eprPlastic: clients.eprPlastic,
            eprBattery: clients.eprBattery,
            eprTyre: clients.eprTyre,
            eprOil: clients.eprOil,
            eprPlasticFulfilled: clients.eprPlasticFulfilled,
            eprBatteryFulfilled: clients.eprBatteryFulfilled,
            eprTyreFulfilled: clients.eprTyreFulfilled,
            eprOilFulfilled: clients.eprOilFulfilled,
          })
          .from(clients)
          .where(where)
          .limit(input?.limit ?? 50)
          .offset(input?.offset ?? 0)
          .orderBy(desc(clients.createdAt)),
        db.select({ count: sql<number>`count(*)` }).from(clients).where(where),
      ]);
      return {
        clients: data,
        total: countResult[0]?.count ?? 0,
      };
    }),

  getById: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [client] = await db.select().from(clients).where(eq(clients.id, input.id)).limit(1);
      if (!client) return null;
      let userData = null;
      if (client.userId) {
        const [u] = await db.select().from(users).where(eq(users.id, client.userId)).limit(1);
        userData = u ?? null;
      }
      let managerData = null;
      if (client.managerId) {
        const [m] = await db.select().from(users).where(eq(users.id, client.managerId)).limit(1);
        managerData = m ?? null;
      }
      return { ...client, user: userData, manager: managerData };
    }),

  create: adminQuery
    .input(
      z.object({
        companyName: z.string().min(1),
        businessCategory: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        managerId: z.number().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(clients).values({
        companyName: input.companyName,
        businessCategory: input.businessCategory ?? null,
        phone: input.phone ?? null,
        address: input.address ?? null,
        city: input.city ?? null,
        state: input.state ?? null,
        pincode: input.pincode ?? null,
        managerId: input.managerId ?? null,
        notes: input.notes ?? null,
        status: "active",
      });
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        companyName: z.string().optional(),
        businessCategory: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        status: z.enum(["active", "inactive", "pending"]).optional(),
        managerId: z.number().optional().nullable(),
        notes: z.string().optional(),
        complianceScore: z.number().optional(),
        eprPlastic: z.number().optional(),
        eprBattery: z.number().optional(),
        eprTyre: z.number().optional(),
        eprOil: z.number().optional(),
        eprPlasticFulfilled: z.number().optional(),
        eprBatteryFulfilled: z.number().optional(),
        eprTyreFulfilled: z.number().optional(),
        eprOilFulfilled: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) updateData[key] = value;
      }
      await db.update(clients).set(updateData).where(eq(clients.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(clients).where(eq(clients.id, input.id));
      return { success: true };
    }),

  getStats: adminQuery.query(async () => {
    const db = getDb();
    const [total, active, pending, avgScore] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(clients),
      db.select({ count: sql<number>`count(*)` }).from(clients).where(eq(clients.status, "active")),
      db.select({ count: sql<number>`count(*)` }).from(clients).where(eq(clients.status, "pending")),
      db.select({ avg: sql<number>`avg(complianceScore)` }).from(clients),
    ]);
    return {
      total: total[0]?.count ?? 0,
      active: active[0]?.count ?? 0,
      pending: pending[0]?.count ?? 0,
      averageComplianceScore: Math.round(avgScore[0]?.avg ?? 0),
    };
  }),
});
