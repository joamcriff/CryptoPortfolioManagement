import React from "react";
import styles from "./cryptoTable.module.scss";
import { useState, useEffect, useMemo } from "react";
import { loadPortfolioData, deletePortfolioData } from "../../utils/storage";
import axios from "axios";
import EditCrypto from "../EditCryptoForm/editCrypto";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateValue } from "../../store/price/slicePrice";

const CryptoTable = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const portfolioData1 = loadPortfolioData();
    setPortfolioData(portfolioData1);
  }, []);

  const fetchCryptoPrices = async () => {
    const updatedPortfolioData = await Promise.all(
      portfolioData.map(async (crypto) => {
        const currentPrice = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${crypto.id}&vs_currencies=usd`
        );
        const profit =
          crypto.quantity *
          (currentPrice.data[crypto.id]?.usd - crypto.purchasePrice);
        const totalCurrent =
          crypto.quantity * currentPrice.data[crypto.id]?.usd;
        return {
          ...crypto,
          currentPrice: currentPrice.data[crypto.id]?.usd || 0,
          profitLoss: profit,
          totalPrice: totalCurrent,
        };
      })
    );
    setCurrentPrice(updatedPortfolioData);
  };

  useEffect(() => {
    const totalPrice = () => {
      let total = 0;
      for (const crypto of currentPrice) {
        total += crypto.totalPrice || 0;
      }
      return total;
    };
    dispatch(updateValue(totalPrice()));
  }, [currentPrice]);

  // Sử dụng useMemo để lưu trữ kết quả fetchCryptoPrices khi portfolioData thay đổi
  const memoizedFetchCryptoPrices = useMemo(
    () => fetchCryptoPrices,
    [portfolioData]
  );

  useEffect(() => {
    memoizedFetchCryptoPrices();
  }, [memoizedFetchCryptoPrices]);

  const handleDeleteTransaction = (indexToDelete) => {
    deletePortfolioData([indexToDelete]);
    window.location.reload();
  };

  const handleOpenEditModal = (index) => {
    setEditIndex(index);
    setShowEdit(true);
  };

  const handleCloseEditModal = () => {
    setShowEdit(false);
    setEditIndex(null);
  };

  return (
    <div className={styles.table}>
      <div className={styles.title}>Your Assets</div>
      <div className={styles.table_assets}>
        <table className={styles.cryptoTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>Profit/Loss</th>
              <th style={{ display: "flex", justifyContent: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPrice.map((crypto, index) => (
              <tr key={index}>
                <td>{crypto.name}</td>
                <td>{crypto.quantity}</td>
                <td>${crypto.purchasePrice}</td>
                <td>${crypto.currentPrice}</td>
                <td
                  className={
                    crypto.profitLoss >= 0 ? styles.profit : styles.loss
                  }>
                  ${crypto.profitLoss}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "20px",
                      justifyContent: "center",
                    }}>
                    <div onClick={() => handleDeleteTransaction(index)}>
                      <MdOutlineDelete
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div onClick={() => handleOpenEditModal(index)}>
                      <FaRegEdit
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>

                  {showEdit && editIndex === index && (
                    <EditCrypto
                      onClose={handleCloseEditModal}
                      cryptoIndex={index}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
