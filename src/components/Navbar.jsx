import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-brandColor">
          Speedcubing Finland
        </a>

        {/* Burger Menu Button */}
        <button
          onClick={toggleMenu}
          className="custom:hidden text-brandColor focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute custom:static top-16 left-0 w-full custom:w-auto bg-white custom:bg-transparent shadow-md custom:shadow-none custom:flex custom:gap-6 items-center transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `block custom:inline-block navbar-link px-4 py-2 ${
                  isActive ? 'active font-bold text-brandColor' : 'text-gray-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)} // Close menu after clicking a link
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
