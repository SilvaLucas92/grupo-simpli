import { useState } from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Grupo <span style={{ color: "blueviolet" }}>Simpli</span>
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
