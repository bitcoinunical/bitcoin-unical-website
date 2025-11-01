import React, { useState, useEffect } from 'react';
import type { ResearchPaper } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { fetchResearchPapers, submitFormData } from '../lib/api';

const categories = ['All', 'Economics', 'Mining', 'Policy', 'Energy', 'Technology'];
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ResearchPage: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoading(true);
        const fetchedPapers = await fetchResearchPapers();
        setPapers(fetchedPapers);
      } catch (err) {
        setError('Failed to load research papers.');
      } finally {
        setLoading(false);
      }
    };
    loadPapers();
  }, []);
  
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormMessage('');

    const formData = new FormData(e.currentTarget);
    // Note: File handling would require a different approach with a real backend.
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        title: formData.get('title'),
        fileName: (formData.get('file') as File)?.name || ''
    };

    try {
      const response = await submitFormData('research', data);
      if (response.success) {
        setFormStatus('success');
        setFormMessage(response.message);
        e.currentTarget.reset();
      } else {
        setFormStatus('error');
        setFormMessage(response.message || 'An unknown error occurred.');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Submission failed. Please try again later.');
    }
  };

  const filteredPapers = activeCategory === 'All'
    ? papers
    : papers.filter(p => p.category === activeCategory);

  return (
    <div className="bg-light-grey dark:bg-slate-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">Bitcoin Research Hub</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Exploring the frontiers of Bitcoin through academic inquiry.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${activeCategory === category ? 'bg-bitcoin-orange text-white' : 'bg-white text-deep-navy hover:bg-gold-accent dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Research Papers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
            <p className="col-span-full text-center">Loading research...</p>
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : (
            filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                  <Card key={paper.id}>
                    <div className="p-6">
                      <span className="inline-block bg-gold-accent text-deep-navy text-xs font-semibold px-2 py-1 rounded-full mb-3">{paper.category}</span>
                      <h3 className="font-poppins text-xl font-bold mb-2 dark:text-white">{paper.title}</h3>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">By: {paper.authors.join(', ')}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{paper.summary}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{paper.publicationDate}</span>
                        {paper.fileUrl ? (
                          <a
                            href={paper.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-bitcoin-orange hover:underline"
                            download
                          >
                            Download Paper
                          </a>
                        ) : (
                          <span className="font-bold text-gray-400 cursor-not-allowed">No File</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-xl text-gray-500 dark:text-gray-400">No research papers found for the selected category.</p>
                </div>
            )
          )}
        </div>

        {/* Submit Research Form */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
            <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-6 text-center">Submit Your Research</h2>
            {formStatus === 'success' ? (
              <div className="text-center py-4">
                <h3 className="font-poppins text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Submission Successful!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Thank you for submitting your research. Our team will review it and get back to you if it's a good fit for our hub.</p>
                <Button onClick={() => setFormStatus('idle')}>Submit Another Paper</Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                      <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                  </div>
                  <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Research Title</label>
                      <input type="text" id="title" name="title" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bitcoin-orange focus:border-bitcoin-orange dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
                  </div>
                  <div>
                      <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Paper (PDF)</label>
                      <input type="file" id="file" name="file" accept=".pdf" required className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-accent file:text-deep-navy hover:file:bg-yellow-400" />
                  </div>
                  <div className="text-center">
                      <Button type="submit" variant="primary" disabled={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? 'Submitting...' : 'Submit for Review'}
                      </Button>
                  </div>
                  {formMessage && formStatus === 'error' && (
                    <p className="mt-4 text-center text-sm text-red-600">{formMessage}</p>
                  )}
              </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;