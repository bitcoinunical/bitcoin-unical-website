
import React, { useState, useEffect } from 'react';
import { fetchSiteContent } from '../lib/api';

const AboutPage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const content = await fetchSiteContent('about');
        if (content && content.imageGallery) {
          setGalleryImages(content.imageGallery);
        }
      } catch (err) {
        console.error("Failed to load About page content", err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

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
        <div>
          <h2 className="text-center font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-8">Our Community in Action</h2>
          {loading ? (
            <p className="text-center">Loading gallery...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((src, index) => (
                <img key={index} src={src} alt={`Community action ${index + 1}`} className="rounded-lg shadow-md w-full h-64 object-cover" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;