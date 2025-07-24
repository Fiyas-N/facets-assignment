import React from 'react';

const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-xl text-white shadow-2xl animate-fade-in-up bg-green-600 font-semibold text-lg"
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

export default Toast; 