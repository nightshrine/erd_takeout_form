import { IProduct } from "./master/IProduct";
import { IProductCategory } from "./master/IProductCategory";

/** マスタレスポンス */
export interface IMasterResponse {
  /** 商品マスタ */
  product: IProduct[];
  /** 商品カテゴリマスタ */
  productCategory: IProductCategory[];
}
