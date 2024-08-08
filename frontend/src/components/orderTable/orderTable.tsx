import { useEffect, useState } from "react";
import styles from "./orderTable.module.css";
import { TransactionService } from "../../services/TransactionService";
import OrderTransaction from "../../transaction/OrderTransaction";
import MenuMaster from "../../master/MenuMaster";
import { ICustomerTransaction } from "../../definitions/orderTransaction/ICustomerTransaction";
import { IProductMaster } from "../../definitions/menuMaster/IProductMaster";
import { IOrderTransaction } from "../../definitions/orderTransaction/IOrderTransaction";

const OrderTable = () => {
  // 注文データが取得できたか
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 注文データ、顧客データを取得する処理を書く
    const setTransaction = async () => {
      const transaction = await TransactionService.get();
      TransactionService.setTransaction(transaction);
      setIsLoaded(true);
    };
    setTransaction();
  }, []);

  /**
   * 顧客名を取得
   */
  const getCustomerName = (customerId: number): string => {
    const customer: ICustomerTransaction | undefined =
      OrderTransaction.getCustomerById(customerId);
    return customer?.name || "";
  };

  /**
   * 顧客の電話番号を取得
   */
  const getCustomerPhoneNumber = (customerId: number): string => {
    const customer: ICustomerTransaction | undefined =
      OrderTransaction.getCustomerById(customerId);
    return customer?.phoneNumber || "";
  };

  /**
   * 商品名を取得
   */
  const getProductName = (productId: number): string => {
    const product: IProductMaster | undefined =
      MenuMaster.getProductById(productId);
    return product?.name || "";
  };

  /**
   * 商品の金額を取得
   */
  const getProductPrice = (productId: number): number => {
    const product: IProductMaster | undefined =
      MenuMaster.getProductById(productId);
    return product?.price || 0;
  };

  /**
   * 合計金額を取得
   */
  const getTotalPrice = (productId: number, quantity: number): number => {
    return getProductPrice(productId) * quantity;
  };

  return (
    <>
      {isLoaded ? (
        <div className={styles.takeOutList}>
          <h1>ご注文リスト</h1>
          <table>
            <thead>
              <tr>
                <th>注文情報ID</th>
                <th>商品名</th>
                <th>個数</th>
                <th>合計金額</th>
                <th>お客様名</th>
                <th>お電話番号</th>
              </tr>
            </thead>
            <tbody>
              {OrderTransaction.getOrderList().map(
                (order: IOrderTransaction) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{getProductName(order.productId)}</td>
                      <td>{order.quantity}</td>
                      <td>{getTotalPrice(order.productId, order.quantity)}</td>
                      <td>{getCustomerName(order.customerId)}</td>
                      <td>{getCustomerPhoneNumber(order.customerId)}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default OrderTable;
