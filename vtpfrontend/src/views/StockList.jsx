import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TopNavBar from '../components/TopNavBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Import the Grid component

export default function StockList() {
  const handleBuy = (stockId) => {
    console.log(`Buy action for stock ID: ${stockId}`);
 };

 const handleSell = (stockId) => {
  console.log(`Sell action for stock ID: ${stockId}`);
};
 const columns = [
    { field: 'stock', headerName: 'Stock' },
    { field: 'open', headerName: 'Open' },
    { field: 'dayhigh', headerName: 'Day High' },
    { field: 'daylow', headerName: 'Day Low' },
    { field: 'lastclose', headerName: 'Last Close' },

    {
      field: 'change',
      headerName: 'Change',
      renderCell: (params) => {
        const value = params.value;
        return (
          <span style={{ color: value >= 0 ? 'green' : 'red' }}>
            {value}
          </span>
        );
      },
   },
   {
      field: '%change',
      headerName: '%Change',
      renderCell: (params) => {
        const value = parseFloat(params.value.replace('%', ''));
        return (
          <span style={{ color: value >= 0 ? 'green' : 'red' }}>
            {params.value}
          </span>
        );
      },
   },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button
              onClick={() => handleBuy(params.row.id)}
              style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
            >
              Buy
            </button>
            <button
              onClick={() => handleSell(params.row.id)}
              style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
            >
              Sell
            </button>
          </div>
        );
      },
   },
 ];

 const rows = [
    { id: 1, stock: 'AAPL', open: 150, dayhigh: 160, daylow: 140, lastclose: 145, change: 5, '%change': '3.45%' },
    { id: 2, stock: 'AAPL', open: 150, dayhigh: 160, daylow: 140, lastclose: 145, change: -5, '%change': '-3.45%' },
 ];

 return (
    <div>
      <TopNavBar />
      <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
        Stocks List
      </Typography>
      <Grid container justify="center" alignContent={"center"}> 
        <Grid item xs={12} sm={10} md={8}> 
        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                 paginationModel: {
                    pageSize: 15,
                 },
                },
              }}
              pageSizeOptions={[15]}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
 );
}
