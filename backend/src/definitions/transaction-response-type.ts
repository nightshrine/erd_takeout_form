import { IOrder } from "./transaction/order-type";
import { ICustomer } from "./transaction/customer-type";

/** トランザクションレスポンス */
export interface ITransactionResponse {
  /** 顧客データ */
  customer: ICustomer[];
  /** 注文データ */
  order: IOrder[];
}
