import { ICustomer } from "./orderTransaction/ICustomerTransaction";
import { IOrder } from "./orderTransaction/IOrderTransaction";

/** トランザクションレスポンス */
export interface ITransactionResponse {
  /** 顧客データ */
  customer: ICustomer[];
  /** 注文データ */
  order: IOrder[];
}
