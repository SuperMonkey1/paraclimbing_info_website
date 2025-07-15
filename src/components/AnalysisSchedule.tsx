import React, { useState, useEffect, useRef } from 'react';
import { scheduleService, ScheduleWithStartData, TimeSlotWithStartData } from '../firebase/climber-service';
import ClimberCell from './ClimberCell';

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
  currentVideoTime = 0
}) => {
  const [scheduleWithStartData, setScheduleWithStartData] = useState<ScheduleWithStartData | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollPosition = useRef<number>(0);
  const isRestoring = useRef<boolean>(false);

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

    // Set up real-time listener for Firebase updates
    const unsubscribe = scheduleService.onScheduleChange((data) => {
      if (data) {
        setScheduleWithStartData(data);
      }
    });

    return () => unsubscribe();
  }, [scheduleData]);

  // Scroll position preservation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isRestoring.current) {
        savedScrollPosition.current = container.scrollTop;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scheduleWithStartData]);

  // Restore scroll position after any re-render
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && savedScrollPosition.current > 0) {
      isRestoring.current = true;
      container.scrollTop = savedScrollPosition.current;
      
      // Reset the flag after a brief delay
      setTimeout(() => {
        isRestoring.current = false;
      }, 100);
    }
  });

  if (!scheduleWithStartData?.time_slots) {
    return <div className="text-gray-500">Loading schedule data...</div>;
  }

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="overflow-y-auto max-h-96" ref={scrollContainerRef}>
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
              <tr key={`${slot.Time}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                <td className={`${compact ? 'p-2 text-xs' : 'p-3 text-sm'} font-medium text-gray-900`}>
                  {slot.Time}
                </td>
                {['Route 1', 'Route 2', 'Route 3', 'Route 4'].map((route) => {
                  const climberName = slot[route as keyof TimeSlotWithStartData] as string || '';
                  
                  return (
                    <td key={`${slot.Time}-${route}`} className={`${compact ? 'p-2' : 'p-3'}`}>
                      <ClimberCell
                        climberName={climberName}
                        route={route}
                        scheduledTime={slot.Time}
                        compact={compact}
                        scheduleData={scheduleWithStartData}
                        currentVideoTime={currentVideoTime}
                        onClimberClick={onClimberClick}
                      />
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

// Only re-render the schedule when schedule data changes, not when video time changes
const MemoizedAnalysisSchedule = React.memo(AnalysisSchedule, (prevProps, nextProps) => {
  return (
    prevProps.scheduleData === nextProps.scheduleData &&
    prevProps.compact === nextProps.compact &&
    prevProps.className === nextProps.className &&
    prevProps.onClimberClick === nextProps.onClimberClick
    // Deliberately exclude currentVideoTime from comparison!
  );
});

export default MemoizedAnalysisSchedule;