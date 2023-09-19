import React from "react";
import styles from "./LoaderScreen.module.scss";
import LoaderCircle from "../LoaderCircle";

const LoaderScreen = () => {
  return (
    <div className={styles.loaderScreen}>
      <LoaderCircle width="70px" />
    </div>
  );
};

export default LoaderScreen;
