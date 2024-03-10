// EditCrypto.js

import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./editCrypto.module.scss";
import { loadPortfolioData } from "../../utils/storage";

const EditCrypto = ({ onClose, cryptoIndex }) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [cryptoData, setCryptoData] = useState({
    id: "",
    name: "",
    quantity: "",
    purchasePrice: "",
    price: "",
  });

  useEffect(() => {
    const portfolioData1 = loadPortfolioData();
    setCryptoData(portfolioData1[cryptoIndex]);
  }, [cryptoIndex]);

  //   console.log(cryptoData);

  useEffect(() => {
    // Calculate price when either quantity or purchase price changes
    const price =
      parseFloat(cryptoData.quantity) * parseFloat(cryptoData.purchasePrice);
    setCalculatedPrice(isNaN(price) ? 0 : price);
    setCryptoData((prevData) => ({
      ...prevData,
      price: price,
    }));
  }, [cryptoData.quantity, cryptoData.purchasePrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCryptoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditTransaction = () => {
    if (
      cryptoData.name &&
      cryptoData.quantity &&
      cryptoData.purchasePrice &&
      !isNaN(parseFloat(cryptoData.quantity)) &&
      !isNaN(parseFloat(cryptoData.purchasePrice))
    ) {
      // Load existing portfolio data
      const existingData = loadPortfolioData();

      // Update the data of the selected cryptoIndex directly in the existingData array
      existingData[cryptoIndex] = cryptoData;

      // Save on Local Storage
      const serializedData = JSON.stringify(existingData);
      localStorage.setItem("cryptoPortfolio", serializedData);

      // Close the modal or perform other actions
      onClose();

      // Reload the page
      window.location.reload();
    } else {
      console.error("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div className={styles.header}>
          <div className={styles.header_name}>Edit Cryptocurrency</div>
          <IoMdClose className={styles.icon} onClick={onClose} />
        </div>
        <div className={styles.name_crypto}>Cryptocurrency Name</div>
        <div className={styles.list_coin}>
          <input list="coin" value={cryptoData.name} required />
        </div>
        <div className={styles.quantity_crypto}>Quantity</div>
        <div>
          <input
            type="number"
            name="quantity"
            value={cryptoData.quantity}
            placeholder="0.00"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.price_crypto}>Purchase Price</div>
        <div>
          <input
            type="number"
            name="purchasePrice"
            value={cryptoData.purchasePrice}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.port2}>
          <div className={styles.total}>Total Portfolio</div>
          <div className={styles.price}>${calculatedPrice}</div>
        </div>
        <div
          type="button"
          className={styles.button}
          onClick={handleEditTransaction}>
          Edit Transaction
        </div>
      </div>
    </div>
  );
};

export default EditCrypto;
