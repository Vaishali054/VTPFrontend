import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TopNavBar from '../../components/TopNavbar/TopNavBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import "./stockList.css"
import { useStocksList } from '../../hooks/useStocksList';
import { Button } from '@material-ui/core';

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

  console.log(data);

  const handlebuy = () => {

  }
  const handlesell = () => {

  }

  const columns = [
    { 
      field: 'stock', 
      headerName: 'Stock', 
      sortable: true, 
      width: 160,
      renderCell: (params) => (
        <div>
          <div>{params.value}</div>
          <div style={{ fontSize: '12px', color: 'gray' }}>({params.row.symbol})</div>
        </div>
      )
    },
    { field: 'dayhigh', headerName: 'Day High (INR)', sortable: true, width: 130 },
    { field: 'daylow', headerName: 'Day Low (INR)', sortable: true, width: 130 },
    { field: 'lastclose', headerName: 'Last Close (INR)', sortable: true, width: 130 },
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
      field: 'pChange',
      headerName: '%Change',
      renderCell: (params) => {
        const value = parseFloat(params.value);
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
            <Button
              onClick={handlebuy}
              style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', margin: '0px 5px' }}
            >
              Buy
            </Button>
            <Button
              onClick={handlesell}
              style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
            >
              Sell
            </Button>
          </div>
        );
      },
    },
  ];

  let rows = [];

  if (isSuccess && data !== undefined && data.length>0 && data!== "Network Error") {
    rows = data.map((stockData, index) => ({
      id: index,
      stock: stockData.company_name,
      dayhigh: stockData.max_stock_price,
      daylow: stockData.min_stock_price,
      lastclose: stockData.current_Price,
      change:stockData.change,
      pChange:stockData.pChange,
      symbol:stockData.symbol
    }));
  }

  const filteredRows = rows.filter(row => {
    if (row && row.stock) {
        return row.stock.toLowerCase().includes(searchValue.toLowerCase());
    } else {
        return false;
    }
});


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
          <Grid item xs={12} sm={10} md={7.5}>
            <TextField
              label="Search by Stock Name"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={10} md={7.5}>
            <Box sx={{ height: '100%', width: '100%', marginTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isLoading && <CircularProgress />}
              {(isError || data=== "Network Error") && <Typography variant="body1">Error fetching stocks! {error?.message}</Typography>}
              {!isLoading && !isError && data!== "Network Error" && (
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
