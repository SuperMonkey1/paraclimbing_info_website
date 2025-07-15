import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import BottomSheet from '../components/BottomSheet';
import AnalysisSchedule from '../components/AnalysisSchedule';
import scheduleData from '../data/event_1463_schedule_with_names.json';
import { scheduleService } from '../firebase/climber-service';
import { testFirebaseConnection, createInitialScheduleDocument } from '../firebase/test-service';

// YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  seekTo: (seconds: number) => void;
  getCurrentTime: () => number;
  pauseVideo: () => void;
  playVideo: () => void;
  destroy: () => void;
}

const AnalyseStreamPage: React.FC = () => {
  const { t } = useTranslation();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isOurFullscreen, setIsOurFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [selectedClimber, setSelectedClimber] = useState<string | null>(null);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const infoPanelScrollRef = useRef<HTMLDivElement>(null);
  const savedInfoPanelScroll = useRef<number>(0);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const fullscreenPlayerRef = useRef<YouTubePlayer | null>(null);
  const normalPlayerRef = useRef<HTMLDivElement>(null);
  const fullscreenPlayerElementRef = useRef<HTMLDivElement>(null);
  
  const VIDEO_ID = 'S6Nul2bkfzw'; // Extract video ID from URL

  // Load YouTube API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT) {
        setIsApiReady(true);
        return;
      }

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
      };
    };

    loadYouTubeAPI();
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize YouTube players when API is ready
  useEffect(() => {
    if (!isApiReady) return;

    // Initialize normal player
    if (normalPlayerRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player(normalPlayerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (fullscreenPlayerRef.current) {
        fullscreenPlayerRef.current.destroy();
        fullscreenPlayerRef.current = null;
      }
    };
  }, [isApiReady]);

  // Initialize fullscreen player when entering fullscreen
  useEffect(() => {
    if (!isApiReady || !isOurFullscreen) return;

    const timer = setTimeout(() => {
      if (fullscreenPlayerElementRef.current && !fullscreenPlayerRef.current) {
        fullscreenPlayerRef.current = new window.YT.Player(fullscreenPlayerElementRef.current, {
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
          },
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (fullscreenPlayerRef.current) {
        fullscreenPlayerRef.current.destroy();
        fullscreenPlayerRef.current = null;
      }
    };
  }, [isApiReady, isOurFullscreen]);

  // Track video time for status calculations
  useEffect(() => {
    const updateVideoTime = () => {
      const player = isOurFullscreen ? fullscreenPlayerRef.current : playerRef.current;
      if (player) {
        try {
          const time = player.getCurrentTime();
          if (typeof time === 'number' && !isNaN(time)) {
            setCurrentVideoTime(time);
          }
        } catch (error) {
          // Silently ignore errors when player isn't ready
        }
      }
    };

    // Update video time every 2 seconds instead of every second
    const interval = setInterval(updateVideoTime, 2000);

    // Update immediately
    updateVideoTime();

    return () => clearInterval(interval);
  }, [isOurFullscreen, playerRef.current, fullscreenPlayerRef.current]);

  // Preserve info panel scroll position
  useEffect(() => {
    const container = infoPanelScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      savedInfoPanelScroll.current = container.scrollTop;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isPanelOpen]);

  // Restore scroll position after re-renders
  useEffect(() => {
    const restoreScrollPosition = () => {
      if (infoPanelScrollRef.current && savedInfoPanelScroll.current > 0) {
        infoPanelScrollRef.current.scrollTop = savedInfoPanelScroll.current;
      }
    };
    
    // Restore after a brief delay to ensure DOM is updated
    const timeoutId = setTimeout(restoreScrollPosition, 50);
    
    return () => clearTimeout(timeoutId);
  }, [currentVideoTime, selectedClimber]); // Run when these change

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

  // Test Firebase connection
  const testFirebase = async () => {
    try {
      await testFirebaseConnection();
      alert('Firebase connection test successful! Check console for details.');
    } catch (error) {
      console.error('Firebase test failed:', error);
      alert('Firebase connection test failed. Check console for details.');
    }
  };

  // Create initial schedule document
  const createScheduleDoc = async () => {
    try {
      await createInitialScheduleDocument();
      alert('Initial schedule document created successfully!');
    } catch (error) {
      console.error('Failed to create schedule document:', error);
      alert('Failed to create schedule document. Check console for details.');
    }
  };

  const exitOurFullscreen = () => {
    setIsOurFullscreen(false);
    setIsPanelOpen(false);
  };

  // Video control functions
  const skipBackward = () => {
    const player = isOurFullscreen ? fullscreenPlayerRef.current : playerRef.current;
    if (player) {
      try {
        const currentTime = player.getCurrentTime();
        const newTime = Math.max(0, currentTime - 10);
        player.seekTo(newTime);
      } catch (error) {
        console.error('Error skipping backward:', error);
      }
    }
  };

  const skipForward = () => {
    const player = isOurFullscreen ? fullscreenPlayerRef.current : playerRef.current;
    if (player) {
      try {
        const currentTime = player.getCurrentTime();
        const newTime = currentTime + 10;
        player.seekTo(newTime);
      } catch (error) {
        console.error('Error skipping forward:', error);
      }
    }
  };

  // Handle climber click - record start time in Firebase
  const handleClimberClick = useCallback(async (climberName: string, route: string, scheduledTime: string) => {
    const player = isOurFullscreen ? fullscreenPlayerRef.current : playerRef.current;
    if (!player) {
      alert('Video player not ready. Please wait for the video to load.');
      return;
    }

    try {
      console.log('Attempting to record start time for:', { climberName, route, scheduledTime });
      
      const currentVideoTime = player.getCurrentTime();
      console.log('Current video time:', currentVideoTime);
      
      await scheduleService.setClimberStartTime(climberName, route, scheduledTime, currentVideoTime);
      setSelectedClimber(`${climberName} - ${route}`);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50';
      notification.textContent = `✓ Start time recorded for ${climberName} on ${route}`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
    } catch (error) {
      console.error('Detailed error recording climber start time:', error);
      
      // Show more detailed error message
      let errorMessage = 'Failed to record start time.';
      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
      }
      
      alert(errorMessage + ' Check console for details.');
    }
  }, [isOurFullscreen]);

  // Info panel content component
  const InfoPanelContent = () => (
    <div className="space-y-6">
      {/* Video Controls */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-semibold text-dark mb-3">
          Video Controls
        </h4>
        <div className="flex justify-center gap-4">
          <button
            onClick={skipBackward}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
            <span>-10s</span>
          </button>
          <button
            onClick={skipForward}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <span>+10s</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Firebase Debug Section */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-semibold text-dark mb-3">
          Firebase Debug
        </h4>
        <div className="mb-3 text-sm text-gray-600">
          <p>Current Video Time: {Math.floor(currentVideoTime / 60)}:{String(Math.floor(currentVideoTime % 60)).padStart(2, '0')} ({currentVideoTime.toFixed(1)}s)</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={testFirebase}
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Test Firebase Connection</span>
          </button>
          <button
            onClick={createScheduleDoc}
            className="flex items-center gap-2 bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Create Schedule Document</span>
          </button>
        </div>
      </div>

      {/* Analysis Tools Section */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-semibold text-dark mb-3">
          Analysis Tools
        </h4>
        <div className="space-y-3">
          {selectedClimber && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-green-800">
                  Currently Tracking: {selectedClimber}
                </span>
              </div>
            </div>
          )}
          <div className="text-sm text-gray-600">
            <p className="mb-2">Click on a climber's name to record their start time:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Performance tracking</li>
              <li>Route analysis</li>
              <li>Competitor comparison</li>
              <li>Technical movement review</li>
            </ul>
          </div>
        </div>
      </div>

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
        <AnalysisSchedule 
          scheduleData={scheduleData} 
          compact={isMobile}
          className=""
          onClimberClick={handleClimberClick}
          currentVideoTime={currentVideoTime}
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
            <div
              ref={fullscreenPlayerElementRef}
              className="w-full h-full"
            >
              {!fullscreenPlayerRef.current && (
                <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading fullscreen player...</p>
                  </div>
                </div>
              )}
            </div>
            
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
                <span className="hidden sm:inline">Close Analysis</span>
              </>
            ) : (
              <>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="hidden sm:inline">Analysis Tools</span>
              </>
            )}
          </button>
          
          {/* Desktop Info Panel (hidden on mobile) */}
          {!isMobile && (
            <div className={`absolute top-0 right-0 h-full w-1/3 bg-white shadow-xl transition-transform duration-300 ease-in-out z-20 ${
              isPanelOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="p-6 h-full overflow-y-auto" ref={infoPanelScrollRef}>
                <div className="mb-6 pr-4">
                  <h3 className="text-xl font-bold text-dark">
                    Stream Analysis
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
              Stream Analysis
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Advanced video analysis tools for paraclimbing performance review
            </p>
          </div>
        </section>

        {/* Live Stream Section */}
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="bg-black rounded-lg shadow-lg overflow-hidden relative">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <div
                    ref={normalPlayerRef}
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    {!isApiReady && (
                      <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                          <p>Loading video player...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="hidden sm:inline">Analysis Tools</span>
                  </button>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-dark mb-4">
                  Performance Analysis Stream
                </h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Use advanced analysis tools to review climbing performance, technique, and strategy. Perfect for coaches, athletes, and climbing enthusiasts looking to improve their understanding of competitive paraclimbing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section bg-gray-100">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-dark text-center mb-12">
                Analysis Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Performance Tracking</h3>
                  <p className="text-gray-600 text-sm">Monitor athlete progress and compare performances across different competitions and time periods.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Route Analysis</h3>
                  <p className="text-gray-600 text-sm">Detailed breakdown of climbing routes, hold difficulty, and optimal movement patterns.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Competitor Comparison</h3>
                  <p className="text-gray-600 text-sm">Side-by-side analysis of different athletes' approaches to the same routes and problems.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Technical Review</h3>
                  <p className="text-gray-600 text-sm">Frame-by-frame analysis of climbing technique, body positioning, and movement efficiency.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Timing Analysis</h3>
                  <p className="text-gray-600 text-sm">Precise timing measurements for route completion, rest periods, and movement sequences.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-primary mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-dark mb-2">Report Generation</h3>
                  <p className="text-gray-600 text-sm">Generate detailed analysis reports for athletes, coaches, and training program development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section bg-secondary text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Analyze?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Start using our advanced stream analysis tools to improve climbing performance and understanding. Perfect for coaches, athletes, and climbing enthusiasts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/live-stream" 
                className="btn bg-white text-secondary hover:bg-gray-100"
              >
                Watch Live Stream
              </a>
              <a 
                href="/activities" 
                className="btn bg-primary text-white hover:bg-red-800"
              >
                View Events
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnalyseStreamPage;