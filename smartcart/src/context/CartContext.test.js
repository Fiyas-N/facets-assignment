import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import React from 'react';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

const sampleProduct = {
  _id: '1',
  name: 'Test Product',
  category: 'Electronics',
  price: 100,
};

describe('CartContext', () => {
  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleProduct, 2);
    });
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleProduct, 1);
      result.current.removeFromCart('1');
    });
    expect(result.current.cart).toHaveLength(0);
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleProduct, 1);
      result.current.updateQuantity('1', 5);
    });
    expect(result.current.cart[0].quantity).toBe(5);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart(sampleProduct, 1);
      result.current.clearCart();
    });
    expect(result.current.cart).toHaveLength(0);
  });
}); 