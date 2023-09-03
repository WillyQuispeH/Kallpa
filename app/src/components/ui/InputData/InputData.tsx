import styles from "./InputData.module.scss";

interface IntInputData {
  label: string;
  width: string;
  value: string;
}

const InputData = ({ label, width, value }: IntInputData) => {
  return (
    <div className={styles.inputData} style={{ width }}>
      <label>{label}</label>
      <input value={value} disabled={true} />
    </div>
  );
};

export default InputData;
