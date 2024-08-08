import { IProduct } from "./master/product-type";
import { IProductCategory } from "./master/product-category-type";

/** マスタレスポンス */
export interface IMasterResponse {
  /** 商品マスタ */
  product: IProduct[];
  /** 商品カテゴリマスタ */
  productCategory: IProductCategory[];
}
