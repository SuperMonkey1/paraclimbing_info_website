import firebase from 'firebase/compat/app';
import { db } from './config';
import { DEFAULT_EVENT_IMAGE } from '../constants/images';

// Collection name for events
const EVENTS_COLLECTION = 'events';

// Event data interface
export interface Event {
  id?: string;
  title: string;
  subtitle?: string;
  date: string;
  location: string;
  description: string;
  organiser: string;
  externalUrl?: string;
  imageUrl?: string;
  type?: string;
  status: 'ur' | 'a' | 'r'; // under review, accepted, rejected
  submittedAt?: firebase.firestore.Timestamp;
  submittedBy?: string; // email of submitter
  reviewedAt?: firebase.firestore.Timestamp;
  reviewedBy?: string;
}

/**
 * Submits a new event for review
 * @param eventData - The event data to submit
 * @param submitterEmail - Email of the person submitting the event
 * @returns Promise<string> - ID of the new document if successful
 */
export const submitEventForReview = async (
  eventData: Omit<Event, 'id' | 'status' | 'submittedAt' | 'submittedBy'>,
  submitterEmail: string
): Promise<string> => {
  try {
    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.location || !eventData.organiser) {
      throw new Error('Please fill in all required fields (title, date, location, organiser)');
    }

    // Prepare the event document
    const eventDoc: Omit<Event, 'id'> = {
      ...eventData,
      status: 'ur', // under review
      submittedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      submittedBy: submitterEmail,
      // Set default image if none provided
      imageUrl: eventData.imageUrl || DEFAULT_EVENT_IMAGE
    };

    // Add to Firestore
    const docRef = await db.collection(EVENTS_COLLECTION).add(eventDoc);
    
    console.log('Event submitted for review:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting event:', error);
    throw error;
  }
};

/**
 * Gets all approved events for public display with real-time updates
 * @param callback - Callback function to handle events updates
 * @returns Unsubscribe function
 */
export const subscribeToApprovedEvents = (
  callback: (events: Event[]) => void
): (() => void) => {
  console.log('Setting up real-time listener for approved events...');
  
  // Set up real-time listener
  const unsubscribe = db.collection(EVENTS_COLLECTION)
    .where('status', '==', 'a')
    .onSnapshot(
      (snapshot) => {
        console.log(`Real-time update: Found ${snapshot.docs.length} approved events`);
        
        const events = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          } as Event;
        });
        
        // Sort in JavaScript
        const sortedEvents = events.sort((a, b) => {
          return a.date.localeCompare(b.date);
        });
        
        callback(sortedEvents);
      },
      (error) => {
        console.error('Error in approved events listener:', error);
        callback([]); // Return empty array on error
      }
    );
  
  return unsubscribe;
};

/**
 * Gets all approved events for public display (one-time fetch - deprecated)
 * @returns Promise<Event[]> - List of approved events
 */
export const getApprovedEvents = async (): Promise<Event[]> => {
  try {
    console.log('Fetching approved events from Firestore...');
    
    // Simplified query without orderBy to avoid index issues
    const snapshot = await db.collection(EVENTS_COLLECTION)
      .where('status', '==', 'a')
      .get();
    
    console.log(`Found ${snapshot.docs.length} approved events`);
    
    const events = snapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Approved event:', { id: doc.id, title: data.title, status: data.status, date: data.date });
      return {
        id: doc.id,
        ...data
      } as Event;
    });
    
    // Sort in JavaScript instead of Firestore
    const sortedEvents = events.sort((a, b) => {
      // Simple string comparison for dates
      return a.date.localeCompare(b.date);
    });
    
    return sortedEvents;
  } catch (error) {
    console.error('Error getting approved events:', error);
    return [];
  }
};

/**
 * Subscribes to all events for admin review with real-time updates
 * @param callback - Callback function to handle events updates
 * @returns Unsubscribe function
 */
export const subscribeToAllEventsForAdmin = (
  callback: (events: Event[]) => void
): (() => void) => {
  console.log('Setting up real-time listener for all events (admin)...');
  
  const unsubscribe = db.collection(EVENTS_COLLECTION)
    .orderBy('submittedAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        console.log(`Real-time update (admin): Found ${snapshot.docs.length} total events`);
        
        const events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Event));
        
        callback(events);
      },
      (error) => {
        console.error('Error in admin events listener:', error);
        callback([]);
      }
    );
  
  return unsubscribe;
};

/**
 * Gets all events for admin review (all statuses) - one-time fetch
 * @returns Promise<Event[]> - List of all events
 */
export const getAllEventsForAdmin = async (): Promise<Event[]> => {
  try {
    const snapshot = await db.collection(EVENTS_COLLECTION)
      .orderBy('submittedAt', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Event));
  } catch (error) {
    console.error('Error getting all events:', error);
    return [];
  }
};

/**
 * Updates event status (admin function)
 * @param eventId - ID of the event to update
 * @param status - New status ('a' for accepted, 'r' for rejected)
 * @param reviewerEmail - Email of the admin reviewing
 * @returns Promise<void>
 */
export const updateEventStatus = async (
  eventId: string,
  status: 'a' | 'r',
  reviewerEmail: string
): Promise<void> => {
  try {
    await db.collection(EVENTS_COLLECTION).doc(eventId).update({
      status,
      reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
      reviewedBy: reviewerEmail
    });
    
    console.log(`Event ${eventId} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating event status:', error);
    throw error;
  }
};

/**
 * Deletes an event (admin function)
 * @param eventId - ID of the event to delete
 * @returns Promise<void>
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    await db.collection(EVENTS_COLLECTION).doc(eventId).delete();
    console.log(`Event ${eventId} deleted`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
