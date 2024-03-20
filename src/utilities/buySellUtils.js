import { buyStock, sellStock } from '../api/action';

export const handleBuy = async ({ userId, userBalance, buyQuantity, selectedStockSymbol, currentPrice, company_id, setUserBalance, handleBuyDialogClose }) => {
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
    `Your current balance is ${Number(userBalance) - Number(totalCost)}. You have bought ${buyQuantity} stocks of ${selectedStockSymbol} at a price of ${currentPrice} INR each for a total cost of ${totalCost} INR.`,
  );
  handleBuyDialogClose();
  window.location.href = `/portfolio/${userId}`;
};

export const handleSell = async ({
  userId,
  userBalance,
  sellQuantity,
  selectedStockSymbol,
  currentPrice,
  setUserBalance,
  handleSellDialogClose,
}) => {
  const totalCost = sellQuantity * currentPrice;

    try {
        const data = await sellStock({ symbol: selectedStockSymbol, quantity: sellQuantity, user: { id: userId } });
        if (data) {
            setUserBalance(Number(userBalance) + Number(totalCost));
        } else {
            console.error('Failed to update user balance');
        }
    } catch (error) {
        console.error('Error updating user balance:', error);
    }

  alert(
    `Your current balance is ${Number(userBalance) + Number(totalCost)}. You have sold ${sellQuantity} stocks of ${selectedStockSymbol} at a price of ${currentPrice} INR each for a total cost of ${totalCost} INR.`,
  );
  handleSellDialogClose();
  window.location.reload();
};
