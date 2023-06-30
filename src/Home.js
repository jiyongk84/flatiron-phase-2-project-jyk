import React, { useState, useEffect } from 'react';
import Cart from './Cart';

function Home() {
  const [items, setItems] = useState([]);

  const handleDeleteItem = (index) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleClearItems = () => {
    setItems([]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.log('Error fetching items:', error));
  };


  return (
    <div className="home-container">
      <div className="left-side">
        <h2>Item Selection</h2>
        {items.map((item) => (
          <div key={item.id}>
            <p>URL: {item.image}</p>
            <p>Item: {item.name}</p>
            <p>Price: {item.price}</p>
          </div>
        ))}
        </div>
      <div className="right-side">
        <Cart items={items} onDeleteItem={handleDeleteItem} onClearItems={handleClearItems} />
      </div>
    </div>
        );
  }
export default Home;
