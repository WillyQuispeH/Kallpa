import React from "react";
import styles from "./CardUser.module.scss";
import Button from "../Button";
interface ICardUser {
  alias: string;
  email: string;
  name: string;
}

const CardUser = ({ alias, email, name }: ICardUser) => {
  const handleOnclick = () => {
    alert("esta seguro");
  };
  return (
    <div className={styles.cardUser}>
      <div className={styles.screenUser}>
        <img src="/img4.jpg" alt="" />
      </div>
      <div className={styles.contentInfoUser}>
        <div className={styles.logoUser}>
          <img src="/developer.png" alt="" />
        </div>
        <h1 className={styles.emailUser}>{name}</h1>
        <h1 className={styles.emailUser}>{email}</h1>
        <h1 className={styles.levelUser}>{alias}</h1>
        <Button
          width="200px"
          height="40px"
          valor="Cambiar contraseña"
          disabled={true}
          onClick={handleOnclick}
        />
      </div>
    </div>
  );
};

export default CardUser;
