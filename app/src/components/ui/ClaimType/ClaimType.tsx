import React from "react";
import LoaderCircle from "../LoaderCircle";

import styles from "./ClaimType.module.scss";

interface IClaimType {
  width: string;
  isLoading?: boolean;
}

const ClaimType = ({ width, isLoading }: IClaimType) => {
  return (
    <div className={styles.claimType} style={{ width }}>
      {isLoading ? (
        <LoaderCircle width="30px" bg="#666" />
      ) : (
        <span className="material-symbols-outlined">accessibility</span>
      )}
    </div>
  );
};

export default ClaimType;
