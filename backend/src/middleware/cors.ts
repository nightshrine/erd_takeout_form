import { cors } from "hono/cors";

const corsMiddleware = (url: string) => {
  return cors({
    origin: url,
  });
};

export { corsMiddleware };
