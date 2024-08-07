import styles from "./UserForm.module.css";

interface IProps {
  name: string;
  phoneNumber: string;
  setName: (name: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  submitOrder: () => void;
}

const UserForm = (props: IProps) => {
  const { name, phoneNumber, setName, setPhoneNumber, submitOrder } = props;

  return (
    <div className={styles.userForm}>
      <h2>お客様情報</h2>
      <div className={styles.inputGroup}>
        <label>お名前：
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>お電話番号：</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={submitOrder}>注文する</button>
    </div>
  );
};

export default UserForm;
