import styles from "./Input.module.scss";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  label?: string;
  isValid: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, width, label, isValid, ...props }, ref) => {
    return (
      <div
        className={isValid ? styles.input : styles.inputAlert}
        style={{ width }}
      >
        <label>{label}</label>
        <input type={type} ref={ref} {...props} autoComplete="off" />
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
