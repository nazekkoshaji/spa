import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Logo</Link>
      <div style={{ float: 'right' }}>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
