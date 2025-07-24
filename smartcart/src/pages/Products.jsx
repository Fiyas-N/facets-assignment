import React, { useState } from 'react';

const Products = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState(products.map(() => 1));
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const updateQuantity = (index, change) => {
    setQuantities(q => {
      const newQ = [...q];
      newQ[index] = Math.max(1, newQ[index] + change);
      return newQ;
    });
  };

  const handleAddToCart = (index) => {
    onAddToCart(products[index], quantities[index]);
  };

  // Filter and sort products
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered];
  if (sortBy === 'priceLow') sorted.sort((a, b) => a.price - b.price);
  if (sortBy === 'priceHigh') sorted.sort((a, b) => b.price - a.price);
  if (sortBy === 'newest') sorted.reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title and Sort */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Products</h2>
          <div className="flex items-center">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
              >
                <span className="text-sm text-gray-700">
                  Sort by: {sortBy === 'featured' ? 'Featured' : sortBy === 'priceLow' ? 'Price: Low to High' : sortBy === 'priceHigh' ? 'Price: High to Low' : 'Newest'}
                </span>
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button onClick={() => { setSortBy('featured'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Featured</button>
                    <button onClick={() => { setSortBy('priceLow'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Price: Low to High</button>
                    <button onClick={() => { setSortBy('priceHigh'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Price: High to Low</button>
                    <button onClick={() => { setSortBy('newest'); setShowSortDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Newest</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((product, index) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover object-top"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium uppercase tracking-wide rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">{product.category}</p>
                <div className="text-2xl font-bold text-blue-600 mb-6">${product.price}</div>
                {/* Quantity and Add to Cart */}
                <div className="flex items-center justify-between">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-medium text-gray-900 border-l border-r border-gray-200">
                      {quantities[index]}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(index)}
                    className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products; 