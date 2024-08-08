/**
 * 注文トランザクション
 */
export interface IOrderTransaction {
  id: number;
  quantity: number;
  productId: number;
  customerId: number;
}
