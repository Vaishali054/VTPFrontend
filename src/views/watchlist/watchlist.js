import React, { useState, useEffect, useCallback } from 'react';
import TopNavBar from '../../components/topNavbar/topNavBar';
import { fetchWatchlist, deleteFromWatchlist } from '../../api/watchlist';
import BuyModal from '../../components/buyModal/buyModal';
import SellModal from '../../components/sellModal/sellModal';

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
} from '@mui/material';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatch = useCallback(async () => {
    try {
      const response = await fetchWatchlist();
      console.log(response);
      if (response.status) {
        setWatchlist(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  });

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
      const response = await deleteFromWatchlist(itemId);
      if(response.message === 'Unauthorized'){
        alert('Unauthorized!');
      }
      else{
        alert('Item removed from watchlist!');
      }
      fetchWatch();
    } catch (error) {
      console.error('Error removing item from watchlist:', error);
    }
  };

  const stockPurchase = async (itemId) => {

  };

  return (
    <div>
      <TopNavBar />
      <Box mt={2} display="flex" justifyContent="center">
        <Typography variant="h4">User's Watchlist</Typography>
      </Box>
    
      <Box mt={10} display="flex" justifyContent="center">
        {watchlist.length > 0 ? (
          <TableContainer component={Paper} sx={{ width: '80%' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Company Details</TableCell>
                  <TableCell>Current Price(INR)</TableCell>
                  <TableCell>Actions</TableCell>
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
                    <TableCell>{item.companyDetails.current_Price}</TableCell>
                    <TableCell>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <BuyModal price={item.companyDetails.current_Price} stock={item.companyDetails.company_name}/>
                        <SellModal price={item.companyDetails.current_Price} stock={item.companyDetails.company_name}/>
                        <Button 
                          
                          style={{ backgroundColor: 'black', color: 'white',padding: "5px 7px",marginRight: "5px" }} // Add margin for spacing
                          onClick={() => removeFromWatchlist(item._id)}
                        >
                          Remove
                        </Button>
                    </div>
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
