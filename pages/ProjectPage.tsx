
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { fetchSiteContent } from '../lib/api';

const ProjectPage: React.FC = () => {
    const [projectImage, setProjectImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const fundingProgress = 65; // Example percentage

    useEffect(() => {
        const loadContent = async () => {
            try {
                setLoading(true);
                const content = await fetchSiteContent('project');
                if (content && content.mainImage) {
                    setProjectImage(content.mainImage);
                }
            } catch (err) {
                console.error("Failed to load Project page content", err);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

  return (
    <div className="bg-deep-navy text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-bitcoin-orange">Flagship Project: The Antminer Initiative</h1>
          <p className="mt-4 text-lg text-gray-300">A hands-on, student-led Bitcoin mining operation driving education and research.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Project Overview */}
          <div className="space-y-4">
            <h2 className="font-poppins text-3xl font-bold text-gold-accent">Project Overview</h2>
            <p className="text-gray-300">
              The Antminer Project is our pioneering initiative to establish and run a small-scale Bitcoin mining farm on campus. This project provides students with invaluable, practical experience in hardware management, energy consumption analysis, and the economic principles of proof-of-work.
            </p>
            <p className="text-gray-300">
              All proceeds from the mining operation are transparently reinvested into funding further research, hosting educational events, and expanding the community's resources.
            </p>
            
            {/* Funding Tracker */}
            <div className="pt-6">
              <h3 className="font-poppins text-2xl font-bold mb-3">Project Funding Goal</h3>
              <div className="w-full bg-gray-700 rounded-full h-6">
                <div 
                  className="bg-gradient-to-r from-gold-accent to-bitcoin-orange h-6 rounded-full flex items-center justify-center"
                  style={{ width: `${fundingProgress}%` }}
                >
                  <span className="font-bold text-deep-navy text-sm">{fundingProgress}% Funded</span>
                </div>
              </div>
               <div className="text-center mt-6">
                 <Button to="/support" variant="secondary">Sponsor This Project</Button>
               </div>
            </div>
          </div>
          
          {/* Milestones and Image */}
          <div className="space-y-6">
            <h2 className="font-poppins text-3xl font-bold text-gold-accent">Timeline & Milestones</h2>
            <ul className="list-none space-y-4">
                <li className="flex items-start">
                    <span className="bg-bitcoin-orange rounded-full text-white w-8 h-8 flex-shrink-0 text-center font-bold pt-1 mr-4">1</span>
                    <div>
                        <h4 className="font-bold">Phase 1: Research & Funding (Complete)</h4>
                        <p className="text-gray-400">Secured initial funding and published feasibility study.</p>
                    </div>
                </li>
                 <li className="flex items-start">
                    <span className="bg-bitcoin-orange rounded-full text-white w-8 h-8 flex-shrink-0 text-center font-bold pt-1 mr-4">2</span>
                    <div>
                        <h4 className="font-bold">Phase 2: Hardware Acquisition (In Progress)</h4>
                        <p className="text-gray-400">Currently sourcing Antminer S19 Pro units and supplementary hardware.</p>
                    </div>
                </li>
                 <li className="flex items-start">
                    <span className="bg-gray-500 rounded-full text-white w-8 h-8 flex-shrink-0 text-center font-bold pt-1 mr-4">3</span>
                    <div>
                        <h4 className="font-bold">Phase 3: Setup & Operation (Upcoming)</h4>
                        <p className="text-gray-400">Installation and launch of the mining rig on campus.</p>
                    </div>
                </li>
            </ul>
            <div className="mt-8">
                <h3 className="font-poppins text-2xl font-bold text-gold-accent mb-4">Real-time Image Updates</h3>
                {loading ? <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center"><p>Loading image...</p></div> : 
                  projectImage ? <img src={projectImage} alt="Antminer Project Hardware" className="rounded-lg shadow-2xl w-full"/> : <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center"><p>Image coming soon!</p></div>
                }
                <p className="text-center text-sm italic text-gray-400 mt-2">Our Antminer setup. Updates managed from Notion!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
