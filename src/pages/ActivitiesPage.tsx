import React, { useState } from 'react';
import Hero from '../components/Hero';
import EventCard, { EventProps } from '../components/EventCard';

const ActivitiesPage: React.FC = () => {
  const allEvents: EventProps[] = [
    {
      id: 'event1',
      title: 'Paraclimbing Introduction Day',
      date: 'April 15, 2025',
      location: 'Brussels Climbing Center',
      description: 'Join us for a day of introduction to paraclimbing. All abilities welcome!',
      imageUrl: '/assets/events/intro-day.jpg',
    },
    {
      id: 'event2',
      title: 'Belgian Paraclimbing Championships',
      date: 'May 20-21, 2025',
      location: 'Antwerp Climbing Arena',
      description: 'The annual Belgian Paraclimbing Championships featuring categories for all disabilities.',
      imageUrl: '/assets/events/championships.jpg',
    },
    {
      id: 'event3',
      title: 'Paraclimbing Training Workshop',
      date: 'June 10, 2025',
      location: 'Ghent Climbing Gym',
      description: 'A specialized workshop for paraclimbers looking to improve their techniques.',
      imageUrl: '/assets/events/workshop.jpg',
    },
    {
      id: 'event4',
      title: 'Adaptive Climbing Equipment Demo',
      date: 'July 5, 2025',
      location: 'Liège Climbing Center',
      description: 'Experience and learn about the latest adaptive climbing equipment and how it can assist various disabilities.',
      imageUrl: '/assets/events/equipment-demo.jpg',
    },
    {
      id: 'event5',
      title: 'Outdoor Paraclimbing Trip',
      date: 'August 15-16, 2025',
      location: 'Freyr, Dinant',
      description: 'A weekend outdoor climbing trip for experienced paraclimbers in the beautiful cliffs of Freyr.',
      imageUrl: '/assets/events/outdoor-trip.jpg',
    },
    {
      id: 'event6',
      title: 'Paraclimbing Coaching Certification',
      date: 'September 25-26, 2025',
      location: 'Brussels Climbing Center',
      description: 'Training program for climbing coaches who want to specialize in working with paraclimbers.',
      imageUrl: '/assets/events/coaching-cert.jpg',
    },
    {
      id: 'event7',
      title: 'Family Climbing Day',
      date: 'October 10, 2025',
      location: 'Namur Climbing Gym',
      description: 'A special day for paraclimbers and their families to climb together in a supportive environment.',
      imageUrl: '/assets/events/family-day.jpg',
    },
    {
      id: 'event8',
      title: 'Paraclimbing Social Meet',
      date: 'November 15, 2025',
      location: 'Charleroi Climb Center',
      description: 'A casual social climbing session for the paraclimbing community to connect and climb together.',
      imageUrl: '/assets/events/social-meet.jpg',
    },
    {
      id: 'event9',
      title: 'End of Year Celebration',
      date: 'December 18, 2025',
      location: 'Brussels Event Hall',
      description: 'Celebrating the achievements of Belgian paraclimbers throughout the year with awards and recognition.',
      imageUrl: '/assets/events/year-end.jpg',
    },
  ];

  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterEvents = () => {
    let filtered = [...allEvents];
    
    // Filter by type
    if (filterType === 'competitions') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes('championship') || 
        event.description.toLowerCase().includes('competition')
      );
    } else if (filterType === 'workshops') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes('workshop') || 
        event.title.toLowerCase().includes('training') ||
        event.description.toLowerCase().includes('workshop')
      );
    } else if (filterType === 'social') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes('social') || 
        event.title.toLowerCase().includes('meet') ||
        event.description.toLowerCase().includes('social')
      );
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
        backgroundImage="/assets/activities-hero.jpg"
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
                    filterType === 'competitions' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('competitions')}
                >
                  Competitions
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">Weekly Training Sessions</h3>
                <div className="mb-4 text-gray-600">
                  <div className="flex items-center mb-1">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Brussels Climbing Center</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Every Tuesday, 18:00 - 20:00</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Weekly coached sessions for paraclimbers of all levels. Equipment provided.
                </p>
                <button className="btn btn-primary">Register</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">Beginner Introduction</h3>
                <div className="mb-4 text-gray-600">
                  <div className="flex items-center mb-1">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Antwerp Climbing Arena</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>First Saturday of each month, 10:00 - 12:00</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Monthly introduction sessions for newcomers to paraclimbing. Learn the basics in a supportive environment.
                </p>
                <button className="btn btn-primary">Register</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3">Competition Team Training</h3>
                <div className="mb-4 text-gray-600">
                  <div className="flex items-center mb-1">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Ghent Climbing Gym</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thursdays and Sundays, 18:00 - 20:30</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Intensive training for competitive paraclimbers. By application only.
                </p>
                <button className="btn btn-primary">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter to receive updates on upcoming events, activities, and news from the Belgian paraclimbing community.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900 w-full sm:w-auto sm:flex-1"
                required
              />
              <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Subscribe
              </button>
            </form>
            
            <p className="mt-4 text-sm opacity-80">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
