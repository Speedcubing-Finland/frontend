import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/LOGO_H2.svg';

const navLinks = [
  { to: '/', text: 'Etusivu' },
  { to: '/competitions', text: 'Kilpailut' },
  { to: '/info', text: 'Tietoa' },
  { to: '/join', text: 'Jäseneksi' },
  { to: '/contact', text: 'Yhteystiedot' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="navbar-logo-link">
        <img src={logo} alt="Speedcubing Finland" className="navbar-logo" />
      </a>

      {/* Burger Menu Button */}
      <button
        onClick={toggleMenu}
        className="navbar-burger"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${isMenuOpen ? 'navbar-links-open' : ''}`}>
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `navbar-link ${isActive ? 'active' : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {link.text}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
