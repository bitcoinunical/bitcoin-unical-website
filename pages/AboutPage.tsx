import React from 'react';

const AboutPage: React.FC = () => {

  const milestones = [
    { year: 'Nov 2024', event: 'Community was founded.' },
    { year: 'May 2025', event: 'First campus meetup.' },
    { year: 'Sep 2025', event: 'Second campus meetup.' },
    { year: 'Nov 2025', event: 'Official registration with the school.' },
  ];

  return (
    <div className="bg-light-grey dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">About Bitcoin Unical</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Our journey, our mission, and what we stand for.</p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
            <h2 className="font-poppins text-2xl font-bold text-bitcoin-orange mb-3">Our Mission</h2>
            <p>To empower African students with comprehensive Bitcoin education, fostering innovation and creating a new generation of leaders in the decentralized economy.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
            <h2 className="font-poppins text-2xl font-bold text-bitcoin-orange mb-3">Our Vision</h2>
            <p>To be the leading hub for Bitcoin research, development, and community building across African universities, driving adoption and financial sovereignty.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
            <h2 className="font-poppins text-2xl font-bold text-bitcoin-orange mb-3">Our Values</h2>
            <p>Education, Innovation, Community, Sovereignty, and Transparency. These principles guide every action we take.</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-center font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-8">Our Milestones</h2>
          <div className="relative">
            <div className="border-l-4 border-bitcoin-orange absolute h-full left-1/2 -translate-x-1/2"></div>
            {milestones.map((item, index) => (
              <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="w-5/12"></div>
                <div className="z-10 bg-bitcoin-orange text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">{index + 1}</div>
                <div className="w-5/12 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                  <h3 className="font-poppins font-bold text-lg text-deep-navy dark:text-white">{item.year}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quote Callout */}
        <div className="my-16 p-8 border-l-8 border-bitcoin-orange bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <p className="font-poppins text-2xl md:text-3xl font-semibold italic text-deep-navy dark:text-white">
            “Education fuels freedom; Bitcoin ensures it lasts.”
          </p>
        </div>


        {/* Photo Gallery */}
        <div className="text-center">
          <h2 className="text-center font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-8">Our Community in Action</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            See photos from our latest meetups, bootcamps, and events. Our official gallery is the best place to see our community come to life.
          </p>
          <a
            href="https://BitcoinUnical.pixieset.com/bitnoobdevbootcamp/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-poppins py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gold-accent inline-block text-center bg-bitcoin-orange text-white hover:bg-orange-500"
          >
            View Full Gallery
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;