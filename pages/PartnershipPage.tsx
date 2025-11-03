import React, { useState, useEffect } from 'react';
import type { Partner } from '../types';
import { fetchPartners } from '../lib/api';

const PartnershipPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        setLoading(true);
        const fetchedPartners = await fetchPartners();
        setPartners(fetchedPartners);
      } catch (err) {
        setError("Failed to load our partners. We're working on it!");
      } finally {
        setLoading(false);
      }
    };
    loadPartners();
  }, []);

  return (
    <div className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">Partners & Sponsors</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">We are proud to collaborate with leaders in the Bitcoin ecosystem.</p>
        </div>

        {loading ? (
          <p className="text-center py-12">Loading partners...</p>
        ) : error ? (
          <p className="text-center py-12 text-red-500">{error}</p>
        ) : (
          partners.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 items-stretch">
              {partners.map((partner) => (
                <a 
                  key={partner.id} 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-center flex flex-col border dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-24 bg-gray-50 dark:bg-slate-700 rounded-lg flex items-center justify-center p-2 mb-4">
                    {partner.logoUrl ? (
                      <img 
                        src={partner.logoUrl} 
                        alt={`${partner.name} logo`} 
                        className={`max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-105 ${partner.logoBg === 'dark' ? 'bg-deep-navy p-2 rounded-md' : ''}`} 
                      />
                    ) : (
                      <span className="text-sm text-gray-400">Logo</span>
                    )}
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-start">
                      <h3 className="font-poppins font-bold text-lg text-deep-navy dark:text-white">{partner.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{partner.role}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-16">
                <p className="text-xl text-gray-500 dark:text-gray-400">We are actively seeking new partners. Become one today!</p>
            </div>
          )
        )}

        <div className="my-24">
            <div className="border-t dark:border-slate-700 pt-16">
                 <h2 className="text-center font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-12">Our Supporters</h2>
                 <div className="relative w-full overflow-hidden group">
                    <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
                       {[...partners, ...partners].map((partner, index) => (
                          partner.logoUrl && (
                            <a
                                key={`${partner.id}-${index}`}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-8 flex-shrink-0"
                                title={partner.name}
                            >
                                <img 
                                    src={partner.logoUrl} 
                                    alt={`${partner.name} logo`}
                                    className={`max-h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300 ease-in-out transform hover:scale-110 ${partner.logoBg === 'dark' ? 'bg-deep-navy p-2 rounded' : ''}`}
                                />
                            </a>
                          )
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-2xl mx-auto bg-light-grey dark:bg-slate-800 p-8 rounded-lg shadow-inner text-center">
            <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-6">Partner With Us</h2>
             <p className="text-gray-600 dark:text-gray-300 mb-8">
              We use Google Forms to reliably capture all partnership inquiries. Clicking the button below will take you to our official form.
            </p>
            <a
              href="https://forms.gle/fmXgmE7Dmpu6bghZ7"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold font-poppins py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gold-accent inline-block text-center bg-bitcoin-orange text-white hover:bg-orange-500"
            >
              Submit Inquiry Here
            </a>
        </div>
      </div>
    </div>
  );
};

export default PartnershipPage;