import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';

const SupportUsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Hero
        title={t('supportUsPage.hero.title')}
        subtitle={t('supportUsPage.hero.subtitle')}
        backgroundImage="/assets/events.jpg"
      />
      
      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Contact Us</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Have questions, suggestions, or want to get involved? We'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center text-2xl">
                  ✉
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">Get in Touch</h3>
              <p className="text-gray-700 mb-6">
                For all inquiries, partnerships, or suggestions, please contact us at:
              </p>
              <a 
                href="mailto:info@paraclimbing.be" 
                className="text-secondary hover:text-primary text-xl font-semibold underline transition-colors"
              >
                info@paraclimbing.be
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partnership Opportunities */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Partnership Opportunities</h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg">
              We're actively seeking partners to help us expand our reach and grow our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Social Media Partnership */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center mr-3 text-lg">
                  📱
                </div>
                <h3 className="text-2xl font-bold text-dark">Social Media Growth</h3>
              </div>
              <p className="text-gray-700 mb-6">
                We're looking for partners to help us financially boost our content on social media, 
                specifically Instagram, so that our posts reach more people and we can grow the 
                paraclimbing community.
              </p>
              <div className="bg-secondary/10 rounded-lg p-4">
                <h4 className="font-bold text-secondary mb-2">How You Can Help:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Sponsor Instagram ad campaigns</li>
                  <li>• Support content creation efforts</li>
                  <li>• Help boost post visibility</li>
                  <li>• Expand our reach to new audiences</li>
                </ul>
              </div>
            </div>
            
            {/* General Partnership */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center mr-3 text-lg">
                  💭
                </div>
                <h3 className="text-2xl font-bold text-dark">Open to Suggestions</h3>
              </div>
              <p className="text-gray-700 mb-6">
                We're always open to new ideas and partnerships that can help us better serve 
                the paraclimbing community. Whether you have a creative suggestion, want to 
                collaborate, or have other ways to support our mission.
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-bold text-primary mb-2">We Welcome:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Innovative collaboration ideas</li>
                  <li>• Creative partnership proposals</li>
                  <li>• Community building suggestions</li>
                  <li>• Any other support opportunities</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-secondary text-white rounded-lg p-8 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                ❤️
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Ready to Partner With Us?</h3>
            <p className="mb-6 text-lg">
              Whether you're interested in supporting our social media growth or have other 
              ideas for collaboration, we'd love to discuss how we can work together to 
              grow the paraclimbing community.
            </p>
            <a 
              href="mailto:info@paraclimbing.be?subject=Partnership Opportunity" 
              className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-3 inline-flex items-center"
            >
              <span className="mr-2">✉</span>
              Contact Us About Partnerships
            </a>
          </div>
        </div>
      </section>
      
      {/* Why Partner With Us */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">Why Partner With Us?</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              By partnering with us, you're helping to make paraclimbing more accessible and 
              visible to people with disabilities across Belgium and beyond.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Meaningful Impact</h3>
                <p className="text-gray-700">
                  Help us reach more people with disabilities and introduce them to the joy of climbing
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Social Media Growth</h3>
                <p className="text-gray-700">
                  Your support helps us expand our online presence and connect with more people
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">Community Building</h3>
                <p className="text-gray-700">
                  Together, we can build a stronger, more inclusive climbing community
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportUsPage;