import styles from "./input.module.css";

interface InputProps {
  value: any;
  onChange: (value: string | number) => void;
  label: string;
}

export const Input = ({ value, onChange, label }: InputProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        placeholder="Enter text here"
        className={styles.inputStyle}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="text"
      />
    </div>
  );
};
