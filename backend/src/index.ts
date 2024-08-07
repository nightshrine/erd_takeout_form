import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getInitMaster } from "./services/GetInitMasterService";
import { corsMiddleware } from "./middleware/cors";
import { IOrderRequest } from "../../frontend/src/definitions/IOrderRequest";
import { postOrderService } from "./services/PostOrderService";

const app = new Hono();

const frontBaseUrl: string =
  process.env.FRONT_BASE_URL || "http://localhost:3000";

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// CORSの設定 FRONT_BASE_URLを設定する
app.use("*", corsMiddleware(frontBaseUrl));

app.get("/api/init/master", async (c) => {
  const initMaster = await getInitMaster();
  return c.json(initMaster);
});

app.post("/api/order", async (c) => {
  const orderRequest: IOrderRequest = await c.req.json();
  postOrderService(orderRequest);

  return c.json({ result: "注文しました！" });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
