import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { handleSell } from "../../utilities/buySellUtils"; // Assuming you have a handleSell function in your utilities
import { fetchProfile } from "../../api/profile";

const SellModal = ({ stock, price }) => {
  const [openSellDialog, setOpenSellDialog] = React.useState(false);
  const [sellQuantity, setSellQuantity] = React.useState(1);
  const [selectedStockSymbol, setSelectedStockSymbol] = React.useState("");
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [userBalance, setUserBalance] = React.useState(0);

  const handleSellAction = async () => {
    await handleSell({
      userBalance,
      sellQuantity,
      selectedStockSymbol,
      currentPrice,
      setUserBalance,
      handleSellDialogClose,
    });
  };

  const fetchUserData = async () => {
    try {
      const data = await fetchProfile();
      if (data) {
        setUserBalance(data.user.current_Balance);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleSellClick = () => {
    setSelectedStockSymbol(stock);
    setCurrentPrice(price);
    setOpenSellDialog(true);
  };

  const handleSellDialogClose = () => {
    setOpenSellDialog(false);
  };

  const handleSellQuantityChange = (event) => {
    let newValue = event.target.value;
    if (newValue < 0) {
      alert("Quantity cannot be negative, try again");
      newValue = 1;
    }
    setSellQuantity(newValue);
  };

  return (
    <div>
      <Button
        onClick={handleSellClick}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "5px",
          marginRight: "5px",
        }}
      >
        Sell
      </Button>
      <Dialog open={openSellDialog} onClose={handleSellDialogClose}>
        <DialogTitle>Sell Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the quantity you want to sell.
          </DialogContentText>

          <TextField
            margin="dense"
            label="Stock Symbol"
            value={selectedStockSymbol}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            value={sellQuantity}
            onChange={handleSellQuantityChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSellDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSellAction} color="primary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SellModal;
