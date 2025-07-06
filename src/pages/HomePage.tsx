import React, { useMemo } from 'react';
import Hero from '../components/Hero';
import EventCard, { EventProps } from '../components/EventCard';
import { Link } from 'react-router-dom';
import { useAllEvents } from '../hooks/useAllEvents';
import NewsletterSubscriptionForm from '../components/NewsletterSubscriptionForm';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { events, loading, error } = useAllEvents();
  
  // Get the first three events (no date filtering, just like the activities page)
  const featuredEvents = useMemo(() => {
    console.log('DEBUG: All events from Firebase:', events);
    
    // Just take the first 3 events, no filtering
    const firstThreeEvents = events.slice(0, 3);
    
    console.log('DEBUG: First 3 events for home page:', firstThreeEvents);
    
    return firstThreeEvents;
  }, [events]);

  return (
    <div>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaText={t('hero.ctaText')}
        ctaLink="#newsletter"
      />
      
      {/* About Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="/assets/about-image.jpg" 
                alt="Paraclimbers in action" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-4">{t('about.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('about.paragraph1')}
              </p>
              <p className="text-gray-700 mb-6">
                {t('about.paragraph2')}
              </p>
              <Link to="/paraclimbing" className="btn btn-primary">
                {t('about.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">{t('events.title')}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t('events.description')}
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Error loading events: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          ) : featuredEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link to="/activities" className="btn btn-primary">
                  {t('events.viewAll')}
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No events available at the moment.</p>
              <div className="text-center mt-6">
                <Link to="/activities" className="btn btn-primary">
                  {t('events.viewAll')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      

      {/* Newsletter */}
      <section id="newsletter" className="section bg-primary text-white">
        <div className="container">
          <NewsletterSubscriptionForm />
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-secondary text-white text-center">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="max-w-2xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-secondary hover:bg-gray-100">
              {t('cta.contactUs')}
            </Link>
            <Link to="/support-us" className="btn bg-primary text-white hover:bg-red-800">
              {t('cta.support')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Corporate Sponsors */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">{t('sponsors.title')}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t('sponsors.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/alpamayo.png" alt="Alpamayo" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/bouler.png" alt="Bouler" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/bvkb.png" alt="BVKB" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/bvlb.png" alt="BVLB" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/crux.png" alt="Crux" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/hal 9.png" alt="Hal 9" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/image.png" alt="Sponsor" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/kbf.png" alt="KBF" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/newrock.png" alt="Newrock" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/petite ile.png" alt="Petite Ile" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/yugen.png" alt="Yugen" className="max-h-20" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              {t('sponsors.sponsorInfo')}
            </p>
            <Link to="/support-us" className="btn btn-primary">
              {t('sponsors.becomeASponsor')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
