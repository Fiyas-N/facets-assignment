import React from 'react';

const Footer = () => (
  <footer className="bg-[#2874f0] text-white text-center py-6 mt-12 text-base font-sans shadow-inner">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
      <div className="font-bold text-lg">SmartCart &copy; {new Date().getFullYear()}</div>
      <div className="flex gap-6">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9f00] focus:outline-none focus:ring-2 focus:ring-[#ff9f00]">GitHub</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff9f00] focus:outline-none focus:ring-2 focus:ring-[#ff9f00]">LinkedIn</a>
        <a href="mailto:support@smartcart.com" className="hover:text-[#ff9f00] focus:outline-none focus:ring-2 focus:ring-[#ff9f00]">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer; 