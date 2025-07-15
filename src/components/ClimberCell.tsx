import React, { memo } from 'react';
import { scheduleService, ScheduleWithStartData } from '../firebase/climber-service';

interface ClimberCellProps {
  climberName: string;
  route: string;
  scheduledTime: string;
  compact: boolean;
  scheduleData: ScheduleWithStartData | null;
  currentVideoTime: number;
  onClimberClick: (climberName: string, route: string, scheduledTime: string) => void;
}

const ClimberCell: React.FC<ClimberCellProps> = ({
  climberName,
  route,
  scheduledTime,
  compact,
  scheduleData,
  currentVideoTime,
  onClimberClick
}) => {
  const isClickable = (name: string): boolean => {
    return Boolean(name && name !== 'Presentation' && name !== 'Awards' && name !== '');
  };

  const getClimberStatus = (): 'pending' | 'climbing' | 'completed' => {
    if (!scheduleData || !climberName) return 'pending';
    
    // Use Math.floor to reduce update frequency - only update every 5 seconds
    const roundedVideoTime = Math.floor(currentVideoTime / 5) * 5;
    return scheduleService.getClimberStatus(scheduleData, climberName, route, scheduledTime, roundedVideoTime);
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

  const handleClick = () => {
    if (isClickable(climberName)) {
      onClimberClick(climberName, route, scheduledTime);
    }
  };

  const status = getClimberStatus();
  const clickable = isClickable(climberName);

  if (!climberName) {
    return (
      <div className={`${compact ? 'text-xs p-2' : 'text-sm p-2'} text-gray-400`}>
        -
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
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
  );
};

// Custom comparison function - only re-render if the status would actually change
const areEqual = (prevProps: ClimberCellProps, nextProps: ClimberCellProps) => {
  // Don't re-render if basic props haven't changed
  if (
    prevProps.climberName !== nextProps.climberName ||
    prevProps.route !== nextProps.route ||
    prevProps.scheduledTime !== nextProps.scheduledTime ||
    prevProps.compact !== nextProps.compact ||
    prevProps.onClimberClick !== nextProps.onClimberClick
  ) {
    return false;
  }

  // Only re-render if the video time change would affect the status
  if (!nextProps.scheduleData || !nextProps.climberName || !prevProps.scheduleData) {
    return true; // No need to update if no data
  }

  // Round video times to 5-second intervals to reduce updates
  const prevTime = Math.floor(prevProps.currentVideoTime / 5) * 5;
  const nextTime = Math.floor(nextProps.currentVideoTime / 5) * 5;
  
  if (prevTime === nextTime) {
    return true; // No significant time change
  }

  // Check if the status would actually change
  const prevStatus = scheduleService.getClimberStatus(
    prevProps.scheduleData, 
    prevProps.climberName, 
    prevProps.route, 
    prevProps.scheduledTime, 
    prevTime
  );
  
  const nextStatus = scheduleService.getClimberStatus(
    nextProps.scheduleData, 
    nextProps.climberName, 
    nextProps.route, 
    nextProps.scheduledTime, 
    nextTime
  );

  return prevStatus === nextStatus; // Only re-render if status actually changes
};

export default memo(ClimberCell, areEqual);