import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/audience" className="nav-button">
          Create Audience
        </Link>
        <Link to="/audience/list" className="nav-button">
          Audience List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
