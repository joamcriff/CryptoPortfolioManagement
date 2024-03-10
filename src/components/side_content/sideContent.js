import React from "react";
import styles from "./sideContent.module.scss";
import { useSelector } from "react-redux";

const SideContent = () => {
  const price = useSelector((state) => state.mySlice.price);
  return (
    <div className={styles.portfolio}>
      <div className={styles.port1}>My Portfolio</div>
      <div className={styles.port2}>
        <div>My Main Portfolio</div>
        <div className={styles.price}>${price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default SideContent;
