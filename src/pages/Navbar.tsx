import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>Library Portal</div>
      <ul className="navbar-links">
        {role === 'admin' && (
          <>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/add-book">Add Book</Link></li>
          </>
        )}
        {role === 'user' && (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/my-books">My Books</Link></li>
          </>
        )}
        {!role && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {role && <li><button onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
