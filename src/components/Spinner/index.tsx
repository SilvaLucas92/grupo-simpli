import styles from "./spinner.module.css";

export const Spinner = () => (
  <div className={styles.container}>
    <span className={styles.loader}></span>
  </div>
);