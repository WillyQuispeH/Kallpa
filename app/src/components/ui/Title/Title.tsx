import React from "react";
import styles from "./Title.module.scss";

interface ITitle {
  value: string;
  width: string;
  bg?: string;
}
const Title = ({ value, width, bg }: ITitle) => {
  return (
    <div className={styles.title} style={{ width, background: bg }}>
      {value}
    </div>
  );
};

export default Title;
