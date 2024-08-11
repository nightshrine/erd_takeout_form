import { ICustomerTransaction } from "../definitions/orderTransaction/ICustomerTransaction";
import { IOrderTransaction } from "../definitions/orderTransaction/IOrderTransaction";

/**
 * 注文トランザクション
 */
class OrderTransaction {
  /** 顧客データ */
  private customerList: ICustomerTransaction[] = [];
  /** 注文データ */
  private orderList: IOrderTransaction[] = [];

  /**
   * 注文トランザクションを格納
   * @param customerList 顧客データ
   * @param orderList 注文データ
   */
  public set(
    customerList: ICustomerTransaction[],
    orderList: IOrderTransaction[]
  ): void {
    this.customerList = customerList;
    this.orderList = orderList;
  }

  /**
   * 顧客データを取得
   * @returns 顧客データリスト
   */
  public getCustomerList(): ICustomerTransaction[] {
    return this.customerList;
  }
  /**
   * 顧客データをidで取得
   * @param customerId 顧客ID
   * @returns 顧客データ
   */
  public getCustomerById(customerId: number): ICustomerTransaction | undefined {
    return this.customerList.find((customer) => customer.id === customerId);
  }

  /**
   * 注文データを取得
   * @returns 注文データリスト
   */
  public getOrderList(): IOrderTransaction[] {
    return this.orderList;
  }
  /**
   * 注文データをidで取得
   * @param orderId 注文ID
   * @returns 注文データ
   */
  public getOrderById(orderId: number): IOrderTransaction | undefined {
    return this.orderList.find((order) => order.id === orderId);
  }
}

export default new OrderTransaction();
