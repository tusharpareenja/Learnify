import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema/schema.js",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:prqJ5RIG4Lna@ep-long-heart-a5dgkfoa.us-east-2.aws.neon.tech/neondb?sslmode=require"
  }
});
