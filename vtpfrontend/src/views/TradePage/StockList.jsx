import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TopNavBar from '../../components/TopNavBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Import the Grid component
import TextField from '@mui/material/TextField';
import "./stockList.css"

export default function StockList() {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // const handleBuy = (stockId) => {
  //   console.log(`Buy action for stock ID: ${stockId}`);
  // };

  // const handleSell = (stockId) => {
  //   console.log(`Sell action for stock ID: ${stockId}`);
  // };

  const columns = [
    { field: 'stock', headerName: 'Stock', sortable: false, width: 120 },
    { field: 'open', headerName: 'Open', sortable: false, width: 120 },
    { field: 'dayhigh', headerName: 'Day High', sortable: false, width: 120 },
    { field: 'daylow', headerName: 'Day Low', sortable: false, width: 120 },
    { field: 'lastclose', headerName: 'Last Close', sortable: false, width: 120 },

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
      width: 120,
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
      width: 135,
    },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   width: 150,
    //   sortable: false,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     return (
    //       <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    //         <button
    //           onClick={() => handleBuy(params.row.id)}
    //           style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px' }}
    //         >
    //           Buy
    //         </button>
    //         <button
    //           onClick={() => handleSell(params.row.id)}
    //           style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
    //         >
    //           Sell
    //         </button>
    //       </div>
    //     );
    //   },
    // },
  ];


  //Demo data for UI purpose, please remove it during integration
  const rows = [
    { id: 1, stock: 'APL', open: 150, dayhigh: 160, daylow: 140, lastclose: 145, change: -5, '%change': '-3.45%' },
    { id: 2, stock: 'AAPL', open: 155, dayhigh: 165, daylow: 145, lastclose: 150, change: -5, '%change': '-3.23%' },
    { id: 3, stock: 'GOOGL', open: 1250, dayhigh: 1265, daylow: 1235, lastclose: 1240, change: -10, '%change': '-0.80%' },
    { id: 4, stock: 'AMZN', open: 3100, dayhigh: 3120, daylow: 3070, lastclose: 3085, change: -15, '%change': '-0.48%' },
    { id: 5, stock: 'MSFT', open: 240, dayhigh: 245, daylow: 235, lastclose: 238, change: -2, '%change': '-0.84%' },
    { id: 6, stock: 'FB', open: 330, dayhigh: 335, daylow: 320, lastclose: 325, change: -5, '%change': '-1.54%' },
    { id: 7, stock: 'TSLA', open: 800, dayhigh: 810, daylow: 780, lastclose: 785, change: -15, '%change': '-1.88%' },
    { id: 8, stock: 'NFLX', open: 550, dayhigh: 560, daylow: 540, lastclose: 545, change: -5, '%change': '-0.91%' },
    { id: 9, stock: 'GOOG', open: 2800, dayhigh: 2850, daylow: 2750, lastclose: 2780, change: -20, '%change': '-0.72%' },
    { id: 10, stock: 'NVDA', open: 600, dayhigh: 610, daylow: 590, lastclose: 595, change: -5, '%change': '-0.84%' },
    { id: 11, stock: 'INTC', open: 60, dayhigh: 65, daylow: 55, lastclose: 58, change: -2, '%change': '-3.45%' },
    { id: 12, stock: 'AMD', open: 80, dayhigh: 85, daylow: 75, lastclose: 78, change: -2, '%change': '-2.56%' },
    { id: 13, stock: 'CSCO', open: 50, dayhigh: 55, daylow: 45, lastclose: 48, change: -2, '%change': '-4.00%' },
    { id: 14, stock: 'CRM', open: 250, dayhigh: 255, daylow: 245, lastclose: 248, change: -2, '%change': '-0.80%' },
    { id: 15, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 16, stock: 'TSLA', open: 800, dayhigh: 810, daylow: 780, lastclose: 785, change: -15, '%change': '-1.88%' },
    { id: 17, stock: 'NFLX', open: 550, dayhigh: 560, daylow: 540, lastclose: 545, change: -5, '%change': '-0.91%' },
    { id: 18, stock: 'GOOG', open: 2800, dayhigh: 2850, daylow: 2750, lastclose: 2780, change: -20, '%change': '-0.72%' },
    { id: 19, stock: 'NVDA', open: 600, dayhigh: 610, daylow: 590, lastclose: 595, change: -5, '%change': '-0.84%' },
    { id: 20, stock: 'NVDA', open: 600, dayhigh: 610, daylow: 590, lastclose: 595, change: -5, '%change': '-0.84%' },
    { id: 21, stock: 'INTC', open: 60, dayhigh: 65, daylow: 55, lastclose: 58, change: -2, '%change': '-3.45%' },
    { id: 22, stock: 'AMD', open: 80, dayhigh: 85, daylow: 75, lastclose: 78, change: -2, '%change': '-2.56%' },
    { id: 23, stock: 'CSCO', open: 50, dayhigh: 55, daylow: 45, lastclose: 48, change: -2, '%change': '-4.00%' },
    { id: 24, stock: 'CRM', open: 250, dayhigh: 255, daylow: 245, lastclose: 248, change: -2, '%change': '-0.80%' },
    { id: 25, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 26, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 27, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 28, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 29, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 30, stock: 'NVDA', open: 600, dayhigh: 610, daylow: 590, lastclose: 595, change: -5, '%change': '-0.84%' },
    { id: 31, stock: 'INTC', open: 60, dayhigh: 65, daylow: 55, lastclose: 58, change: -2, '%change': '-3.45%' },
    { id: 32, stock: 'AMD', open: 80, dayhigh: 85, daylow: 75, lastclose: 78, change: -2, '%change': '-2.56%' },
    { id: 33, stock: 'CSCO', open: 50, dayhigh: 55, daylow: 45, lastclose: 48, change: -2, '%change': '-4.00%' },
    { id: 34, stock: 'CRM', open: 250, dayhigh: 255, daylow: 245, lastclose: 248, change: -2, '%change': '-0.80%' },
    { id: 35, stock: 'ORCL', open: 70, dayhigh: 75, daylow: 65, lastclose: 68, change: -2, '%change': '-2.86%' },
    { id: 36, stock: 'TSLA', open: 800, dayhigh: 810, daylow: 780, lastclose: 785, change: -15, '%change': '-1.88%' },
    { id: 37, stock: 'NFLX', open: 550, dayhigh: 560, daylow: 540, lastclose: 545, change: -5, '%change': '-0.91%' },
    { id: 38, stock: 'GOOG', open: 2800, dayhigh: 2850, daylow: 2750, lastclose: 2780, change: -20, '%change': '-0.72%' },
];

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
