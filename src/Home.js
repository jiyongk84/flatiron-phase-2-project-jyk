import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import './App.css';

function Home() {
  const [items, setItems] = useState([]);

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
      <Cart items={items} />
      </div>
    </div>
  );
}

export default Home;