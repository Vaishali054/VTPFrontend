import StockList from "./views/TradePage/StockList";
import { Route, Routes } from 'react-router-dom'
import Profile from "./views/Profile/Profile";

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/StocksList' element={<StockList />} />
     <Route path='/profile' element={<Profile />} />
     </Routes>

    </div>
  );
}

export default App;
