import React from 'react';

const LoyaltySelector = ({ loyaltyLevel, onChange }) => {
  return (
    <div className="p-4">
      <label className="font-semibold mr-2">Loyalty Level:</label>
      <select
        className="border rounded px-2 py-1"
        value={loyaltyLevel}
        onChange={e => onChange(e.target.value)}
      >
        <option value="Bronze">Bronze</option>
        <option value="Silver">Silver</option>
        <option value="Gold">Gold</option>
      </select>
    </div>
  );
};

export default LoyaltySelector; 