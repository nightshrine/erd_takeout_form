import { useState } from "react";
import Menu from "./children/Menu/Menu";
import UserForm from "./children/UserForm/UserForm";
import styles from "./TakeOutForm.module.css";
import { IOrderRequest } from "../../definitions/IOrderRequest";
import { PostOrderService } from "../../services/PostOrderService";

const TakeOutForm = () => {
  // 注文辞書
  const [orderDict, setOrderDict] = useState<{ [key: number]: number }>({});
  // 注文者情報
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitOrder = () => {
    // 注文数が0の商品を削除
    const updatedOrderDict = { ...orderDict };
    for (const key in orderDict) {
      if (orderDict[key] === 0) {
        delete updatedOrderDict[key];
      }
    }
    if (!name || !phoneNumber) {
      alert("名前と電話番号を入力してください");
      return;
    }
    if (Object.keys(updatedOrderDict).length === 0) {
      alert("注文がありません");
      return;
    }

    // バックエンドに注文を送信する処理を書く
    const orderRequest: IOrderRequest = {
      customerName: name,
      customerPhoneNumber: phoneNumber,
      orderDict: orderDict,
    };
    PostOrderService.order(orderRequest);
  };

  return (
    <div className={styles.takeOutForm}>
      <h1>お持ち帰りご注文フォーム</h1>
      <Menu orderDict={orderDict} setOrderDict={setOrderDict} />
      <UserForm
        name={name}
        phoneNumber={phoneNumber}
        setName={setName}
        setPhoneNumber={setPhoneNumber}
        submitOrder={submitOrder}
      />
    </div>
  );
};

export default TakeOutForm;
