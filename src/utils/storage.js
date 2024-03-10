export const savePortfolioData = (portfolioData) => {
  try {
    // Lấy dữ liệu hiện tại từ Local Storage
    const currentData = loadPortfolioData();

    // Kết hợp dữ liệu mới với dữ liệu hiện tại
    const updatedData = [...currentData, ...portfolioData];

    // Lưu dữ liệu đã cập nhật vào Local Storage
    const serializedData = JSON.stringify(updatedData);
    localStorage.setItem("cryptoPortfolio", serializedData);
  } catch (error) {
    console.error("Error saving portfolio data to local storage:", error);
  }
};

export const loadPortfolioData = () => {
  try {
    const serializedData = localStorage.getItem("cryptoPortfolio");
    if (serializedData === null) {
      return [];
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading portfolio data from local storage:", error);
    return undefined;
  }
};

export const deletePortfolioData = (indexesToDelete) => {
  try {
    const currentData = loadPortfolioData();
    if (!currentData || currentData.length === 0) {
      console.warn("No data to delete.");
      return;
    }
    const updatedData = [...currentData];

    // Xóa các mục dựa trên chỉ mục được cung cấp
    indexesToDelete.forEach((index) => {
      if (index >= 0 && index < updatedData.length) {
        updatedData.splice(index, 1);
      }
    });

    // Lưu dữ liệu đã cập nhật vào Local Storage
    const serializedData = JSON.stringify(updatedData);
    localStorage.setItem("cryptoPortfolio", serializedData);
  } catch (error) {
    console.error("Error deleting portfolio data from local storage:", error);
  }
};
