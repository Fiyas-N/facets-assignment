import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const ToastContext = createContext();

export const useCart = () => useContext(CartContext);
export const useToast = () => useContext(ToastContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [loyaltyLevel, setLoyaltyLevel] = useState('Bronze');
  const [pricingDetails, setPricingDetails] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product._id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { productId: product._id, name: product.name, category: product.category, price: product.price, quantity }];
      }
      showToast(`${product.name} added to cart`, 'success');
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const removed = prev.find(item => item.productId === productId);
      showToast(`${removed?.name || 'Item'} removed from cart`, 'error');
      return prev.filter(item => item.productId !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'error');
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <CartContext.Provider value={{ cart, setCart, loyaltyLevel, setLoyaltyLevel, pricingDetails, setPricingDetails, addToCart, removeFromCart, updateQuantity, clearCart }}>
        {children}
      </CartContext.Provider>
    </ToastContext.Provider>
  );
}; 