import { ORDER_API } from "../constants/ApiConstants";
import { IOrderRequest } from "../definitions/IOrderRequest";
import { ApiService } from "./ApiService";

/**
 * 注文サービス
 */
export class PostOrderService {
  /**
   * 注文を送信する
   */
  public static async order(orderRequest: IOrderRequest): Promise<void> {
    // 注文APIを呼び出す
    await ApiService.callPostApi<IOrderRequest>(ORDER_API, orderRequest);
  }
}
