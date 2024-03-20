import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Route, Routes } from "react-router-dom";
import StockList from "./views/tradePage/tradePage";
import Profile from "./views/profile/profile";
import Login from "./views/homePage/homepage";
import Register from "./views/register/register";
import Watchlist from "./views/watchlist/watchlist";
import Portfolio from "./views/portfolio/portfolio";
import TransactionsPage from "./views/history/history";
import { theme } from "../src/utilities/themeUtils";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/StocksList" element={<StockList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/portfolio/:userId" element={<Portfolio />} />
          <Route path="/history" element={<TransactionsPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
