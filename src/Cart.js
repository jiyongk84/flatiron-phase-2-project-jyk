import React from 'react';
import './App.css';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Cart({ items, onDeleteItem, onClearItems, onAddItem }) {
  const handleRemoveItem = (index) => {
    onDeleteItem(index);
  };

  const handleClearItems = () => {
    onClearItems();
  };

  const handleAddItem = (item) => {
    onAddItem(item);
  };

  const calculateTotal = () => {
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {items.length === 0 ? (
          <p>Your cart is empty. Add items from the Item Selection.</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <div>
                  <button onClick={() => handleRemoveItem(index)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddItem(item)}>
                    <FaPlus />
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(index)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 && (
          <button className="clear-button" onClick={handleClearItems}>
            Clear Cart
          </button>
        )}
        <div className="total">
          <span>Total: $ {calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
