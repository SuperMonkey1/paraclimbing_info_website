import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const SupportUsPage: React.FC = () => {
  const volunteerOpportunities = [
    {
      title: 'Social Media and Content Manager',
      description: 'Help manage our social media presence and create engaging content to promote paraclimbing',
    },
    {
      title: 'Paraclimber Outreach',
      description: 'Help us reach and connect with potential paraclimbers across Belgium',
    },
    {
      title: 'Local Responsible',
      description: 'Be a local representative in your city to help extend our network by establishing local branches in the "centrumsteden"',
    },
    {
      title: 'Ad Hoc Volunteer',
      description: 'Join our group of volunteers we can contact when we need help with specific tasks or events (Vrije rol ad hoc)',
    },
  ];

  return (
    <div>
      <Hero
        title="Support Our Mission"
        subtitle="Help us make climbing accessible for everyone in Belgium"
        backgroundImage="/assets/events.jpg"
      />
      
      {/* Volunteer Section - Moved to the top */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Volunteer With Us</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Your time and skills can make a huge difference to our organization and the paraclimbers we support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-dark mb-2">{opportunity.title}</h3>
                <p className="text-gray-700 mb-4">{opportunity.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-secondary text-white rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Volunteer?</h3>
            <p className="mb-6">
              Fill out our volunteer application form and we'll contact you to discuss how you can get involved.
            </p>
            <Link to="/contact" className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-3">
              Apply to Volunteer
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Support Us */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">Why Support Paraclimbing Belgium?</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Your contribution helps us create inclusive climbing opportunities for people with disabilities across Belgium.
            </p>
            
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-dark mb-4">How Your Contribution Will Be Used</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-3 mb-4">
                <li>To promote paraclimbing in Belgium, we make and print promotion material, social media marketing</li>
                <li>Organise climbing initiations</li>
                <li>Build a paraclimbing community in Belgium, a group of like minded paraclimbers that want to become better climbers. Support them by supplying frequent training sessions</li>
                <li>Support our volunteers</li>
                <li>Support the members of the Belgian team to limit the financial burden of international competitions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bank Transfer Section - Replacing Donation Options */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark mb-4">Support Us Financially</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Your financial support directly funds our programs and helps us expand our reach.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dark mb-4">Bank Transfer</h3>
            <p className="text-gray-700 text-center mb-4">
              Make a direct transfer to our account:
            </p>
            <div className="text-center font-medium mb-6">
              <p className="text-primary text-lg">Parabel VZW</p>
              <p className="text-gray-800">IBAN: BE29 7340 5844 8064</p>
              <p className="text-gray-800">BIC: KREDBEBB</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-primary text-center mb-2">Corporate Sponsorship</h4>
              <p className="text-gray-700 text-center">
                Is your company interested in supporting accessibility in sports?<br />
                Contact us at <a href="mailto:info@paraclimbing.be" className="text-secondary underline">info@paraclimbing.be</a> to 
                discuss sponsorship opportunities.
              </p>
            </div>
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
            <a href="mailto:info@paraclimbing.be" className="btn btn-primary">
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportUsPage;