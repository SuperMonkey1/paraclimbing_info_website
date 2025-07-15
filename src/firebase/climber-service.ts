import { db } from './config';

export interface ClimberStartData {
  actualStartTime?: number; // timestamp when clicked
  videoTime?: number; // video timestamp when they started
  status: 'pending' | 'climbing' | 'completed';
}

export interface TimeSlotWithStartData {
  Time: string;
  'Route 1': string;
  'Route 2': string;
  'Route 3': string;
  'Route 4': string;
  // Start time data for each route
  'Route 1_startData'?: ClimberStartData;
  'Route 2_startData'?: ClimberStartData;
  'Route 3_startData'?: ClimberStartData;
  'Route 4_startData'?: ClimberStartData;
}

export interface ScheduleWithStartData {
  time_slots: TimeSlotWithStartData[];
}

export const scheduleService = {
  // Set climber start time by updating the schedule document
  async setClimberStartTime(
    climberName: string, 
    route: string, 
    scheduledTime: string, 
    videoTime: number
  ): Promise<void> {
    try {
      console.log(`Setting start time for ${climberName} on ${route} at ${scheduledTime}`);
      console.log('Video time:', videoTime);
      
      // Check if Firebase is properly initialized
      if (!db || typeof db.collection !== 'function') {
        throw new Error('Firebase database not initialized properly');
      }
      
      console.log('Attempting to get schedule document...');
      
      // Get the current schedule document
      const scheduleDoc = await db.collection('event_data').doc('names').get();
      
      console.log('Document exists:', scheduleDoc.exists);
      
      if (!scheduleDoc.exists) {
        console.log('Document does not exist, creating initial structure...');
        
        // If document doesn't exist, create it with the basic structure from JSON
        const initialData = {
          time_slots: [
            {
              Time: scheduledTime,
              'Route 1': '',
              'Route 2': '',
              'Route 3': '',
              'Route 4': '',
              [`${route}_startData`]: {
                actualStartTime: Date.now(),
                videoTime: videoTime,
                status: 'climbing' as const
              }
            }
          ]
        };
        
        await db.collection('event_data').doc('names').set(initialData);
        console.log('Created new document with initial data');
        return;
      }
      
      const scheduleData: ScheduleWithStartData = scheduleDoc.data() as ScheduleWithStartData;
      console.log('Current schedule data:', scheduleData);
      
      if (!scheduleData.time_slots) {
        throw new Error('Schedule data does not have time_slots array');
      }
      
      // Find the time slot and update it
      const updatedTimeSlots = scheduleData.time_slots.map(slot => {
        if (slot.Time === scheduledTime) {
          console.log(`Found matching time slot: ${scheduledTime}`);
          const startDataKey = `${route}_startData` as keyof TimeSlotWithStartData;
          return {
            ...slot,
            [startDataKey]: {
              actualStartTime: Date.now(),
              videoTime: videoTime,
              status: 'climbing' as const
            }
          };
        }
        return slot;
      });
      
      console.log('Updating document with new time slots...');
      
      // Update the document
      await db.collection('event_data').doc('names').update({
        time_slots: updatedTimeSlots
      });
      
      console.log(`Successfully updated start time for ${climberName}`);
    } catch (error) {
      console.error('Detailed error in setClimberStartTime:', error);
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      throw error;
    }
  },

  // Get the current schedule with start data
  async getScheduleWithStartData(): Promise<ScheduleWithStartData | null> {
    try {
      const scheduleDoc = await db.collection('event_data').doc('names').get();
      
      if (!scheduleDoc.exists) {
        return null;
      }
      
      return scheduleDoc.data() as ScheduleWithStartData;
    } catch (error) {
      console.error('Error getting schedule with start data:', error);
      return null;
    }
  },

  // Get climber status from the schedule with dynamic completion logic
  getClimberStatus(
    scheduleData: ScheduleWithStartData,
    climberName: string, 
    route: string, 
    scheduledTime: string,
    currentVideoTime?: number
  ): 'pending' | 'climbing' | 'completed' {
    const timeSlot = scheduleData.time_slots.find(slot => slot.Time === scheduledTime);
    if (!timeSlot) return 'pending';
    
    const startDataKey = `${route}_startData` as keyof TimeSlotWithStartData;
    const startData = timeSlot[startDataKey] as ClimberStartData | undefined;
    
    // If no start data, climber is pending
    if (!startData || !startData.videoTime) {
      return 'pending';
    }
    
    // If we don't have current video time, just return the stored status
    if (currentVideoTime === undefined) {
      return startData.status;
    }
    
    // Calculate if climb should be completed
    const climbStartTime = startData.videoTime;
    const sixMinutesAfterStart = climbStartTime + (6 * 60); // 6 minutes in seconds
    
    // Check if 6 minutes have passed since start
    const isSixMinutesPassed = currentVideoTime >= sixMinutesAfterStart;
    
    // Check if next climber in same route has started
    const nextClimberStarted = this.hasNextClimberStarted(
      scheduleData, 
      route, 
      scheduledTime, 
      currentVideoTime
    );
    
    // Determine status based on conditions
    if (isSixMinutesPassed || nextClimberStarted) {
      return 'completed';
    } else if (currentVideoTime >= climbStartTime) {
      return 'climbing';
    } else {
      return 'pending';
    }
  },

  // Helper function to check if the next climber in the same route has started
  hasNextClimberStarted(
    scheduleData: ScheduleWithStartData,
    route: string,
    currentScheduledTime: string,
    currentVideoTime: number
  ): boolean {
    // Sort time slots by time to find the next one
    const sortedSlots = [...scheduleData.time_slots].sort((a, b) => {
      // Convert time string to comparable format (assuming HH:MM format)
      const timeA = a.Time.split(':').map(n => parseInt(n));
      const timeB = b.Time.split(':').map(n => parseInt(n));
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });
    
    // Find current slot index
    const currentSlotIndex = sortedSlots.findIndex(slot => slot.Time === currentScheduledTime);
    
    if (currentSlotIndex === -1) return false;
    
    // Look for next slots in the same route that have climbers
    for (let i = currentSlotIndex + 1; i < sortedSlots.length; i++) {
      const nextSlot = sortedSlots[i];
      const nextClimberName = nextSlot[route as keyof TimeSlotWithStartData] as string;
      
      // Skip empty slots or presentation/awards
      if (!nextClimberName || 
          nextClimberName === '' || 
          nextClimberName === 'Presentation' || 
          nextClimberName === 'Awards') {
        continue;
      }
      
      // Check if this next climber has started
      const nextStartDataKey = `${route}_startData` as keyof TimeSlotWithStartData;
      const nextStartData = nextSlot[nextStartDataKey] as ClimberStartData | undefined;
      
      if (nextStartData && nextStartData.videoTime && nextStartData.videoTime <= currentVideoTime) {
        return true; // Next climber has started
      }
      
      // If we found a next climber but they haven't started, stop looking
      break;
    }
    
    return false;
  },

  // Listen to schedule changes in real-time
  onScheduleChange(callback: (schedule: ScheduleWithStartData | null) => void): () => void {
    try {
      return db.collection('event_data').doc('names').onSnapshot(doc => {
        if (doc.exists) {
          callback(doc.data() as ScheduleWithStartData);
        } else {
          callback(null);
        }
      });
    } catch (error) {
      console.error('Error setting up schedule listener:', error);
      return () => {};
    }
  },

  // Update climber status
  async updateClimberStatus(
    climberName: string, 
    route: string, 
    scheduledTime: string, 
    status: 'pending' | 'climbing' | 'completed'
  ): Promise<void> {
    try {
      const scheduleDoc = await db.collection('event_data').doc('names').get();
      
      if (!scheduleDoc.exists) {
        throw new Error('Schedule document not found');
      }
      
      const scheduleData: ScheduleWithStartData = scheduleDoc.data() as ScheduleWithStartData;
      
      const updatedTimeSlots = scheduleData.time_slots.map(slot => {
        if (slot.Time === scheduledTime) {
          const startDataKey = `${route}_startData` as keyof TimeSlotWithStartData;
          const existingData = slot[startDataKey] as ClimberStartData | undefined;
          
          return {
            ...slot,
            [startDataKey]: {
              ...existingData,
              status: status
            }
          };
        }
        return slot;
      });
      
      await db.collection('event_data').doc('names').update({
        time_slots: updatedTimeSlots
      });
    } catch (error) {
      console.error('Error updating climber status:', error);
      throw error;
    }
  }
};