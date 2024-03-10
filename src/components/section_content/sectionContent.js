import React from "react";
import styles from "./sectionContent.module.scss";
import AddCrypto from "../add_crypto_form/addCrypto";
import CryptoTable from "../crypto_table/cryptoTable";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadPortfolioData } from "../../utils/storage";

const SectionContent = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [prices, setPrices] = useState(0);

  const price = useSelector((state) => state.mySlice.price);

  useEffect(() => {
    const portfolioData1 = loadPortfolioData();
    setPortfolioData(portfolioData1);
  }, []);

  useEffect(() => {
    const totalPrice = () => {
      let total = 0;
      for (const crypto of portfolioData) {
        total += crypto.price || 0;
      }
      return total;
    };
    setPrices(totalPrice());
  }, [portfolioData]);

  const handleOpenModal = () => {
    setShowAdd(true);
  };

  const handleCloseModal = () => {
    setShowAdd(!showAdd);
  };
  const percent = ((price - prices) / prices) * 100;
  return (
    <div className={styles.main_portfolio}>
      <div className={styles.information}>
        <div className={styles.port1}>
          <div className={styles.port1_title}>My Main Portfolio</div>
          <div className={styles.common}>
            <div className={styles.port1_price}>${price.toFixed(2)}</div>
            <div className={price - prices >= 0 ? styles.profit : styles.loss}>
              {percent.toFixed(2)}%
            </div>
          </div>
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
