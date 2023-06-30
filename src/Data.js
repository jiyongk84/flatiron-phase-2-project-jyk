import React, { useState } from 'react';

function Data({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemPicture, setItemPicture] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();

    const newItem = {
      name: itemName,
      type: itemType,
      image: itemPicture,
      price: parseFloat(itemPrice),
    };

    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      })
      .then((data) => {
        // Call the onAddItem function to update the state in the parent component
        onAddItem(newItem);

        // Reset the form fields
        setItemName('');
        setItemType('');
        setItemPicture('');
        setItemPrice('');
      })
      .catch((error) => {
        console.log('Error adding item:', error);
      });
  };

  return (
    <div className="data-section">
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
  );
}

export default Data;
