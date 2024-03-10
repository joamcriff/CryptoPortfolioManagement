import React from "react";
import styles from "./addCrypto.module.scss";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncGetListCoin } from "../../store/listcoin/slideListCoin";
import { savePortfolioData } from "../../utils/storage";

const AddCrypto = ({ onClose }) => {
  const [displayedData, setDisplayedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const portfolioData = useSelector((state) => state.slideListCoin.cryptoData);

  const [cryptoData, setCryptoData] = useState({
    id: "",
    name: "",
    quantity: "",
    purchasePrice: "",
    price: "",
  });
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchAsyncGetListCoin());
  }, [dispatch]);
  useEffect(() => {
    // Filter and update displayedData based on the search query
    const filteredData = portfolioData.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedData(filteredData.slice(0, 10)); // Limit to the first 10 items

    setIsValidInput(
      filteredData.some(
        (crypto) => crypto.name.toLowerCase() === searchQuery.toLowerCase()
      )
    );
  }, [portfolioData, searchQuery]);

  const getCryptoIdByName = (cryptoName) => {
    const crypto = portfolioData.find(
      (crypto) => crypto.name.toLowerCase() === cryptoName.toLowerCase()
    );

    return crypto ? crypto.id : null;
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    const cryptoId = getCryptoIdByName(value);
    setSearchQuery(e.target.value);
    setCryptoData((prevData) => ({
      ...prevData,
      name: isInputClicked ? value : prevData.name,
      id: cryptoId,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCryptoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTransaction = () => {
    // Save the updated portfolioData to localStorage
    if (
      cryptoData.name &&
      cryptoData.quantity &&
      cryptoData.purchasePrice &&
      !isNaN(parseFloat(cryptoData.quantity)) &&
      !isNaN(parseFloat(cryptoData.purchasePrice))
    ) {
      // Save the updated portfolioData to localStorage
      savePortfolioData([cryptoData]);
      onClose();

      // Reload the page
      window.location.reload();
    } else {
      // Hiển thị thông báo hoặc xử lý khi inputs không hợp lệ
      console.error("Please fill in all required fields.");
    }
  };

  const handleInputClick = () => {
    setIsInputClicked(true);
  };

  const handleInputBlur = () => {
    setIsInputClicked(false);
    if (!isValidInput) {
      setSearchQuery("Bitcoin");
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
          <div className={styles.header_name}>Add Cryptocurrency</div>
          <IoMdClose className={styles.icon} onClick={onClose} />
        </div>
        <div className={styles.name_crypto}>Cryptocurrency Name</div>
        <div className={styles.list_coin}>
          <input
            list="coin"
            onChange={handleSearch}
            value={searchQuery}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            required
          />
          <datalist id="coin" className={styles.coin_id}>
            {displayedData.map((crypto) => (
              <option key={crypto.id} value={crypto.name} />
            ))}
          </datalist>
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
          onClick={handleAddTransaction}>
          Add Transaction
        </div>
      </div>
    </div>
  );
};

export default AddCrypto;
