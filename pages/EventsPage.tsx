
import React, { useState, useEffect } from 'react';
import type { Event } from '../types';
import { fetchEvents } from '../lib/api';
import Card from '../components/Card';
import Button from '../components/Button';
import { FaYoutube } from 'react-icons/fa';

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter(e => e.type === activeTab);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy">Community Events</h1>
          <p className="mt-4 text-lg text-gray-600">Join us for meetups, workshops, and bootcamps.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b-2 mb-12">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 font-poppins font-bold text-lg transition-colors ${activeTab === 'upcoming' ? 'border-b-4 border-bitcoin-orange text-bitcoin-orange' : 'text-gray-500'}`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 font-poppins font-bold text-lg transition-colors ${activeTab === 'past' ? 'border-b-4 border-bitcoin-orange text-bitcoin-orange' : 'text-gray-500'}`}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <p className="text-center py-12">Loading events...</p>
        ) : error ? (
          <p className="text-center py-12 text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? filteredEvents.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">Image coming soon</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-poppins text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 font-semibold">{event.date}</p>
                  <p className="text-gray-500 mb-4">{event.venue}</p>
                  <div className="mt-auto">
                  {event.type === 'upcoming' ? (
                    <Button>Register Now</Button>
                  ) : (
                    event.youtubeUrl && (
                       <a href={event.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-red-600 hover:text-red-800">
                         <FaYoutube size={24}/> Watch Highlight
                       </a>
                    )
                  )}
                  </div>
                </div>
              </Card>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">No {activeTab} events at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
