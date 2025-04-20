# Newsletter Email Subscription Confirmation

This Firebase Cloud Function automatically sends a confirmation email when users subscribe to the Belgian Paraclimbing newsletter.

## Setup Instructions

### 1. Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
```

### 2. Configure Gmail Credentials

You have two options for setting up your Gmail credentials:

#### Option A: Using .env File (local development)

1. Edit the `.env` file in the functions directory with your Gmail credentials:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-gmail-app-password
   FROM_NAME=Belgian Paraclimbing
   ```

2. To get an app password for Gmail:
   - Go to your Google Account > Security > 2-Step Verification
   - Scroll down to "App passwords"
   - Create a new app password for "Firebase Functions"

#### Option B: Using Firebase Config (for deployment)

Set the environment variables using the Firebase CLI:

```bash
firebase functions:config:set gmail.user="your-email@gmail.com" gmail.pass="your-app-password" gmail.name="Belgian Paraclimbing"
```

### 3. Fix any Linting Issues

Run the lint fixer to ensure code meets style requirements:

```bash
npm run lint:fix
```

### 4. Build and Deploy

Deploy the functions to Firebase:

```bash
npm run deploy
```

## How It Works

1. When a new email is added to the "contacts" collection in Firestore
2. The Cloud Function automatically triggers
3. It sends a confirmation email using the configured Gmail account
4. It updates the Firestore document with confirmation status

## Testing

After deployment, you can test the function by:

1. Adding a new document to the "contacts" collection with an email field
2. Checking the Firebase Functions logs in the Firebase Console
3. Verifying that the email was received at the specified address

## Troubleshooting

If you encounter issues:

- Check the Firebase Functions logs in the console
- Verify your Gmail App Password is correct
- Make sure your Gmail account doesn't have restrictions for third-party applications
- Run `npm run lint:fix` to fix any code style issues
