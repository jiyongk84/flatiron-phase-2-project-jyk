import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import Data from './Data';

function Home( {onAddItem} ) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleDeleteItem = (index) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleClearItems = () => {
    setCartItems([]);
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

  const handleAddToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
    onAddItem(item)
  };

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <div className="home-container">
      <div className="left-side">
        <h2>Item Selection</h2>
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <p>Item: {item.name}</p>
            <p>Price: {item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="right-side">
        <Cart items={cartItems} onDeleteItem={handleDeleteItem} onClearItems={handleClearItems} />
      </div>
    </div>
  );
}

export default Home;
