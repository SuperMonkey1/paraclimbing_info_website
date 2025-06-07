import { useState, useEffect } from 'react';
import { EventProps } from '../components/EventCard';
import { subscribeToApprovedEvents, Event as FirebaseEvent } from '../firebase/events-service';
import { DEFAULT_EVENT_IMAGE } from '../constants/images';

// Helper function to check if an event date is in the future or today (currently unused)
// const isEventCurrent = (dateString: string): boolean => {
//   const eventDate = parseEventDate(dateString);
//   const today = new Date(2025, 5, 7); // June 7, 2025 (month is 0-indexed)
//   today.setHours(0, 0, 0, 0); // Set to start of today
//   
//   return eventDate >= today;
// };

// Helper function to parse different date formats
const parseEventDate = (dateString: string): Date => {
  // Handle various date formats
  // "April 12, 2025", "March 15-16, 2025", "May 20-21, 2025", "December 18, 2025", etc.
  
  // Remove any date ranges (take the first date)
  let cleanDate = dateString.split('-')[0].trim();
  
  // Handle "April 24-26, 2025" format - remove the range part
  cleanDate = cleanDate.replace(/\s*-\s*\d+/, '');
  
  // Create a more reliable date parser
  const monthNames: { [key: string]: number } = {
    'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
  };
  
  // Try to parse manually first for better reliability
  const datePattern = /^(\w+)\s+(\d{1,2}),?\s+(\d{4})$/i;
  const match = cleanDate.match(datePattern);
  
  if (match) {
    const [, monthName, day, year] = match;
    const monthIndex = monthNames[monthName.toLowerCase()];
    
    if (monthIndex !== undefined) {
      const date = new Date(parseInt(year), monthIndex, parseInt(day));
      return date;
    }
  }
  
  // Fallback to native Date parsing
  let parsed = new Date(cleanDate);
  
  // If that fails, try different approaches
  if (isNaN(parsed.getTime())) {
    // Try parsing with different separators
    const variations = [
      cleanDate,
      cleanDate.replace(',', ''),
      cleanDate.replace(/\s+/g, ' ').trim()
    ];
    
    for (const variation of variations) {
      parsed = new Date(variation);
      if (!isNaN(parsed.getTime())) {
        break;
      }
    }
  }
  
  // If parsing still fails, try to extract year and set a fallback date
  if (isNaN(parsed.getTime())) {
    console.warn(`Could not parse date: "${dateString}", using fallback`);
    const yearMatch = dateString.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      const fallbackDate = new Date(parseInt(yearMatch[1]), 5, 7); // June 7 of that year
      return fallbackDate;
    }
    const currentFallback = new Date(2025, 5, 7); // June 7, 2025
    return currentFallback;
  }
  
  return parsed;
};

// Convert Firebase Event to EventProps format
const convertFirebaseEventToEventProps = (fbEvent: FirebaseEvent): EventProps => {
  return {
    id: fbEvent.id || '',
    title: fbEvent.title,
    date: fbEvent.date,
    location: fbEvent.location,
    description: fbEvent.description,
    imageUrl: fbEvent.imageUrl || DEFAULT_EVENT_IMAGE,
    type: fbEvent.type,
    externalUrl: fbEvent.externalUrl
  };
};

export const useAllEvents = () => {
  const [firebaseEvents, setFirebaseEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Setting up real-time Firebase events listener...');
    
    setLoading(true);
    
    // Set up real-time listener
    const unsubscribe = subscribeToApprovedEvents((approvedEvents) => {
      console.log(`Received ${approvedEvents.length} approved events from Firebase`);
      
      const convertedEvents = approvedEvents.map(convertFirebaseEventToEventProps);
      setFirebaseEvents(convertedEvents);
      setError(null);
      setLoading(false);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      console.log('Cleaning up Firebase events listener...');
      unsubscribe();
    };
  }, []);

  // Only use Firebase events now (no hardcoded events)
  const allEvents = [...firebaseEvents];

  // Show all events without date filtering
  const currentEvents = allEvents;

  // Sort events by date (earliest first)
  const sortedEvents = currentEvents.sort((a, b) => {
    const dateA = parseEventDate(a.date);
    const dateB = parseEventDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const refreshEvents = async () => {
    console.log('Manual refresh requested (real-time listener should handle this automatically)');
    
    try {
      setLoading(true);
      setError(null);
    } catch (err) {
      console.error('Error refreshing Firebase events:', err);
      setError('Failed to refresh events');
    } finally {
      setLoading(false);
    }
  };

  return {
    events: sortedEvents,
    firebaseEvents,
    hardcodedEvents: [], // No hardcoded events anymore
    loading,
    error,
    refreshEvents
  };
};
