import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContext from './components/MainContext';
function App() {
  return (
    <Router>
      <div className="flex h screen">
        <Sidebar />

        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContext />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
