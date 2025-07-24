import React from 'react';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={e => onQuantityChange(item.id, Number(e.target.value))}
          className="w-16 border rounded px-2 py-1"
        />
      </td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button
          className="text-red-600 hover:underline"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartItem; 