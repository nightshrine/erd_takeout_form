import { GET_TRANSACTION_API } from "../constants/ApiConstants";
import { ITransactionResponse } from "../definitions/ITransactionResponse";
import OrderTransaction from "../transaction/OrderTransaction";
import { ApiService } from "./ApiService";

/**
 * トランザクションデータ関連サービス
 */
export class TransactionService {
  /**
   * トランザクションデータを取得
   */
  public static async get(): Promise<ITransactionResponse> {
    const transaction = await ApiService.callGetApi<ITransactionResponse>(
      GET_TRANSACTION_API
    );
    return transaction;
  }

  /**
   * OrderTransactionへセット
   */
  public static setTransaction(transaction: ITransactionResponse): void {
    // 顧客リスト
    const customerList = transaction.customer;
    // 注文リスト
    const orderList = transaction.order;
    // 顧客データ、注文データをセット
    OrderTransaction.set(customerList, orderList);
  }
}
