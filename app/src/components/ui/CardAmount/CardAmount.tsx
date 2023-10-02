import React from "react";
import styles from "./CardAmount.module.scss";

interface ICardAmount {
  title: string;
  icon: string;
  value: string;
}

const CardAmount = ({ title, icon, value }: ICardAmount) => {
  return (
    <div className={styles.cardAmount}>
      <p className={styles.cardAmountTitle}>{title}</p>
      <span className="material-symbols-outlined">{icon}</span>
      <p className={styles.cardAmountValue}>{value}</p>
    </div>
  );
};

export default CardAmount;
