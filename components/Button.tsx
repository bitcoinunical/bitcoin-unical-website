import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, to, variant = 'primary', className = '', type, disabled = false }) => {
  const baseClasses = "font-bold font-poppins py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-accent inline-block text-center";
  
  const variantClasses = {
    primary: 'bg-bitcoin-orange text-white hover:bg-orange-500',
    secondary: 'bg-gold-accent text-deep-navy hover:bg-yellow-400',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-deep-navy',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (to) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick();
    };
    return (
      <Link to={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;