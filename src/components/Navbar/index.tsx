import { useState } from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false)
  console.log(open)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Grupo Simpli</h1>
      </div>
    </header>
  );
};

export default Navbar;
