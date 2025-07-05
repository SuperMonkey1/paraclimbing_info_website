import React from 'react';
import { useTranslation } from 'react-i18next';

const LiveStreamPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('liveStreamPage.title')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {t('liveStreamPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/S6Nul2bkfzw"
                  title="Paraclimbing Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-dark mb-4">
                {t('liveStreamPage.streamInfo.title')}
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                {t('liveStreamPage.streamInfo.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('liveStreamPage.cta.title')}
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            {t('liveStreamPage.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.youtube.com/@paraclimbinginfo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn bg-white text-secondary hover:bg-gray-100"
            >
              {t('liveStreamPage.cta.subscribe')}
            </a>
            <a 
              href="/activities" 
              className="btn bg-primary text-white hover:bg-red-800"
            >
              {t('liveStreamPage.cta.viewEvents')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveStreamPage;
