import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const SupportUsPage: React.FC = () => {
  const { t } = useTranslation();
  // Using constant for volunteer opportunities to maintain structure
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
        title={t('supportUsPage.hero.title')}
        subtitle={t('supportUsPage.hero.subtitle')}
        backgroundImage="/assets/events.jpg"
      />
      
      {/* Volunteer Section - Moved to the top */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">{t('supportUsPage.volunteerSection.title')}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t('supportUsPage.volunteerSection.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-dark mb-2">{t(`supportUsPage.volunteerOpportunities.${index}.title`)}</h3>
                <p className="text-gray-700 mb-4">{t(`supportUsPage.volunteerOpportunities.${index}.description`)}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-secondary text-white rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('supportUsPage.volunteerCTA.title')}</h3>
            <p className="mb-6">
              {t('supportUsPage.volunteerCTA.description')}
            </p>
            <Link to="/contact" className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-3">
              {t('supportUsPage.volunteerCTA.buttonText')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Support Us */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">{t('supportUsPage.whySupportSection.title')}</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              {t('supportUsPage.whySupportSection.description')}
            </p>
            
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-xl font-bold text-dark mb-4">{t('supportUsPage.contributionUse.title')}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-3 mb-4">
                <li>{t('supportUsPage.contributionUse.items.0')}</li>
                <li>{t('supportUsPage.contributionUse.items.1')}</li>
                <li>{t('supportUsPage.contributionUse.items.2')}</li>
                <li>{t('supportUsPage.contributionUse.items.3')}</li>
                <li>{t('supportUsPage.contributionUse.items.4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bank Transfer Section - Replacing Donation Options */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark mb-4">{t('supportUsPage.financialSupport.title')}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              {t('supportUsPage.financialSupport.description')}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-dark mb-4">{t('supportUsPage.bankTransfer.title')}</h3>
            <p className="text-gray-700 text-center mb-4">
              {t('supportUsPage.bankTransfer.description')}
            </p>
            <div className="text-center font-medium mb-6">
              <p className="text-primary text-lg">{t('supportUsPage.bankTransfer.organization')}</p>
              <p className="text-gray-800">{t('supportUsPage.bankTransfer.iban')}</p>
              <p className="text-gray-800">{t('supportUsPage.bankTransfer.bic')}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-primary text-center mb-2">{t('supportUsPage.corporateSponsorship.title')}</h4>
              <p className="text-gray-700 text-center">
                {t('supportUsPage.corporateSponsorship.description')}<br />
                {t('supportUsPage.corporateSponsorship.contact')} <a href="mailto:info@paraclimbing.be" className="text-secondary underline">info@paraclimbing.be</a> {t('supportUsPage.corporateSponsorship.contactEnd')}
              </p>
            </div>
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
            <a href="mailto:info@paraclimbing.be" className="btn btn-primary">
              {t('sponsors.becomeASponsor')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportUsPage;