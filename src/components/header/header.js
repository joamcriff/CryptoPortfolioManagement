import React from "react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>Crypto Portfolio Management</div>
    </div>
  );
};

export default Header;
