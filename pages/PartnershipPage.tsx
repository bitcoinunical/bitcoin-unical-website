
import React, { useState, useEffect } from 'react';
import type { Partner } from '../types';
import { fetchPartners, submitFormData } from '../lib/api';
import Button from '../components/Button';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const PartnershipPage: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await submitFormData('partnership', data);
      if (response.success) {
        setStatus('success');
        setMessage(response.message);
        e.currentTarget.reset();
      } else {
        setStatus('error');
        setMessage(response.message || 'An unknown error occurred.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Submission failed. Please try again later.');
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy">Partners & Sponsors</h1>
          <p className="mt-4 text-lg text-gray-600">We are proud to collaborate with leaders in the Bitcoin ecosystem.</p>
        </div>

        {loading ? (
          <p className="text-center">Loading partners...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 items-stretch">
            {partners.map((partner) => (
              <a 
                key={partner.id} 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-white p-4 rounded-lg shadow-md text-center flex flex-col border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center p-2 mb-4">
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
                    <h3 className="font-poppins font-bold text-lg text-deep-navy">{partner.name}</h3>
                    <p className="text-sm text-gray-500">{partner.role}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="my-24">
            <div className="border-t pt-16">
                 <h2 className="text-center font-poppins text-3xl font-bold text-deep-navy mb-12">Our Supporters</h2>
                 <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                    {partners.map((partner) => (
                      partner.logoUrl && (
                        <a
                            key={partner.id}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                            title={partner.name}
                        >
                            <img 
                                src={partner.logoUrl} 
                                alt={`${partner.name} logo`}
                                className={`max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out transform group-hover:scale-110 ${partner.logoBg === 'dark' ? 'bg-deep-navy p-2 rounded' : ''}`}
                            />
                        </a>
                      )
                    ))}
                 </div>
            </div>
        </div>

        <div className="max-w-2xl mx-auto bg-light-grey p-8 rounded-lg shadow-inner">
            <h2 className="font-poppins text-3xl font-bold text-deep-navy mb-6 text-center">Partner With Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" id="companyName" name="companyName" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange" />
                </div>
                <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input type="email" id="contactEmail" name="contactEmail" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">How would you like to partner?</label>
                    <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange"></textarea>
                </div>
                <div className="text-center">
                    <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                </div>
                {message && (
                  <p className={`mt-4 text-center text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
                )}
            </form>
        </div>
      </div>
    </div>
  );
};

export default PartnershipPage;
