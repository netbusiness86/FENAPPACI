import { defineConfig } from "drizzle-kit";
import path from "path";

const url = process.env.DATABASE_URL ?? process.env.NETLIFY_DB_URL;

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  // Netlify applies migrations from this directory automatically on deploy.
  out: path.join(__dirname, "../../netlify/database/migrations"),
  dialect: "postgresql",
  ...(url && { dbCredentials: { url } }),
});
