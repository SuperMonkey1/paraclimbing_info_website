import React from 'react';
import Hero from '../components/Hero';
import { useTranslation } from 'react-i18next';


const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const faqItems = [
    {
      question: t('contactPage.faqQuestion'),
      answer: t('contactPage.faqAnswer')
    }
  ];

  return (
    <div>
      <Hero
        title={t('contactPage.title')}
        subtitle={t('contactPage.subtitle')}
        backgroundImage="/assets/belgium.jpg"
      />
      
      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">{t('contactPage.contactInformation')}</h2>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark">{t('footer.email')}</h3>
                    <p className="text-gray-700">info@paraclimbing.be</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('contactPage.emailInfo')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark">{t('contactPage.officeLocation')}</h3>
                    <p className="text-gray-700">
                      Parabel VZW<br />
                      Valkerijgang 32<br />
                      3000 Leuven, Belgium
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('contactPage.byAppointmentOnly')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dark">{t('contactPage.socialMedia')}</h3>
                    <div className="flex items-center mt-2">
                      <a href="https://www.instagram.com/paraclimbing.info" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                      <span className="text-gray-600 ml-2">
                        <a href="https://www.instagram.com/paraclimbing.info" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          @paraclimbing.info
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <a href="https://www.facebook.com/Paraclimbing" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <span className="text-gray-600 ml-2">
                        <a href="https://www.facebook.com/Paraclimbing" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          facebook.com/Paraclimbing
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a href="mailto:info@paraclimbing.be" className="btn btn-primary">
                  {t('contactPage.emailUs')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center">{t('contactPage.faqTitle')}</h2>
            <p className="text-gray-700 mb-12 text-center">
              We have just started, we haven't got any questions so far.
            </p>
            
            <div className="mt-12 text-center">
              <p className="text-gray-700 mb-4">
                {t('contactPage.moreQuestionsText')}
              </p>
              <a href="mailto:info@paraclimbing.be" className="btn btn-primary">
                {t('contactPage.emailUs')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
