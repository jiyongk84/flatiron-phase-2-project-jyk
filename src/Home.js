import React, { useState, useEffect } from 'react';
import Cart from './Cart';

function Home({ onAddItem }) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleDeleteItem = (index) => {
    setCartItems((prevItems) => {
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
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log('Error fetching items:', error));
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedItems);
      onAddItem(updatedItems);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
      onAddItem({ ...item, quantity: 1 });
    }
  };

  return (
    <div className="home-container">
      <div className="left-side">
        <h2>Item Selection</h2>
        <div className="item-cards">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className="right-side">
        <h2>Cart</h2>
        <Cart items={cartItems} onAddItem={handleAddToCart} onDeleteItem={handleDeleteItem} onClearItems={handleClearItems} />
      </div>
    </div>
  );
}

export default Home;
