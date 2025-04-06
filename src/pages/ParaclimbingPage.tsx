import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const ParaclimbingPage: React.FC = () => {
  const categories = [
    {
      id: 'visual',
      title: 'Visual Impairment (B)',
      description: 'Categories for climbers with visual impairments, ranging from partial to complete vision loss.',
      image: '/assets/categories/visual.jpg',
    },
    {
      id: 'amputee',
      title: 'Amputees (AL, AU)',
      description: 'Categories for climbers with lower limb (AL) or upper limb (AU) amputations.',
      image: '/assets/categories/amputee.jpg',
    },
    {
      id: 'limited-range',
      title: 'Limited Range of Movement (RP)',
      description: 'For climbers with conditions that limit range of movement or power.',
      image: '/assets/categories/limited-range.jpg',
    },
    {
      id: 'neurological',
      title: 'Neurological/Physical Disability (AU, AL, RP)',
      description: 'Categories for various neurological conditions affecting climbing ability.',
      image: '/assets/categories/neurological.jpg',
    },
  ];

  return (
    <div>
      <Hero
        title="What is Paraclimbing?"
        subtitle="Understanding adaptive climbing for people with physical disabilities"
        backgroundImage="/assets/paraclimbing-hero.jpg"
      />
      
      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">Paraclimbing Explained</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Paraclimbing is a form of sport climbing adapted for people with physical disabilities. 
              It encompasses various climbing styles and techniques modified to accommodate different types 
              of disabilities, allowing individuals with physical limitations to experience the joy and 
              challenge of climbing.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              At its core, paraclimbing is about inclusivity and accessibility. It's about creating 
              opportunities for everyone to engage with the sport of climbing, regardless of physical ability. 
              Through adaptive equipment, specialized techniques, and supportive coaching, paraclimbing makes 
              the vertical world accessible to all.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Competitive paraclimbing is recognized internationally, with events at both national and 
              international levels, including the IFSC Paraclimbing World Championships. Athletes compete in 
              different categories based on their specific disabilities.
            </p>
            
            <div className="aspect-w-16 aspect-h-9 mt-8 mb-8">
              <iframe 
                className="w-full h-96 rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Paraclimbing Introduction"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Paraclimbing Categories</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Paraclimbing competitions are organized into several categories based on the type and extent of disability. 
              This classification system ensures fair competition among athletes with similar physical capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-dark mb-3">{category.title}</h3>
                  <p className="text-gray-700">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-6">Benefits of Paraclimbing</h2>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-primary mb-2">Physical Benefits</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Improved strength and endurance</li>
                  <li>Enhanced coordination and balance</li>
                  <li>Increased range of motion and flexibility</li>
                  <li>Improved cardiovascular health</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-primary mb-2">Mental Benefits</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Boosted confidence and self-esteem</li>
                  <li>Reduced stress and anxiety</li>
                  <li>Enhanced problem-solving skills</li>
                  <li>Improved focus and concentration</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-primary mb-2">Social Benefits</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Connection with a supportive community</li>
                  <li>Opportunities for mentorship and guidance</li>
                  <li>Development of teamwork and trust</li>
                  <li>Participation in inclusive social activities</li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="/assets/benefits-image.jpg" 
                alt="Paraclimber enjoying the benefits of climbing" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Start Climbing Section */}
      <section className="section bg-primary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">How to Start Paraclimbing</h2>
            <p className="mb-8 text-lg">
              Getting started with paraclimbing is easier than you might think. Here are some steps to begin your journey:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-yellow-300 mb-4">1</div>
                <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                <p>
                  Reach out to Paraclimbing Belgium to learn about upcoming events, 
                  beginner sessions, and opportunities to try paraclimbing in a supportive environment.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-yellow-300 mb-4">2</div>
                <h3 className="text-xl font-bold mb-3">Attend an Introduction</h3>
                <p>
                  Join one of our introductory sessions where you'll learn the basics of paraclimbing 
                  and meet experienced climbers and coaches.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-yellow-300 mb-4">3</div>
                <h3 className="text-xl font-bold mb-3">Regular Practice</h3>
                <p>
                  Start climbing regularly at one of our partner climbing gyms with adaptive equipment 
                  and supportive staff familiar with paraclimbing.
                </p>
              </div>
            </div>
            
            <Link to="/activities" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
              View Upcoming Activities
            </Link>
          </div>
        </div>
      </section>
      
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
        </div>
      </section>
    </div>
  );
};

export default ParaclimbingPage;
