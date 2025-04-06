import React from 'react';
import Hero from '../components/Hero';
import EventCard, { EventProps } from '../components/EventCard';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const featuredEvents: EventProps[] = [
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
  ];

  return (
    <div>
      <Hero
        title="Paraclimbing Belgium"
        subtitle="Promoting inclusive climbing experiences for people of all abilities"
        ctaText="Get Started"
        ctaLink="/paraclimbing"
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
                regardless of physical or cognitive abilities.
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
      
      {/* Testimonials */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="max-w-3xl mx-auto opacity-90">
              Hear from paraclimbers who have found joy, community, and personal growth through our programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="mb-4">
                <svg className="h-8 w-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
              </div>
              <p className="mb-4 italic">
                "Paraclimbing has changed my life. I never thought I'd be able to climb with my disability, 
                but the community and support at Paraclimbing Belgium made it possible. Now I'm competing nationally!"
              </p>
              <div>
                <p className="font-bold">Sophie D.</p>
                <p className="text-sm opacity-75">Visual impairment paraclimber</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="mb-4">
                <svg className="h-8 w-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
              </div>
              <p className="mb-4 italic">
                "The adaptive techniques I learned through Paraclimbing Belgium opened up a whole new world for me. 
                The coaches are incredible and the community is so supportive."
              </p>
              <div>
                <p className="font-bold">Marc V.</p>
                <p className="text-sm opacity-75">Amputee paraclimber</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="mb-4">
                <svg className="h-8 w-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
              </div>
              <p className="mb-4 italic">
                "As a parent of a child with cerebral palsy, seeing my daughter climb for the first time was emotional. 
                The joy on her face was priceless. Thank you Paraclimbing Belgium for making this possible."
              </p>
              <div>
                <p className="font-bold">Thomas L.</p>
                <p className="text-sm opacity-75">Parent of young paraclimber</p>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default HomePage;
