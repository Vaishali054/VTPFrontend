import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TopNavBar from '../../components/TopNavBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import "./stockList.css"
import {useStocksList} from '../../hooks/useStocksList';

export default function StockList() {
 const [searchValue, setSearchValue] = React.useState('');

 const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
 };

 const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
 } = useStocksList(); 

 const columns = [
    { field: 'stock', headerName: 'Stock', sortable: true, width: 120 },
    { field: 'dayhigh', headerName: 'Day High', sortable: true, width: 120 },
    { field: 'daylow', headerName: 'Day Low', sortable: true, width: 120 },
    { field: 'lastclose', headerName: 'Last Close', sortable: true, width: 120 },
 ];

 let rows = [];

 if(isSuccess && data !== undefined){
    rows = data.map((stockData, index) => ({
      id: index,
      stock: stockData.company_name,
      dayhigh: stockData.max_stock_price,
      daylow: stockData.min_stock_price,
      lastclose: stockData.current_Price,
    }));
 }

 const filteredRows = rows.filter(row =>
    row.stock.toLowerCase().includes(searchValue.toLowerCase())
 );

 const getRowClassName = (params) => {
    const filteredIndex = filteredRows.findIndex(row => row.id === params.row.id);
    return filteredIndex % 2 === 0 ? 'even-row' : 'odd-row';
 };

 return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNavBar />
      <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
        Stocks List
      </Typography>
      <div className='center' style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={7}>
            <TextField
              label="Search by Stock Name"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={10} md={7}>
            <Box sx={{ height: '100%', width: '100%', marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isLoading && <CircularProgress />} 
              {isError && <Typography variant="body1">Error: {error.message}</Typography>}
              {!isLoading && !isError && (
                <DataGrid
                 rows={filteredRows}
                 columns={columns}
                 autoHeight
                 pageSize={15}
                 getRowClassName={getRowClassName}
                 disableSelectionOnClick
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
 );
}
