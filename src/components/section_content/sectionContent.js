import React from "react";
import styles from "./sectionContent.module.scss";
import AddCrypto from "../add_crypto_form/addCrypto";
import CryptoTable from "../crypto_table/cryptoTable";
import { useEffect, useState } from "react";
import { loadPortfolioData } from "../../utils/storage";

const SectionContent = () => {
  const [showAdd, setShowAdd] = useState(false);
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

  const handleOpenModal = () => {
    setShowAdd(true);
  };

  const handleCloseModal = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className={styles.main_portfolio}>
      <div className={styles.information}>
        <div className={styles.port1}>
          <div className={styles.port1_title}>My Main Portfolio</div>
          <div className={styles.port1_price}>${price.toFixed(2)}</div>
        </div>
        <div className={styles.button} onClick={handleOpenModal}>
          + Add Cryptocurrency
        </div>
        {showAdd && <AddCrypto onClose={handleCloseModal} />}
      </div>
      <CryptoTable />
    </div>
  );
};

export default SectionContent;
