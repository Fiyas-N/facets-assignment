import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ProductList = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState('');

  const handleQuantityChange = (id, value) => {
    setQuantities(q => ({ ...q, [id]: Math.max(1, Number(value)) }));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 w-full bg-gray-50 rounded-xl shadow-none relative">
      <h2 className="text-2xl font-extrabold mb-6 tracking-tight">Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0]"
        aria-label="Search products"
      />
      {filteredProducts.length === 0 && <div className="text-gray-400">No products found.</div>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product, idx) => (
          <motion.li
            key={product.id}
            layout
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(40,116,240,0.12)' }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-100 shadow-xl p-6 flex flex-col items-center group relative overflow-hidden"
          >
            <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-2xl relative">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-40 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                style={{ background: 'linear-gradient(135deg, #f8f8f8 60%, #e3f0ff 100%)' }}
              />
            </div>
            <div className="font-extrabold text-xl mb-1 text-center tracking-tight">{product.name}</div>
            <div className="text-gray-500 mb-1">{product.category}</div>
            <div className="text-[#ff9f00] font-bold text-2xl mb-2">${product.price.toFixed(2)}</div>
            <div className="flex items-center gap-2 mt-2 w-full">
              <input
                type="number"
                min={1}
                value={quantities[product.id] || 1}
                onChange={e => handleQuantityChange(product.id, e.target.value)}
                className="w-16 border rounded px-2 py-1 focus:ring-2 focus:ring-blue-400"
                disabled={product.stock === 0}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-4 py-2 rounded-lg font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff9f00] shadow-lg active:scale-95 ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#ff9f00] to-[#fb641b] text-white hover:from-[#fb641b] hover:to-[#ff9f00]'
                }`}
                onClick={() => onAddToCart(product, quantities[product.id] || 1)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList; 