import React, { useState } from 'react';
import Button from '../components/Button';
import { SOCIAL_LINKS } from '../constants';
import { submitFormData } from '../lib/api';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await submitFormData('contact', data);
      if (response.success) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
        setMessage(response.message || 'An unknown error occurred.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send message. Please try again later.');
    }
  };

  const communityLinks = SOCIAL_LINKS.filter(
    link => link.name === 'WhatsApp' || link.name === 'Telegram'
  );

  return (
    <div className="py-16 bg-light-grey dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Have a question, want to partner, or just want to say hi? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
             { status === 'success' ? (
              <div className="text-center py-8">
                <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-4">Thank You!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">Your message has been sent. We'll be in touch soon.</p>
                <div className="border-t dark:border-slate-700 pt-8">
                  <p className="font-semibold text-lg text-deep-navy dark:text-white mb-4">Join the conversation:</p>
                  <div className="flex justify-center items-center space-x-8">
                    {communityLinks.map(link => (
                      <a 
                        key={link.name} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 dark:text-gray-300 hover:text-bitcoin-orange transition-transform duration-300 transform hover:scale-110"
                        aria-label={`Join us on ${link.name}`}
                      >
                        {React.cloneElement(link.icon, { size: 48 })}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">I'm interested in...</label>
                  <select id="interest" name="interest" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                    <option>Joining the Community</option>
                    <option>Partnering with Us</option>
                    <option>Sponsoring a Project/Event</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white"></textarea>
                </div>
                <div className="text-left">
                  <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
                {status === 'error' && message && (
                    <p className="mt-4 text-sm text-red-600">{message}</p>
                  )}
              </form>
            )}
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div>
              <h3 className="font-poppins text-2xl font-bold text-deep-navy dark:text-white mb-4">Connect With Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Follow our journey and join the conversation on social media.</p>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md hover:bg-gold-accent hover:text-deep-navy transition-colors">
                    {React.cloneElement(social.icon, { size: 24, className: 'dark:text-white group-hover:text-deep-navy' })}
                    <span className="font-semibold dark:text-white group-hover:text-deep-navy">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-deep-navy text-white p-8 rounded-lg shadow-xl">
              <h3 className="font-poppins text-2xl font-bold mb-4">Join our Newsletter</h3>
              <p className="mb-4 text-gray-300">Get the latest news, event invitations, and research updates delivered directly to your inbox.</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                  <input type="email" placeholder="Your Email" className="w-full rounded-l-md px-3 py-2 text-deep-navy focus:outline-none focus:ring-2 focus:ring-bitcoin-orange dark:bg-slate-700 dark:text-white dark:placeholder-gray-400" />
                  <button type="submit" className="bg-bitcoin-orange text-white font-bold px-4 py-2 rounded-r-md hover:bg-gold-accent transition-colors">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
