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
        backgroundImage="/assets/what-is-paraclimbing-hero.jpg"
      />
      
      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">Paraclimbing Explained</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Paraclimbing is sport climbing for athletes with disabilities, allowing people with physical or visual 
              impairments to participate in competitive climbing. It is governed by the International Federation of Sport 
              Climbing (IFSC) and features the same thrill and challenge as regular competition climbing, with routes on 
              indoor walls and climbers using harnesses, ropes, and climbing shoes.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              The key difference is a classification system that groups athletes by the nature and severity of their 
              impairments so that they compete on a level playing field. This system makes the sport inclusive and fair – 
              for example, a blind climber won't be pitted against a leg amputee in competition, ensuring that outcomes 
              are based on skill and strength rather than the type of disability.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Paraclimbing has grown rapidly in popularity since the first international paraclimbing competition in 2003 
              and the first World Championship in 2011. The sport's appeal lies in its focus on ability over disability: 
              athletes continually push their limits and achieve impressive feats on the wall, inspiring teammates, 
              spectators, and the broader climbing community. Whether outdoors or in competitions, paraclimbers tackle 
              routes up to high difficulty grades, proving that climbing truly is for everybody.
            </p>
            
            <div className="aspect-w-16 aspect-h-9 mt-8 mb-8">
              <iframe 
                className="w-full h-96 rounded-lg shadow-lg"
                //src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                src="https://www.youtube.com/embed/4oPIlcFeLaQ"
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
              To ensure fair competition, paraclimbers are classified into sport classes based on their impairment type and functional abilities. 
              Each class has specific criteria defining the eligible level of impairment.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h3 className="text-2xl font-bold text-dark mb-3">Visually Impaired (B) – For athletes with vision loss:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-3">
                <li>
                  <span className="font-semibold">B1:</span> Complete or near-total blindness. B1 climbers have little to no usable vision (visual acuity poorer than LogMAR 2.60) and compete wearing a blindfold to equalize the field.
                </li>
                <li>
                  <span className="font-semibold">B2:</span> Severe visual impairment. B2 athletes have very limited vision (approximately LogMAR 1.50 to 2.60) or a visual field under 10° in diameter. They may discern shapes or light but not enough for detail.
                </li>
                <li>
                  <span className="font-semibold">B3:</span> Moderate visual impairment. B3 athletes have better vision than B2 (up to about 20/200 – 20/500 on the Snellen scale, LogMAR 1.0 to 1.40) or a visual field less than 40°. They have some sight but still meet the criteria for legal blindness.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h3 className="text-2xl font-bold text-dark mb-3">Arm Amputees / Upper Limb Difference (AU) – For athletes with upper limb impairments:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-3">
                <li>
                  <span className="font-semibold">AU2:</span> <em>Moderate upper limb impairment.</em> The athlete has one arm with significantly reduced function below the elbow (for example, an amputation or loss of use) and <strong>no functional wrist or hand</strong> on that limb. This typically means one arm ends around the forearm level.
                </li>
                <li>
                  <span className="font-semibold">AU3:</span> <em>Hand or finger impairment.</em> The athlete has a <strong>partial hand</strong> impairment – for instance, missing one hand or several fingers (across one or both hands) which results in reduced grip function. This class is for climbers who have most of their arm intact but lack some digits or have equivalent loss of hand function.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h3 className="text-2xl font-bold text-dark mb-3">Leg Amputees / Lower Limb Difference (AL) – For athletes with lower limb impairments:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-3">
                <li>
                  <span className="font-semibold">AL1:</span> <em>Bilateral lower limb impairment.</em> The climber has <strong>significantly impaired use of both legs</strong> or an absence of both lower limbs. Examples include double leg amputees or comparable loss of function, often resulting in the athlete climbing essentially without the use of legs (seated harness technique).
                </li>
                <li>
                  <span className="font-semibold">AL2:</span> <em>Single lower limb impairment or leg-length difference.</em> The athlete has an impairment in <strong>one leg</strong> (e.g. a single amputated or non-functioning leg, or a considerable leg length discrepancy). These climbers typically have one strong leg to use on the wall, using prosthetics or not as they prefer.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h3 className="text-2xl font-bold text-dark mb-3">Range & Power (RP)</h3>
              <p className="text-gray-700 mb-3">
                A broad category for athletes with neurological, muscular, or other physical impairments not covered above. "RP" classes cover conditions affecting muscle power, range of movement, coordination, or balance (for example, cerebral palsy, neuropathy, spinal cord injuries, etc.). There are three tiers:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-3">
                <li>
                  <span className="font-semibold">RP1</span> – Severe impairment: athletes have the most significant limitations in strength or range, which might affect multiple limbs or equivalent (for instance, significant paralysis in legs <em>and</em> an arm, or the absence of an arm combined with another impairment).
                </li>
                <li>
                  <span className="font-semibold">RP2</span> – Moderate impairment: athletes have moderate but noticeable impairment affecting movement or strength (e.g. a moderate level of spasticity or coordination loss, affecting the trunk and/or limbs).
                </li>
                <li>
                  <span className="font-semibold">RP3</span> – Mild impairment: athletes have milder impairments in movement or strength (e.g. one limb with a moderate issue, or mild coordination issues) that still meet the eligibility criteria.
                </li>
              </ul>
              <p className="text-gray-700 mt-3">
                In general, a lower number indicates a more severe impairment and a higher number indicates less impairment (greater functional ability). Each paraclimber undergoes a thorough medical and functional evaluation to be assigned to the appropriate class before competing.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Paralympic Debut Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">Paraclimbing's Debut at the 2028 Paralympics</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Paraclimbing will reach a historic milestone at the Los Angeles 2028 Paralympic Games, where it is set to make its Paralympic debut.
              In June 2024, the International Paralympic Committee (IPC) officially approved the inclusion of paraclimbing in the LA28 Paralympic program,
              marking the first time this sport will be part of the Paralympics.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              This addition will bring the total number of sports at the 2028 Paralympic Games to 23. It's a significant moment for the sport – climbing had
              its first Olympic appearance in Tokyo 2021 for able-bodied athletes, and now adaptive climbers will get their chance on the world's biggest stage in 2028.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              The decision also made history as the first instance of a Paralympic Games organizing committee proposing a new sport to the program
              (a testament to Los Angeles' commitment to innovation and inclusivity).
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary mt-6 mb-6">
              <p className="italic text-gray-700 text-lg">
                "A dream come true to see paraclimbing and its athletes take the Paralympic stage in LA28."
                <span className="block text-sm mt-2">— Marco Scolaris, IFSC President</span>
              </p>
            </div>
            <p className="text-gray-700 mb-4 text-lg">
              For the competitors, this is an opportunity to showcase their skills and passion to a massive global audience, alongside other elite para sports.
              LA28 organizers have emphasized the city's diversity and culture of inclusion as a perfect match for paraclimbing's debut, expecting it to inspire
              audiences and elevate the Paralympic Movement.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              The inclusion of paraclimbing in the Paralympics is not only a victory for the athletes and everyone who has worked to develop the sport,
              but also a message that the climbing world embraces "Climbing for all" at the highest level.
            </p>
          </div>
        </div>
      </section>
      
      {/* International Competitions Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">International Competitions</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Paraclimbing has a robust calendar of IFSC-sanctioned international events, where the world's best adaptive climbers compete for titles and medals.
              The flagship events include the IFSC Paraclimbing World Cup series and the IFSC Paraclimbing World Championships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-dark mb-3">World Cup Series</h3>
                <p className="text-gray-700">
                  The World Cup circuit consists of annual events (typically several meets each year in Europe, North America, Asia, etc.),
                  giving athletes multiple opportunities to compete internationally. At each World Cup, climbers in the various sport classes
                  attempt challenging routes and earn points; at the end of the season, overall winners for each category are crowned.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-dark mb-3">World Championships</h3>
                <p className="text-gray-700">
                  The IFSC Paraclimbing World Championships are held every two years (in odd-numbered years) and represent the pinnacle of competition.
                  They usually take place alongside the IFSC Climbing World Championships. At the World Championships, paraclimbers compete for the
                  prestigious title of World Champion in their respective classes.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-dark mb-4">Competition Format</h3>
            <p className="text-gray-700 mb-4 text-lg">
              In terms of format and structure, paraclimbing competitions closely mirror standard sport climbing competitions, with some adaptations.
              The primary discipline contested is lead climbing (difficulty climbing), but in paraclimbing this is done on top-rope for safety – the rope
              is pre-hung from the top of the wall, so athletes won't take a large fall if they slip.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              Competitions typically have a qualification round and a final round. In qualifications, climbers tackle one or two routes, and the top
              performers in each class advance to an onsight final. During an onsight final, each climber enters the wall without having seen others
              climb the route, and they attempt to climb as high as possible. Ranking is determined by the highest hold reached on the route before
              falling or timing out, with ties broken by countback to previous rounds or occasionally by time taken.
            </p>
            
            <h3 className="text-2xl font-bold text-dark mb-4">Special Accommodations</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-3 mb-6">
              <li>
                <span className="font-semibold">Visually Impaired Climbers:</span> Athletes in the B1-B3 categories are allowed a sight guide – 
                a coach or partner who stands on the ground and gives verbal directions about holds and movements during the climb.
                B1 climbers are blindfolded during competition.
              </li>
              <li>
                <span className="font-semibold">Limb Differences:</span> Climbers with limb differences can use personal adaptations as allowed by
                the rules. For instance, leg amputee athletes may choose whether to climb with a prosthetic leg or without, depending on what works
                best for them. However, equipment like prosthetic arms for arm amputees is generally not permitted to keep the competition fair.
              </li>
              <li>
                <span className="font-semibold">Route Design:</span> Route setters design climbs to be achievable and challenging for each class – 
                for example, they consider reach, balance, and movement constraints for different impairments.
              </li>
            </ul>
            
            <p className="text-gray-700 text-lg">
              International paraclimbing events are highly competitive and inspiring. They follow rigorous rules but also emphasize a supportive
              atmosphere: athletes often cheer each other on across nationalities and categories, embodying the camaraderie and sportsmanship
              that define the paraclimbing world.
            </p>
          </div>
        </div>
      </section>
      
      {/* IFSC Documentation Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6">Official IFSC Documentation</h2>
            <p className="text-gray-700 mb-6 text-lg">
              For those interested in the formal rules and guidelines, the IFSC provides several key documents outlining how paraclimbing works:
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-xl font-bold text-dark mb-3">IFSC Paraclimbing Classification Rules</h3>
                <p className="text-gray-700 mb-3">
                  This official rulebook (latest edition March 2025) details the classification process – it defines all the sport classes 
                  (B, AU, AL, RP categories and their criteria) and explains how athletes are evaluated and assigned to a class.
                </p>
                <p className="text-gray-700 mb-3">
                  The document covers eligible impairment types, minimum impairment criteria, and the procedures for classification at competitions 
                  (including medical diagnostics forms, classifier panels, and status designations like "Confirmed" or "Review" for each athlete's class).
                </p>
                <p className="text-gray-700">
                  It is an essential resource to understand who is eligible for paraclimbing and how athletes are grouped for fair competition.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.ifsc-climbing.org/index.php/world-competition/paraclimbing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
                  >
                    Download Classification Rules
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-xl font-bold text-dark mb-3">Competition Regulations for Paraclimbing Events</h3>
                <p className="text-gray-700 mb-3">
                  These are the IFSC's rules and guidelines for organizing and running paraclimbing competitions.
                </p>
                <p className="text-gray-700 mb-3">
                  This document covers everything from safety requirements and equipment (e.g. the mandate for top-rope belaying in paraclimbing lead events)
                  to competition format, scoring, and event logistics. It describes how start lists and categories should be managed, how routes are set
                  and judged, and how results and rankings are handled for paraclimbing contests.
                </p>
                <p className="text-gray-700">
                  These competition regulations ensure that events are conducted uniformly and in line with IPC standards.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.ifsc-climbing.org/index.php/world-competition/paraclimbing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
                  >
                    Download Competition Regulations
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="text-xl font-bold text-dark mb-3">Additional Resources</h3>
                <p className="text-gray-700 mb-3">
                  In addition to the above, the IFSC also publishes related resources such as Paraclimbing Routesetting Guidelines
                  (to aid route setters in creating appropriate climbs for each category) and various official forms for classification
                  (medical diagnostic forms, protest forms, etc.).
                </p>
                <p className="text-gray-700">
                  All these documents can be accessed through the IFSC's official website (under the Resources section for Paraclimbing)
                  and they provide a comprehensive look at the rules, standards, and best practices that govern paraclimbing internationally.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://www.ifsc-climbing.org/index.php/world-competition/paraclimbing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300"
                  >
                    Visit IFSC Paraclimbing Resources
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action - View Belgian Team */}
      <section className="section bg-primary text-white">
        <div className="container text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Belgian Paraclimbing Athletes</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Belgium has a growing team of talented paraclimbers who represent our country in national and international competitions.
          </p>
          <a 
            href="/belgian-team" 
            className="inline-block px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition duration-300"
          >
            View Belgian Team
          </a>
        </div>
      </section>
    </div>
  );
};

export default ParaclimbingPage;
