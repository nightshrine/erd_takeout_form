import MenuMaster from "../../../../master/MenuMaster";
import ProductCategory from "./ProductCategory/ProductCategory";
import styles from "./Menu.module.css";

interface IProps {
  orderDict: { [key: number]: number };
  setOrderDict: (orderDict: { [key: number]: number }) => void;
}

const Menu = (props: IProps) => {
  const productCategory = MenuMaster.getProductCategoryList();
  const { orderDict, setOrderDict } = props;

  return (
    <div className={styles.menu}>
      <table>
        <thead>
          <tr>
            <th className={styles.headProductName}>商品名</th>
            <th className={styles.headProductPrice}>金額</th>
            <th className={styles.headProductInput}>ご注文数</th>
          </tr>
        </thead>
        <tbody>
          {productCategory.map((category) => (
            <ProductCategory
              key={category.id}
              orderDict={orderDict}
              setOrderDict={setOrderDict}
              productCategory={category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
