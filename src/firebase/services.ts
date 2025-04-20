import firebase from 'firebase/compat/app';
import { db } from './config';

// Collection names
const NEWSLETTER_COLLECTION = 'newsletter_subscribers';
const CONTACTS_COLLECTION = 'contacts';

// Local storage key for newsletter subscribers
const LOCAL_STORAGE_KEY = 'newsletter_subscribers';

/**
 * Stores email addresses in Firestore 'contacts' collection
 * @param email - The email address to store
 * @returns Promise<string> - ID of the new document if successful
 */
export const subscribeToNewsletter = async (email: string): Promise<string> => {
  try {
    // Add validation
    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid email address');
    }
    
    try {
      // Store in Firestore 'contacts' collection
      const docRef = await db.collection(CONTACTS_COLLECTION).add({
        email,
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
        active: true,
        source: 'newsletter'
      });
      
      console.log('Email stored in Firestore contacts collection:', email);
      return docRef.id;
    } catch (firestoreError) {
      console.error('Error storing in Firestore:', firestoreError);
      
      // Fallback to local storage if Firestore fails
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
      
      console.log('Firestore failed, email stored locally:', email);
      return newSubscriber.id;
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
  try {
    // Try to get subscribers from Firestore first
    try {
      const snapshot = await db.collection(CONTACTS_COLLECTION)
        .where('source', '==', 'newsletter')
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (firestoreError) {
      console.error('Error getting subscribers from Firestore:', firestoreError);
      
      // Fall back to local storage
      const storedSubscribers = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedSubscribers ? JSON.parse(storedSubscribers) : [];
    }
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error);
    return [];
  }
};
