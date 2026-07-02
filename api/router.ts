import { authRouter } from "./auth-router";
import { userRouter } from "./user-router";
import { clientMgmtRouter } from "./client-mgmt-router";
import { taskRouter } from "./task-router";
import { docRouter } from "./doc-router";
import { reportRouter } from "./report-router";
import { notificationRouter } from "./notification-router";
import { contactRouter } from "./contact-router";
import { dashboardRouter } from "./dashboard-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  user: userRouter,
  clientMgmt: clientMgmtRouter,
  task: taskRouter,
  doc: docRouter,
  report: reportRouter,
  notification: notificationRouter,
  contact: contactRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
