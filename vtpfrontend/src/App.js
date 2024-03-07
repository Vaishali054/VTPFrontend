import StockList from "./views/StockList";
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/StocksList' element={<StockList />} />
     </Routes>

    </div>
  );
}

export default App;
