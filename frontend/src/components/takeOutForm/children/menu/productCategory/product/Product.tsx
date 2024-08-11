import { NEW_PRODUCT } from "../../../../../../constants/ProductConstants";
import { IProductMaster } from "../../../../../../definitions/menuMaster/IProductMaster";
import styles from "./Product.module.css";

interface IProps {
  orderDict: { [key: number]: number };
  setOrderDict: (orderDict: { [key: number]: number }) => void;
  product: IProductMaster;
}

const Product = (props: IProps) => {
  const { orderDict, setOrderDict, product } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrderDict = { ...orderDict };
    newOrderDict[product.id] = Number(e.target.value);
    setOrderDict(newOrderDict);
  };

  const isNew = (product: IProductMaster): boolean => {
    return product.classification === NEW_PRODUCT ? true : false;
  };

  return (
    <tr>
      <td className={styles.productName}>
        {isNew(product) && <span className={styles.new}>*New*</span>}
        {product.name}
      </td>
      <td className={styles.productPrice}>
        {product.price}(税込{product.priceWithTax})
      </td>
      <td className={styles.productInput}>
        <input
          type="number"
          min={0}
          max={10}
          value={orderDict[product.id] || ""}
          onChange={onChange}
        />
      </td>
    </tr>
  );
};

export default Product;
