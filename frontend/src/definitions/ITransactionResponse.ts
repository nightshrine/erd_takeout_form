import { ICustomerTransaction } from "./orderTransaction/ICustomerTransaction";
import { IOrderTransaction } from "./orderTransaction/IOrderTransaction";

/** トランザクションレスポンス */
export interface ITransactionResponse {
  /** 顧客データ */
  customer: ICustomerTransaction[];
  /** 注文データ */
  order: IOrderTransaction[];
}
