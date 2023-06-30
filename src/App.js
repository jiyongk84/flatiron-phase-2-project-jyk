import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Cart from './Cart';
import Data from './Data';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddItem = (newItem) => {
    setCartItems([...cartItems, newItem]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={<Cart items={cartItems} onAddItem={handleAddItem} onDeleteItem={handleDeleteItem} />}
          />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;