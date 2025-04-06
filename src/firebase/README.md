# Firebase Setup for Newsletter Subscriptions

This directory contains the Firebase configuration and services for the Paraclimbing Belgium website.

## Configuration

To complete the setup for storing newsletter subscriptions in Firebase Firestore:

1. Open `config.ts` and replace the placeholder values with your Firebase project's credentials.

2. You can find these values in your Firebase project settings:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
   - Scroll down to the "Your apps" section and find your web app
   - Under the "SDK setup and configuration" section, you'll find your Firebase configuration values

3. Make sure Firestore is enabled in your Firebase project:
   - In the Firebase Console, go to "Build" > "Firestore Database"
   - Click "Create database" if you haven't already set it up
   - Choose either production or test mode (you can change this later)
   - Select a location for your database

## How It Works

The newsletter subscription works as follows:

1. When a user submits their email in the newsletter form, the `subscribeToNewsletter` function in `services.ts` is called.

2. The function checks if the email already exists in the `newsletter_subscribers` collection.

3. If the email is not already subscribed, it adds a new document to the collection with the email, subscription date, and active status.

4. The user receives feedback about the success or failure of their subscription attempt.

## Security Rules

For added security, consider setting up Firestore security rules to protect your data. You can do this in the Firebase Console under "Firestore Database" > "Rules".

Example security rules for the newsletter subscribers collection:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /newsletter_subscribers/{document=**} {
      allow read: if request.auth != null;
      allow write: if true;  // Allow writes from the client for subscription
    }
    
    // Other collections...
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

These rules allow anyone to subscribe (write to the collection) but restrict reading the subscriber list to authenticated users only.
