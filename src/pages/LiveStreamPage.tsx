import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheet from '../components/BottomSheet';
import Schedule from '../components/Schedule';
import scheduleData from '../data/event_1463_schedule_with_names.json';

const LiveStreamPage: React.FC = () => {
  const { t } = useTranslation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isOurFullscreen, setIsOurFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const closeInfoPanel = () => {
    setIsPanelOpen(false);
  };

  const toggleOurFullscreen = () => {
    setIsOurFullscreen(!isOurFullscreen);
    // When entering our fullscreen, also open the panel
    if (!isOurFullscreen) {
      setIsPanelOpen(true);
    }
  };

  const exitOurFullscreen = () => {
    setIsOurFullscreen(false);
    setIsPanelOpen(false);
  };

  // Info panel content component
  const InfoPanelContent = () => (
    <div className="space-y-6">
      {/* Current Event Info */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-semibold text-dark mb-2">
          {t('liveStreamPage.infoPanel.currentEvent')}
        </h4>
        <p className="text-sm text-gray-600 mb-1">
          {t('liveStreamPage.infoPanel.eventName')}
        </p>
        <p className="text-xs text-gray-500">
          {t('liveStreamPage.infoPanel.eventLocation')}
        </p>
      </div>

      {/* Live Schedule */}
      <div>
        <Schedule 
          scheduleData={scheduleData} 
          compact={isMobile}
          className=""
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Our custom fullscreen overlay */}
      {isOurFullscreen && (
        <div className="fixed inset-0 bg-black z-50">
          {/* Video container - responsive layout */}
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isPanelOpen && !isMobile ? 'right-1/3' : 'right-0'
          }`}>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/S6Nul2bkfzw?autoplay=1"
              title="Paraclimbing Live Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            
            {/* Exit fullscreen button */}
            <button
              onClick={exitOurFullscreen}
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-colors z-30"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Info toggle button - positioned fixed to stay visible */}
          <button
            onClick={togglePanel}
            className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors z-40 flex items-center gap-2"
          >
            {isPanelOpen ? (
              <>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="hidden sm:inline">{t('liveStreamPage.infoPanel.expandButton')}</span>
              </>
            ) : (
              <>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">{t('liveStreamPage.infoPanel.toggleButton')}</span>
              </>
            )}
          </button>
          
          {/* Desktop Info Panel (hidden on mobile) */}
          {!isMobile && (
            <div className={`absolute top-0 right-0 h-full w-1/3 bg-white shadow-xl transition-transform duration-300 ease-in-out z-20 ${
              isPanelOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="p-6 h-full overflow-y-auto">
                <div className="mb-6 pr-4">
                  <h3 className="text-xl font-bold text-dark">
                    {t('liveStreamPage.infoPanel.title')}
                  </h3>
                </div>
                <InfoPanelContent />
              </div>
            </div>
          )}
          
          {/* Mobile Bottom Sheet */}
          {isMobile && (
            <BottomSheet
              isOpen={isPanelOpen}
              onClose={closeInfoPanel}
              title=""
            >
              <InfoPanelContent />
            </BottomSheet>
          )}
        </div>
      )}

      {/* Normal page content */}
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
              <div className="bg-black rounded-lg shadow-lg overflow-hidden relative">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/S6Nul2bkfzw"
                    title="Paraclimbing Live Stream"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Info toggle button that also triggers our fullscreen */}
                  <button
                    onClick={toggleOurFullscreen}
                    className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors z-20 flex items-center gap-2"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="hidden sm:inline">{t('liveStreamPage.infoPanel.toggleButton')}</span>
                  </button>
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
    </>
  );
};

export default LiveStreamPage;