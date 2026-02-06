import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🏥</span>
            AI Health Assistant
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/symptoms" className="nav-link">Check Symptoms</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;