
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl dark:border dark:border-slate-700 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out ${className}`}>
      {children}
    </div>
  );
};

export default Card;
