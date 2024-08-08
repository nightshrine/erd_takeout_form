import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getInitMaster } from "./services/get-Init-master-service";
import { corsMiddleware } from "./middleware/cors";
import { IOrderRequest } from "../../frontend/src/definitions/IOrderRequest";
import { postOrderService } from "./services/post-order-service";
import { getTransaction } from "./services/get-transaction-service";

const app = new Hono();

const frontBaseUrl: string =
  process.env.FRONT_BASE_URL || "http://localhost:3000";

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// CORSの設定 FRONT_BASE_URLを設定する
app.use("*", corsMiddleware(frontBaseUrl));

// マスタの初期値を取得
app.get("/api/init/master", async (c) => {
  const initMaster = await getInitMaster();
  return c.json(initMaster);
});

// トランザクションデータを取得
app.get("/api/get/transaction", async (c) => {
  const transaction = await getTransaction();
  return c.json(transaction);
});

// 注文を受け付ける
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
