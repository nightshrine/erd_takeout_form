import { IProductCategoryMaster } from "./MenuMaster/IProductCategoryMaster";
import { IProductMaster } from "./MenuMaster/IProductMaster";

export interface IMasterResponse {
  /** 商品マスタ */
  product: IProductMaster[];
  /** 商品カテゴリマスタ */
  productCategory: IProductCategoryMaster[];
}
