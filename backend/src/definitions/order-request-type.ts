/** 注文リクエスト */
export interface IOrderRequest {
  /** 顧客の名前 */
  customerName: string;
  /** 顧客の電話番号 */
  customerPhoneNumber: string;
  /** 注文辞書 */
  // キーが商品ID、値が注文数
  orderDict: { [key: number]: number };
}
