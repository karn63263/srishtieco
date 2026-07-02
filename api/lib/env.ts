import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  appId: required("APP_ID"),
  appSecret: required("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  // OAuth provider URLs (support both legacy KIMI_ prefix and new AUTH_ prefix)
  authUrl: process.env.AUTH_URL ?? process.env.KIMI_AUTH_URL ?? "",
  openUrl: process.env.OPEN_URL ?? process.env.KIMI_OPEN_URL ?? "",
  ownerUnionId: process.env.OWNER_UNION_ID ?? "",
};
