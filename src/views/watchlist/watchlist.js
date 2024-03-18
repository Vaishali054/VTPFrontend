import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TopNavBar from '../../components/TopNavbar/TopNavBar';
import { fetchWatchlist } from '../../api/fetchWatchlist';
import { addToWatchlist } from '../../api/addToWatchlist';
import { deleteFromWatchlist } from '../../api/deleteFromWatchlist';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TextField
} from '@mui/material';

const Watchlist = () => {
  const { userId } = useParams();
  const [watchlist, setWatchlist] = useState([]);
  const [symbol, setSymbol] = useState('');

  const fetchWatch = useCallback(async () => {
    try {
      const response = await fetchWatchlist();
      //Only set watchlist if length>0
      if (response.status) {
        setWatchlist(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchWatch();
    const intervalId = setInterval(fetchWatch, 150000);
    return () => clearInterval(intervalId);
  }, [fetchWatch]);

  const removeFromWatchlist = async (itemId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to remove this item from the watchlist?');

      if (!confirmed) {
        return;
      }
      await deleteFromWatchlist(itemId);
      alert('Item removed from watchlist!');
      fetchWatch();
    } catch (error) {
      console.error('Error removing item from watchlist:', error);
    }
  };

  const stockPurchase = async (itemId) => {

  };

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(symbol);
      alert('Stock added to watchlist!');
      setSymbol('');
      fetchWatch();
    } catch (error) {
      console.error('Error adding stock to watchlist:', error);
    }
  };

  return (
    <div>
      <TopNavBar />
      <Box mt={8} display="flex" justifyContent="center">
        <Typography variant="h4">User's Watchlist</Typography>
      </Box>
      <Box mt={8} display="flex" justifyContent="flex-end" position="absolute" top={0} right={0} p={2}>
        <TextField
          label="Enter Symbol"
          variant="outlined"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddToWatchlist} sx={{ ml: 2 }}>
          Add to Watchlist
        </Button>
      </Box>
      <Box mt={10} display="flex" justifyContent="center">
        {watchlist.length > 0 ? (
          <TableContainer component={Paper} sx={{ width: '80%' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Company Details</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Removing option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {watchlist.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.companyDetails.company_name}{' '}
                        <Typography component="span" variant="subtitle2" fontWeight="bold" color="textSecondary">
                          ({item.companyDetails.symbol})
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>${item.companyDetails.current_Price}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => stockPurchase(item._id)}>
                        Buy/Sell
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => removeFromWatchlist(item._id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No items in the watchlist.</p>
        )}
      </Box>
    </div>
  );
};

export default Watchlist;
