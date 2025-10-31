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
        setMessage(response.message);
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


  return (
    <div className="py-16 bg-light-grey">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-600">Have a question, want to partner, or just want to say hi? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange" />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">I'm interested in...</label>
                <select id="interest" name="interest" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange">
                  <option>Joining the Community</option>
                  <option>Partnering with Us</option>
                  <option>Sponsoring a Project/Event</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange"></textarea>
              </div>
              <div className="text-left">
                <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
               {message && (
                  <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
                )}
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div>
              <h3 className="font-poppins text-2xl font-bold text-deep-navy mb-4">Connect With Us</h3>
              <p className="text-gray-600 mb-6">Follow our journey and join the conversation on social media.</p>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-md hover:bg-gold-accent hover:text-deep-navy transition-colors">
                    {React.cloneElement(social.icon, { size: 24 })}
                    <span className="font-semibold">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-deep-navy text-white p-8 rounded-lg shadow-xl">
              <h3 className="font-poppins text-2xl font-bold mb-4">Join our Newsletter</h3>
              <p className="mb-4 text-gray-300">Get the latest news, event invitations, and research updates delivered directly to your inbox.</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                  <input type="email" placeholder="Your Email" className="w-full rounded-l-md px-3 py-2 text-deep-navy focus:outline-none focus:ring-2 focus:ring-bitcoin-orange" />
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