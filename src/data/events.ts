import { EventProps } from '../components/EventCard';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

// No hardcoded events - all events now come from Firebase
const defaultEvents: EventProps[] = [];

// Export the default events as the main export
export const allEvents: EventProps[] = defaultEvents;

// Create a React hook for getting localized events
export function useLocalizedEvents(): EventProps[] {
  const { t, i18n, ready } = useTranslation('events');
  
  // No hardcoded events - return empty array
  // All events now come from Firebase through useAllEvents hook
  return [];
}