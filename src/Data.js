import React, { useState, useEffect } from 'react';

function Data({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemPicture, setItemPicture] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setAllItems(data))
      .catch((error) => console.log('Error fetching items:', error));
  };

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

        // Fetch all items again to update the data displayed below
        fetchItems();
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

      <h2>All Items</h2>
    <table className="item-table">
      <thead>
        <tr>
          <th className="category">Item Name</th>
          <th className="category">Item Type</th>
          <th className="category">Price</th>
        </tr>
      </thead>
      <tbody>
        {allItems.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default Data;
