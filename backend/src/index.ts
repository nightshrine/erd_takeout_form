import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { IOrderRequest } from "../../frontend/src/definitions/IOrderRequest";
import PostOrderService from "./services/post-order-service";
import { D1Database } from "@cloudflare/workers-types";
import GetTransactionService from "./services/get-transaction-service";
import GetInitMasterService from "./services/get-Init-master-service";

type Bindings = {
  DB: D1Database;
  FRONT_BASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORSの設定 FRONT_BASE_URLを設定する
app.all("*", (c, next) => {
  const frontBaseUrl = c.env.FRONT_BASE_URL || "http://localhost:3000";
  corsMiddleware(frontBaseUrl);
  return next();
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// マスタの初期値を取得
app.get("/api/init/master", async (c) => {
  const getinitMasterService = new GetInitMasterService(c.env);
  const initMaster = await getinitMasterService.getInitMaster();
  return c.json(initMaster);
});

// トランザクションデータを取得
app.get("/api/get/transaction", async (c) => {
  const getTransactionService = new GetTransactionService(c.env);
  const transaction = await getTransactionService.getTransaction();
  return c.json(transaction);
});

// 注文を受け付ける
app.post("/api/order", async (c) => {
  const orderRequest: IOrderRequest = await c.req.json();
  const postOrderService = new PostOrderService(c.env);
  await postOrderService.postOrder(orderRequest);

  return c.json({ result: "注文しました！" });
});

export default app;
