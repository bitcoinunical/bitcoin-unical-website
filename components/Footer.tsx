
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import Logo from './Logo';
import { submitFormData, fetchPartners } from '../lib/api';
import type { Partner } from '../types';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Footer: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const fetchedPartners = await fetchPartners();
        setPartners(fetchedPartners);
      } catch (err) {
        console.error("Failed to load partners for footer:", err);
      }
    };
    loadPartners();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    try {
      const response = await submitFormData('newsletter', { email });
      if (response.success) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        e.currentTarget.reset();
      } else {
        setStatus('error');
        setMessage(response.message || 'An error occurred.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Subscription failed. Please try again.');
    }
  };


  return (
    <footer className="bg-deep-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Motto */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo className="h-12" />
            </Link>
            <p className="text-gold-accent font-semibold">“Where Education Meets Innovation.”</p>
            <div className="flex space-x-4 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-bitcoin-orange transition-colors">
                  {React.cloneElement(social.icon, { size: 24 })}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-poppins text-lg font-bold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {[...NAV_LINKS, {name: 'Contact', path: '/contact'}, {name: 'Partnership', path: '/partnership'}].map((link) => (
                 <li key={link.name}>
                  <Link to={link.path} className="hover:text-bitcoin-orange transition-colors">{link.name}</Link>
                 </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Partners */}
          <div>
            <h3 className="font-poppins text-lg font-bold mb-4">Our Partners</h3>
             <div className="grid grid-cols-2 gap-4">
               {partners.slice(0, 4).map(partner => (
                 partner.logoUrl && (
                    <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                      <img src={partner.logoUrl} alt={partner.name} className="h-10 object-contain"/>
                    </a>
                 )
               ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-poppins text-lg font-bold mb-4">Join our Newsletter</h3>
            <p className="mb-4 text-gray-300">Get the latest news, events, and research updates.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <input type="email" name="email" placeholder="Your Email" required className="w-full rounded-l-md px-3 py-2 text-deep-navy focus:outline-none focus:ring-2 focus:ring-bitcoin-orange" />
                <button type="submit" disabled={status === 'submitting'} className="bg-bitcoin-orange text-white font-bold px-4 py-2 rounded-r-md hover:bg-gold-accent transition-colors disabled:opacity-50">
                  {status === 'submitting' ? '...' : 'Sign Up'}
                </button>
              </div>
               {message && <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Bitcoin Unical. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
