import React from "react";
import styles from "./Seccion.module.scss";
interface ISeccion {
  children: any;
  title?: string;
  titleRight?: string;
}

const SeccionFooter = ({ children }: any) => {
  return <div className={styles.footerSeccion}>{children}</div>;
};

const Seccion = ({ children, title, titleRight }: ISeccion) => {
  return (
    <div className={styles.seccion}>
      {title && (
        <h1
          className={styles.headerSeccion}
          style={{ justifyContent: titleRight ? "space-between" : "center" }}
        >
          {title} <span>{titleRight}</span>
        </h1>
      )}
      {children}
    </div>
  );
};

export { Seccion, SeccionFooter };
