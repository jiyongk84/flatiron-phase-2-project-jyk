import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='navbar'>
      <Link className='navbar-item' to="/">Home</Link>
      <span className='navbar-item'>|</span>
      <Link className='navbar-item' to="/data">Data</Link>
    </nav>
  );
}

export default NavBar;
