# Setting Up Gmail with Firebase Cloud Functions

This guide explains how to set up the Firebase Cloud Function to send confirmation emails using your Gmail account.

## Step 1: Create a Gmail App Password

If you have 2-factor authentication enabled on your Gmail account (recommended), you'll need to create an App Password:

1. Go to your Google Account settings: [https://myaccount.google.com/](https://myaccount.google.com/)
2. In the search bar, search for "App passwords"
3. Select "App passwords" from the results
4. You may need to verify your identity with your password
5. At the bottom, select "Select app" and choose "Other (Custom name)"
6. Enter "Firebase Functions" or any name you prefer
7. Click "Generate"
8. Google will display a 16-character password. **Save this password** as you won't be able to see it again.

## Step 2: Set Up Environment Variables

There are two ways to set up the environment variables:

### Option 1: Using .env file (for local development)

1. Create a `.env` file in the functions directory by copying the example:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file and add your Gmail credentials:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password-from-step-1
   FROM_NAME=Belgian Paraclimbing
   ```

### Option 2: Using Firebase Environment Configuration (for deployment)

Set the environment variables using the Firebase CLI:

```bash
firebase functions:config:set gmail.user="your-email@gmail.com" gmail.pass="your-app-password" gmail.name="Belgian Paraclimbing"
```

## Step 3: Deploy the Cloud Function

Deploy the function to Firebase:

```bash
npm run deploy
```

## Testing

After deployment, you can test the function by creating a new document in the "contacts" collection in Firestore with an email field. The function should automatically send a confirmation email to that address.

## Troubleshooting

If you encounter issues:

1. Check the Firebase Functions logs in the Firebase Console
2. Verify that your Gmail App Password is correct
3. Make sure your Gmail account doesn't have restrictions that would prevent third-party apps from sending emails
