// src/components/Header/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar({ navItems, handleScroll }) {
  return (
    <nav className="bg-gradient-to-r from-orange-300 to-blue-400 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center md:justify-start items-center py-2 gap-2 md:gap-5 text-sm md:text-base font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleScroll(e, item.to)}
              className="px-4 py-2 hover:bg-white/30 rounded-lg transition-all duration-300 hover:shadow-md hover:text-orange-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}