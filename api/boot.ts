import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { compress } from "hono/compress";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";

const app = new Hono<{ Bindings: HttpBindings }>();

// ── Security Headers ──────────────────────────────────────────────
app.use(
  secureHeaders({
    xFrameOptions: "DENY",
    xContentTypeOptions: "nosniff",
    referrerPolicy: "strict-origin-when-cross-origin",
    strictTransportSecurity: env.isProduction
      ? "max-age=31536000; includeSubDomains"
      : false,
  }),
);

// ── CORS ─────────────────────────────────────────────────────────
app.use(
  "/api/*",
  cors({
    origin: env.isProduction
      ? ["https://srishtieco.vercel.app"]
      : ["http://localhost:3000"],
    credentials: true,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

// ── CSRF Protection ───────────────────────────────────────────────
app.use(
  "/api/trpc/*",
  csrf({
    origin: env.isProduction
      ? "https://srishtieco.vercel.app"
      : "http://localhost:3000",
  }),
);

// ── Compression ───────────────────────────────────────────────────
app.use(compress());

// ── Body Limit (reduced from 50 MB to 10 MB) ─────────────────────
app.use(bodyLimit({ maxSize: 10 * 1024 * 1024 }));

// ── Routes ────────────────────────────────────────────────────────
app.get(Paths.oauthCallback, createOAuthCallbackHandler());

app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
    onError:
      env.isProduction
        ? undefined
        : ({ path, error }) => {
            console.error(`[tRPC] ${path}:`, error.message);
          },
  });
});

app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction && !process.env.VERCEL) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
