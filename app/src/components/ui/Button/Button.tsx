import LoaderCircle from "../LoaderCircle";
import styles from "./Button.module.scss";
interface IntButton {
  onClick?: any;
  valor: string;
  width: string;
  disabled?: boolean;
  isLoading?: boolean;
  height: string;
  bg?: string;
}
const Button = ({
  onClick,
  valor,
  width,
  height,
  disabled,
  isLoading,
  bg,
}: IntButton) => {
  return (
    <div className={styles.button} style={{ width, height }}>
      <button onClick={onClick} disabled={disabled} style={{ background: bg }}>
        {isLoading ? <LoaderCircle width="40px" /> : valor}
      </button>
    </div>
  );
};
export default Button;
