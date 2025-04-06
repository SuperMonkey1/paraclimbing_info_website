import React, { useState } from 'react';
import Hero from '../components/Hero';
import EventCard, { EventProps } from '../components/EventCard';
import { allEvents } from '../data/events';
import { NewsletterSubscriptionForm } from '../components/newsletter';

const ActivitiesPage: React.FC = () => {

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterEvents = () => {
    let filtered = [...allEvents];
    
    // Filter by type
    if (filterType === 'international') {
      filtered = filtered.filter(event => event.type === 'international');
    } else if (filterType === 'competitions') {
      filtered = filtered.filter(event => 
        (event.title.toLowerCase().includes('championship') || 
        event.description.toLowerCase().includes('competition')) &&
        event.type !== 'international'
      );
    } else if (filterType === 'workshops') {
      filtered = filtered.filter(event => event.type === 'workshops');
    } else if (filterType === 'social') {
      filtered = filtered.filter(event => event.type === 'social');
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const filteredEvents = filterEvents();

  return (
    <div>
      <Hero
        title="Activities & Events"
        subtitle="Join us for paraclimbing events, competitions, workshops, and social gatherings"
        backgroundImage="/assets/events.jpg"
      />
      
      {/* Events Filters */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button 
                  type="button" 
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                    filterType === 'all' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('all')}
                >
                  All Events
                </button>
                <button 
                  type="button" 
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    filterType === 'international' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('international')}
                >
                  International
                </button>
                <button 
                  type="button" 
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    filterType === 'competitions' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('competitions')}
                >
                  <span className="inline-flex items-center">
                    <img src="/assets/belgium-flag.png" alt="Belgian flag" className="w-4 h-4 mr-1.5" />
                    Competitions
                  </span>
                </button>
                <button 
                  type="button" 
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    filterType === 'workshops' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('workshops')}
                >
                  Workshops
                </button>
                <button 
                  type="button" 
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                    filterType === 'social' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('social')}
                >
                  Social Events
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                  placeholder="Search events by title, description, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria to find events.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Regular Activities */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Regular Activities</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Beyond our special events, we offer regular paraclimbing sessions at partner climbing gyms throughout Belgium.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6" id="monthly-training">
                <h3 className="text-xl font-bold text-dark mb-3">Monthly Training Sessions</h3>
                <div className="mb-4 text-gray-600">
                  <div className="flex items-center mb-1">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Various locations across Belgium</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Dates and times vary each month</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  We organize monthly training sessions for paraclimbers of all abilities across Belgium. Dates, times, and locations change regularly to accommodate climbers from different regions. Equipment is provided, and both beginners and experienced climbers are welcome. 
                </p>
                <div className="flex justify-between items-center">
                  <a 
                    href="mailto:info@paraclimbing.be?subject=Monthly%20Training%20Session%20Inquiry" 
                    className="btn btn-primary flex items-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </a>
                  <div className="text-gray-600 text-sm">
                    <span className="block">Check our social media or</span>
                    <span className="block">subscribe to our newsletter for upcoming dates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section bg-primary text-white">
        <div className="container">
          <NewsletterSubscriptionForm />
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;