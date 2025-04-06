import React, { useMemo } from 'react';
import Hero from '../components/Hero';
import EventCard, { EventProps } from '../components/EventCard';
import { Link } from 'react-router-dom';
import { NewsletterSubscriptionForm } from '../components/newsletter';
import { allEvents } from '../data/events';

const HomePage: React.FC = () => {
  // Create the featured events list with prioritization rules
  const featuredEvents = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    const showEndOfYearEvent = currentMonth >= 10 || currentMonth <= 1; // October to January
    
    const events: EventProps[] = [];
    
    // 1. Always add the monthly training session
    const monthlyTraining = {
      id: 'monthly-training',
      title: 'Monthly Training Sessions',
      date: 'Dates vary each month',
      location: 'Various locations across Belgium',
      description: 'We organize monthly training sessions for paraclimbers of all abilities across Belgium. Equipment is provided, and both beginners and experienced climbers are welcome.',
      imageUrl: '/assets/monthly.jpg',
      type: 'workshops',
      externalUrl: '/activities#monthly-training' // Link to the activities page's monthly training section
    };
    events.push(monthlyTraining);
    
    // 2. Prioritize non-international events
    const nonInternationalEvents = allEvents.filter(event => 
      event.type !== 'international' && 
      !(event.title.includes('End of Year') && !showEndOfYearEvent)
    );
    
    // 3. Add end of year event if in October-January
    const endOfYearEvent = allEvents.find(event => event.title.includes('End of Year'));
    if (endOfYearEvent && showEndOfYearEvent) {
      events.push(endOfYearEvent);
    }
    
    // 4. Add other non-international events
    const otherNonInternational = nonInternationalEvents
      .filter(event => !event.title.includes('End of Year'))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    for (const event of otherNonInternational) {
      if (events.length < 3 && !events.some(e => e.id === event.id)) {
        events.push(event);
      }
    }
    
    // 5. Fill with international events if needed
    if (events.length < 3) {
      const internationalEvents = allEvents
        .filter(event => event.type === 'international')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      for (const event of internationalEvents) {
        if (events.length < 3) {
          events.push(event);
        } else {
          break;
        }
      }
    }
    
    // Limit to 3 events maximum
    return events.slice(0, 3);
  }, []);

  return (
    <div>
      <Hero
        title="Paraclimbing Belgium"
        subtitle="Promoting inclusive climbing experiences for people of all abilities"
        ctaText="Subscribe to Newsletter"
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
              <h2 className="text-3xl font-bold text-dark mb-4">About Paraclimbing Belgium</h2>
              <p className="text-gray-700 mb-4">
                Paraclimbing Belgium is dedicated to making climbing accessible for people with disabilities. 
                We believe that everyone should have the opportunity to experience the joy and challenge of climbing, 
                regardless of physical abilities.
              </p>
              <p className="text-gray-700 mb-6">
                Through our programs, events, and advocacy, we aim to create an inclusive climbing community 
                in Belgium that welcomes climbers of all abilities and provides them with the support and 
                resources they need to thrive.
              </p>
              <Link to="/paraclimbing" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Upcoming Events</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Join us at one of our upcoming events to experience paraclimbing firsthand, 
              meet our community, and discover the possibilities of adaptive climbing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/activities" className="btn btn-primary">
              View All Events
            </Link>
          </div>
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
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're a climber with a disability, a family member, a potential volunteer, 
            or someone interested in supporting our mission, we welcome you to join our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn bg-white text-secondary hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/support-us" className="btn bg-primary text-white hover:bg-red-800">
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
      
      {/* Corporate Sponsors */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Sponsors</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We're grateful to the following companies and organizations for their support of paraclimbing in Belgium.
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
              Interested in becoming a sponsor? We offer various sponsorship packages with benefits including 
              logo placement, social media recognition, and more.
            </p>
            <Link to="/support-us" className="btn btn-primary">
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
