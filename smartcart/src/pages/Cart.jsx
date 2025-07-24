import React, { useState } from 'react';

const CartPage = ({ cart, onRemove, onQuantityChange, clearCart, loyaltyLevel, setLoyaltyLevel }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showLoyaltyDropdown, setShowLoyaltyDropdown] = useState(false);

  // Price calculations
  const getGST = (item) => {
    if (item.category === 'Electronics') return 0.10 * item.price;
    if (item.category === 'Clothing') return 0.05 * item.price;
    return 0;
  };
  const getBulkDiscount = (item) => {
    // Example: $10 off for books if quantity > 1, else 0
    if (item.category === 'Books' && item.quantity > 1) return 10.00;
    return 0;
  };
  const getAfterGst = (item) => item.price + getGST(item);
  const getItemSubtotal = (item) => (getAfterGst(item) * item.quantity) - (getBulkDiscount(item) * item.quantity);

  const calculateSubtotal = () => cart.reduce((total, item) => total + getAfterGst(item) * item.quantity, 0);
  const calculateTotalGST = () => cart.reduce((total, item) => total + getGST(item) * item.quantity, 0);
  const calculateBulkDiscount = () => cart.reduce((total, item) => total + getBulkDiscount(item) * item.quantity, 0);
  const calculateLoyaltyDiscount = () => {
    const subtotal = calculateSubtotal();
    const discountRates = { Bronze: 0.02, Silver: 0.05, Gold: 0.08 };
    return subtotal * (discountRates[loyaltyLevel] || 0);
  };
  const calculateFinalTotal = () => calculateSubtotal() - calculateBulkDiscount() - calculateLoyaltyDiscount();
  const getLoyaltyColor = (level) => {
    const colors = {
      Bronze: 'bg-amber-600 text-white',
      Silver: 'bg-gray-400 text-white',
      Gold: 'bg-yellow-500 text-white',
    };
    return colors[level] || 'bg-amber-600 text-white';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-3xl font-bold text-blue-600 mb-8">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some items to get started</p>
                  <a href="/products" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                        </div>
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">{item.name}</h3>
                              <p className="text-sm text-gray-500 uppercase tracking-wide">{item.category}</p>
                            </div>
                            <button
                              onClick={() => { setItemToRemove(item.id); setShowRemoveModal(true); }}
                              className="px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-full hover:bg-red-200 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                            >Remove</button>
                          </div>
                          {/* Price Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                            <div>
                              <span className="text-gray-500">Original:</span>
                              <div className="font-semibold">${item.price.toFixed(2)}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">GST:</span>
                              <div className="font-semibold text-blue-600">${getGST(item).toFixed(2)}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">After GST:</span>
                              <div className="font-semibold">${getAfterGst(item).toFixed(2)}</div>
                            </div>
                            {getBulkDiscount(item) > 0 && (
                              <div>
                                <span className="text-gray-500">Bulk Discount:</span>
                                <div className="font-semibold text-green-600">-${getBulkDiscount(item).toFixed(2)}</div>
                              </div>
                            )}
                          </div>
                          {/* Quantity and Subtotal */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer">-</button>
                              <span className="px-4 py-2 text-sm font-medium text-gray-900 border-l border-r border-gray-200">{item.quantity}</span>
                              <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer">+</button>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Subtotal:</div>
                              <div className="text-lg font-bold text-gray-900">${getItemSubtotal(item).toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">Subtotal: ${calculateSubtotal().toFixed(2)}</div>
                    <a href="/products" className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Continue Shopping</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Order Summary Section */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal:</span><span className="font-semibold">${calculateSubtotal().toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Total GST:</span><span className="font-semibold text-blue-600">${calculateTotalGST().toFixed(2)}</span></div>
                  {calculateBulkDiscount() > 0 && (<div className="flex justify-between"><span className="text-gray-600">Bulk Discount:</span><span className="font-semibold text-green-600">-${calculateBulkDiscount().toFixed(2)}</span></div>)}
                  <div className="flex justify-between"><span className="text-gray-600">Loyalty Discount:</span><span className="font-semibold text-green-600">-${calculateLoyaltyDiscount().toFixed(2)}</span></div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center"><span className="text-xl font-bold text-gray-900">Final Total:</span><span className="text-2xl font-bold text-gray-900">${calculateFinalTotal().toFixed(2)}</span></div>
                </div>
                {/* Loyalty Level Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loyalty Level:</label>
                  <div className="relative">
                    <button onClick={() => setShowLoyaltyDropdown(!showLoyaltyDropdown)} className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors !rounded-button cursor-pointer"><div className="flex items-center space-x-2"><span className={`px-2 py-1 text-xs font-medium rounded ${getLoyaltyColor(loyaltyLevel)}`}>{loyaltyLevel}</span></div><i className="fas fa-chevron-down text-gray-400 text-xs"></i></button>
                    {showLoyaltyDropdown && (<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"><div className="py-2">{['Bronze', 'Silver', 'Gold'].map((level) => (<button key={level} onClick={() => { setLoyaltyLevel(level); setShowLoyaltyDropdown(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"><span className={`px-2 py-1 text-xs font-medium rounded ${getLoyaltyColor(level)}`}>{level}</span></button>))}</div></div>)}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Proceed to Checkout</button>
                  <button onClick={() => setShowClearModal(true)} className="w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Clear Cart</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Remove Item Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Remove Item</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove this item from your cart?</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowRemoveModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={() => { if (itemToRemove) { onRemove(itemToRemove); setShowRemoveModal(false); setItemToRemove(null); } }} className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Remove</button>
            </div>
          </div>
        </div>
      )}
      {/* Clear Cart Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clear Cart</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove all items from your cart?</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowClearModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={() => { clearCart(); setShowClearModal(false); }} className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors !rounded-button cursor-pointer whitespace-nowrap">Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 