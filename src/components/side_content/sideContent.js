import React from "react";
import styles from "./sideContent.module.scss";
import { useEffect, useState } from "react";
import { loadPortfolioData } from "../../utils/storage";

const SideContent = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const portfolioData1 = loadPortfolioData();
    setPortfolioData(portfolioData1);
  }, []);

  useEffect(() => {
    // Tính tổng price từ mảng portfolioData
    const calculateTotalPrice = () => {
      let total = 0;
      for (const crypto of portfolioData) {
        total += crypto.price || 0;
      }
      return total;
    };

    // Cập nhật state totalPrice
    setPrice(calculateTotalPrice());
  }, [portfolioData]);

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
