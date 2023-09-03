import styles from "./Logo.module.scss";

interface IntLogo {
  width: string;
  height: string;
}

const Logo = ({width, height }: IntLogo) => {
  return (
    <div
      className={styles.logo}
      style={{ width, height}}
    ></div>
  );
};

export default Logo;