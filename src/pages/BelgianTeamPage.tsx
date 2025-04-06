import React from 'react';
import Hero from '../components/Hero';
import DevelopmentNotice from '../components/DevelopmentNotice';

const BelgianTeamPage: React.FC = () => {
  return (
    <div>
      <DevelopmentNotice pageName="Belgian Team" />
      <Hero
        title="Belgian Paraclimbing Team"
        subtitle="Meet our national athletes representing Belgium in international competitions"
        backgroundImage="/assets/belgian-team-hero.jpg"
      />
      
      {/* Athletes Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Belgian Paraclimbing Athletes</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Meet some of Belgium's accomplished paraclimbers who represent our country 
              in national and international competitions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img 
                src="/assets/athletes/athlete1.jpg" 
                alt="Athlete name" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">Emma Dubois</h3>
                <p className="text-primary font-medium mb-3">Visual Impairment (B2)</p>
                <p className="text-gray-700 mb-4">
                  Belgian champion in the B2 category, Emma has represented Belgium in the 
                  IFSC Paraclimbing World Championships with impressive results.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img 
                src="/assets/athletes/athlete2.jpg" 
                alt="Athlete name" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">Lucas Janssens</h3>
                <p className="text-primary font-medium mb-3">Amputee (AL2)</p>
                <p className="text-gray-700 mb-4">
                  With multiple podium finishes in European competitions, Lucas is a rising star 
                  in Belgian paraclimbing and an inspiration to many.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img 
                src="/assets/athletes/athlete3.jpg" 
                alt="Athlete name" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">Sophie Martens</h3>
                <p className="text-primary font-medium mb-3">RP3</p>
                <p className="text-gray-700 mb-4">
                  A pioneer in Belgian paraclimbing, Sophie has been competing internationally 
                  for over five years and mentors new paraclimbers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Achievements Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-dark mb-8 text-center">Team Achievements</h2>
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-dark mb-4">Recent Highlights</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-3">
                  <li>
                    <span className="font-semibold">2024 IFSC Paraclimbing World Cup (Innsbruck):</span> Emma Dubois - Silver Medal (B2)
                  </li>
                  <li>
                    <span className="font-semibold">2023 IFSC Paraclimbing World Championships:</span> Lucas Janssens - Bronze Medal (AL2)
                  </li>
                  <li>
                    <span className="font-semibold">2023 European Paraclimbing Championships:</span> Team Belgium - 5th place overall
                  </li>
                  <li>
                    <span className="font-semibold">2022 IFSC Paraclimbing World Cup (Briançon):</span> Sophie Martens - 4th place (RP3)
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-dark mb-4 mt-8">Training & Development</h3>
                <p className="text-gray-700 mb-4">
                  The Belgian Paraclimbing Team trains regularly at dedicated facilities across the country. 
                  Our national program focuses on developing both competitive athletes and promoting paraclimbing 
                  for newcomers with disabilities.
                </p>
                <p className="text-gray-700">
                  Team members participate in national training camps four times per year, with additional 
                  international training opportunities alongside teams from neighboring countries.
                </p>
              </div>
            </div>
          </div>
          
          {/* Join the Team Section */}
          <div className="mt-16 bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in Joining?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              We're always looking for new talent! If you have a physical disability and are interested in competitive climbing, 
              we'd love to hear from you.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Contact the Team Manager
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BelgianTeamPage;