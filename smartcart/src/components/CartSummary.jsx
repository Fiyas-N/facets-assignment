import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

function calculateTax(category, price) {
  if (category === 'Electronics') return price * 0.10;
  if (category === 'Clothing') return price * 0.05;
  return 0;
}
function getLoyaltyDiscount(level) {
  if (level === 'Gold') return 0.15;
  if (level === 'Silver') return 0.10;
  if (level === 'Bronze') return 0.05;
  return 0;
}

const badgeColors = {
  Bronze: 'bg-yellow-800 text-white',
  Silver: 'bg-gray-400 text-white',
  Gold: 'bg-yellow-400 text-black',
};

const CartSummary = ({ cart, clearCart, loyaltyLevel, setLoyaltyLevel }) => {
  let itemized = [];
  let subtotal = 0;
  cart.forEach(item => {
    let base = item.price * item.quantity;
    let discount = 0;
    if (item.category === 'Electronics' && item.quantity > 2) {
      discount = base * 0.15;
      base -= discount;
    }
    const tax = calculateTax(item.category, base);
    const subtotalItem = base + tax;
    subtotal += subtotalItem;
    itemized.push({
      ...item,
      tax,
      subtotal: subtotalItem,
      itemDiscount: discount
    });
  });
  let bulkDiscount = subtotal > 200 ? subtotal * 0.10 : 0;
  let afterBulk = subtotal - bulkDiscount;
  let loyaltyDiscount = afterBulk * getLoyaltyDiscount(loyaltyLevel);
  let finalTotal = afterBulk - loyaltyDiscount;
  let totalTax = itemized.reduce((sum, item) => sum + item.tax, 0);

  // Animate final total and badge
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 600);
    return () => clearTimeout(timeout);
  }, [finalTotal, loyaltyLevel]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3 }}
      className="mt-4 p-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 max-w-md mx-auto animate-fade-in"
      aria-label="Cart summary"
    >
      <div className="mb-2 flex justify-between text-lg"><span>Subtotal:</span> <span className="font-semibold">${subtotal.toFixed(2)}</span></div>
      <div className="mb-2 flex justify-between text-blue-400 text-sm"><span>Total GST:</span> <span>${totalTax.toFixed(2)}</span></div>
      <div className="border-b border-gray-200 my-3"></div>
      <motion.div
        className={`mb-2 flex justify-between text-green-700 ${animate ? 'bg-green-50 scale-105 px-2 py-1 rounded' : ''}`}
        animate={animate ? { scale: 1.05, backgroundColor: '#f0fdf4' } : { scale: 1, backgroundColor: '#fff' }}
        transition={{ duration: 0.4 }}
      >
        <span>Bulk Discount:</span> <span>- ${bulkDiscount.toFixed(2)}</span>
      </motion.div>
      <motion.div
        className={`mb-2 flex justify-between text-green-700 ${animate ? 'bg-green-50 scale-105 px-2 py-1 rounded' : ''}`}
        animate={animate ? { scale: 1.05, backgroundColor: '#f0fdf4' } : { scale: 1, backgroundColor: '#fff' }}
        transition={{ duration: 0.4 }}
      >
        <span>Loyalty Discount:</span> <span>- ${loyaltyDiscount.toFixed(2)}</span>
      </motion.div>
      <motion.div
        className={`font-bold text-2xl mt-6 flex justify-between ${animate ? 'bg-green-100 scale-105 px-2 py-1 rounded' : ''}`}
        animate={animate ? { scale: 1.05, backgroundColor: '#dcfce7' } : { scale: 1, backgroundColor: '#fff' }}
        transition={{ duration: 0.4 }}
      >
        <span>Final Total:</span> <span>${finalTotal.toFixed(2)}</span>
      </motion.div>
      <button
        className="mt-8 bg-[#ff9f00] text-white px-8 py-3 rounded-lg hover:bg-[#fb641b] w-full font-bold text-xl transition focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
        onClick={clearCart}
        aria-label="Clear cart"
      >
        Clear Cart
      </button>
      <div className="mt-8 flex items-center gap-2">
        <label className="font-semibold mr-2" htmlFor="loyalty-select">Loyalty Level:</label>
        <select
          id="loyalty-select"
          className="border-2 border-[#2874f0] rounded px-4 py-2 text-lg focus:ring-2 focus:ring-[#2874f0]"
          value={loyaltyLevel}
          onChange={e => setLoyaltyLevel(e.target.value)}
          aria-label="Select loyalty level"
        >
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
        <span className={`px-6 py-2 rounded-full font-bold text-lg shadow transition-all duration-500 ${badgeColors[loyaltyLevel]} ${animate ? 'scale-110 ring-2 ring-[#ff9f00]' : ''}`}>{loyaltyLevel}</span>
      </div>
    </motion.div>
  );
};

export default CartSummary; 