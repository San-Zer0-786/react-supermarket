import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Loader from './components/Loader';
import ProductDetail from './components/ProductDetail';
import Basket from './components/Basket';
import menuItems from './data/menuItems';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './components/Wishlist';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://products-json-dev.s3.eu-west-1.amazonaws.com/products.json");
        if (!response.ok) {
          throw new Error('Failed to grab product data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          // just to show loader effect when app is ready!
          setIsLoading(false);
        }, 500);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Header menuItems={menuItems} />
      {isLoading && <Loader />} {/* Render Loader when isLoading is true */}
      <ToastContainer />
      <div className="App container">
        <h1 className="app-title">Welcome to Adsa Supermarket!</h1>
        {error && <p>Error: {error}</p>}
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={ <ProductList products={products} />}
            />
            <Route path="/products/:name" element={<ProductDetail />} />
            <Route
              exact
              path="/basket"
              element={ <Basket />}
            />
             <Route
              exact
              path="/wishlist"
              element={ <Wishlist />}
            />
            {/* add more routes here when needed! */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
