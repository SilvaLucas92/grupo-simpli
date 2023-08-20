import Navbar from "../Navbar";
import styles from "./main.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default Layout;
