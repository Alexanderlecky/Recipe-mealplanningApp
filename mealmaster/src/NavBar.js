
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/meal-plans">Meal Plans</Link>
      <Link to="/shopping-list">Shopping List</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default NavBar;
