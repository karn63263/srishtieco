import { handle } from "hono/vercel";
import app from "./boot";

// Vercel serverless function handler (Node.js runtime)
export default handle(app);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
