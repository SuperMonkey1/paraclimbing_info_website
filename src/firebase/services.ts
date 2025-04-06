import firebase from 'firebase/compat/app';
import { db } from './config';

// Collection name for newsletter subscribers
const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

// Local storage key for newsletter subscribers
const LOCAL_STORAGE_KEY = 'newsletter_subscribers';

/**
 * Temporarily stores newsletter subscriptions in local storage
 * instead of Firestore
 * @param email - The email address to subscribe
 * @returns Promise<string> - ID of the new document if successful
 */
export const subscribeToNewsletter = async (email: string): Promise<string> => {
  try {
    // Add validation
    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }
    
    // Check if Firestore is available (for future use)
    const firestoreAvailable = false; // Set to false for now
    
    if (firestoreAvailable) {
      // Firestore implementation (disabled for now)
      /* 
      const docRef = await db.collection(NEWSLETTER_COLLECTION).add({
        email,
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
        active: true
      });
      return docRef.id;
      */
      return "firestore-disabled";
    } else {
      // Local storage implementation
      try {
        // Get existing subscribers
        const storedSubscribers = localStorage.getItem(LOCAL_STORAGE_KEY);
        let subscribers = storedSubscribers ? JSON.parse(storedSubscribers) : [];
        
        // Check if email already exists
        if (subscribers.some((sub: any) => sub.email === email)) {
          throw new Error('This email is already subscribed to our newsletter');
        }
        
        // Add new subscriber
        const newSubscriber = {
          id: `local-${Date.now()}`,
          email,
          subscribedAt: new Date().toISOString(),
          active: true
        };
        
        subscribers.push(newSubscriber);
        
        // Save back to local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscribers));
        
        // Log for debugging (can be removed in production)
        console.log('Email subscribed locally:', email);
        
        return newSubscriber.id;
      } catch (error) {
        console.error('Error with local storage subscription:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

/**
 * Get all newsletter subscribers (for admin purposes)
 * @returns Promise<Array> - List of all subscribers
 */
export const getNewsletterSubscribers = async (): Promise<any[]> => {
  // For local storage implementation only
  try {
    const storedSubscribers = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedSubscribers ? JSON.parse(storedSubscribers) : [];
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error);
    return [];
  }
};
