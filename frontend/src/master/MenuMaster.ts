import { IProductCategoryMaster } from "../definitions/MenuMaster/IProductCategoryMaster";
import { IProductMaster } from "../definitions/MenuMaster/IProductMaster";

/**
 * メニューマスタ
 */
class MenuMaster {
  /** 商品マスタ */
  private productList: IProductMaster[] = [];
  /** 商品カテゴリマスタ */
  private productCategoryList: IProductCategoryMaster[] = [];

  /**
   * メニューマスタを格納
   * @param productList 商品マスタ
   * @param productCategoryList 商品カテゴリマスタ
   */
  public init(
    productList: IProductMaster[],
    productCategoryList: IProductCategoryMaster[]
  ): void {
    this.productList = productList;
    this.productCategoryList = productCategoryList;
  }

  /**
   * 商品マスタを取得
   * @returns 商品マスタリスト
   */
  public getProductList(): IProductMaster[] {
    return this.productList;
  }
  /**
   * 商品マスタをidで取得
   * @param productId 商品ID
   * @returns 商品マスタ
   */
  public getProductById(productId: number): IProductMaster | undefined {
    return this.productList.find((product) => product.id === productId);
  }
  /**
   * カテゴリIDが一致する商品マスタを取得
   * @param productCategoryId 商品カテゴリID
   * @returns 商品マスタリスト
   */
  public getProductListByCategoryId(categoryId: number): IProductMaster[] {
    return this.productList.filter(
      (product) => product.categoryId === categoryId
    );
  }

  /**
   * 商品カテゴリマスタを取得
   * @returns 商品カテゴリマスタ
   */
  public getProductCategoryList(): IProductCategoryMaster[] {
    return this.productCategoryList;
  }
  /**
   * 商品カテゴリマスタを取得
   * @param productCategoryId 商品カテゴリID
   * @returns 商品カテゴリ
   */
  public getProductCategoryById(
    productCategoryId: number
  ): IProductCategoryMaster | undefined {
    return this.productCategoryList.find(
      (productCategory) => productCategory.id === productCategoryId
    );
  }
}

export default new MenuMaster();
