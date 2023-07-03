import React from 'react';
import './App.css';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Cart({ items, onDeleteItem, onClearItems, onAddItem, onDecrementItem }) {
  const handleRemoveItem = (index) => {
    onDeleteItem(index);
  };

  const handleDecrementItem = (item) => {
    onDecrementItem(item);
  }
  const handleClearItems = () => {
    onClearItems();
  };

  const handleAddItem = (item) => {
    onAddItem(item);
  };

  const calculateTotal = () => {
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
                  <button className="decrement-item" onClick={() => handleDecrementItem(item)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button className="increment-item" onClick={() => handleAddItem(item)}>
                    <FaPlus />
                  </button>
                </div>
                <button className="delete-item" onClick={() => handleRemoveItem(index)}>
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
