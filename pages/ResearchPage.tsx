import React, { useState, useEffect } from 'react';
import type { ResearchPaper } from '../types';
import Card from '../components/Card';
import { fetchResearchPapers } from '../lib/api';

const categories = ['All', 'Economics', 'Mining', 'Policy', 'Energy', 'Technology'];

const ResearchPage: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
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

        {/* Submit Research Section */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl text-center">
          <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-6">Submit Your Research</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            To ensure all submissions are captured reliably, we use Google Forms. Clicking the button below will take you to our official submission page.
          </p>
          <a
            href="https://forms.gle/kuyzTh6AwbkqpQQ19"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold font-poppins py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gold-accent inline-block text-center bg-bitcoin-orange text-white hover:bg-orange-500"
          >
            Submit Your Research Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;