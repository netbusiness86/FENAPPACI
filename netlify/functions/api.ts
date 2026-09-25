import serverless from "serverless-http";
import app from "../../artifacts/api-server/src/app";

const expressHandler = serverless(app);

// Runs the existing Express API (mounted at /api) as a Netlify Function.
// Requests arrive via the /api/* rewrite in netlify.toml; if the function URL is
// used directly, map it back onto the /api prefix Express expects.
export const handler = (event: any, context: any) => {
  const prefix = "/.netlify/functions/api";
  if (typeof event.path === "string" && event.path.startsWith(prefix)) {
    event.path = "/api" + event.path.slice(prefix.length);
  }
  return expressHandler(event, context);
};
