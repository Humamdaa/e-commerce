import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainContext from './components/MainContext';
import ProductPage from './components/ProductPage';
function App() {
  return (
    <Router>
      <div className="flex h screen">
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContext /> } />
            <Route path="/product/:id" element={<ProductPage />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
