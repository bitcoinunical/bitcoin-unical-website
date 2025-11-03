import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="py-16 bg-light-grey dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">Get In Touch</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Have a question, want to partner, or just want to say hi? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl flex flex-col items-center justify-center text-center">
            <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-6">Join Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              To ensure all inquiries are captured reliably, we use Google Forms. Clicking the button below will take you to our official form.
            </p>
            <a
              href="https://forms.gle/C3yTS6uxX9bwkdRd6"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold font-poppins py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gold-accent inline-block text-center bg-bitcoin-orange text-white hover:bg-orange-500"
            >
              Join Us
            </a>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            <div>
              <h3 className="font-poppins text-2xl font-bold text-deep-navy dark:text-white mb-4">Connect With Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Follow our journey and join the conversation on social media.</p>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md hover:bg-gold-accent hover:text-deep-navy transition-colors">
                    {React.cloneElement(social.icon, { size: 24, className: 'dark:text-white group-hover:text-deep-navy' })}
                    <span className="font-semibold dark:text-white group-hover:text-deep-navy">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-deep-navy text-white p-8 rounded-lg shadow-xl">
              <h3 className="font-poppins text-2xl font-bold mb-4">Join our Newsletter</h3>
              <p className="mb-4 text-gray-300">Get the latest news, event invitations, and research updates delivered directly to your inbox.</p>
              <a
                href="https://forms.gle/uuzenrBHDs4vraYB8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold font-poppins py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-deep-navy focus:ring-gold-accent inline-block text-center bg-bitcoin-orange text-white hover:bg-orange-500"
              >
                Join our Newsletter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;