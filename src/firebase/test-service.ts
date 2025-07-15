import { db } from './config';

export const testFirebaseConnection = async (): Promise<void> => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test basic Firebase connection
    if (!db) {
      throw new Error('Firebase db is not initialized');
    }
    
    console.log('Firebase db object exists:', !!db);
    console.log('Firebase db type:', typeof db);
    console.log('Firebase collection method exists:', typeof db.collection);
    
    // Test reading from a collection
    console.log('Attempting to read from event_data collection...');
    const testRead = await db.collection('event_data').limit(1).get();
    console.log('Successfully read from event_data collection');
    console.log('Number of documents found:', testRead.docs.length);
    
    // If there are documents, log the first one
    if (testRead.docs.length > 0) {
      const firstDoc = testRead.docs[0];
      console.log('First document ID:', firstDoc.id);
      console.log('First document data:', firstDoc.data());
    }
    
    // Test if 'names' document specifically exists
    console.log('Checking if names document exists...');
    const namesDoc = await db.collection('event_data').doc('names').get();
    console.log('Names document exists:', namesDoc.exists);
    
    if (namesDoc.exists) {
      const data = namesDoc.data();
      console.log('Names document data structure:');
      console.log('- Has time_slots:', !!data?.time_slots);
      console.log('- Time slots count:', data?.time_slots?.length || 0);
      console.log('- First few time slots:', data?.time_slots?.slice(0, 3));
    }
    
    console.log('Firebase connection test completed successfully');
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    throw error;
  }
};

export const createInitialScheduleDocument = async (): Promise<void> => {
  try {
    console.log('Creating initial schedule document...');
    
    // Import the schedule data
    const scheduleData = {
      "time_slots": [
        {
          "Time": "16:25",
          "Route 1": "Presentation",
          "Route 2": "Presentation",
          "Route 3": "Presentation",
          "Route 4": "Presentation"
        },
        {
          "Time": "16:35",
          "Route 1": "Emily SEELENFREUND",
          "Route 2": "Philipp HROZEK",
          "Route 3": "Luke SMITH",
          "Route 4": "Lucy KEYWORTH"
        },
        {
          "Time": "16:39",
          "Route 1": "Sarah LONGHI",
          "Route 2": "Brayden BUTLER",
          "Route 3": "Jamie BARENDRECHT",
          "Route 4": "Hannah ZOOK"
        }
        // Add more time slots as needed...
      ]
    };
    
    await db.collection('event_data').doc('names').set(scheduleData);
    console.log('Initial schedule document created successfully');
  } catch (error) {
    console.error('Error creating initial schedule document:', error);
    throw error;
  }
};