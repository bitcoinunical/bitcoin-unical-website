
import React from 'react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="relative bg-deep-navy text-white overflow-hidden">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-transparent to-bitcoin-orange/30"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center">
          <span className="font-semibold text-gold-accent mb-2 tracking-wider">
            Building the future of Bitcoin education from the heart of Africa.
          </span>
          <h1 className="font-poppins text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
            Where Education <span className="text-bitcoin-orange">Meets</span> Innovation.
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-gray-300 mb-8">
            Bitcoin Unical is the pioneering student-led Bitcoin community at the University of Calabar, empowering young Africans with the knowledge, tools, and network to build the future of decentralized innovation.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button to="/contact" variant="primary">Join the Movement</Button>
            <Button to="/partnership" variant="secondary">Become a Sponsor</Button>
            <Button to="/library" variant="outline">Learn Bitcoin Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;