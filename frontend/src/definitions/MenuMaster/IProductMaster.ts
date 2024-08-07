/**
 * 商品マスタ
 */
export interface IProductMaster {
  id: number;
  name: string;
  price: number;
  priceWithTax: number;
  classification: string;
  categoryId: number;
}