import React, { useState } from 'react';
import './App.css';

function Cart({ items, onAddItem, onDeleteItem }) {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemPicture, setItemPicture] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();

    // Validate input here

    const newItem = {
      name: itemName,
      type: itemType,
      picture: itemPicture,
      price: parseFloat(itemPrice),
    };

    onAddItem(newItem);
    setItemName('');
    setItemType('');
    setItemPicture('');
    setItemPrice('');
  };

  const handleRemoveItem = (index) => {
    onDeleteItem(index);
  };

  const handleClearItems = () => {
    // Clear all items
    // ...

    // Alternatively, you can prompt for confirmation before clearing all items
    // if (window.confirm('Are you sure you want to clear all items?')) {
    //   // Clear all items
    //   // ...
    // }
  };

  const calculateTotal = () => {
    // Calculate the total price of all items
    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2); // Adjust the decimal places as needed
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Add Items</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Item Type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Item Picture (URL)"
            value={itemPicture}
            onChange={(e) => setItemPicture(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="cart-items">
        <h2>Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <button onClick={() => handleRemoveItem(index)}>Delete</button>
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
