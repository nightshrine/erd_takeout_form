import { IProductCategoryMaster } from "./menuMaster/IProductCategoryMaster";
import { IProductMaster } from "./menuMaster/IProductMaster";

export interface IMasterResponse {
  /** 商品マスタ */
  product: IProductMaster[];
  /** 商品カテゴリマスタ */
  productCategory: IProductCategoryMaster[];
}
