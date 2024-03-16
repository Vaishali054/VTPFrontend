import StockList from "./views/TradePage/StockList";
import { Route, Routes } from 'react-router-dom'
import Profile from "./views/Profile/Profile";
import Login from "./views/HomePage/homepage";
import Register from "./views/Register/register";

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/StocksList' element={<StockList />} />
     <Route path='/profile' element={<Profile />} />
     <Route path="/" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     </Routes>
    </div>
  );
}

export default App;
