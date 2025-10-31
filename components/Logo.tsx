import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  // Replaced the image with styled text to meet the color requirements.
  // The hexagon symbol is removed as it was part of the original static image.
  return (
    <div className={`font-poppins font-bold text-2xl tracking-wide flex items-center ${className}`}>
      <span className="text-bitcoin-orange">BITCOIN</span>
      <span className="text-white">UNICAL</span>
    </div>
  );
};

export default Logo;
