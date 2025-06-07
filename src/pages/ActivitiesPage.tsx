import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import EventCard, { EventProps } from '../components/EventCard';
import AddEventForm from '../components/AddEventForm';
import NewsletterSubscriptionForm from '../components/NewsletterSubscriptionForm';
import { useAllEvents } from '../hooks/useAllEvents';

const ActivitiesPage: React.FC = () => {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddEventFormOpen, setIsAddEventFormOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Use the combined events hook
  const { events, loading, error, refreshEvents } = useAllEvents();

  const filterEvents = () => {
    let filtered = [...events];
    
    // Filter by type
    if (filterType === 'competitions') {
      filtered = filtered.filter(event => 
        (event.title.toLowerCase().includes('championship') || 
        event.description.toLowerCase().includes('competition'))
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

  const handleAddEventSuccess = () => {
    setShowSuccessMessage(true);
    refreshEvents(); // Refresh the events list
    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide after 5 seconds
  };

  return (
    <div>
      <Hero
        title={t('activitiesPage.title')}
        subtitle={t('activitiesPage.subtitle')}
        backgroundImage="/assets/events.jpg"
      />
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your event has been submitted for review. You'll receive an email confirmation shortly.</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setShowSuccessMessage(false)}
          >
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      
      {/* Events Filters and Add Button */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            {/* Add Event Button */}
            <div className="order-1 lg:order-none">
              <button
                onClick={() => setIsAddEventFormOpen(true)}
                className="btn btn-primary flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Event
              </button>
              <p className="text-gray-600 text-sm mt-1">
                Share your paraclimbing event with the community
              </p>
            </div>
            
            {/* Filter Buttons */}
            <div className="w-full lg:w-auto order-2 lg:order-none">
              <div className="inline-flex rounded-md shadow-sm flex-wrap" role="group">
                <button 
                  type="button" 
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                    filterType === 'all' 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilterType('all')}
                >
                  {t('activitiesPage.filters.allEvents')}
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
                  {t('activitiesPage.filters.competitions')}
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
                  {t('activitiesPage.filters.workshops')}
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
                  {t('activitiesPage.filters.socialEvents')}
                </button>
              </div>
            </div>
            
            {/* Search Box */}
            <div className="w-full lg:w-1/6 order-3 lg:order-none">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                  placeholder={t('activitiesPage.filters.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-gray-600 mt-2">Loading events...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              <p><strong>Note:</strong> {error}. Showing default events only.</p>
            </div>
          )}
          
          {/* Events Grid */}
          {!loading && (
            <>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">{t('activitiesPage.noEventsFound.title')}</h3>
                  <p className="text-gray-600">
                    {t('activitiesPage.noEventsFound.description')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="section bg-primary text-white">
        <div className="container">
          <NewsletterSubscriptionForm />
        </div>
      </section>

      {/* Add Event Form Modal */}
      <AddEventForm
        isOpen={isAddEventFormOpen}
        onClose={() => setIsAddEventFormOpen(false)}
        onSuccess={handleAddEventSuccess}
      />
    </div>
  );
};

export default ActivitiesPage;
