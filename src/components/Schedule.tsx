import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeSlot {
  Time: string;
  [key: string]: string; // For dynamic route columns like "Route 1", "Route 2", etc.
}

interface ScheduleData {
  time_slots: TimeSlot[];
}

interface ScheduleProps {
  scheduleData?: ScheduleData;
  compact?: boolean;
  className?: string;
}

const Schedule: React.FC<ScheduleProps> = ({ 
  scheduleData, 
  compact = false, 
  className = '' 
}) => {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (!scheduleData || !scheduleData.time_slots) {
    return (
      <div className={`text-center py-4 ${className}`}>
        <p className="text-gray-500 text-sm">
          {t('schedule.noData', 'No schedule data available')}
        </p>
      </div>
    );
  }

  const timeSlots = scheduleData.time_slots;
  
  // Get all route columns dynamically
  const routeColumns = Object.keys(timeSlots[0] || {})
    .filter(key => key !== 'Time')
    .sort(); // Sort to ensure consistent order

  // Find current or next time slot
  const getCurrentTimeSlotIndex = () => {
    const currentTimeStr = currentTime.toTimeString().substring(0, 5);
    const currentIndex = timeSlots.findIndex(slot => slot.Time >= currentTimeStr);
    return currentIndex >= 0 ? currentIndex : timeSlots.length - 1;
  };

  const currentTimeSlotIndex = getCurrentTimeSlotIndex();

  // Helper function to check if a cell is empty
  const isEmpty = (value: string) => !value || value.trim() === '';

  // Helper function to check if this is a special event (like Presentation or Awards)
  const isSpecialEvent = (value: string) => {
    const specialEvents = ['Presentation', 'Awards', 'Break', 'Ceremony'];
    return specialEvents.some(event => value.includes(event));
  };

  if (compact) {
    // Compact view for mobile/small spaces - show full schedule with scrolling
    const allSlots = timeSlots.filter(slot => 
      routeColumns.some(route => !isEmpty(slot[route]))
    );

    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-dark">
            {t('schedule.title', 'Schedule')}
          </h4>
          <span className="text-xs text-gray-500">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {/* Scrollable container for full schedule */}
        <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
          {allSlots.map((slot, index) => {
            const actualIndex = timeSlots.findIndex(s => s.Time === slot.Time);
            const isCurrentSlot = actualIndex === currentTimeSlotIndex;
            const hasClimbers = routeColumns.some(route => 
              !isEmpty(slot[route]) && !isSpecialEvent(slot[route])
            );
            
            return (
              <div
                key={slot.Time}
                className={`p-3 rounded-lg border ${
                  isCurrentSlot 
                    ? 'bg-primary bg-opacity-10 border-primary border-opacity-30' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${
                    isCurrentSlot ? 'text-primary' : 'text-dark'
                  }`}>
                    {slot.Time}
                  </span>
                  {isCurrentSlot && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                      {t('schedule.now', 'NOW')}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  {routeColumns.map((route) => {
                    const climber = slot[route];
                    if (isEmpty(climber)) return null;
                    
                    return (
                      <div key={route} className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{route.replace('Route ', 'R')}:</span>
                        <span className={`text-xs font-medium text-right flex-1 ml-2 ${
                          isSpecialEvent(climber) 
                            ? 'text-secondary font-semibold' 
                            : 'text-dark'
                        }`}>
                          {climber}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Full table view for desktop
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-dark">
          {t('schedule.title', 'Schedule')}
        </h4>
        <span className="text-xs text-gray-500">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <div className="w-full">
        <table className="w-full text-xs table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-1 font-medium text-gray-700 w-12">
                {t('schedule.time', 'Time')}
              </th>
              {routeColumns.map((route) => (
                <th key={route} className="text-left py-2 px-1 font-medium text-gray-700">
                  {route}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => {
              const isCurrentSlot = index === currentTimeSlotIndex;
              const hasAnyClimber = routeColumns.some(route => !isEmpty(slot[route]));
              
              if (!hasAnyClimber) return null; // Skip empty rows
              
              return (
                <tr
                  key={slot.Time}
                  className={`border-b border-gray-100 ${
                    isCurrentSlot 
                      ? 'bg-primary bg-opacity-10' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className={`py-1 px-1 font-medium text-xs ${
                    isCurrentSlot ? 'text-primary' : 'text-dark'
                  }`}>
                    <div className="flex flex-col">
                      <span>{slot.Time}</span>
                      {isCurrentSlot && (
                        <span className="text-xs bg-primary text-white px-1 py-0.5 rounded mt-1 self-start">
                          {t('schedule.now', 'NOW')}
                        </span>
                      )}
                    </div>
                  </td>
                  {routeColumns.map((route) => {
                    const climber = slot[route];
                    return (
                      <td key={route} className="py-1 px-1 text-xs">
                        {!isEmpty(climber) && (
                          <span className={`block truncate ${
                            isSpecialEvent(climber) 
                              ? 'text-secondary font-semibold' 
                              : 'text-gray-700'
                          }`}
                          title={climber}>
                            {climber}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
