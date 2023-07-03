import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Cart from './Cart';
import Data from './Data';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home onAddItem={setCartItems} />} />
          <Route
            path="/cart"
            element={<Cart items={cartItems} onDeleteItem={setCartItems} />}
          />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
