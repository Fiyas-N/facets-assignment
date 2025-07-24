import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="bg-gradient-to-br from-[#e3f0ff] to-white min-h-[80vh] font-sans animate-fade-in">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6 gap-10">
      {/* Hero Text */}
      <div className="flex-1 flex flex-col items-start">
        <h1 className="text-5xl font-extrabold text-[#2874f0] mb-6 drop-shadow-lg leading-tight">SmartCart: <span className="text-[#ff9f00]">Intelligent Pricing</span> at Your Fingertips</h1>
        <p className="text-xl text-gray-700 mb-10 max-w-xl">Shop smarter with real-time discounts, loyalty rewards, and a beautiful, transparent cart experience. Enjoy a seamless, modern shopping journey!</p>
        <Link to="/products" className="bg-[#ff9f00] text-white px-10 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:bg-[#fb641b] transition-all duration-200">Browse Products</Link>
      </div>
      {/* Hero Image */}
      <div className="flex-1 flex justify-center">
        <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&w=600" alt="Shopping Banner" className="rounded-2xl shadow-xl w-full max-w-md object-cover animate-fade-in" />
      </div>
    </div>
  </div>
);

export default Home; 