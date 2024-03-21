import { buyStock, sellStock } from "../api/action";

export const handleBuy = async ({
  userBalance,
  buyQuantity,
  selectedStockSymbol,
  currentPrice,
  setUserBalance,
  handleBuyDialogClose,
}) => {
  const totalCost = buyQuantity * currentPrice;

  if (Number(userBalance) < totalCost) {
    alert("Insufficient balance");
    handleBuyDialogClose();
    return;
  }

  try {
    const data = await buyStock(selectedStockSymbol, buyQuantity);
    if (data) {
      setUserBalance(Number(userBalance) - Number(totalCost));
    } else {
      console.error("Failed to update user balance");
    }
  } catch (error) {
    console.error("Error updating user balance:", error);
  }

  alert(
    `BUY SUCCESSFUL: Your current balance is ${Number(userBalance) - Number(totalCost)}. You have bought ${buyQuantity} stocks of ${selectedStockSymbol} at a price of ${currentPrice} INR each for a total cost of ${totalCost} INR.`,
  );
  handleBuyDialogClose();
  window.location.reload();
};

export const handleSell = async ({
  userBalance,
  sellQuantity,
  selectedStockSymbol,
  currentPrice,
  setUserBalance,
  handleSellDialogClose,
}) => {
  const totalCost = sellQuantity * currentPrice;

  try {
    const data = await sellStock(selectedStockSymbol, sellQuantity);
    if (data) {
      alert(
        `SELL SUCCESSFUL: Your current balance is ${Number(userBalance) + Number(totalCost)}. You have sold ${sellQuantity} stocks of ${selectedStockSymbol} at a price of ${currentPrice} INR each for a total cost of ${totalCost} INR.`,
      );
      setUserBalance(Number(userBalance) + Number(totalCost));
    } else {
      alert("You do not have enough of this stock to sell!")
      console.error("Failed to update user balance");
    }
  } catch (error) {
    alert("Error connecting to server.")
    console.error("Error updating user balance:", error);
  }

  handleSellDialogClose();
  window.location.reload();
};
