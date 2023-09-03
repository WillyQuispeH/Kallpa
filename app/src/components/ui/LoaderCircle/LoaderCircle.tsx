import React from "react";
import styles from "./LoaderCircle.module.scss";

interface IntLoader {
  width: string;
  bg?: string;
}
const LoaderCircle = ({ width, bg }: IntLoader) => {
  return (
    <div className={styles.loader} style={{ width, height: width }}>
      <div
        style={{ borderColor: `${bg} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${bg} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${bg} transparent transparent transparent` }}
      ></div>
      <div
        style={{ borderColor: `${bg} transparent transparent transparent` }}
      ></div>
    </div>
  );
};

export default LoaderCircle;
