import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const SupportUsPage: React.FC = () => {
  const donationOptions = [
    {
      id: 'donation1',
      amount: '€20',
      description: 'Helps provide adaptive climbing equipment for one session',
      icon: '🧗',
    },
    {
      id: 'donation2',
      amount: '€50',
      description: 'Sponsors a beginner paraclimber for their first month',
      icon: '🏆',
    },
    {
      id: 'donation3',
      amount: '€100',
      description: 'Contributes to coach training for paraclimbing specialization',
      icon: '👨‍🏫',
    },
    {
      id: 'donation4',
      amount: '€250',
      description: 'Helps send an athlete to an international competition',
      icon: '✈️',
    },
    {
      id: 'donation5',
      amount: 'Custom',
      description: 'Choose your own amount to support our programs',
      icon: '❤️',
    },
  ];

  const volunteerOpportunities = [
    {
      title: 'Event Assistant',
      description: 'Help organize and run paraclimbing events and competitions',
      commitment: '1-2 days per event',
      requirements: 'No climbing experience required, enthusiasm and reliability essential',
    },
    {
      title: 'Climbing Assistant',
      description: 'Assist during paraclimbing sessions, helping with belaying and general support',
      commitment: '2-3 hours weekly or bi-weekly',
      requirements: 'Basic climbing and belaying knowledge required, training provided',
    },
    {
      title: 'Adaptive Equipment Specialist',
      description: 'Help maintain, set up, and develop adaptive climbing equipment',
      commitment: 'Flexible, project-based',
      requirements: 'Technical skills and climbing knowledge preferred',
    },
    {
      title: 'Outreach Volunteer',
      description: 'Represent Paraclimbing Belgium at events and help with promotional activities',
      commitment: 'As needed for specific events',
      requirements: 'Good communication skills and passion for paraclimbing',
    },
  ];

  return (
    <div>
      <Hero
        title="Support Our Mission"
        subtitle="Help us make climbing accessible for everyone in Belgium"
        backgroundImage="/assets/support-hero.jpg"
      />
      
      {/* Why Support Us */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">Why Support Paraclimbing Belgium?</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Your contribution helps us create inclusive climbing opportunities for people with disabilities across Belgium.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">🧗‍♀️</div>
                <h3 className="text-xl font-bold text-dark mb-3">Accessibility</h3>
                <p className="text-gray-700">
                  Your support helps us purchase specialized adaptive equipment and make climbing facilities more accessible.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-dark mb-3">Competition</h3>
                <p className="text-gray-700">
                  We help Belgian paraclimbers train and compete at national and international levels.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold text-dark mb-3">Community</h3>
                <p className="text-gray-700">
                  We're building an inclusive community where paraclimbers can connect, learn, and grow together.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-dark mb-4">How Your Support Makes a Difference</h3>
              <p className="text-gray-700 mb-4">
                Paraclimbing Belgium is a non-profit organization dedicated to making climbing accessible to people with disabilities. 
                We rely on donations, sponsorships, and volunteer support to run our programs and events.
              </p>
              <p className="text-gray-700 mb-4">
                With your support, we can:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
                <li>Purchase and maintain adaptive climbing equipment</li>
                <li>Subsidize climbing sessions for paraclimbers with financial needs</li>
                <li>Provide specialized training for coaches and volunteers</li>
                <li>Organize competitions and events</li>
                <li>Support Belgian paraclimbers in national and international competitions</li>
                <li>Raise awareness about paraclimbing and disability inclusion in sports</li>
              </ul>
              <p className="text-gray-700">
                Every contribution, no matter the size, helps us create more opportunities for people with disabilities to experience the joy and benefits of climbing.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Donation Options */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Make a Donation</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Your financial support directly funds our programs and helps us expand our reach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {donationOptions.map((option) => (
              <div key={option.id} className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{option.amount}</h3>
                <p className="text-gray-700 mb-6">{option.description}</p>
                <button className="btn btn-primary w-full">Donate {option.amount}</button>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dark mb-4">Other Ways to Donate</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-primary">Bank Transfer</h4>
                <p className="text-gray-700">
                  Make a direct transfer to our account:<br />
                  <span className="font-medium">Paraclimbing Belgium vzw/asbl</span><br />
                  IBAN: BE12 3456 7890 1234<br />
                  BIC: BBRUBEBB<br />
                  <span className="text-sm">Please include "Donation" and your name in the reference.</span>
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-primary">Recurring Donations</h4>
                <p className="text-gray-700">
                  Become a monthly supporter with a recurring donation. Set up a standing order to our bank account 
                  or contact us to arrange a recurring payment.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-primary">Corporate Sponsorship</h4>
                <p className="text-gray-700">
                  Is your company interested in supporting accessibility in sports? 
                  Contact us at <a href="mailto:sponsors@paraclimbing.be" className="text-secondary underline">sponsors@paraclimbing.be</a> to 
                  discuss sponsorship opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Volunteer */}
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
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Time commitment:</span> {opportunity.commitment}</p>
                  <p><span className="font-medium">Requirements:</span> {opportunity.requirements}</p>
                </div>
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
      
      {/* Gear Donation */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="/assets/gear-donation.jpg" 
                  alt="Climbing gear" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-dark mb-4">Donate Climbing Gear</h2>
                <p className="text-gray-700 mb-4">
                  Have climbing gear that you no longer use? Consider donating it to Paraclimbing Belgium!
                </p>
                <p className="text-gray-700 mb-4">
                  We accept donations of gently used climbing equipment such as harnesses, shoes, helmets, 
                  ropes, and carabiners. These donations help us provide equipment to paraclimbers who may not 
                  be able to afford their own gear.
                </p>
                <p className="text-gray-700 mb-6">
                  All donated gear is inspected for safety before being used in our programs.
                </p>
                <Link to="/contact" className="btn btn-primary">
                  Contact Us About Gear Donation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <svg className="h-12 w-12 mx-auto mb-6 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h10zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="text-xl italic mb-6">
              "The support from Paraclimbing Belgium has been life-changing for me. The equipment, coaching, 
              and community they provide have allowed me to discover paraclimbing and compete at an international level. 
              None of this would be possible without the donors and volunteers who support this organization."
            </p>
            <div>
              <p className="font-bold text-lg">Thomas Van Den Berg</p>
              <p className="opacity-80">Belgian Paraclimbing Team Member</p>
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
              <img src="/assets/sponsors/sponsor1.png" alt="Sponsor 1" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/sponsor2.png" alt="Sponsor 2" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/sponsor3.png" alt="Sponsor 3" className="max-h-20" />
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img src="/assets/sponsors/sponsor4.png" alt="Sponsor 4" className="max-h-20" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Interested in becoming a sponsor? We offer various sponsorship packages with benefits including 
              logo placement, social media recognition, and more.
            </p>
            <a href="mailto:sponsors@paraclimbing.be" className="btn btn-primary">
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportUsPage;
