import { IProductCategoryMaster } from "../../../../../definitions/menuMaster/IProductCategoryMaster";
import MenuMaster from "../../../../../master/MenuMaster";
import Product from "./product/Product";
import styles from "./ProductCategory.module.css";

interface IProps {
  orderDict: { [key: number]: number };
  setOrderDict: (orderDict: { [key: number]: number }) => void;
  productCategory: IProductCategoryMaster;
}

const ProductCategory = (props: IProps) => {
  const { orderDict, setOrderDict, productCategory } = props;
  // 商品リストを取得
  const productList = MenuMaster.getProductListByCategoryId(productCategory.id);

  return (
    <>
      <tr>
        <td colSpan={3} className={styles.productCategoryName}>
          {productCategory.name}
        </td>
      </tr>
      {productList.map((product) => (
        <Product
          key={product.id}
          orderDict={orderDict}
          setOrderDict={setOrderDict}
          product={product}
        />
      ))}
    </>
  );
};

export default ProductCategory;
