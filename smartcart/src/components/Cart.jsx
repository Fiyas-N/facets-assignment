import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';

const Cart = ({ cart, onRemove, onQuantityChange }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <motion.div layout className="p-6 w-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border border-gray-100 animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-[#2874f0]">Shopping Cart</h2>
      <AnimatePresence>
        {cart.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-40 h-40 mb-4 flex items-center justify-center">
              <svg width="120" height="120" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9" />
              </svg>
            </div>
            <div className="text-gray-400 text-lg font-semibold">Your cart is empty.</div>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="grid gap-6"
          >
            <AnimatePresence initial={false}>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-4 gap-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-xl bg-gray-50 border" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg truncate text-[#2874f0]">{item.name}</div>
                    <div className="text-gray-500 text-sm mb-1">{item.category}</div>
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="text-gray-700 text-sm">Original: <span className="font-bold">${item.price.toFixed(2)}</span></div>
                      <div className="text-blue-500 text-sm">GST: <span className="font-bold">${((item.category === 'Electronics' ? 0.10 : item.category === 'Clothing' ? 0.05 : 0) * item.price * item.quantity).toFixed(2)}</span></div>
                      <div className="text-green-700 text-sm">After GST: <span className="font-bold">${(item.price * item.quantity + (item.category === 'Electronics' ? 0.10 : item.category === 'Clothing' ? 0.05 : 0) * item.price * item.quantity).toFixed(2)}</span></div>
                      <div className="text-purple-700 text-sm">Bulk Discount: <span className="font-bold">${((item.category === 'Electronics' && item.quantity > 2) ? (item.price * item.quantity + (item.category === 'Electronics' ? 0.10 : item.category === 'Clothing' ? 0.05 : 0) * item.price * item.quantity) * 0.15 : 0).toFixed(2)}</span></div>
                      <div className="text-black text-sm">Final Item Total: <span className="font-bold">${((item.price * item.quantity + (item.category === 'Electronics' ? 0.10 : item.category === 'Clothing' ? 0.05 : 0) * item.price * item.quantity) - ((item.category === 'Electronics' && item.quantity > 2) ? (item.price * item.quantity + (item.category === 'Electronics' ? 0.10 : item.category === 'Clothing' ? 0.05 : 0) * item.price * item.quantity) * 0.15 : 0)).toFixed(2)}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => onQuantityChange(item.id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 focus:ring-2 focus:ring-blue-400 text-center"
                    />
                    <div className="text-gray-400 text-xs">Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#ffebee' }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-4 px-4 py-2 rounded-lg bg-red-100 text-red-600 font-bold shadow hover:bg-red-200 transition"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="font-bold text-2xl mt-10 flex justify-between border-t border-gray-200 pt-6">
        <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
      </div>
    </motion.div>
  );
};

export default Cart; 