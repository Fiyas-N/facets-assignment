import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';

const Navbar = ({ cartCount, onSearch }) => {
  const location = useLocation();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <nav className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-md w-full font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="font-extrabold text-2xl tracking-tight flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ff9f00]">
          <span className="text-white">SmartCart</span>
        </NavLink>
        {/* Search Bar */}
        {location.pathname !== '/cart' && location.pathname !== '/' && (
          <div className="flex-1 flex justify-center mx-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ff9f00] focus:bg-white/10 transition"
                value={search}
                onChange={handleSearch}
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-[#ff9f00] rounded-lg text-white hover:bg-[#fb641b] transition focus:outline-none focus:ring-2 focus:ring-[#2874f0] -ml-2">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        )}
        {/* Nav Links & Cart */}
        <div className="flex items-center gap-6">
          <NavLink to="/products" className={({isActive}) => isActive ? 'text-[#ff9f00] font-bold focus:outline-none focus:ring-2 focus:ring-[#2874f0]' : 'hover:text-[#ff9f00] focus:outline-none focus:ring-2 focus:ring-[#2874f0]'}>Products</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'text-[#ff9f00] font-bold flex items-center focus:outline-none focus:ring-2 focus:ring-[#2874f0]' : 'hover:text-[#ff9f00] flex items-center focus:outline-none focus:ring-2 focus:ring-[#2874f0]'}>
            <FiShoppingCart size={22} className="mr-1" /> Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-[#ff9f00] text-white rounded-full px-2 py-0.5 text-xs font-bold animate-fade-in-up animate-bounce" aria-label={`Cart has ${cartCount} items`}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 