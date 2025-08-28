import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { useFilters } from './context/FilterContext';

const AppContent: React.FC = () => {
  const { updateFilters } = useFilters();

  const handleSearch = (query: string) => {
    updateFilters({ search: query });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <FilterProvider>
      <AppContent />
    </FilterProvider>
  );
}

export default App;