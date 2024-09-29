// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/CustomerRegistration';
import ProductList from './pages/ProductList';

import AddProduct from './pages/AddProduct';

import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

