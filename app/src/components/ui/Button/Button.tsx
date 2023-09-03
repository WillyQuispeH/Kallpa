import LoaderCircle from "../LoaderCircle";
import styles from "./Button.module.scss";
interface IntButton {
  onClick?: any;
  valor: string;
  width: string;
  disabled?: boolean;
  isLoading?: boolean;
  height: string;
}
const Button = ({
  onClick,
  valor,
  width,
  height,
  disabled,
  isLoading,
}: IntButton) => {
  return (
    <div className={styles.button} style={{ width, height }}>
      <button onClick={onClick} disabled={disabled}>
        {isLoading ? <LoaderCircle width="40px" /> : valor}
      </button>
    </div>
  );
};
export default Button;
