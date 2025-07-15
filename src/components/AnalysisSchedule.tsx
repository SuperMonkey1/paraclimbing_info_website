import React, { useState, useEffect, useRef } from 'react';
import { scheduleService, ScheduleWithStartData, TimeSlotWithStartData, ClimberStartData } from '../firebase/climber-service';

interface AnalysisScheduleProps {
  scheduleData: any;
  compact?: boolean;
  className?: string;
  onClimberClick: (climberName: string, route: string, scheduledTime: string) => void;
  currentVideoTime?: number;
}

const AnalysisSchedule: React.FC<AnalysisScheduleProps> = ({
  scheduleData,
  compact = false,
  className = '',
  onClimberClick,
  currentVideoTime
}) => {
  const [scheduleWithStartData, setScheduleWithStartData] = useState<ScheduleWithStartData | null>(null);
  const [lastVideoTimeUpdate, setLastVideoTimeUpdate] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollPosition = useRef<number>(0);
  const isScrollingProgrammatically = useRef<boolean>(false);

  useEffect(() => {
    // Load initial schedule with start data
    const loadScheduleData = async () => {
      try {
        const data = await scheduleService.getScheduleWithStartData();
        if (data) {
          setScheduleWithStartData(data);
        } else {
          // If no Firebase data exists, use the JSON schedule data as fallback
          setScheduleWithStartData(scheduleData);
        }
      } catch (error) {
        console.error('Failed to load schedule data:', error);
        // Use JSON data as fallback
        setScheduleWithStartData(scheduleData);
      }
    };

    loadScheduleData();

    // Set up real-time listener
    const unsubscribe = scheduleService.onScheduleChange((data) => {
      if (data) {
        setScheduleWithStartData(data);
      }
    });

    return () => unsubscribe();
  }, [scheduleData]);

  // Optimize video time updates to prevent excessive re-renders
  useEffect(() => {
    // Save scroll position before potential re-render
    if (scrollContainerRef.current) {
      savedScrollPosition.current = scrollContainerRef.current.scrollTop;
    }

    // Only update if video time has changed significantly (every 5 seconds)
    const timeDiff = Math.abs((currentVideoTime || 0) - lastVideoTimeUpdate);
    if (timeDiff >= 5) {
      setLastVideoTimeUpdate(currentVideoTime || 0);
    }
  }, [currentVideoTime, lastVideoTimeUpdate]);

  // Restore scroll position after re-render
  useEffect(() => {
    if (scrollContainerRef.current && !isScrollingProgrammatically.current) {
      isScrollingProgrammatically.current = true;
      scrollContainerRef.current.scrollTop = savedScrollPosition.current;
      
      // Reset the flag after a brief delay
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 50);
    }
  });

  // Track scroll position continuously
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!isScrollingProgrammatically.current) {
        savedScrollPosition.current = scrollContainer.scrollTop;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scheduleWithStartData]); // Re-attach when schedule data changes

  const getClimberStatus = (climberName: string, route: string, scheduledTime: string): 'pending' | 'climbing' | 'completed' => {
    if (!scheduleWithStartData) return 'pending';
    
    // Use the throttled video time to reduce re-renders
    return scheduleService.getClimberStatus(scheduleWithStartData, climberName, route, scheduledTime, lastVideoTimeUpdate);
  };

  const getStatusColor = (status: 'pending' | 'climbing' | 'completed'): string => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'climbing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status: 'pending' | 'climbing' | 'completed'): JSX.Element => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'climbing':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleClimberClick = (climberName: string, route: string, scheduledTime: string) => {
    if (climberName && climberName !== 'Presentation' && climberName !== 'Awards') {
      onClimberClick(climberName, route, scheduledTime);
    }
  };

  const isClickable = (climberName: string): boolean => {
    return Boolean(climberName && climberName !== 'Presentation' && climberName !== 'Awards' && climberName !== '');
  };

  if (!scheduleWithStartData?.time_slots) {
    return <div className="text-gray-500">Loading schedule data...</div>;
  }

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="overflow-x-auto" ref={scrollContainerRef}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-semibold text-gray-900`}>
                Time
              </th>
              <th className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-semibold text-gray-900`}>
                Route 1
              </th>
              <th className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-semibold text-gray-900`}>
                Route 2
              </th>
              <th className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-semibold text-gray-900`}>
                Route 3
              </th>
              <th className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-semibold text-gray-900`}>
                Route 4
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduleWithStartData.time_slots.map((slot: TimeSlotWithStartData, index: number) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-medium text-gray-900`}>
                  {slot.Time}
                </td>
                {['Route 1', 'Route 2', 'Route 3', 'Route 4'].map((route) => {
                  const climberName = slot[route as keyof TimeSlotWithStartData] as string || '';
                  const status = getClimberStatus(climberName, route, slot.Time);
                  const clickable = isClickable(climberName);
                  
                  return (
                    <td key={route} className={`${compact ? 'p-2' : 'p-3'}`}>
                      {climberName ? (
                        <div
                          onClick={() => clickable && handleClimberClick(climberName, route, slot.Time)}
                          className={`
                            ${compact ? 'text-xs p-2' : 'text-sm p-2'}
                            rounded-lg border
                            ${clickable ? 'cursor-pointer hover:shadow-md transition-all duration-200' : 'cursor-default'}
                            ${getStatusColor(status)}
                            flex items-center gap-2
                          `}
                        >
                          {clickable && getStatusIcon(status)}
                          <span className={clickable ? 'flex-1' : ''}>{climberName}</span>
                        </div>
                      ) : (
                        <div className={`${compact ? 'text-xs p-2' : 'text-sm p-2'} text-gray-400`}>
                          -
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h5 className="text-xs font-semibold text-gray-700 mb-2">Status Legend:</h5>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800">Currently Climbing</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-blue-800">Completed</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Click on a climber's name to mark their start time
        </p>
      </div>
    </div>
  );
};

// Custom comparison function for React.memo to prevent unnecessary re-renders
const arePropsEqual = (prevProps: AnalysisScheduleProps, nextProps: AnalysisScheduleProps) => {
  // Only re-render if:
  // 1. Schedule data changes
  // 2. Video time changes significantly (5+ seconds)
  // 3. Other props change
  
  const prevTime = prevProps.currentVideoTime || 0;
  const nextTime = nextProps.currentVideoTime || 0;
  const timeDiff = Math.abs(nextTime - prevTime);
  
  return (
    prevProps.scheduleData === nextProps.scheduleData &&
    prevProps.compact === nextProps.compact &&
    prevProps.className === nextProps.className &&
    prevProps.onClimberClick === nextProps.onClimberClick &&
    timeDiff < 5 // Only re-render if time difference is 5+ seconds
  );
};

export default React.memo(AnalysisSchedule, arePropsEqual);