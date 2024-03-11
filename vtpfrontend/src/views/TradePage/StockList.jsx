import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TopNavBar from '../../components/TopNavBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Import the Grid component
import TextField from '@mui/material/TextField';
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
    { field: 'stock', headerName: 'Stock', sortable: false, width: 120 },
    { field: 'open', headerName: 'Open', sortable: false, width: 120 },
    { field: 'dayhigh', headerName: 'Day High', sortable: false, width: 120 },
    { field: 'daylow', headerName: 'Day Low', sortable: false, width: 120 },
    { field: 'lastclose', headerName: 'Last Close', sortable: false, width: 120 },
  ]

  let rows = [];

    if(data !== undefined){
      rows = data.map((stockData, index) => ({
       id: index,
       stock: stockData.company_name,
       updatedAt: stockData.updatedAt,
       dayhigh: stockData.max_stock_price,
       daylow: stockData.min_stock_price,
       lastclose: stockData.current_Price,
     }));
     }
     else{

      // TODO remove this dummy data
        rows = [
         { id: 1, stock: 'AAPL', open: 150, dayhigh: 160, daylow: 140, lastclose: 145, change: 5, '%change': '3.45%' },
         { id: 2, stock: 'AAPL', open: 150, dayhigh: 160, daylow: 140, lastclose: 145, change: -5, '%change': '-3.45%' },
      ];
     }


const filteredRows = rows.filter(row =>
  row.stock.toLowerCase().includes(searchValue.toLowerCase())
);

const getRowClassName = (params) => {
  const filteredIndex = filteredRows.findIndex(row => row.id === params.row.id);
  return filteredIndex % 2 === 0 ? 'even-row' : 'odd-row';
};



  return (
    <div>
      <TopNavBar />
      <Typography variant="h4" align="center" sx={{ marginTop: 2 }}>
        Stocks List
      </Typography>
      <div className='center'>
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
            <Box sx={{ height: '100%', width: '100%', marginTop: 2  }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                autoHeight
                pageSize={15}
                getRowClassName={getRowClassName}   //not sure about these colors get second opinion
                disableSelectionOnClick
                // components={{
                //   Header: ({ children }) => (
                //     <div style={{ fontWeight: 'bold', borderBottom: '1px solid green' }}>{children}</div>
                //   ),
                // }}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
