import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Route, Routes } from 'react-router-dom';
import StockList from "./views/TradePage/StockList";
import Profile from "./views/Profile/Profile";
import Login from "./views/HomePage/homepage";
import Register from "./views/Register/register";
import Watchlist from './views/watchlist/watchlist';
import Portfolio from "./views/Portfolio/portfolio"
import TransactionsPage from './views/History/history';

// Define your theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#4CAF50', 
    },
    delete: {
      main: '#cc0000', 
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
      },
      containedPrimary: {
        color: '#ffffff', 
        backgroundColor: '#2196f3',
        '&:hover': {
          backgroundColor: '#1976d2',
        },
      },
      containedSecondary: {
        color: '#ffffff',
        backgroundColor: '#4CAF50',
        '&:hover': {
          backgroundColor: '#45a049',
        },
      },
      containeddelete: {
        color: '#ffffff',
        backgroundColor: '#cc0000',
        '&:hover': {
          backgroundColor: '#d32f2f',
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Routes>
      <Route path='/StocksList' element={<StockList />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/watchlist/:userId" element={<Watchlist />} />
      <Route path="/portfolio/:userId" element={<Portfolio />} />
      <Route path="/history/:userId" element={<TransactionsPage/>} />
      </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
