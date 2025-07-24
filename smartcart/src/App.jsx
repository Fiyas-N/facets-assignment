import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import CartPage from './pages/Cart';
import Toast from './components/Toast';
import { demoProducts } from './demoProducts';

function App() {
  const [products] = useState(demoProducts);
  const [cart, setCart] = useState([]);
  const [loyaltyLevel, setLoyaltyLevel] = useState('Bronze');
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  // Cart logic (add, remove, update, clear)
  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(null), 1500);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  const clearCart = () => setCart([]);

  // Search filter for products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onSearch={setSearch} />
      {toast && <Toast message={toast} />}
      <main className="min-h-[80vh] flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products products={filteredProducts} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} onRemove={removeFromCart} onQuantityChange={updateQuantity} clearCart={clearCart} loyaltyLevel={loyaltyLevel} setLoyaltyLevel={setLoyaltyLevel} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App; 