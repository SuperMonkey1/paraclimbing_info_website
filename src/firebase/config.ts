import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your Firebase configuration
// Use environment variables with fallbacks to prevent 'undefined' errors
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'paraclimbing-be',  // Provide a default
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ''
};

// Initialize Firebase with error handling
let app: firebase.app.App;
let db: firebase.firestore.Firestore;

try {
  // Check if Firebase is already initialized
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  
  // Initialize Firestore
  db = app.firestore();
  
  // Log success
  console.log('Firebase config and Firestore initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create dummy implementations for development
  app = {} as firebase.app.App;
  db = {} as firebase.firestore.Firestore;
}

export { app, db };
