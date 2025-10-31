
import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';

const FloatingButton: React.FC = () => {
  return (
    <Link 
      to="/contact"
      className="fixed bottom-6 right-6 bg-bitcoin-orange text-white p-4 rounded-full shadow-lg hover:bg-gold-accent hover:text-deep-navy transform hover:scale-110 transition-all duration-300 z-40 flex items-center group"
      aria-label="Join Us"
    >
      <FiUsers size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out ml-0 group-hover:ml-2">
        Join Us
      </span>
    </Link>
  );
};

export default FloatingButton;
