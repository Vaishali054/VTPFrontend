import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';
import { handleBuy } from '../../utilities/buySellUtils';
import { fetchProfile } from '../../api/profile';

const BuyModal = ({ stock, price }) => {
  const [openBuyDialog, setOpenBuyDialog] = React.useState(false);
  const [buyQuantity, setBuyQuantity] = React.useState(1);
  const [selectedStockSymbol, setSelectedStockSymbol] = React.useState('');
  const [currentPrice, setCurrentPrice] = React.useState(0);
  const [userBalance, setUserBalance] = React.useState(0);
  const [userId, setUserId] = React.useState('');

  const handleBuyAction = async () => {
    await handleBuy({
      userId,
      userBalance,
      buyQuantity,
      selectedStockSymbol,
      currentPrice,
      setUserBalance,
      handleBuyDialogClose
    });
  };

  const fetchUserData = async () => {
    try {
      const data = await fetchProfile();
      console.log(data)
      if (data) {
        setUserId(data.user.id);
        setUserBalance(data.user.current_Balance);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleBuyClick = () => {
    setSelectedStockSymbol(stock);
    setCurrentPrice(price);
    setOpenBuyDialog(true);
  };

  const handleBuyDialogClose = () => {
    setOpenBuyDialog(false);
  };

  const handleBuyQuantityChange = (event) => {
    setBuyQuantity(event.target.value);
  };

  return (
    <div>
      <Button
        onClick={handleBuyClick}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "5px",
          marginRight: "5px",
        }}
      >
        Buy
      </Button>
      <Dialog open={openBuyDialog} onClose={handleBuyDialogClose}>
        <DialogTitle>Buy Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the quantity you want to buy.
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
            value={buyQuantity}
            onChange={handleBuyQuantityChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBuyDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBuyAction} color="primary">
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyModal;
