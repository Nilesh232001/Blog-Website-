import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiX, FiSearch, FiUser, FiLogOut, FiPlus, FiHome } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <FiHome className="brand-icon" />
            <span>BlogHub</span>
          </Link>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          <div className="navbar-menu">
            <div className="navbar-nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/create-post" className="nav-link">
                    <FiPlus className="nav-icon" />
                    Write
                  </Link>
                  <div className="nav-dropdown">
                    <button className="nav-link dropdown-toggle">
                      <FiUser className="nav-icon" />
                      {user?.username}
                    </button>
                    <div className="dropdown-menu">
                      <Link to="/dashboard" className="dropdown-item">
                        Dashboard
                      </Link>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        <FiLogOut className="dropdown-icon" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch} className="mobile-search">
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
          
          <div className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create-post" className="mobile-nav-link" onClick={toggleMenu}>
                  <FiPlus className="nav-icon" />
                  Write Post
                </Link>
                <Link to="/dashboard" className="mobile-nav-link" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link to="/profile" className="mobile-nav-link" onClick={toggleMenu}>
                  Profile
                </Link>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="mobile-nav-link">
                  <FiLogOut className="nav-icon" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 